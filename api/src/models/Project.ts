export interface Project {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Module {
  id: string;
  project_id: string;
  name: string;
  description?: string;
  created_at?: string;
}

export interface Page {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  component_path: string;
  component_code: string;
  created_at?: string;
} 