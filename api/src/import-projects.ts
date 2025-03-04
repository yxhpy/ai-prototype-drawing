/**
 * 项目导入工具
 * 从前端项目配置文件导入项目结构到数据库
 */

import * as fs from 'fs';
import * as path from 'path';
import { 
  initDb, 
  createProject, 
  createModule, 
  createPage, 
  saveComponent 
} from './database';

// 前端项目目录
const FRONTEND_DIR = path.join(__dirname, '../../web');
const PROJECT_CONFIG_DIR = path.join(FRONTEND_DIR, 'src/data/projects');
const COMPONENT_DIR = path.join(FRONTEND_DIR, 'src/components/prototypes');

// TypeScript类型定义
interface ProjectConfig {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  modules: ModuleConfig[];
}

interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  pages: PageConfig[];
}

interface PageConfig {
  id: string;
  title: string;
  description: string;
  componentPath: string;
}

/**
 * 从前端项目配置文件导入项目
 */
async function importProjects() {
  try {
    // 初始化数据库
    await initDb();
    console.log('数据库初始化成功');

    // 读取项目配置文件
    const projects = await readProjectConfigs();
    console.log(`找到 ${projects.length} 个项目配置`);

    // 导入项目数据
    for (const project of projects) {
      await importProject(project);
    }

    console.log('项目导入完成！');
  } catch (error) {
    console.error('项目导入失败:', error);
    process.exit(1);
  }
}

/**
 * 读取项目配置文件
 */
async function readProjectConfigs(): Promise<ProjectConfig[]> {
  const projectConfigs: ProjectConfig[] = [];

  try {
    // 读取 video-generation.ts
    const videoGenPath = path.join(PROJECT_CONFIG_DIR, 'video-generation.ts');
    if (fs.existsSync(videoGenPath)) {
      const content = fs.readFileSync(videoGenPath, 'utf-8');
      const configObject = parseConfigFile(content);
      if (configObject) projectConfigs.push(configObject);
    }

    // 读取 campus-food-delivery.ts
    const campusPath = path.join(PROJECT_CONFIG_DIR, 'campus-food-delivery.ts');
    if (fs.existsSync(campusPath)) {
      const content = fs.readFileSync(campusPath, 'utf-8');
      const configObject = parseConfigFile(content);
      if (configObject) projectConfigs.push(configObject);
    }

    // 可以添加更多项目文件的读取

    return projectConfigs;
  } catch (error) {
    console.error('读取项目配置文件失败:', error);
    return [];
  }
}

/**
 * 解析配置文件内容提取项目配置对象
 */
function parseConfigFile(content: string): ProjectConfig | null {
  try {
    // 提取配置对象
    const match = content.match(/const\s+\w+\s*:\s*Project\s*=\s*(\{[\s\S]*?\};)/);
    if (!match || !match[1]) return null;

    let configText = match[1];
    // 移除结尾的分号
    if (configText.endsWith(';')) {
      configText = configText.slice(0, -1);
    }

    // 执行eval来获取配置对象 (注意：这是为了解析静态配置，生产环境中应避免使用eval)
    // 将TypeScript对象字符串转换为JavaScript对象
    configText = configText.replace(/\/\/.*$/gm, ''); // 移除注释
    const config = eval(`(${configText})`);
    return config;
  } catch (error) {
    console.error('解析配置文件失败:', error);
    return null;
  }
}

/**
 * 导入单个项目
 */
async function importProject(projectConfig: ProjectConfig) {
  try {
    console.log(`开始导入项目: ${projectConfig.name}`);

    // 创建项目
    const project = await createProject({
      name: projectConfig.name,
      description: projectConfig.description,
      thumbnail: projectConfig.thumbnail
    });

    console.log(`项目创建成功: ${project.name} (ID: ${project.id})`);

    // 导入模块
    for (const moduleConfig of projectConfig.modules) {
      const module = await createModule({
        projectId: project.id,
        name: moduleConfig.name,
        description: moduleConfig.description
      });

      console.log(`模块创建成功: ${module.name} (ID: ${module.id})`);

      // 导入页面
      for (const pageConfig of moduleConfig.pages) {
        const page = await createPage({
          moduleId: module.id,
          name: pageConfig.title,
          description: pageConfig.description,
          componentPath: pageConfig.componentPath
        });

        console.log(`页面创建成功: ${page.name} (ID: ${page.id})`);

        // 尝试导入组件代码
        await importComponentCode(projectConfig.id, pageConfig.componentPath);
      }
    }

    console.log(`项目 ${projectConfig.name} 导入完成`);
  } catch (error) {
    console.error(`导入项目 ${projectConfig.name} 失败:`, error);
  }
}

/**
 * 导入组件代码
 */
async function importComponentCode(projectType: string, componentName: string) {
  try {
    const componentPath = path.join(COMPONENT_DIR, projectType, `${componentName}.tsx`);
    
    if (fs.existsSync(componentPath)) {
      const content = fs.readFileSync(componentPath, 'utf-8');
      
      await saveComponent({
        projectType,
        componentName,
        content
      });
      
      console.log(`组件代码导入成功: ${projectType}/${componentName}`);
    } else {
      console.warn(`组件文件不存在: ${componentPath}`);
    }
  } catch (error) {
    console.error(`导入组件代码失败 ${projectType}/${componentName}:`, error);
  }
}

// 执行导入
importProjects(); 