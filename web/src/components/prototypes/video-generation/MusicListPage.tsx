'use client';

import { useState } from 'react';
import { FiMusic, FiSearch, FiFilter, FiPlus, FiTrash2, FiEdit, FiPlay, FiPause } from 'react-icons/fi';

// 模拟数据
const mockMusic = [
  { id: 1, title: '轻松愉快', description: '适合产品展示和介绍视频', duration: '2:45', category: '欢快', dateAdded: '2023-10-15' },
  { id: 2, title: '科技感十足', description: '适合科技产品和创新主题', duration: '3:12', category: '科技', dateAdded: '2023-10-14' },
  { id: 3, title: '舒缓背景乐', description: '适合叙事和解说视频', duration: '4:05', category: '舒缓', dateAdded: '2023-10-13' },
  { id: 4, title: '激励人心', description: '适合励志和成功故事', duration: '2:58', category: '激励', dateAdded: '2023-10-12' },
  { id: 5, title: '企业商务', description: '适合企业宣传和商务介绍', duration: '3:30', category: '商务', dateAdded: '2023-10-11' },
  { id: 6, title: '自然氛围', description: '适合自然和环保主题', duration: '3:45', category: '自然', dateAdded: '2023-10-10' },
];

export default function MusicListPage() {
  const [music, setMusic] = useState(mockMusic);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedMusic, setSelectedMusic] = useState<number[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);

  // 获取所有分类
  const categories = ['all', ...Array.from(new Set(music.map(item => item.category)))];

  // 过滤音乐
  const filteredMusic = music.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // 选择/取消选择音乐
  const toggleMusicSelection = (id: number) => {
    setSelectedMusic(prev => 
      prev.includes(id) 
        ? prev.filter(musicId => musicId !== id)
        : [...prev, id]
    );
  };

  // 删除选中的音乐
  const deleteSelectedMusic = () => {
    setMusic(prev => prev.filter(item => !selectedMusic.includes(item.id)));
    setSelectedMusic([]);
  };

  // 播放/暂停音乐
  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">背景音乐库</h1>
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            onClick={() => {/* 导航到添加音乐页面 */}}
          >
            <FiPlus className="mr-2" />
            添加音乐
          </button>
          {selectedMusic.length > 0 && (
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              onClick={deleteSelectedMusic}
            >
              <FiTrash2 className="mr-2" />
              删除所选 ({selectedMusic.length})
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
            placeholder="搜索音乐..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filterCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilterCategory(category)}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                音乐
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时长
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                添加日期
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMusic.map(item => (
              <tr 
                key={item.id}
                className={`hover:bg-gray-50 ${selectedMusic.includes(item.id) ? 'bg-blue-50' : ''}`}
                onClick={() => toggleMusicSelection(item.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button 
                      className="mr-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(item.id);
                      }}
                    >
                      {playingId === item.id ? <FiPause /> : <FiPlay />}
                    </button>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.dateAdded}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        // 编辑音乐
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMusic(prev => prev.filter(m => m.id !== item.id));
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredMusic.length === 0 && (
        <div className="text-center py-12">
          <FiMusic className="mx-auto text-gray-400 text-5xl mb-4" />
          <p className="text-gray-500">没有找到匹配的音乐</p>
        </div>
      )}
    </div>
  );
} 