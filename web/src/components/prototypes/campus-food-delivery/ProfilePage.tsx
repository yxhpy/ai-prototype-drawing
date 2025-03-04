'use client';

import { useState } from 'react';
import { 
  FiUser, FiHome, FiHeart, FiShoppingCart, 
  FiMapPin, FiCreditCard, FiSettings, FiHelpCircle, 
  FiFileText, FiChevronRight, FiLogOut, FiBell
} from 'react-icons/fi';

export default function ProfilePage() {
  // 模拟用户数据
  const user = {
    name: '张同学',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    phone: '138****1234',
    studentId: '2023110123',
    balance: 128.5,
    points: 350,
    coupons: 3
  };
  
  // 功能菜单项
  const menuItems = [
    {
      id: 'orders',
      title: '我的订单',
      icon: <FiFileText className="text-blue-500" />,
      description: '查看历史订单'
    },
    {
      id: 'address',
      title: '收货地址',
      icon: <FiMapPin className="text-green-500" />,
      description: '管理收货地址'
    },
    {
      id: 'payment',
      title: '支付方式',
      icon: <FiCreditCard className="text-purple-500" />,
      description: '管理支付方式'
    },
    {
      id: 'favorites',
      title: '我的收藏',
      icon: <FiHeart className="text-red-500" />,
      description: '查看收藏的餐厅和食品'
    },
    {
      id: 'notifications',
      title: '消息通知',
      icon: <FiBell className="text-yellow-500" />,
      description: '订单和优惠通知'
    },
    {
      id: 'settings',
      title: '设置',
      icon: <FiSettings className="text-gray-500" />,
      description: '账号和应用设置'
    },
    {
      id: 'help',
      title: '帮助中心',
      icon: <FiHelpCircle className="text-teal-500" />,
      description: '常见问题和客服'
    }
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 顶部用户信息 */}
      <div className="bg-blue-500 text-white p-6 pb-8 rounded-b-3xl">
        <h1 className="text-xl font-semibold mb-4">个人中心</h1>
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <p className="text-blue-100 text-sm">学号: {user.studentId}</p>
            <p className="text-blue-100 text-sm">手机: {user.phone}</p>
          </div>
        </div>
      </div>
      
      {/* 账户信息卡片 */}
      <div className="mx-4 -mt-4 bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-gray-500 text-xs">钱包余额</p>
            <p className="font-semibold text-lg">¥{user.balance}</p>
          </div>
          <div className="text-center border-l border-r border-gray-100 px-6">
            <p className="text-gray-500 text-xs">积分</p>
            <p className="font-semibold text-lg">{user.points}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">优惠券</p>
            <p className="font-semibold text-lg">{user.coupons}张</p>
          </div>
        </div>
      </div>
      
      {/* 功能菜单 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center justify-between p-4 ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">
                  {item.icon}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <FiChevronRight className="text-gray-400" />
            </div>
          ))}
        </div>
        
        {/* 退出登录按钮 */}
        <button className="mt-6 w-full py-3 flex items-center justify-center text-red-500 bg-white rounded-lg shadow-sm">
          <FiLogOut className="mr-2" />
          <span>退出登录</span>
        </button>
      </div>
      
      {/* 底部导航栏 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <div className="flex flex-col items-center">
          <FiHome className="text-gray-400" />
          <span className="text-xs mt-1 text-gray-500">首页</span>
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
          <FiUser className="text-blue-500" />
          <span className="text-xs mt-1 text-blue-500">我的</span>
        </div>
      </div>
    </div>
  );
} 