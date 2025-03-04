'use client';

import { Page } from '@/types';
import PrototypeLoader from './PrototypeLoader';
import { motion } from 'framer-motion';
import { FiMaximize2, FiInfo } from 'react-icons/fi';
import { useState, useRef } from 'react';

interface PageCardProps {
  page: Page;
}

export default function PageCard({ page }: PageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const prototypeRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 border-b flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{page.title}</h3>
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
            title="全屏查看"
          >
            <FiMaximize2 size={16} />
          </button>
        </div>
      </div>
      
      {showInfo && (
        <div className="p-3 bg-blue-50 border-b border-blue-100">
          <div className="text-xs text-blue-700">
            <p><strong>组件路径:</strong> {page.componentPath}</p>
            <p className="mt-1"><strong>页面ID:</strong> {page.id}</p>
          </div>
        </div>
      )}
      
      <div className="relative">
        <div className="p-4" ref={prototypeRef}>
          <div className="w-full">
            <PrototypeLoader componentPath={page.componentPath} />
          </div>
        </div>
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </motion.div>
  );
} 