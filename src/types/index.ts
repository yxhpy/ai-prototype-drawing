export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  modules: Module[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
  pages: Page[];
}

export interface Page {
  id: string;
  title: string;
  description: string;
  componentPath: string;
} 