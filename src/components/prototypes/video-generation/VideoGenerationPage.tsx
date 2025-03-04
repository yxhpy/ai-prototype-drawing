'use client';

import { useState } from 'react';
import { FiPlay, FiDownload, FiShare2, FiSettings, FiCheck, FiClock, FiAlertCircle, FiEdit } from 'react-icons/fi';
  
// 模拟数据
const mockVideoProject = {
  title: '人工智能在视频制作中的应用',
  duration: '02:35',
  resolution: '1920x1080', 
  segments: [
    { id: 1, text: '# 人工智能在视频制作中的应用', resource: '城市天际线', duration: 5 },
    { id: 2, text: '## 引言\n人工智能正在彻底改变视频制作的方式。从自动剪辑到内容生成，AI工具正在使创作者能够更快、更高效地工作。', resource: '科技产品展示', duration: 8 },
    { id: 3, text: '## 主要应用\n- 自动脚本生成：AI可以基于关键词生成完整的视频脚本\n- 智能剪辑：自动识别最佳片段并组合\n- 语音合成：将文本转换为自然的语音旁白', resource: '抽象背景', duration: 12 },
    { id: 4, text: '## 未来展望\n随着技术的进步，我们可以期待更多创新功能的出现，进一步简化视频制作流程。', resource: '自然风景', duration: 10 },
  ],
  backgroundMusic: '科技感十足',
  transition: '淡入淡出',  
};

export default function VideoGenerationPage() {
  const [videoProject] = useState(mockVideoProject);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    resolution: '1920x1080',
    format: 'mp4',
    quality: 'high',
  });

  // 生成视频
  const generateVideo = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStep('准备资源');
    
    // 模拟生成过程
    const steps = [
      { step: '准备资源', progress: 10 },
      { step: '生成语音', progress: 30 },
      { step: '匹配画面', progress: 50 },
      { step: '添加背景音乐', progress: 70 },
      { step: '应用转场效果', progress: 85 },
      { step: '导出视频', progress: 95 },
      { step: '完成', progress: 100 },
    ];
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setGenerationStep(steps[currentStep].step);
        setGenerationProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setIsGenerated(true);
      }
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">一键生成视频</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：项目信息 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">项目信息</h2>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">项目标题</div>
                <div className="font-medium">{videoProject.title}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">预计时长</div>
                  <div className="font-medium">{videoProject.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">分辨率</div>
                  <div className="font-medium">{videoProject.resolution}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">背景音乐</div>
                <div className="font-medium">{videoProject.backgroundMusic}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">转场效果</div>
                <div className="font-medium">{videoProject.transition}</div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">导出设置</h2>
              <button 
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setShowSettings(!showSettings)}
              >
                <FiSettings />
              </button>
            </div>
            
            {showSettings ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    分辨率
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settings.resolution}
                    onChange={(e) => setSettings({...settings, resolution: e.target.value})}
                  >
                    <option value="1920x1080">1920x1080 (Full HD)</option>
                    <option value="1280x720">1280x720 (HD)</option>
                    <option value="3840x2160">3840x2160 (4K)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    格式
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settings.format}
                    onChange={(e) => setSettings({...settings, format: e.target.value})}
                  >
                    <option value="mp4">MP4</option>
                    <option value="mov">MOV</option>
                    <option value="webm">WebM</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    质量
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settings.quality}
                    onChange={(e) => setSettings({...settings, quality: e.target.value})}
                  >
                    <option value="high">高质量</option>
                    <option value="medium">中等质量</option>
                    <option value="low">低质量</option>
                  </select>
                </div>
                
                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => setShowSettings(false)}
                >
                  保存设置
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">分辨率:</span>
                  <span className="text-sm font-medium">{settings.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">格式:</span>
                  <span className="text-sm font-medium">{settings.format.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">质量:</span>
                  <span className="text-sm font-medium">
                    {settings.quality === 'high' ? '高质量' : settings.quality === 'medium' ? '中等质量' : '低质量'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 中间和右侧：视频预览和段落 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 视频预览 */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">视频预览</h2>
            
            <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
              {isGenerated ? (
                <div className="text-center">
                  <div className="text-gray-800 font-medium mb-2">视频已生成</div>
                  <div className="flex justify-center space-x-4">
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <FiPlay className="mr-1" /> 播放
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <FiDownload className="mr-1" /> 下载
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <FiShare2 className="mr-1" /> 分享
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">
                  {isGenerating ? '视频生成中...' : '点击下方按钮生成视频'}
                </div>
              )}
            </div>
            
            {isGenerating && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{generationStep}</span>
                  <span>{generationProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {!isGenerating && !isGenerated && (
              <div className="mt-4">
                <button
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 flex items-center justify-center"
                  onClick={generateVideo}
                >
                  <FiPlay className="mr-2" />
                  生成视频
                </button>
              </div>
            )}
          </div>
          
          {/* 段落列表 */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">视频段落</h2>
            
            <div className="space-y-3">
              {videoProject.segments.map((segment, index) => (
                <div key={segment.id} className="border rounded-md p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">段落 {index + 1}</div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEdit size={16} />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {segment.text}
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <div>资源: {segment.resource}</div>
                    <div>时长: {segment.duration}秒</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部状态栏 */}
      <div className="mt-6 border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            {isGenerated ? (
              <div className="flex items-center text-green-600">
                <FiCheck className="mr-1" />
                视频已生成
              </div>
            ) : isGenerating ? (
              <div className="flex items-center text-blue-600">
                <FiClock className="mr-1" />
                正在生成视频...
              </div>
            ) : (
              <div className="flex items-center text-gray-500">
                <FiAlertCircle className="mr-1" />
                准备就绪，等待生成
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            预计文件大小: 约 25MB
          </div>
        </div>
      </div>
    </div>
  );
} 