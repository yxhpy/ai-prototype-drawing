import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// 数据库文件路径
const DB_PATH = path.join(__dirname, '../../data.json');

// 数据库类型定义
interface Database {
  projects: Project[];
  modules: Module[];
  pages: Page[];
  components: Component[]; // 存储组件代码
}

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  modules?: Module[]; // 添加模块字段
}

export interface Module {
  id: string;
  projectId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  pages?: Page[]; // 添加页面字段
}

export interface Page {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  componentPath: string; // 组件路径
  createdAt: string;
  updatedAt: string;
}

// 组件代码类型
export interface Component {
  id: string;
  projectType: string; // 项目类型，如 video-generation
  componentName: string; // 组件名称，如 HomePage
  content: string; // 组件源代码
  createdAt: string;
  updatedAt: string;
}

// 数据库实例
let db: Database = {
  projects: [],
  modules: [],
  pages: [],
  components: [] // 初始化空的组件数组
};

// 保存数据库
async function saveDb(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// 初始化数据库
export async function initDb(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(DB_PATH)) {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        db = JSON.parse(data);
        
        // 确保所有必要的集合都存在
        if (!db.components) {
          db.components = [];
        }
        if (!db.projects) {
          db.projects = [];
        }
        if (!db.modules) {
          db.modules = [];
        }
        if (!db.pages) {
          db.pages = [];
        }
      } else {
        // 如果数据库为空，创建示例数据
        const projectId = uuidv4();
        const moduleId = uuidv4();
        const pageId = uuidv4();
        const componentId = uuidv4();

        // 创建示例项目
        db.projects.push({
          id: projectId,
          name: '示例项目',
          description: '这是一个示例项目',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // 创建示例模块
        db.modules.push({
          id: moduleId,
          projectId,
          name: '示例模块',
          description: '这是一个示例模块',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // 创建示例页面
        db.pages.push({
          id: pageId,
          moduleId,
          name: '示例页面',
          description: '这是一个示例页面',
          componentPath: 'ExamplePage', // 组件路径
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // 创建示例组件代码
        db.components.push({
          id: componentId,
          projectType: 'example',
          componentName: 'ExamplePage',
          content: `'use client';
          
import { useState } from 'react';

export default function ExamplePage() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">示例页面</h2>
      <p>当前计数: {count}</p>
      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(count + 1)}
      >
        增加计数
      </button>
    </div>
  );
}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // 保存数据库
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// 获取所有项目（包含模块信息）
export async function getProjects(): Promise<Project[]> {
  // 获取项目数据
  const projects = [...db.projects];
  
  // 为每个项目添加模块数据
  for (const project of projects) {
    const projectModules = await getProjectModules(project.id);
    project.modules = projectModules;
    
    // 为每个模块添加页面数据
    for (const module of projectModules) {
      const modulePages = await getModulePages(module.id);
      module.pages = modulePages;
    }
  }
  
  return projects;
}

// 获取特定项目（包含模块信息）
export async function getProject(id: string): Promise<Project | null> {
  const project = db.projects.find(p => p.id === id);
  if (!project) return null;
  
  // 克隆项目对象，防止修改原始数据
  const projectWithModules = { ...project };
  
  // 获取项目的模块
  const modules = await getProjectModules(id);
  projectWithModules.modules = modules;
  
  // 为每个模块添加页面数据
  for (const module of modules) {
    const pages = await getModulePages(module.id);
    module.pages = pages;
  }
  
  return projectWithModules;
}

// 获取项目的所有模块
export async function getProjectModules(projectId: string): Promise<Module[]> {
  return db.modules.filter(m => m.projectId === projectId);
}

// 获取特定模块
export async function getModule(id: string): Promise<Module | null> {
  return db.modules.find(m => m.id === id) || null;
}

// 获取模块的所有页面
export async function getModulePages(moduleId: string): Promise<Page[]> {
  return db.pages.filter(p => p.moduleId === moduleId);
}

// 获取特定页面
export async function getPage(id: string): Promise<Page | null> {
  return db.pages.find(p => p.id === id) || null;
}

// 获取所有组件
export async function getAllComponents(): Promise<Component[]> {
  return db.components || [];
}

// 获取组件代码
export async function getComponent(projectType: string, componentName: string): Promise<Component | null> {
  return db.components.find(
    c => c.projectType === projectType && c.componentName === componentName
  ) || null;
}

// 获取项目类型的所有组件
export async function getProjectComponents(projectType: string): Promise<Component[]> {
  return db.components.filter(c => c.projectType === projectType);
}

// 创建或更新组件
export async function saveComponent(component: Omit<Component, 'id' | 'createdAt' | 'updatedAt'>): Promise<Component> {
  // 确保组件数组存在
  if (!db.components) {
    db.components = [];
  }
  
  // 查找现有组件
  const existingIndex = db.components.findIndex(
    c => c.projectType === component.projectType && c.componentName === component.componentName
  );
  
  const now = new Date().toISOString();
  
  // 如果组件存在，则更新
  if (existingIndex !== -1) {
    const updatedComponent = {
      ...db.components[existingIndex],
      ...component,
      updatedAt: now
    };
    
    db.components[existingIndex] = updatedComponent;
    await saveDb();
    
    return updatedComponent;
  }
  
  // 否则创建新组件
  const newComponent: Component = {
    id: uuidv4(),
    ...component,
    createdAt: now,
    updatedAt: now
  };
  
  db.components.push(newComponent);
  await saveDb();
  
  return newComponent;
}

// 创建项目
export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const now = new Date().toISOString();
  const newProject: Project = {
    id: uuidv4(),
    ...project,
    createdAt: now,
    updatedAt: now
  };
  
  db.projects.push(newProject);
  await saveDb();
  
  return newProject;
}

// 创建模块
export async function createModule(module: Omit<Module, 'id' | 'createdAt' | 'updatedAt'>): Promise<Module> {
  const now = new Date().toISOString();
  const newModule: Module = {
    id: uuidv4(),
    ...module,
    createdAt: now,
    updatedAt: now
  };
  
  db.modules.push(newModule);
  await saveDb();
  
  return newModule;
}

// 创建页面
export async function createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
  const now = new Date().toISOString();
  const newPage: Page = {
    id: uuidv4(),
    ...page,
    createdAt: now,
    updatedAt: now
  };
  
  db.pages.push(newPage);
  await saveDb();
  
  return newPage;
} 