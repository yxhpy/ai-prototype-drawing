'use client';

import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit, FiPlay, FiCheck, FiX } from 'react-icons/fi';

// 模拟数据
const mockTransitions = [
  { id: 1, name: '淡入淡出', description: '平滑的淡入淡出效果', duration: 1.5, isDefault: true },
  { id: 2, name: '左右滑动', description: '从右向左滑动切换', duration: 1.0, isDefault: false },
  { id: 3, name: '上下滑动', description: '从下向上滑动切换', duration: 1.0, isDefault: false },
  { id: 4, name: '缩放', description: '缩小淡出，放大淡入', duration: 1.2, isDefault: false },
  { id: 5, name: '旋转', description: '旋转切换效果', duration: 1.5, isDefault: false },
  { id: 6, name: '百叶窗', description: '百叶窗切换效果', duration: 1.8, isDefault: false },
];

interface Transition {
  id: number;
  name: string;
  description: string;
  duration: number;
  isDefault: boolean;
}

export default function TransitionEffectsPage() {
  const [transitions, setTransitions] = useState<Transition[]>(mockTransitions);
  const [editingTransition, setEditingTransition] = useState<Transition | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTransition, setNewTransition] = useState<Omit<Transition, 'id'>>({
    name: '',
    description: '',
    duration: 1.0,
    isDefault: false,
  });
  const [previewingId, setPreviewingId] = useState<number | null>(null);

  // 设置默认转场
  const setDefaultTransition = (id: number) => {
    setTransitions(transitions.map(transition => ({
      ...transition,
      isDefault: transition.id === id,
    })));
  };

  // 删除转场
  const deleteTransition = (id: number) => {
    // 不允许删除默认转场
    if (transitions.find(t => t.id === id)?.isDefault) {
      alert('不能删除默认转场效果，请先设置其他转场为默认');
      return;
    }
    
    setTransitions(transitions.filter(transition => transition.id !== id));
  };

  // 开始编辑转场
  const startEditing = (transition: Transition) => {
    setEditingTransition(transition);
  };

  // 保存编辑
  const saveEditing = () => {
    if (!editingTransition) return;
    
    setTransitions(transitions.map(transition => 
      transition.id === editingTransition.id ? editingTransition : transition
    ));
    
    setEditingTransition(null);
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingTransition(null);
  };

  // 添加新转场
  const addTransition = () => {
    if (!newTransition.name || !newTransition.description) {
      alert('请填写转场名称和描述');
      return;
    }
    
    const newId = Math.max(0, ...transitions.map(t => t.id)) + 1;
    
    const transitionToAdd = {
      ...newTransition,
      id: newId,
    };
    
    setTransitions([...transitions, transitionToAdd]);
    
    // 如果设置为默认，更新其他转场
    if (newTransition.isDefault) {
      setTransitions(prev => prev.map(transition => ({
        ...transition,
        isDefault: transition.id === newId,
      })));
    }
    
    // 重置表单
    setNewTransition({
      name: '',
      description: '',
      duration: 1.0,
      isDefault: false,
    });
    
    setIsAdding(false);
  };

  // 预览转场
  const previewTransition = (id: number) => {
    setPreviewingId(id);
    
    // 模拟预览结束
    setTimeout(() => {
      setPreviewingId(null);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">转场动画管理</h1>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          onClick={() => setIsAdding(true)}
        >
          <FiPlus className="mr-2" />
          添加转场
        </button>
      </div>
      
      {/* 转场列表 */}
      <div className="overflow-hidden border rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                转场名称
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                描述
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时长 (秒)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                默认
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transitions.map(transition => (
              <tr key={transition.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTransition?.id === transition.id ? (
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      value={editingTransition.name}
                      onChange={(e) => setEditingTransition({...editingTransition, name: e.target.value})}
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{transition.name}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingTransition?.id === transition.id ? (
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      value={editingTransition.description}
                      onChange={(e) => setEditingTransition({...editingTransition, description: e.target.value})}
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{transition.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTransition?.id === transition.id ? (
                    <input
                      type="number"
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                      value={editingTransition.duration}
                      min="0.1"
                      step="0.1"
                      onChange={(e) => setEditingTransition({...editingTransition, duration: parseFloat(e.target.value) || 1.0})}
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{transition.duration}秒</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTransition?.id === transition.id ? (
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={editingTransition.isDefault}
                      onChange={(e) => setEditingTransition({...editingTransition, isDefault: e.target.checked})}
                    />
                  ) : (
                    <div>
                      {transition.isDefault ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          默认
                        </span>
                      ) : (
                        <button
                          className="text-xs text-blue-600 hover:text-blue-900"
                          onClick={() => setDefaultTransition(transition.id)}
                        >
                          设为默认
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingTransition?.id === transition.id ? (
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={saveEditing}
                      >
                        <FiCheck />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={cancelEditing}
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => previewTransition(transition.id)}
                      >
                        {previewingId === transition.id ? (
                          <span className="text-xs">预览中...</span>
                        ) : (
                          <FiPlay />
                        )}
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => startEditing(transition)}
                      >
                        <FiEdit />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteTransition(transition.id)}
                        disabled={transition.isDefault}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 添加新转场表单 */}
      {isAdding && (
        <div className="border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">添加新转场</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                转场名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入转场名称"
                value={newTransition.name}
                onChange={(e) => setNewTransition({...newTransition, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                转场时长 (秒)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入转场时长"
                value={newTransition.duration}
                min="0.1"
                step="0.1"
                onChange={(e) => setNewTransition({...newTransition, duration: parseFloat(e.target.value) || 1.0})}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                转场描述 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入转场描述"
                value={newTransition.description}
                onChange={(e) => setNewTransition({...newTransition, description: e.target.value})}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  checked={newTransition.isDefault}
                  onChange={(e) => setNewTransition({...newTransition, isDefault: e.target.checked})}
                />
                <span className="text-sm text-gray-700">设为默认转场</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setIsAdding(false);
                setNewTransition({
                  name: '',
                  description: '',
                  duration: 1.0,
                  isDefault: false,
                });
              }}
            >
              取消
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={addTransition}
            >
              添加
            </button>
          </div>
        </div>
      )}
      
      {/* 预览区域 */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4">转场效果预览</h2>
        
        <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
          {previewingId ? (
            <div className="text-center">
              <div className="animate-pulse text-blue-500 text-lg mb-2">
                正在预览: {transitions.find(t => t.id === previewingId)?.name}
              </div>
              <div className="text-gray-500">
                转场效果演示中...
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              点击转场旁边的播放按钮预览效果
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 