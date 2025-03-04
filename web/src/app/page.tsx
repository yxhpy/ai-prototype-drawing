'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '@/services/api';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import { motion } from 'framer-motion';
import { FiLayers, FiLayout, FiCode } from 'react-icons/fi';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('加载项目失败:', err);
        setError('无法加载项目列表，请稍后再试');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">产品原型展示平台</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              浏览和查看各种产品的原型设计，提升团队协作效率
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#projects" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
                浏览项目
              </a>
              <a href="#features" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                了解功能
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 特性区域 */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">平台特性</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们的平台提供了丰富的功能，帮助您更好地展示和管理产品原型
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FiLayout size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">直观的界面</h3>
              <p className="text-gray-600">
                简洁明了的界面设计，让您轻松浏览和查看各种产品原型
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FiLayers size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">模块化组织</h3>
              <p className="text-gray-600">
                通过项目和模块的层级结构，有效组织和管理您的原型设计
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FiCode size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">实时预览</h3>
              <p className="text-gray-600">
                支持实时预览和交互，让您的原型设计更加生动和直观
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 项目列表 */}
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">浏览项目</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              查看我们的项目列表，发现精彩的原型设计
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                重试
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">暂无项目</p>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
