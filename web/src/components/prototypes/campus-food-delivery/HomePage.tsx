'use client';

import { useState } from 'react';
import { FiSearch, FiHome, FiShoppingCart, FiUser, FiHeart } from 'react-icons/fi';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 模拟餐厅数据
  const restaurants = [
    {
      id: 1,
      name: '学生食堂',
      rating: 4.5,
      deliveryTime: '15-25',
      minOrder: 15,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['中餐', '快餐', '米饭']
    },
    {
      id: 2,
      name: '麦当劳校园店',
      rating: 4.3,
      deliveryTime: '20-30',
      minOrder: 20,
      image: 'https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['汉堡', '快餐', '炸鸡']
    },
    {
      id: 3,
      name: '星巴克校园店',
      rating: 4.7,
      deliveryTime: '15-20',
      minOrder: 25,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['咖啡', '甜点', '饮品']
    },
    {
      id: 4,
      name: '川湘小厨',
      rating: 4.6,
      deliveryTime: '25-35',
      minOrder: 30,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['川菜', '湘菜', '辣']
    }
  ];

  // 过滤餐厅
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10">
        <div className="flex items-center bg-gray-100 rounded-full p-2">
          <FiSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="搜索餐厅或美食..."
            className="bg-transparent border-none outline-none flex-1 ml-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="flex-1 overflow-auto p-4">
        {/* 分类横向滚动 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">美食分类</h2>
          <div className="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar">
            {['快餐', '中餐', '西餐', '奶茶', '甜点', '水果', '夜宵', '早餐'].map((category, index) => (
              <div key={index} className="flex flex-col items-center mx-3 min-w-[60px]">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                  <span className="text-blue-500 text-xs">{category.charAt(0)}</span>
                </div>
                <span className="text-xs text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 餐厅列表 */}
        <div>
          <h2 className="text-lg font-semibold mb-3">附近餐厅</h2>
          <div className="space-y-4">
            {filteredRestaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs text-blue-600">
                      <span>{restaurant.rating}</span>
                      <span className="ml-1">⭐</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{restaurant.deliveryTime}分钟</span>
                    <span className="mx-1">•</span>
                    <span>¥{restaurant.minOrder}起送</span>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {restaurant.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-1 mb-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <div className="flex flex-col items-center">
          <FiHome className="text-blue-500" />
          <span className="text-xs mt-1 text-blue-500">首页</span>
        </div>
        <div className="flex flex-col items-center">
          <FiHeart className="text-gray-400" />
          <span className="text-xs mt-1 text-gray-500">收藏</span>
        </div>
        <div className="flex flex-col items-center">
          <FiShoppingCart className="text-gray-400" />
          <span className="text-xs mt-1 text-gray-500">购物车</span>
        </div>
        <div className="flex flex-col items-center">
          <FiUser className="text-gray-400" />
          <span className="text-xs mt-1 text-gray-500">我的</span>
        </div>
      </div>
    </div>
  );
} 