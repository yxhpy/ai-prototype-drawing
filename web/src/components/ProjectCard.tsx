'use client';

import { Project } from '@/types';
import Link from 'next/link';
import { FiFolder, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 生成随机渐变背景色
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-indigo-500 to-purple-600',
    'from-purple-500 to-pink-600',
    'from-pink-500 to-red-600',
    'from-red-500 to-orange-600',
    'from-orange-500 to-yellow-600',
    'from-teal-500 to-green-600',
  ];
  
  // 使用项目ID的哈希值来确定渐变色，确保同一项目始终使用相同的渐变色
  const gradientIndex = project.id.charCodeAt(project.id.length - 1) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <Link href={`/projects/${project.id}`}>
      <div 
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`h-48 w-full bg-gradient-to-r ${gradient} flex items-center justify-center p-6 transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.name} 
              className="object-cover h-full w-full"
            />
          ) : (
            <div className="text-5xl font-bold text-white opacity-90 flex items-center gap-3">
              <span>{project.name.charAt(0)}</span>
              {isHovered && <FiArrowRight className="animate-pulse" />}
            </div>
          )}
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
            <div className="flex items-center gap-1">
              <FiFolder className="text-blue-500" />
              <span>查看模块</span>
            </div>
            <div className="text-blue-500 font-medium flex items-center gap-1 transition-all duration-300 transform">
              <span>查看详情</span>
              <FiArrowRight className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 