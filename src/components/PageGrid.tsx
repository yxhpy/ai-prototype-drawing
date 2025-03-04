'use client';

import { useState, useEffect } from 'react';
import { Page } from '@/types';
import PageCard from './PageCard';
import { FiZoomIn, FiZoomOut, FiMaximize, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface PageGridProps {
  pages: Page[];
}

export default function PageGrid({ pages }: PageGridProps) {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPages, setFilteredPages] = useState<Page[]>(pages);

  // 处理搜索过滤
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPages(pages);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredPages(
        pages.filter(
          (page) => 
            page.title.toLowerCase().includes(term) || 
            page.description.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, pages]);

  // 处理缩放
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  // 处理全屏
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`全屏错误: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (pages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiGrid className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-500 text-lg mb-2">暂无页面</p>
          <p className="text-gray-400 text-sm">请选择一个模块查看页面</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-md h-full border border-gray-100 relative">
      {/* 顶部控制栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
        <div className="flex items-center gap-2">
          <FiGrid className="text-blue-500 text-xl" />
          <h2 className="text-xl font-bold text-gray-800">页面列表</h2>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
            {filteredPages.length} 个页面
          </span>
        </div>
        
        {/* 搜索框 */}
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder="搜索页面..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* 视图控制 */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-blue-500' : 'text-gray-500'
              }`}
              title="网格视图"
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${
                viewMode === 'list' ? 'bg-white shadow-sm text-blue-500' : 'text-gray-500'
              }`}
              title="列表视图"
            >
              <FiList size={18} />
            </button>
          </div>
          
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded hover:bg-white hover:shadow-sm text-gray-500 hover:text-blue-500"
              title="缩小"
            >
              <FiZoomOut size={18} />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded hover:bg-white hover:shadow-sm text-gray-500 hover:text-blue-500"
              title="重置缩放"
            >
              <span className="text-xs font-medium">{Math.round(scale * 100)}%</span>
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded hover:bg-white hover:shadow-sm text-gray-500 hover:text-blue-500"
              title="放大"
            >
              <FiZoomIn size={18} />
            </button>
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded bg-gray-100 hover:bg-white hover:shadow-sm text-gray-500 hover:text-blue-500"
            title="全屏"
          >
            <FiMaximize size={18} />
          </button>
        </div>
      </div>

      {/* 页面内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className={`transition-transform duration-200 ease-in-out ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: scale === 1 ? '100%' : `${100 / scale}%`,
              height: scale !== 1 ? `${100 / scale}%` : 'auto',
              marginBottom: scale !== 1 ? `${(scale - 1) * 100}%` : '0'
            }}
          >
            {filteredPages.length > 0 ? (
              filteredPages.map((page) => (
                <div key={page.id} className="flex-grow-0 flex-shrink-0" style={{ width: 'auto', maxWidth: 'none' }}>
                  <PageCard page={page} />
                </div>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <FiRefreshCw className="mx-auto text-gray-400 text-2xl mb-2" />
                  <p className="text-gray-500">没有找到匹配的页面</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-blue-500 hover:underline text-sm"
                  >
                    清除搜索
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 