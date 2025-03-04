'use client';

import { useState } from 'react';
import { FiChevronLeft, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '黄焖鸡米饭',
      price: 18,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      restaurant: {
        id: 1,
        name: '学生食堂',
        deliveryFee: 3,
        minOrder: 15
      }
    },
    {
      id: 2,
      name: '可乐',
      price: 5,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      restaurant: {
        id: 1,
        name: '学生食堂',
        deliveryFee: 3,
        minOrder: 15
      }
    },
    {
      id: 3,
      name: '薯条',
      price: 8,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      restaurant: {
        id: 2,
        name: '麦当劳校园店',
        deliveryFee: 5,
        minOrder: 20
      }
    }
  ]);
  
  // 按餐厅分组购物车商品
  const groupedItems = cartItems.reduce((groups, item) => {
    const restaurantId = item.restaurant.id;
    if (!groups[restaurantId]) {
      groups[restaurantId] = {
        restaurant: item.restaurant,
        items: []
      };
    }
    groups[restaurantId].items.push(item);
    return groups;
  }, {} as Record<number, { restaurant: any, items: typeof cartItems }>);
  
  // 计算餐厅商品总价
  const calculateRestaurantTotal = (items: typeof cartItems) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  // 计算购物车总价
  const calculateCartTotal = () => {
    return Object.values(groupedItems).reduce((total, group) => {
      return total + calculateRestaurantTotal(group.items) + group.restaurant.deliveryFee;
    }, 0);
  };
  
  // 增加商品数量
  const increaseQuantity = (itemId: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  // 减少商品数量
  const decreaseQuantity = (itemId: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };
  
  // 移除商品
  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // 清空购物车
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex items-center">
        <button className="mr-4">
          <FiChevronLeft className="text-gray-700" size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">购物车</h1>
        {cartItems.length > 0 && (
          <button 
            className="text-red-500 text-sm"
            onClick={clearCart}
          >
            清空
          </button>
        )}
      </div>
      
      {/* 购物车内容 */}
      <div className="flex-1 overflow-auto p-4">
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {Object.values(groupedItems).map((group) => (
              <div key={group.restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* 餐厅信息 */}
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold">{group.restaurant.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    配送费 ¥{group.restaurant.deliveryFee} | 
                    ¥{group.restaurant.minOrder}起送
                  </p>
                </div>
                
                {/* 餐厅商品列表 */}
                <div>
                  {group.items.map(item => (
                    <div key={item.id} className="flex p-4 border-b border-gray-100 last:border-b-0">
                      <div className="w-16 h-16 rounded overflow-hidden mr-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <button 
                            className="text-gray-400"
                            onClick={() => removeItem(item.id)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-red-500">¥{item.price}</span>
                          <div className="flex items-center">
                            <button 
                              className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <FiMinus className="text-gray-500 text-xs" />
                            </button>
                            <span className="mx-2 text-sm">{item.quantity}</span>
                            <button 
                              className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <FiPlus className="text-white text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 餐厅小计 */}
                <div className="p-3 bg-gray-50 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">商品小计</span>
                    <span>¥{calculateRestaurantTotal(group.items).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-500">配送费</span>
                    <span>¥{group.restaurant.deliveryFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiShoppingBag className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500">购物车空空如也</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full text-sm">
              去逛逛
            </button>
          </div>
        )}
      </div>
      
      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
          <div>
            <div className="font-medium">
              <span className="text-gray-500 text-sm mr-1">合计:</span>
              <span className="text-red-500">¥{calculateCartTotal().toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-500">
              含配送费
            </div>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
            去结算({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      )}
    </div>
  );
} 