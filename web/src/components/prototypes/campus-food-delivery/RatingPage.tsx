'use client';

import { useState } from 'react';
import { FiChevronLeft, FiCamera, FiX } from 'react-icons/fi';

export default function RatingPage() {
  // 模拟订单数据
  const order = {
    id: 'SO12345678',
    date: '2023-03-04 12:30',
    restaurant: {
      name: '学生食堂',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    items: [
      { id: 1, name: '黄焖鸡米饭', price: 18, quantity: 1 },
      { id: 2, name: '可乐', price: 5, quantity: 1 },
    ],
    total: 26,
    deliveryTime: 25
  };
  
  // 评分和评价内容
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [anonymousReview, setAnonymousReview] = useState(false);
  
  // 常用评价标签
  const commonTags = [
    '菜品分量足',
    '味道好',
    '服务态度好',
    '包装精美',
    '送餐速度快',
    '食材新鲜',
    '性价比高',
    '干净卫生'
  ];
  
  // 已选标签
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // 上传的图片
  const [images, setImages] = useState<string[]>([]);
  
  // 切换标签选择
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };
  
  // 模拟上传图片
  const uploadImage = () => {
    // 实际应用中这里会调用文件选择器和上传API
    // 这里仅作为演示，添加一个随机图片
    const demoImages = [
      'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ];
    
    if (images.length < 3) {
      const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
      setImages(prev => [...prev, randomImage]);
    }
  };
  
  // 移除图片
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  // 提交评价
  const submitReview = () => {
    // 实际应用中这里会调用API提交评价
    console.log({
      orderId: order.id,
      rating,
      deliveryRating,
      comment,
      tags: selectedTags,
      images,
      anonymousReview
    });
    
    // 模拟提交成功
    alert('评价提交成功！');
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex items-center">
        <button className="mr-4">
          <FiChevronLeft className="text-gray-700" size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">评价订单</h1>
        <div className="w-6"></div>
      </div>
      
      {/* 评价内容 */}
      <div className="flex-1 overflow-auto p-4">
        {/* 订单信息 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded overflow-hidden mr-3">
              <img 
                src={order.restaurant.image} 
                alt={order.restaurant.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{order.restaurant.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                订单号: {order.id} | 下单时间: {order.date}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span>{item.name} x{item.quantity}</span>
                <span className="text-gray-600">¥{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 餐厅评分 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="font-medium mb-3">餐厅评分</h3>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <button 
                key={star}
                className="mx-2 text-2xl"
                onClick={() => setRating(star)}
              >
                {star <= rating ? '★' : '☆'}
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            {rating === 5 ? '非常满意' : 
             rating === 4 ? '满意' : 
             rating === 3 ? '一般' : 
             rating === 2 ? '不满意' : '非常不满意'}
          </div>
        </div>
        
        {/* 配送评分 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="font-medium mb-3">配送评分</h3>
          <p className="text-sm text-gray-500 mb-3">
            本次配送用时 {order.deliveryTime} 分钟
          </p>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <button 
                key={star}
                className="mx-2 text-2xl"
                onClick={() => setDeliveryRating(star)}
              >
                {star <= deliveryRating ? '★' : '☆'}
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            {deliveryRating === 5 ? '非常满意' : 
             deliveryRating === 4 ? '满意' : 
             deliveryRating === 3 ? '一般' : 
             deliveryRating === 2 ? '不满意' : '非常不满意'}
          </div>
        </div>
        
        {/* 评价标签 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="font-medium mb-3">评价标签</h3>
          <div className="flex flex-wrap gap-2">
            {commonTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedTags.includes(tag) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* 评价内容 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="font-medium mb-3">评价内容</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="请分享您的用餐体验，您的评价将帮助其他同学选择..."
            className="w-full p-3 border border-gray-300 rounded text-sm"
            rows={4}
          />
          
          {/* 上传图片 */}
          <div className="mt-3">
            <div className="flex items-center flex-wrap gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative w-20 h-20 rounded overflow-hidden">
                  <img 
                    src={image} 
                    alt={`评价图片${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white"
                    onClick={() => removeImage(index)}
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
              
              {images.length < 3 && (
                <button 
                  className="w-20 h-20 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400"
                  onClick={uploadImage}
                >
                  <FiCamera size={20} />
                  <span className="text-xs mt-1">添加图片</span>
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              最多上传3张图片
            </p>
          </div>
        </div>
        
        {/* 匿名评价 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={anonymousReview}
              onChange={(e) => setAnonymousReview(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">匿名评价</span>
          </label>
          <p className="text-xs text-gray-500 mt-2">
            开启后，您的评价将以匿名形式展示
          </p>
        </div>
      </div>
      
      {/* 提交按钮 */}
      <div className="p-4 bg-white border-t border-gray-200">
        <button 
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium"
          onClick={submitReview}
        >
          提交评价
        </button>
      </div>
    </div>
  );
} 