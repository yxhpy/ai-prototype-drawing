import { Project, Module, Page } from '@/types';

const API_URL = 'http://localhost:3001/api';

// 获取所有项目
export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error('获取项目列表失败');
  }
  return response.json();
}

// 获取特定项目
export async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`${API_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error('获取项目详情失败');
  }
  return response.json();
}

// 获取项目的所有模块
export async function fetchProjectModules(projectId: string): Promise<Module[]> {
  const response = await fetch(`${API_URL}/projects/${projectId}/modules`);
  if (!response.ok) {
    throw new Error('获取模块列表失败');
  }
  return response.json();
}

// 获取特定模块
export async function fetchModule(id: string): Promise<Module> {
  const response = await fetch(`${API_URL}/modules/${id}`);
  if (!response.ok) {
    throw new Error('获取模块详情失败');
  }
  return response.json();
}

// 获取模块的所有页面
export async function fetchModulePages(moduleId: string): Promise<Page[]> {
  const response = await fetch(`${API_URL}/modules/${moduleId}/pages`);
  if (!response.ok) {
    throw new Error('获取页面列表失败');
  }
  return response.json();
}

// 获取特定页面
export async function fetchPage(id: string): Promise<Page> {
  const response = await fetch(`${API_URL}/pages/${id}`);
  if (!response.ok) {
    throw new Error('获取页面详情失败');
  }
  return response.json();
}

// 获取组件代码
export async function fetchComponentCode(projectType: string, componentName: string): Promise<string> {
  const response = await fetch(`${API_URL}/components/${projectType}/${componentName}`);
  if (!response.ok) {
    throw new Error('获取组件代码失败');
  }
  const data = await response.json();
  return data.content;
}

// 获取项目类型的所有组件
export interface ComponentInfo {
  id: string;
  projectType: string;
  componentName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchProjectComponents(projectType: string): Promise<ComponentInfo[]> {
  const response = await fetch(`${API_URL}/components/${projectType}`);
  if (!response.ok) {
    throw new Error('获取项目组件列表失败');
  }
  return response.json();
}

// 保存组件代码
export async function saveComponentCode(projectType: string, componentName: string, content: string): Promise<ComponentInfo> {
  const response = await fetch(`${API_URL}/components`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectType,
      componentName,
      content
    }),
  });
  
  if (!response.ok) {
    throw new Error('保存组件代码失败');
  }
  
  return response.json();
}

// 创建项目
export async function createProject(name: string, description: string, thumbnail?: string): Promise<Project> {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      thumbnail
    }),
  });
  
  if (!response.ok) {
    throw new Error('创建项目失败');
  }
  
  return response.json();
}

// 创建模块
export async function createModule(projectId: string, name: string, description: string): Promise<Module> {
  const response = await fetch(`${API_URL}/modules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      name,
      description
    }),
  });
  
  if (!response.ok) {
    throw new Error('创建模块失败');
  }
  
  return response.json();
}

// 创建页面
export async function createPage(moduleId: string, name: string, description: string, componentPath: string): Promise<Page> {
  const response = await fetch(`${API_URL}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      moduleId,
      name,
      description,
      componentPath
    }),
  });
  
  if (!response.ok) {
    throw new Error('创建页面失败');
  }
  
  return response.json();
} 