'use client';

import dynamic from 'next/dynamic';
import { Suspense, memo } from 'react';
import ZoomablePrototype from './ZoomablePrototype';

interface PrototypeLoaderProps {
  componentPath: string;
}

// 使用memo包装组件，避免不必要的重新渲染
const PrototypeLoader = memo(function PrototypeLoader({ componentPath }: PrototypeLoaderProps) {
  // 根据项目类型确定组件路径
  const getProjectType = (componentName: string): string => {
    // 视频生成项目组件
    const videoGenerationComponents = [
      'ScriptGenerationPage',
      'ResourceListPage',
      'ResourceUploadPage',
      'VoiceoverMatchingPage',
      'MusicListPage',
      'MusicUploadPage',
      'TransitionEffectsPage',
      'VideoGenerationPage'
    ];
    
    // 用户认证项目组件
    const userAuthComponents = [
      'LoginPage',
      'RegisterPage'
    ];
    
    // 产品相关项目组件
    const productComponents = [
      'ProductListPage'
    ];
    
    if (videoGenerationComponents.includes(componentName)) {
      return 'video-generation';
    } else if (userAuthComponents.includes(componentName)) {
      return 'user-auth';
    } else if (productComponents.includes(componentName)) {
      return 'product';
    }
    
    // 默认返回空，表示组件在根目录
    return '';
  };
  
  // 构建完整的组件路径
  const fullComponentPath = (() => {
    const projectType = getProjectType(componentPath);
    return projectType ? `${projectType}/${componentPath}` : componentPath;
  })();
  
  // 动态导入组件，但使用componentPath作为key，确保相同路径的组件只加载一次
  const DynamicComponent = dynamic(
    () => import(`@/components/prototypes/${fullComponentPath}`),
    {
      loading: () => (
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">加载中...</p>
          </div>
        </div>
      ),
      ssr: false,
    }
  );

  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">加载中...</p>
          </div>
        </div>
      }
    >
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <ZoomablePrototype>
          <DynamicComponent />
        </ZoomablePrototype>
      </div>
    </Suspense>
  );
});

// 添加displayName以便于调试
PrototypeLoader.displayName = 'PrototypeLoader';

export default PrototypeLoader; 