'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiVideo, FiPlus, FiArrowLeft } from 'react-icons/fi';

export default function ResourceUploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceType, setResourceType] = useState<'image' | 'video'>('image');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 检查文件类型
    const isImage = selectedFile.type.startsWith('image/');
    const isVideo = selectedFile.type.startsWith('video/');

    if ((resourceType === 'image' && !isImage) || (resourceType === 'video' && !isVideo)) {
      alert(`请选择${resourceType === 'image' ? '图片' : '视频'}文件`);
      return;
    }

    setFile(selectedFile);

    // 创建预览URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // 清理函数
    return () => URL.revokeObjectURL(objectUrl);
  };

  // 处理标签添加
  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  // 处理标签删除
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !file) {
      alert('请填写所有必填字段并上传文件');
      return;
    }
    
    setIsUploading(true);
    
    // 模拟上传过程
    setTimeout(() => {
      setIsUploading(false);
      alert('资源上传成功！');
      // 重置表单
      setTitle('');
      setDescription('');
      setTags([]);
      setFile(null);
      setPreviewUrl(null);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button className="mr-4 text-blue-500 hover:text-blue-700">
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">添加新资源</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                资源标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入资源标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                资源描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入资源描述"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                资源类型 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md flex items-center justify-center ${
                    resourceType === 'image' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setResourceType('image')}
                >
                  <FiImage className="mr-2" />
                  图片
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md flex items-center justify-center ${
                    resourceType === 'video' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setResourceType('video')}
                >
                  <FiVideo className="mr-2" />
                  视频
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                标签
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="添加标签"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                  onClick={handleAddTag}
                >
                  <FiPlus />
                </button>
              </div>
              
              <div className="flex flex-wrap mt-2">
                {tags.map(tag => (
                  <span 
                    key={tag} 
                    className="flex items-center bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded mr-2 mb-2"
                  >
                    {tag}
                    <button 
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              上传文件 <span className="text-red-500">*</span>
            </label>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-4 h-64 flex flex-col items-center justify-center cursor-pointer ${
                previewUrl ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={resourceType === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
              />
              
              {previewUrl ? (
                resourceType === 'image' ? (
                  <img 
                    src={previewUrl} 
                    alt="预览" 
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <video 
                    src={previewUrl} 
                    controls 
                    className="max-h-full max-w-full"
                  />
                )
              ) : (
                <>
                  <FiUpload className="text-gray-400 text-4xl mb-2" />
                  <p className="text-gray-500 text-center">
                    点击或拖拽文件到此处上传<br />
                    <span className="text-sm">
                      {resourceType === 'image' ? '支持 JPG, PNG, GIF 等格式' : '支持 MP4, WebM 等格式'}
                    </span>
                  </p>
                </>
              )}
            </div>
            
            {previewUrl && (
              <button
                type="button"
                className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center"
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(null);
                }}
              >
                <FiX className="mr-1" /> 移除文件
              </button>
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
            disabled={isUploading || !title || !description || !file}
          >
            {isUploading ? '上传中...' : '上传资源'}
          </button>
        </div>
      </form>
    </div>
  );
} 