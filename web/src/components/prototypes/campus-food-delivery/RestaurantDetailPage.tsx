'use client';

import { useState } from 'react';
import { FiChevronLeft, FiHeart, FiShare2, FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';

export default function RestaurantDetailPage() {
  const [activeCategory, setActiveCategory] = useState('热销');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  
  // 模拟餐厅数据
  const restaurant = {
    id: 1,
    name: '学生食堂',
    rating: 4.5,
    deliveryTime: '15-25',
    minOrder: 15,
    deliveryFee: 3,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    notice: '欢迎光临学生食堂！我们提供新鲜健康的校园美食，配送时间约15-25分钟。',
    categories: ['热销', '套餐', '主食', '小吃', '饮料', '水果']
  };
  
  // 模拟菜品数据
  const menuItems = [
    {
      id: '1',
      name: '黄焖鸡米饭',
      price: 18,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      sales: 352,
      category: '热销',
      description: '选用新鲜鸡腿肉，配以土豆、香菇等食材，黄焖入味，搭配米饭'
    },
    {
      id: '2',
      name: '红烧牛肉面',
      price: 16,
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      sales: 215,
      category: '热销',
      description: '精选牛腩肉，慢炖三小时，汤底浓郁，面条劲道'
    },
    {
      id: '3',
      name: '麻辣香锅',
      price: 22,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      sales: 189,
      category: '热销',
      description: '麻辣鲜香，食材丰富，可选辣度'
    },
    {
      id: '4',
      name: '经典套餐A',
      price: 25,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      sales: 120,
      category: '套餐',
      description: '主食+荤菜+素菜+饮料，营养均衡'
    },
    {
      id: '5',
      name: '米饭',
      price: 2,
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      sales: 500,
      category: '主食',
      description: '东北大米，香软可口'
    },
    {
      id: '6',
      name: '薯条',
      price: 8,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      sales: 320,
      category: '小吃',
      description: '现炸薯条，外酥里嫩'
    },
    {
      id: '7',
      name: '可乐',
      price: 5,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      sales: 450,
      category: '饮料',
      description: '冰镇可乐，提神解渴'
    }
  ];
  
  // 根据当前选中的分类过滤菜品
  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  
  // 计算购物车总价
  const totalPrice = Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const item = menuItems.find(item => item.id === itemId);
    return total + (item ? item.price * quantity : 0);
  }, 0);
  
  // 计算购物车总数量
  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  
  // 添加商品到购物车
  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };
  
  // 从购物车移除商品
  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 餐厅封面 */}
      <div className="relative h-48">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <FiChevronLeft className="text-gray-700" />
          </button>
          <div className="flex space-x-2">
            <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
              <FiShare2 className="text-gray-700" />
            </button>
            <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
              <FiHeart className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      
      {/* 餐厅信息 */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold">{restaurant.name}</h1>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span className="flex items-center">
            <span>{restaurant.rating}</span>
            <span className="ml-1">⭐</span>
          </span>
          <span className="mx-2">|</span>
          <span>月售1000+</span>
          <span className="mx-2">|</span>
          <span>{restaurant.deliveryTime}分钟</span>
        </div>
        <div className="mt-2 text-sm bg-gray-50 p-2 rounded text-gray-600">
          {restaurant.notice}
        </div>
      </div>
      
      {/* 菜单区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧分类列表 */}
        <div className="w-24 bg-gray-50 overflow-y-auto">
          {restaurant.categories.map(category => (
            <div 
              key={category}
              className={`py-3 px-2 text-center text-sm ${activeCategory === category ? 'bg-white text-blue-500 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        
        {/* 右侧菜品列表 */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-3">
            <h2 className="text-lg font-semibold mb-3">{activeCategory}</h2>
            <div className="space-y-4">
              {filteredItems.map(item => (
                <div key={item.id} className="flex border-b border-gray-100 pb-3">
                  <div className="w-20 h-20 rounded overflow-hidden mr-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">月售{item.sales}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-red-500 font-medium">¥{item.price}</span>
                      <div className="flex items-center">
                        {cart[item.id] ? (
                          <>
                            <button 
                              className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <FiMinus className="text-gray-500 text-xs" />
                            </button>
                            <span className="mx-2 text-sm">{cart[item.id]}</span>
                          </>
                        ) : null}
                        <button 
                          className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                          onClick={() => addToCart(item.id)}
                        >
                          <FiPlus className="text-white text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部购物车 */}
      {totalItems > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <FiShoppingCart className="text-blue-500 text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <div className="ml-3">
              <div className="font-medium">¥{totalPrice.toFixed(2)}</div>
              <div className="text-xs text-gray-500">另需配送费¥{restaurant.deliveryFee}</div>
            </div>
          </div>
          <button 
            className={`px-4 py-2 rounded-full text-white text-sm ${totalPrice >= restaurant.minOrder ? 'bg-blue-500' : 'bg-gray-300'}`}
            disabled={totalPrice < restaurant.minOrder}
          >
            {totalPrice >= restaurant.minOrder ? '去结算' : `差¥${(restaurant.minOrder - totalPrice).toFixed(2)}起送`}
          </button>
        </div>
      )}
    </div>
  );
} 