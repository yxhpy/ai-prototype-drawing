import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import path from 'path';
import { 
  initDb, 
  getProjects, 
  getProject, 
  getProjectModules, 
  getModule, 
  getModulePages, 
  getPage,
  getComponent,
  getProjectComponents,
  saveComponent,
  createProject,
  createModule,
  createPage,
  getAllComponents
} from './database';

const app = express();
const PORT = process.env.PORT || 3001;

// 启用CORS
app.use(cors());

// 解析JSON请求体
app.use(json({ limit: '50mb' })); // 增加请求体大小限制，用于大型组件代码

// 初始化数据库
initDb().then(() => {
  console.log('数据库初始化成功');
}).catch(err => {
  console.error('数据库初始化失败:', err);
  process.exit(1);
});

// API路由

// 获取所有项目
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    console.error('获取项目列表失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 获取特定项目
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: '项目不存在' });
    }
    res.json(project);
  } catch (error) {
    console.error('获取项目详情失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 获取项目的所有模块
app.get('/api/projects/:projectId/modules', async (req, res) => {
  try {
    const modules = await getProjectModules(req.params.projectId);
    res.json(modules);
  } catch (error) {
    console.error('获取项目模块失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 获取特定模块
app.get('/api/modules/:id', async (req, res) => {
  try {
    const module = await getModule(req.params.id);
    if (!module) {
      return res.status(404).json({ error: '模块不存在' });
    }
    res.json(module);
  } catch (error) {
    console.error('获取模块详情失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 获取模块的所有页面
app.get('/api/modules/:moduleId/pages', async (req, res) => {
  try {
    const pages = await getModulePages(req.params.moduleId);
    res.json(pages);
  } catch (error) {
    console.error('获取模块页面失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 获取特定页面
app.get('/api/pages/:id', async (req, res) => {
  try {
    const page = await getPage(req.params.id);
    if (!page) {
      return res.status(404).json({ error: '页面不存在' });
    }
    res.json(page);
  } catch (error) {
    console.error('获取页面详情失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 新增: 获取组件代码
app.get('/api/components/:projectType/:componentName', async (req, res) => {
  try {
    const { projectType, componentName } = req.params;
    console.log(`请求组件: projectType=${projectType}, componentName=${componentName}`);
    
    // 先尝试直接用传入的projectType查找组件
    let component = await getComponent(projectType, componentName);
    console.log(`直接查找结果: ${component ? '找到组件' : '未找到组件'}`);
    
    // 如果找不到组件，可能是使用了项目ID而不是项目类型
    if (!component) {
      // 无论项目ID的格式如何，都尝试获取项目信息
      const project = await getProject(projectType);
      console.log(`尝试作为项目ID查找: ${project ? '找到项目' : '未找到项目'}`);
      
      if (project) {
        console.log(`项目信息: id=${project.id}, name=${project.name}`);
        
        // 使用项目名称的第一个单词作为项目类型
        const possibleProjectType = project.name.split(' ')[0].toLowerCase();
        console.log(`尝试使用项目名称的第一个单词 "${possibleProjectType}" 作为项目类型`);
        component = await getComponent(possibleProjectType, componentName);
        console.log(`使用项目名称查找结果: ${component ? '找到组件' : '未找到组件'}`);
        
        // 如果还是找不到，试试直接使用项目ID的一部分
        if (!component) {
          const shortId = projectType.substring(0, 8);
          console.log(`尝试使用项目ID的前8位 "${shortId}" 作为项目类型`);
          component = await getComponent(shortId, componentName);
          console.log(`使用项目ID前缀查找结果: ${component ? '找到组件' : '未找到组件'}`);
          
          // 再尝试使用项目ID本身作为项目类型
          if (!component) {
            console.log(`尝试使用完整项目ID "${project.id}" 作为项目类型`);
            component = await getComponent(project.id, componentName);
            console.log(`使用完整项目ID查找结果: ${component ? '找到组件' : '未找到组件'}`);
          }
        }
      }
    }
    
    if (!component) {
      console.log('所有尝试都失败，返回组件不存在错误');
      return res.status(404).json({ error: '组件不存在' });
    }
    
    console.log(`成功找到组件，内容长度: ${component.content.length}`);
    res.json(component);
  } catch (error) {
    console.error('获取组件代码失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 新增: 获取项目类型的所有组件
app.get('/api/components/:projectType', async (req, res) => {
  try {
    const { projectType } = req.params;
    const components = await getProjectComponents(projectType);
    res.json(components);
  } catch (error) {
    console.error('获取项目组件列表失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 新增: 保存组件代码
app.post('/api/components', async (req, res) => {
  try {
    const { projectType, componentName, content } = req.body;
    
    if (!projectType || !componentName || !content) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const component = await saveComponent({
      projectType,
      componentName,
      content
    });
    
    res.status(201).json(component);
  } catch (error) {
    console.error('保存组件代码失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 创建项目
app.post('/api/projects', async (req, res) => {
  try {
    const { name, description, thumbnail } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const project = await createProject({
      name,
      description,
      thumbnail
    });
    
    res.status(201).json(project);
  } catch (error) {
    console.error('创建项目失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 创建模块
app.post('/api/modules', async (req, res) => {
  try {
    const { projectId, name, description } = req.body;
    
    if (!projectId || !name || !description) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const module = await createModule({
      projectId,
      name,
      description
    });
    
    res.status(201).json(module);
  } catch (error) {
    console.error('创建模块失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 创建页面
app.post('/api/pages', async (req, res) => {
  try {
    const { moduleId, name, description, componentPath } = req.body;
    
    if (!moduleId || !name || !description || !componentPath) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const page = await createPage({
      moduleId,
      name,
      description,
      componentPath
    });
    
    res.status(201).json(page);
  } catch (error) {
    console.error('创建页面失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 新增: 列出所有组件(调试用)
app.get('/api/debug/components', async (req, res) => {
  try {
    // 获取数据库中所有组件
    const allComponents = await getAllComponents();
    res.json({
      total: allComponents.length,
      components: allComponents.map(c => ({
        id: c.id,
        projectType: c.projectType,
        componentName: c.componentName,
        contentLength: c.content ? c.content.length : 0,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      }))
    });
  } catch (error) {
    console.error('获取所有组件失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 添加调试端点：查看项目详情
app.get('/api/debug/projects/:id', async (req, res) => {
  try {
    const project = await getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: '项目不存在' });
    }
    res.json(project);
  } catch (error) {
    console.error('获取项目详情失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 添加调试端点：查看组件信息
app.get('/api/debug/components/:projectType/:componentName', async (req, res) => {
  try {
    const { projectType, componentName } = req.params;
    const component = await getComponent(projectType, componentName);
    if (!component) {
      return res.status(404).json({ error: '组件不存在' });
    }
    // 返回组件信息但不包含完整内容
    res.json({
      ...component,
      content: component.content ? `${component.content.substring(0, 200)}... (${component.content.length} 字符)` : ''
    });
  } catch (error) {
    console.error('获取组件信息失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 