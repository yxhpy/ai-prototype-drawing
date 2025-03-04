'use client';

import { useState } from 'react';

type ScriptStyle = 'informative' | 'entertaining' | 'professional';

export default function ScriptGenerationPage() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [style, setStyle] = useState<ScriptStyle>('informative');
  const [length, setLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    // 模拟API调用
    setTimeout(() => {
      const scriptSamples = {
        informative: `# 人工智能在视频制作中的应用\n\n## 引言\n人工智能正在彻底改变视频制作的方式。从自动剪辑到内容生成，AI工具正在使创作者能够更快、更高效地工作。\n\n## 主要应用\n- 自动脚本生成：AI可以基于关键词生成完整的视频脚本\n- 智能剪辑：自动识别最佳片段并组合\n- 语音合成：将文本转换为自然的语音旁白\n\n## 未来展望\n随着技术的进步，我们可以期待更多创新功能的出现，进一步简化视频制作流程。`,
        entertaining: `# 人工智能：你的新视频制作助手！\n\n## 开场白\n嘿，各位创作者！还在为视频制作头疼吗？AI来拯救你啦！\n\n## 酷炫功能\n- 脚本生成魔法：输入几个关键词，瞬间获得完整脚本！太神奇了！\n- 智能剪辑大师：告别无聊片段，只留精彩瞬间\n- 语音合成术：文字变语音，告别录音困扰\n\n## 结语\n未来已来，让AI成为你的创作超能力！点赞关注，下期再见！`,
        professional: `# 人工智能技术在视频制作领域的应用与分析\n\n## 概述\n本视频将深入探讨人工智能技术如何优化现代视频制作工作流程，提高效率并降低成本。\n\n## 核心技术应用\n- 基于深度学习的脚本自动生成系统\n- 计算机视觉驱动的智能剪辑算法\n- 神经网络语音合成技术的实际应用\n\n## 结论与展望\n人工智能将持续重塑视频制作行业，专业人士应积极适应并利用这些技术保持竞争优势。`
      };
      
      setGeneratedScript(scriptSamples[style]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">AI文案生成</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
              视频主题
            </label>
            <input
              type="text"
              id="topic"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例如：人工智能在视频制作中的应用"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
              关键词（用逗号分隔）
            </label>
            <input
              type="text"
              id="keywords"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例如：AI, 视频制作, 自动化, 效率"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              文案风格
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  style === 'informative' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setStyle('informative')}
              >
                知识型
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  style === 'entertaining' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setStyle('entertaining')}
              >
                娱乐型
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  style === 'professional' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setStyle('professional')}
              >
                专业型
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              文案长度
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  length === 'short' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setLength('short')}
              >
                短视频
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  length === 'medium' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setLength('medium')}
              >
                中等长度
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  length === 'long' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setLength('long')}
              >
                长视频
              </button>
            </div>
          </div>
          
          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleGenerate}
            disabled={!topic || !keywords || isGenerating}
          >
            {isGenerating ? '生成中...' : '生成文案'}
          </button>
        </div>
        
        <div className="border rounded-md p-4 bg-gray-50 h-[500px] overflow-auto">
          <h2 className="text-lg font-medium text-gray-800 mb-2">生成的文案</h2>
          {isGenerating ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : generatedScript ? (
            <div className="whitespace-pre-wrap text-gray-700">
              {generatedScript}
            </div>
          ) : (
            <div className="text-gray-500 italic flex items-center justify-center h-full">
              填写左侧表单并点击"生成文案"按钮
            </div>
          )}
        </div>
      </div>
      
      {generatedScript && (
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            重新生成
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            使用此文案
          </button>
        </div>
      )}
    </div>
  );
} 