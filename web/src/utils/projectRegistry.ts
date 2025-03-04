import { COMPONENT_TO_PROJECT_TYPE } from '@/components/prototypes';

/**
 * 注册项目组件
 * @param projectType 项目类型
 * @param components 组件名称数组
 */
export function registerProjectComponents(projectType: string, components: string[]): void {
  components.forEach(component => {
    COMPONENT_TO_PROJECT_TYPE[component] = projectType;
  });
}

/**
 * 获取组件的项目类型
 * @param componentName 组件名称
 * @returns 项目类型
 */
export function getComponentProjectType(componentName: string): string {
  return COMPONENT_TO_PROJECT_TYPE[componentName] || '';
} 