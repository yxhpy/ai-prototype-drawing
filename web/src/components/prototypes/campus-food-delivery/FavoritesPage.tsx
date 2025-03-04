'use client';

import { useState } from 'react';
import { FiChevronLeft, FiHeart, FiStar, FiClock, FiShoppingBag } from 'react-icons/fi';

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('restaurants');
  
  // 选项卡
  const tabs = [
    { id: 'restaurants', label: '收藏的餐厅' },
    { id: 'foods', label: '收藏的食品' }
  ];
  
  // 模拟收藏的餐厅数据
  const favoriteRestaurants = [
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
    }
  ];
  
  // 模拟收藏的食品数据
  const favoriteFoods = [
    {
      id: 1,
      name: '黄焖鸡米饭',
      price: 18,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      restaurant: '学生食堂',
      rating: 4.8,
      sales: 352
    },
    {
      id: 2,
      name: '巨无霸套餐',
      price: 32,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      restaurant: '麦当劳校园店',
      rating: 4.5,
      sales: 289
    },
    {
      id: 3,
      name: '拿铁咖啡',
      price: 28,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      restaurant: '星巴克校园店',
      rating: 4.9,
      sales: 456
    },
    {
      id: 4,
      name: '麻辣香锅',
      price: 45,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      restaurant: '川湘小厨',
      rating: 4.7,
      sales: 189
    }
  ];
  
  // 移除收藏
  const removeFromFavorites = (id: number, type: string) => {
    // 实际应用中这里会调用API移除收藏
    console.log(`从${type}收藏中移除ID为${id}的项目`);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex items-center">
        <button className="mr-4">
          <FiChevronLeft className="text-gray-700" size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">我的收藏</h1>
        <div className="w-6"></div> {/* 占位，保持标题居中 */}
      </div>
      
      {/* 选项卡 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === tab.id 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'restaurants' ? (
          // 收藏的餐厅
          <div className="space-y-4">
            {favoriteRestaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 overflow-hidden">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{restaurant.name}</h3>
                      <button 
                        className="text-red-500"
                        onClick={() => removeFromFavorites(restaurant.id, 'restaurants')}
                      >
                        <FiHeart className="fill-current" />
                      </button>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        {restaurant.rating}
                      </span>
                      <span className="mx-2">|</span>
                      <span className="flex items-center">
                        <FiClock className="mr-1" />
                        {restaurant.deliveryTime}分钟
                      </span>
                      <span className="mx-2">|</span>
                      <span>¥{restaurant.minOrder}起送</span>
                    </div>
                    <div className="flex flex-wrap mt-2">
                      {restaurant.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-1 mb-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="mt-2 text-xs text-blue-500 border border-blue-500 rounded px-2 py-1">
                      去点餐
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 收藏的食品
          <div className="grid grid-cols-2 gap-4">
            {favoriteFoods.map(food => (
              <div key={food.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-32 overflow-hidden relative">
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center text-red-500"
                    onClick={() => removeFromFavorites(food.id, 'foods')}
                  >
                    <FiHeart className="fill-current" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{food.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{food.restaurant}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-red-500 font-medium">¥{food.price}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiStar className="text-yellow-400 mr-1" />
                      <span>{food.rating}</span>
                      <span className="mx-1">|</span>
                      <span>月售{food.sales}</span>
                    </div>
                  </div>
                  <button className="mt-2 w-full text-xs bg-blue-500 text-white rounded py-1 flex items-center justify-center">
                    <FiShoppingBag className="mr-1" />
                    加入购物车
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 