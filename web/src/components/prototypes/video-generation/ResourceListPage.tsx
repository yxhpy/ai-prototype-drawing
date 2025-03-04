'use client';

import { useState } from 'react';
import { FiImage, FiVideo, FiSearch, FiFilter, FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

// 模拟数据
const mockResources = [
  { id: 1, title: '城市天际线', type: 'image', description: '现代城市高楼大厦天际线', url: '/images/resources/skyline.jpg', tags: ['城市', '建筑', '天际线'], dateAdded: '2023-10-15' },
  { id: 2, title: '自然风景', type: 'image', description: '山川湖泊自然风景', url: '/images/resources/nature.jpg', tags: ['自然', '风景', '山水'], dateAdded: '2023-10-14' },
  { id: 3, title: '商务会议', type: 'video', description: '专业商务会议场景', url: '/videos/resources/meeting.mp4', tags: ['商务', '会议', '专业'], dateAdded: '2023-10-13' },
  { id: 4, title: '科技产品展示', type: 'video', description: '最新科技产品展示视频', url: '/videos/resources/tech.mp4', tags: ['科技', '产品', '展示'], dateAdded: '2023-10-12' },
  { id: 5, title: '抽象背景', type: 'image', description: '彩色抽象艺术背景', url: '/images/resources/abstract.jpg', tags: ['抽象', '艺术', '背景'], dateAdded: '2023-10-11' },
  { id: 6, title: '人物特写', type: 'image', description: '专业人物肖像特写', url: '/images/resources/portrait.jpg', tags: ['人物', '肖像', '特写'], dateAdded: '2023-10-10' },
];

export default function ResourceListPage() {
  const [resources, setResources] = useState(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [selectedResources, setSelectedResources] = useState<number[]>([]);

  // 过滤资源
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || resource.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // 选择/取消选择资源
  const toggleResourceSelection = (id: number) => {
    setSelectedResources(prev => 
      prev.includes(id) 
        ? prev.filter(resourceId => resourceId !== id)
        : [...prev, id]
    );
  };

  // 删除选中的资源
  const deleteSelectedResources = () => {
    setResources(prev => prev.filter(resource => !selectedResources.includes(resource.id)));
    setSelectedResources([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">资源库</h1>
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            onClick={() => {/* 导航到添加资源页面 */}}
          >
            <FiPlus className="mr-2" />
            添加资源
          </button>
          {selectedResources.length > 0 && (
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              onClick={deleteSelectedResources}
            >
              <FiTrash2 className="mr-2" />
              删除所选 ({selectedResources.length})
            </button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="搜索资源..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md flex items-center ${
              filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setFilterType('all')}
          >
            <FiFilter className="mr-2" />
            全部
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center ${
              filterType === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setFilterType('image')}
          >
            <FiImage className="mr-2" />
            图片
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center ${
              filterType === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setFilterType('video')}
          >
            <FiVideo className="mr-2" />
            视频
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div 
            key={resource.id} 
            className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
              selectedResources.includes(resource.id) ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => toggleResourceSelection(resource.id)}
          >
            <div className="relative h-48 bg-gray-100">
              {resource.type === 'image' ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FiImage className="text-gray-400 text-4xl" />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FiVideo className="text-gray-400 text-4xl" />
                </div>
              )}
              <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {resource.type === 'image' ? '图片' : '视频'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-800">{resource.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
              
              <div className="flex flex-wrap mt-2">
                {resource.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>添加于: {resource.dateAdded}</span>
                <div className="flex space-x-2">
                  <button className="p-1 hover:text-blue-500">
                    <FiEdit />
                  </button>
                  <button className="p-1 hover:text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到匹配的资源</p>
        </div>
      )}
    </div>
  );
} 