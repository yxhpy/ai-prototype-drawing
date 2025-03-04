"use strict";
// 这个文件不再需要，功能已经迁移到database模块中
// 保留此文件作为备份
// import { v4 as uuidv4 } from 'uuid';
// import { getDb, updateDb } from '../database';
// 项目类型定义
/*
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  projectId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export class ProjectService {
  // 创建新项目
  createProject(name: string, description: string): Project {
    const db = getDb();
    
    const project: Project = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.projects.push(project);
    updateDb(db);
    
    return project;
  }
  
  // 获取所有项目
  getAllProjects(): Project[] {
    const db = getDb();
    return db.projects;
  }
  
  // 获取特定项目
  getProject(id: string): Project | undefined {
    const db = getDb();
    return db.projects.find(p => p.id === id);
  }
  
  // 更新项目
  updateProject(id: string, name: string, description: string): Project | undefined {
    const db = getDb();
    const project = db.projects.find(p => p.id === id);
    
    if (!project) {
      return undefined;
    }
    
    project.name = name;
    project.description = description;
    project.updatedAt = new Date().toISOString();
    
    updateDb(db);
    
    return project;
  }
  
  // 删除项目
  deleteProject(id: string): boolean {
    const db = getDb();
    const index = db.projects.findIndex(p => p.id === id);
    
    if (index === -1) {
      return false;
    }
    
    db.modules = db.modules.filter(m => m.projectId !== id);
    db.pages = db.pages.filter(p => !db.modules.some(m => m.id === p.moduleId && m.projectId === id));
    db.projects.splice(index, 1);
    
    updateDb(db);
    
    return true;
  }
  
  // 创建模块
  createModule(projectId: string, name: string, description: string): Module {
    const db = getDb();
    
    const module: Module = {
      id: uuidv4(),
      projectId,
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.modules.push(module);
    updateDb(db);
    
    return module;
  }
  
  // 获取模块
  getModule(id: string): Module | undefined {
    const db = getDb();
    return db.modules.find(m => m.id === id);
  }
  
  // 获取项目的所有模块
  getProjectModules(projectId: string): Module[] {
    const db = getDb();
    return db.modules.filter(m => m.projectId === projectId);
  }
  
  // 创建页面
  createPage(moduleId: string, name: string, description: string, content: string): Page {
    const db = getDb();
    
    const page: Page = {
      id: uuidv4(),
      moduleId,
      name,
      description,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.pages.push(page);
    updateDb(db);
    
    return page;
  }
  
  // 获取页面
  getPage(id: string): Page | undefined {
    const db = getDb();
    return db.pages.find(p => p.id === id);
  }
  
  // 获取模块的所有页面
  getModulePages(moduleId: string): Page[] {
    const db = getDb();
    return db.pages.filter(p => p.moduleId === moduleId);
  }
}
*/ 
