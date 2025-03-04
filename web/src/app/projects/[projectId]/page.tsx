'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Project, Module, Page } from '@/types';
import ModuleList from '@/components/ModuleList';
import PageGrid from '@/components/PageGrid';
import Link from 'next/link';
import { FiArrowLeft, FiInfo, FiGrid, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { fetchProject, fetchProjectModules, fetchModulePages } from '@/services/api';

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activePages, setActivePages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 加载项目数据
  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId || typeof projectId !== 'string') {
        setLoading(false);
        setError('无效的项目ID');
        return;
      }

      try {
        setLoading(true);
        // 获取项目详情
        const projectData = await fetchProject(projectId);
        setProject(projectData);
        
        // 获取项目的模块
        const modulesData = await fetchProjectModules(projectId);
        setModules(modulesData);
        
        if (modulesData.length > 0) {
          setActiveModuleId(modulesData[0].id);
          
          // 获取第一个模块的页面
          const pagesData = await fetchModulePages(modulesData[0].id);
          setActivePages(pagesData);
        }
        
        setError(null);
      } catch (err) {
        console.error('加载项目数据失败:', err);
        setError('无法加载项目数据，请稍后再试');
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [projectId]);

  // 使用useCallback缓存模块选择函数
  const handleModuleSelect = useCallback(async (moduleId: string) => {
    setActiveModuleId(moduleId);
    try {
      setActivePages([]); // 清空当前页面，显示加载状态
      const pages = await fetchModulePages(moduleId);
      setActivePages(pages);
    } catch (err) {
      console.error('加载模块页面失败:', err);
      setActivePages([]);
    }
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiInfo className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || '项目未找到'}</h2>
          <p className="text-gray-600 mb-6">
            抱歉，您请求的项目不存在或加载失败。
          </p>
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  // 为项目标题生成随机渐变背景色
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-indigo-500 to-purple-600',
    'from-purple-500 to-pink-600',
    'from-teal-500 to-green-600',
  ];
  const gradientIndex = project.id.charCodeAt(project.id.length - 1) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div className="min-h-screen">
      {/* 项目标题区域 */}
      <div className={`bg-gradient-to-r ${gradient} text-white py-8`}>
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white">
            <FiArrowLeft className="mr-2" />
            返回项目列表
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold">{project.name}</h1>
            <p className="text-white/80 mt-2 max-w-3xl">{project.description}</p>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                <FiLayers />
                <span>{modules.length} 个模块</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto p-4 max-w-screen-2xl my-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ModuleList
              modules={modules}
              activeModuleId={activeModuleId}
              onModuleSelect={handleModuleSelect}
            />
          </motion.div>
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PageGrid pages={activePages} projectType={project.id.split('-')[0] || project.id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 