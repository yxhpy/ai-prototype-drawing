"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const database_1 = require("./database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// 启用CORS
app.use((0, cors_1.default)());
// 解析JSON请求体
app.use((0, body_parser_1.json)({ limit: '50mb' })); // 增加请求体大小限制，用于大型组件代码
// 初始化数据库
(0, database_1.initDb)().then(() => {
    console.log('数据库初始化成功');
}).catch(err => {
    console.error('数据库初始化失败:', err);
    process.exit(1);
});
// API路由
// 获取所有项目
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await (0, database_1.getProjects)();
        res.json(projects);
    }
    catch (error) {
        console.error('获取项目列表失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 获取特定项目
app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await (0, database_1.getProject)(req.params.id);
        if (!project) {
            return res.status(404).json({ error: '项目不存在' });
        }
        res.json(project);
    }
    catch (error) {
        console.error('获取项目详情失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 获取项目的所有模块
app.get('/api/projects/:projectId/modules', async (req, res) => {
    try {
        const modules = await (0, database_1.getProjectModules)(req.params.projectId);
        res.json(modules);
    }
    catch (error) {
        console.error('获取项目模块失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 获取特定模块
app.get('/api/modules/:id', async (req, res) => {
    try {
        const module = await (0, database_1.getModule)(req.params.id);
        if (!module) {
            return res.status(404).json({ error: '模块不存在' });
        }
        res.json(module);
    }
    catch (error) {
        console.error('获取模块详情失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 获取模块的所有页面
app.get('/api/modules/:moduleId/pages', async (req, res) => {
    try {
        const pages = await (0, database_1.getModulePages)(req.params.moduleId);
        res.json(pages);
    }
    catch (error) {
        console.error('获取模块页面失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 获取特定页面
app.get('/api/pages/:id', async (req, res) => {
    try {
        const page = await (0, database_1.getPage)(req.params.id);
        if (!page) {
            return res.status(404).json({ error: '页面不存在' });
        }
        res.json(page);
    }
    catch (error) {
        console.error('获取页面详情失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 新增: 获取组件代码
app.get('/api/components/:projectType/:componentName', async (req, res) => {
    try {
        const { projectType, componentName } = req.params;
        const component = await (0, database_1.getComponent)(projectType, componentName);
        if (!component) {
            return res.status(404).json({ error: '组件不存在' });
        }
        res.json(component);
    }
    catch (error) {
        console.error('获取组件代码失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 新增: 获取项目类型的所有组件
app.get('/api/components/:projectType', async (req, res) => {
    try {
        const { projectType } = req.params;
        const components = await (0, database_1.getProjectComponents)(projectType);
        res.json(components);
    }
    catch (error) {
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
        const component = await (0, database_1.saveComponent)({
            projectType,
            componentName,
            content
        });
        res.status(201).json(component);
    }
    catch (error) {
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
        const project = await (0, database_1.createProject)({
            name,
            description,
            thumbnail
        });
        res.status(201).json(project);
    }
    catch (error) {
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
        const module = await (0, database_1.createModule)({
            projectId,
            name,
            description
        });
        res.status(201).json(module);
    }
    catch (error) {
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
        const page = await (0, database_1.createPage)({
            moduleId,
            name,
            description,
            componentPath
        });
        res.status(201).json(page);
    }
    catch (error) {
        console.error('创建页面失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});
// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
