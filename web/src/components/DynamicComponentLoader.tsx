'use client';

import { useState, useEffect } from 'react';
import { fetchComponentCode } from '@/services/api';
import dynamic from 'next/dynamic';

interface DynamicComponentLoaderProps {
  projectType: string;
  componentName: string;
}

// 组件代码缓存
const componentCache: Record<string, React.ComponentType<any>> = {};

/**
 * 动态组件加载器
 * 从API获取组件代码并动态渲染
 */
export default function DynamicComponentLoader({ projectType, componentName }: DynamicComponentLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  
  const cacheKey = `${projectType}/${componentName}`;

  useEffect(() => {
    // 如果组件已在缓存中，直接使用缓存
    if (componentCache[cacheKey]) {
      setComponent(componentCache[cacheKey]);
      setLoading(false);
      return;
    }
    
    // 否则从API获取组件代码
    const loadComponent = async () => {
      try {
        setLoading(true);
        
        // 从API获取组件代码
        const componentCode = await fetchComponentCode(projectType, componentName);
        
        if (!componentCode) {
          setError('组件代码不存在');
          setLoading(false);
          return;
        }
        
        // 使用动态导入创建组件
        const DynamicComponent = createDynamicComponent(componentCode);
        
        // 将组件添加到缓存
        componentCache[cacheKey] = DynamicComponent;
        
        // 设置组件
        setComponent(DynamicComponent);
        setError(null);
      } catch (err) {
        console.error('加载组件失败:', err);
        setError('无法加载组件');
      } finally {
        setLoading(false);
      }
    };
    
    loadComponent();
  }, [projectType, componentName, cacheKey]);
  
  if (loading) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">加载组件中...</p>
      </div>
    );
  }
  
  if (error || !Component) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-medium text-red-600 mb-2">加载失败</h3>
        <p className="text-red-500">{error || '组件无法加载'}</p>
      </div>
    );
  }
  
  // 渲染组件
  return <Component />;
}

/**
 * 从字符串创建动态组件
 */
function createDynamicComponent(componentCode: string): React.ComponentType<any> {
  // 创建一个虚拟的动态导入函数
  const importFunc = () => {
    return new Promise((resolve) => {
      try {
        // 使用Function构造函数创建一个模块工厂函数
        const moduleFactory = new Function(
          'React', 
          'useState', 
          'useEffect', 
          'useRef', 
          'useMemo', 
          'useCallback',
          'module', 
          'exports', 
          'require', 
          `${componentCode}; return module.exports;`
        );
        
        // 创建一个模块对象
        const module = { exports: {} };
        
        // 导入React相关库
        const React = require('react');
        const { useState, useEffect, useRef, useMemo, useCallback } = React;
        
        // 执行模块工厂函数，获取组件
        const exports = moduleFactory(
          React, 
          useState, 
          useEffect, 
          useRef, 
          useMemo, 
          useCallback,
          module, 
          module.exports, 
          require
        );
        
        // 解析默认导出
        const Component = exports.default || exports;
        
        resolve({ default: Component });
      } catch (error) {
        console.error('解析组件代码失败:', error);
        // 返回一个错误组件
        resolve({
          default: () => (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-medium text-red-600 mb-2">组件解析失败</h3>
              <p className="text-red-500">无法解析组件代码</p>
              <details className="mt-2">
                <summary className="text-sm text-red-500 cursor-pointer">查看错误</summary>
                <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                  {String(error)}
                </pre>
              </details>
            </div>
          )
        });
      }
    });
  };
  
  // 使用Next.js的dynamic创建动态组件
  return dynamic(importFunc, {
    loading: () => (
      <div className="p-4 flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    ssr: false, // 禁用服务端渲染
  });
} 