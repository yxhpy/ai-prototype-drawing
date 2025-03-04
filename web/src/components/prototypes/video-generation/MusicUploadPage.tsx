'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiMusic, FiArrowLeft, FiPlay, FiPause } from 'react-icons/fi';

// 预定义的音乐分类
const musicCategories = ['欢快', '科技', '舒缓', '激励', '商务', '自然', '神秘', '紧张', '浪漫', '悲伤'];

export default function MusicUploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 检查文件类型
    const isAudio = selectedFile.type.startsWith('audio/');
    if (!isAudio) {
      alert('请选择音频文件');
      return;
    }

    setFile(selectedFile);

    // 创建音频元素获取时长
    const audio = new Audio(URL.createObjectURL(selectedFile));
    audio.addEventListener('loadedmetadata', () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    });
  };

  // 播放/暂停音频
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = category === 'custom' ? customCategory : category;
    
    if (!title || !description || !finalCategory || !file) {
      alert('请填写所有必填字段并上传文件');
      return;
    }
    
    setIsUploading(true);
    
    // 模拟上传过程
    setTimeout(() => {
      setIsUploading(false);
      alert('音乐上传成功！');
      // 重置表单
      setTitle('');
      setDescription('');
      setCategory('');
      setCustomCategory('');
      setFile(null);
      setDuration('0:00');
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button className="mr-4 text-blue-500 hover:text-blue-700">
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">添加背景音乐</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                音乐标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入音乐标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                音乐描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="描述音乐风格和适用场景"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                音乐分类 <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">选择分类</option>
                {musicCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="custom">自定义分类</option>
              </select>
              
              {category === 'custom' && (
                <input
                  type="text"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入自定义分类"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  required
                />
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              上传音乐文件 <span className="text-red-500">*</span>
            </label>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-4 h-40 flex flex-col items-center justify-center cursor-pointer ${
                file ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
              
              {file ? (
                <div className="text-center">
                  <FiMusic className="mx-auto text-blue-500 text-3xl mb-2" />
                  <p className="text-gray-700 font-medium">{file.name}</p>
                  <p className="text-gray-500 text-sm mt-1">时长: {duration}</p>
                </div>
              ) : (
                <>
                  <FiUpload className="text-gray-400 text-4xl mb-2" />
                  <p className="text-gray-500 text-center">
                    点击或拖拽音频文件到此处上传<br />
                    <span className="text-sm">支持 MP3, WAV, OGG 等格式</span>
                  </p>
                </>
              )}
            </div>
            
            {file && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <>
                        <FiPause className="mr-1" /> 暂停
                      </>
                    ) : (
                      <>
                        <FiPlay className="mr-1" /> 播放
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 text-sm flex items-center"
                    onClick={() => {
                      setFile(null);
                      setDuration('0:00');
                      setIsPlaying(false);
                    }}
                  >
                    <FiX className="mr-1" /> 移除文件
                  </button>
                </div>
                
                {file && (
                  <audio 
                    ref={audioRef} 
                    src={URL.createObjectURL(file)} 
                    onEnded={() => setIsPlaying(false)}
                    className="hidden" 
                  />
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isUploading || !title || !description || (!category || (category === 'custom' && !customCategory)) || !file}
          >
            {isUploading ? '上传中...' : '上传音乐'}
          </button>
        </div>
      </form>
    </div>
  );
} 