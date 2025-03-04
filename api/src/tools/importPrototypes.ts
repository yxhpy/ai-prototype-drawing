import * as fs from 'fs';
import * as path from 'path';
import { saveComponent, initDb } from '../database';

// 前端项目的路径配置
const FRONTEND_DIR = path.resolve(__dirname, '../../../web');
const PROTOTYPES_DIR = path.join(FRONTEND_DIR, 'src/components/prototypes');

// 读取目录下的所有组件
async function readComponentsDir(dir: string): Promise<void> {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // 项目类型目录
        const projectType = entry.name;
        console.log(`处理项目类型: ${projectType}`);
        
        // 读取项目类型目录中的所有文件
        const projectFiles = fs.readdirSync(fullPath, { withFileTypes: true });
        
        for (const file of projectFiles) {
          // 只处理.tsx或.jsx文件
          if (file.isFile() && (file.name.endsWith('.tsx') || file.name.endsWith('.jsx'))) {
            const componentName = file.name.split('.')[0];
            const componentPath = path.join(fullPath, file.name);
            
            try {
              // 读取组件代码
              const content = fs.readFileSync(componentPath, 'utf-8');
              
              // 保存到数据库
              await saveComponent({
                projectType,
                componentName,
                content
              });
              
              console.log(`导入组件: ${projectType}/${componentName}`);
            } catch (error) {
              console.error(`导入组件 ${projectType}/${componentName} 失败:`, error);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('读取组件目录失败:', error);
    throw error;
  }
}

// 主函数：导入所有原型组件
async function importAllPrototypes(): Promise<void> {
  try {
    // 初始化数据库
    console.log('初始化数据库...');
    await initDb();
    
    console.log('开始导入原型组件...');
    
    // 读取所有项目类型目录
    await readComponentsDir(PROTOTYPES_DIR);
    
    console.log('原型组件导入完成');
  } catch (error) {
    console.error('导入原型组件失败:', error);
    process.exit(1);
  }
}

// 立即执行导入
importAllPrototypes(); 