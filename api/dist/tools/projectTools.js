"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTools = void 0;
const projectService_1 = require("../services/projectService");
class ProjectTools {
    constructor() {
        this.projectService = new projectService_1.ProjectService();
    }
    async createProject(params) {
        return this.projectService.createProject(params);
    }
    async getProject(params) {
        return this.projectService.getProject(params.id);
    }
    async getAllProjects() {
        return this.projectService.getAllProjects();
    }
    async updateProject(params) {
        return this.projectService.updateProject(params.id, params.project);
    }
    async deleteProject(params) {
        return this.projectService.deleteProject(params.id);
    }
    async createModule(params) {
        return this.projectService.createModule(params);
    }
    async getModule(params) {
        return this.projectService.getModule(params.id);
    }
    async getProjectModules(params) {
        return this.projectService.getProjectModules(params.project_id);
    }
    async createPage(params) {
        return this.projectService.createPage(params);
    }
    async getPage(params) {
        return this.projectService.getPage(params.id);
    }
    async getModulePages(params) {
        return this.projectService.getModulePages(params.module_id);
    }
}
exports.ProjectTools = ProjectTools;
