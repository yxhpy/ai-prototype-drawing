'use client';

import { Page } from '@/types';
import { motion } from 'framer-motion';
import { FiMaximize2, FiInfo, FiCode, FiMinimize2 } from 'react-icons/fi';
import { useState, useRef } from 'react';
import PrototypeLoader from './PrototypeLoader';

interface PageCardProps {
  page: Page;
  projectType: string;
}

export default function PageCard({ page, projectType }: PageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 ${expanded ? 'fixed top-0 left-0 w-full h-full z-50 rounded-none shadow-2xl' : 'h-full'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 border-b flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{page.name}</h3>
          <p className="text-gray-600 mt-1 text-sm">{page.description}</p>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-500 transition-colors"
            title="显示信息"
          >
            <FiInfo size={16} />
          </button>
          <button 
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-500 transition-colors"
            title="查看代码"
          >
            <FiCode size={16} />
          </button>
        </div>
        <button 
          onClick={toggleExpand}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
          aria-label={expanded ? "最小化" : "全屏查看"}
        >
          {expanded ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
        </button>
      </div>
      
      {showInfo && (
        <div className="p-3 bg-blue-50 border-b border-blue-100">
          <div className="text-xs text-blue-700">
            <p><strong>页面ID:</strong> {page.id}</p>
            <p className="mt-1"><strong>模块ID:</strong> {page.moduleId}</p>
            <p className="mt-1"><strong>创建时间:</strong> {page.createdAt ? new Date(page.createdAt).toLocaleString() : '未知'}</p>
          </div>
        </div>
      )}
      
      <div className={`${expanded ? 'h-[calc(100vh-64px)]' : 'h-[400px]'} transition-all duration-300 ease-in-out`}>
        <PrototypeLoader 
          componentPath={page.componentPath || ''} 
          projectType={projectType}
        />
      </div>
    </motion.div>
  );
} 