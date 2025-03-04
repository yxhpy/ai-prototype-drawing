export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
  modules?: Module[];
}

export interface Module {
  id: string;
  projectId: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  pages?: Page[];
}

export interface Page {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  componentPath?: string; // 用于前端渲染
} 