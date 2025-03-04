'use client';

import { useState } from 'react';
import { FiImage, FiVideo, FiPlus, FiTrash2, FiArrowUp, FiArrowDown, FiPlay, FiPause } from 'react-icons/fi';

// 模拟数据
const mockScript = `# 人工智能在视频制作中的应用

## 引言
人工智能正在彻底改变视频制作的方式。从自动剪辑到内容生成，AI工具正在使创作者能够更快、更高效地工作。

## 主要应用
- 自动脚本生成：AI可以基于关键词生成完整的视频脚本
- 智能剪辑：自动识别最佳片段并组合
- 语音合成：将文本转换为自然的语音旁白

## 未来展望
随着技术的进步，我们可以期待更多创新功能的出现，进一步简化视频制作流程。`;

const mockResources = [
  { id: 1, title: '城市天际线', type: 'image', url: '/images/resources/skyline.jpg' },
  { id: 2, title: '自然风景', type: 'image', url: '/images/resources/nature.jpg' },
  { id: 3, title: '商务会议', type: 'video', url: '/videos/resources/meeting.mp4' },
  { id: 4, title: '科技产品展示', type: 'video', url: '/videos/resources/tech.mp4' },
  { id: 5, title: '抽象背景', type: 'image', url: '/images/resources/abstract.jpg' },
  { id: 6, title: '人物特写', type: 'image', url: '/images/resources/portrait.jpg' },
];

interface ScriptSegment {
  id: string;
  text: string;
  resourceId: number | null;
  duration: number;
}

export default function VoiceoverMatchingPage() {
  // 将脚本分段
  const initialSegments: ScriptSegment[] = mockScript
    .split('\n\n')
    .map((text, index) => ({
      id: `segment-${index}`,
      text,
      resourceId: null,
      duration: 5, // 默认5秒
    }));

  const [segments, setSegments] = useState<ScriptSegment[]>(initialSegments);
  const [resources] = useState(mockResources);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 选择段落
  const handleSelectSegment = (id: string) => {
    setSelectedSegmentId(id);
  };

  // 为段落分配资源
  const handleAssignResource = (segmentId: string, resourceId: number) => {
    setSegments(segments.map(segment => 
      segment.id === segmentId 
        ? { ...segment, resourceId } 
        : segment
    ));
  };

  // 调整段落时长
  const handleChangeDuration = (segmentId: string, duration: number) => {
    setSegments(segments.map(segment => 
      segment.id === segmentId 
        ? { ...segment, duration: Math.max(1, duration) } 
        : segment
    ));
  };

  // 上移段落
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSegments = [...segments];
    [newSegments[index - 1], newSegments[index]] = [newSegments[index], newSegments[index - 1]];
    setSegments(newSegments);
  };

  // 下移段落
  const handleMoveDown = (index: number) => {
    if (index === segments.length - 1) return;
    const newSegments = [...segments];
    [newSegments[index], newSegments[index + 1]] = [newSegments[index + 1], newSegments[index]];
    setSegments(newSegments);
  };

  // 获取资源信息
  const getResourceById = (id: number | null) => {
    if (id === null) return null;
    return resources.find(resource => resource.id === id) || null;
  };

  // 计算总时长
  const totalDuration = segments.reduce((sum, segment) => sum + segment.duration, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">口播匹配画面</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：脚本段落列表 */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
            <h2 className="font-medium text-gray-700">脚本段落</h2>
            <div className="text-sm text-gray-500">总时长: {totalDuration}秒</div>
          </div>
          
          <div className="overflow-auto max-h-[600px]">
            {segments.map((segment, index) => {
              const resource = getResourceById(segment.resourceId);
              
              return (
                <div 
                  key={segment.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedSegmentId === segment.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => handleSelectSegment(segment.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{`段落 ${index + 1}`}</div>
                    <div className="flex space-x-1">
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveUp(index);
                        }}
                        disabled={index === 0}
                      >
                        <FiArrowUp size={16} />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveDown(index);
                        }}
                        disabled={index === segments.length - 1}
                      >
                        <FiArrowDown size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {segment.text}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      时长: {segment.duration}秒
                    </div>
                    {resource && (
                      <div className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {resource.type === 'image' ? <FiImage className="mr-1" /> : <FiVideo className="mr-1" />}
                        {resource.title}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 中间：段落编辑 */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden">
          {selectedSegmentId ? (
            (() => {
              const segment = segments.find(s => s.id === selectedSegmentId);
              if (!segment) return null;
              
              return (
                <>
                  <div className="bg-gray-50 p-3 border-b">
                    <h2 className="font-medium text-gray-700">编辑段落</h2>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        段落文本
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={8}
                        value={segment.text}
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        段落时长 (秒)
                      </label>
                      <div className="flex items-center">
                        <button
                          className="px-3 py-1 border border-gray-300 rounded-l-md"
                          onClick={() => handleChangeDuration(segment.id, segment.duration - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-20 px-3 py-1 border-t border-b border-gray-300 text-center"
                          value={segment.duration}
                          onChange={(e) => handleChangeDuration(segment.id, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <button
                          className="px-3 py-1 border border-gray-300 rounded-r-md"
                          onClick={() => handleChangeDuration(segment.id, segment.duration + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        匹配资源
                      </label>
                      {segment.resourceId ? (
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            {getResourceById(segment.resourceId)?.type === 'image' ? (
                              <FiImage className="mr-2 text-blue-500" />
                            ) : (
                              <FiVideo className="mr-2 text-blue-500" />
                            )}
                            <span>{getResourceById(segment.resourceId)?.title}</span>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleAssignResource(segment.id, 0)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm italic">
                          从右侧选择资源
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })()
          ) : (
            <div className="flex items-center justify-center h-full p-6 text-gray-500">
              请从左侧选择一个段落进行编辑
            </div>
          )}
        </div>
        
        {/* 右侧：资源选择 */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-3 border-b">
            <h2 className="font-medium text-gray-700">选择资源</h2>
          </div>
          
          <div className="overflow-auto max-h-[600px] p-3 grid grid-cols-2 gap-3">
            {resources.map(resource => (
              <div
                key={resource.id}
                className="border rounded-md overflow-hidden cursor-pointer hover:shadow-md"
                onClick={() => selectedSegmentId && handleAssignResource(selectedSegmentId, resource.id)}
              >
                <div className="h-24 bg-gray-100 flex items-center justify-center">
                  {resource.type === 'image' ? (
                    <FiImage className="text-gray-400 text-3xl" />
                  ) : (
                    <FiVideo className="text-gray-400 text-3xl" />
                  )}
                </div>
                <div className="p-2">
                  <div className="text-sm font-medium truncate">{resource.title}</div>
                  <div className="text-xs text-gray-500">{resource.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 底部预览控制 */}
      <div className="mt-6 border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-gray-700">预览</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <>
                <FiPause className="mr-2" />
                暂停
              </>
            ) : (
              <>
                <FiPlay className="mr-2" />
                播放
              </>
            )}
          </button>
        </div>
        
        <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
          <div className="text-gray-500">
            {isPlaying ? '正在播放预览...' : '点击播放按钮预览视频'}
          </div>
        </div>
      </div>
    </div>
  );
} 