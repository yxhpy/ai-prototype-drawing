'use client';

import { Module } from '@/types';
import { useState } from 'react';
import { FiFolder, FiChevronRight, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleListProps {
  modules: Module[];
  activeModuleId: string | null;
  onModuleSelect: (moduleId: string) => void;
}

export default function ModuleList({ 
  modules, 
  activeModuleId, 
  onModuleSelect 
}: ModuleListProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md h-full border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <FiLayers className="text-blue-500 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">模块列表</h2>
      </div>
      
      <div className="space-y-3">
        {modules.map((module) => (
          <ModuleItem 
            key={module.id} 
            module={module} 
            isActive={activeModuleId === module.id}
            onSelect={() => onModuleSelect(module.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface ModuleItemProps {
  module: Module;
  isActive: boolean;
  onSelect: () => void;
}

function ModuleItem({ module, isActive, onSelect }: ModuleItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onSelect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all duration-200 ${
          isActive
            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
            : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'
        }`}
      >
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
        }`}>
          <FiFolder size={20} />
        </div>
        
        <div className="flex-grow">
          <div className="font-medium">{module.name}</div>
          <div className={`text-sm ${
            isActive ? 'text-blue-500' : 'text-gray-500'
          }`}>
            {module.pages.length} 个页面
          </div>
        </div>
        
        <FiChevronRight 
          className={`transition-transform duration-300 ${isActive || isHovered ? 'translate-x-1' : ''} ${
            isActive ? 'text-blue-500' : 'text-gray-400'
          }`} 
        />
      </button>
    </motion.div>
  );
} 