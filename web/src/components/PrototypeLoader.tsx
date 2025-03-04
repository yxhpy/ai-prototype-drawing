'use client';

import { useMemo } from 'react';
import DynamicComponentLoader from './DynamicComponentLoader';

interface PrototypeLoaderProps {
  projectType: string;
  componentPath: string;
}

/**
 * 原型加载器
 * 负责加载并显示原型组件
 */
export default function PrototypeLoader({ projectType, componentPath }: PrototypeLoaderProps) {
  const componentName = useMemo(() => {
    return componentPath || '';
  }, [componentPath]);

  if (!componentName) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-500 text-center">无效的组件路径</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white h-full">
      <DynamicComponentLoader
        projectType={projectType}
        componentName={componentName}
      />
    </div>
  );
} 