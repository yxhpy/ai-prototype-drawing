"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = initDb;
exports.getProjects = getProjects;
exports.getProject = getProject;
exports.getProjectModules = getProjectModules;
exports.getModule = getModule;
exports.getModulePages = getModulePages;
exports.getPage = getPage;
exports.getComponent = getComponent;
exports.getProjectComponents = getProjectComponents;
exports.saveComponent = saveComponent;
exports.createProject = createProject;
exports.createModule = createModule;
exports.createPage = createPage;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
// 数据库文件路径
const DB_PATH = path.join(__dirname, '../../data.json');
// 数据库实例
let db = {
    projects: [],
    modules: [],
    pages: [],
    components: [] // 初始化空的组件数组
};
// 保存数据库
async function saveDb() {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
// 初始化数据库
async function initDb() {
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(DB_PATH)) {
                const data = fs.readFileSync(DB_PATH, 'utf-8');
                db = JSON.parse(data);
            }
            else {
                // 如果数据库为空，创建示例数据
                const projectId = (0, uuid_1.v4)();
                const moduleId = (0, uuid_1.v4)();
                const pageId = (0, uuid_1.v4)();
                const componentId = (0, uuid_1.v4)();
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
        }
        catch (error) {
            reject(error);
        }
    });
}
// 获取所有项目
async function getProjects() {
    return db.projects;
}
// 获取特定项目
async function getProject(id) {
    return db.projects.find(p => p.id === id) || null;
}
// 获取项目的所有模块
async function getProjectModules(projectId) {
    return db.modules.filter(m => m.projectId === projectId);
}
// 获取特定模块
async function getModule(id) {
    return db.modules.find(m => m.id === id) || null;
}
// 获取模块的所有页面
async function getModulePages(moduleId) {
    return db.pages.filter(p => p.moduleId === moduleId);
}
// 获取特定页面
async function getPage(id) {
    return db.pages.find(p => p.id === id) || null;
}
// 获取组件代码
async function getComponent(projectType, componentName) {
    return db.components.find(c => c.projectType === projectType && c.componentName === componentName) || null;
}
// 获取项目类型的所有组件
async function getProjectComponents(projectType) {
    return db.components.filter(c => c.projectType === projectType);
}
// 创建或更新组件
async function saveComponent(component) {
    // 查找现有组件
    const existingIndex = db.components.findIndex(c => c.projectType === component.projectType && c.componentName === component.componentName);
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
    const newComponent = {
        id: (0, uuid_1.v4)(),
        ...component,
        createdAt: now,
        updatedAt: now
    };
    db.components.push(newComponent);
    await saveDb();
    return newComponent;
}
// 创建项目
async function createProject(project) {
    const now = new Date().toISOString();
    const newProject = {
        id: (0, uuid_1.v4)(),
        ...project,
        createdAt: now,
        updatedAt: now
    };
    db.projects.push(newProject);
    await saveDb();
    return newProject;
}
// 创建模块
async function createModule(module) {
    const now = new Date().toISOString();
    const newModule = {
        id: (0, uuid_1.v4)(),
        ...module,
        createdAt: now,
        updatedAt: now
    };
    db.modules.push(newModule);
    await saveDb();
    return newModule;
}
// 创建页面
async function createPage(page) {
    const now = new Date().toISOString();
    const newPage = {
        id: (0, uuid_1.v4)(),
        ...page,
        createdAt: now,
        updatedAt: now
    };
    db.pages.push(newPage);
    await saveDb();
    return newPage;
}
