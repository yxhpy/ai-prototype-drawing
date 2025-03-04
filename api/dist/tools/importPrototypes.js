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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const database_1 = require("../database");
// 前端项目的路径配置
const FRONTEND_DIR = path.resolve(__dirname, '../../../web');
const PROTOTYPES_DIR = path.join(FRONTEND_DIR, 'src/components/prototypes');
// 读取目录下的所有组件
async function readComponentsDir(dir) {
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
                        await (0, database_1.saveComponent)({
                            projectType,
                            componentName,
                            content
                        });
                        console.log(`导入组件: ${projectType}/${componentName}`);
                    }
                    catch (error) {
                        console.error(`导入组件 ${projectType}/${componentName} 失败:`, error);
                    }
                }
            }
        }
    }
}
// 主函数：导入所有原型组件
async function importAllPrototypes() {
    try {
        // 初始化数据库
        await (0, database_1.initDb)();
        console.log('开始导入原型组件...');
        // 读取所有项目类型目录
        await readComponentsDir(PROTOTYPES_DIR);
        console.log('原型组件导入完成');
    }
    catch (error) {
        console.error('导入原型组件失败:', error);
        process.exit(1);
    }
}
// 立即执行导入
importAllPrototypes();
