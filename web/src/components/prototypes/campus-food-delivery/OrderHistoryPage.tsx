'use client';

import { useState } from 'react';
import { FiChevronLeft, FiClock, FiMapPin, FiStar } from 'react-icons/fi';

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  // 订单状态选项卡
  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'pending', label: '待付款' },
    { id: 'processing', label: '配送中' },
    { id: 'completed', label: '已完成' },
    { id: 'cancelled', label: '已取消' }
  ];
  
  // 模拟订单数据
  const orders = [
    {
      id: 'SO12345678',
      date: '2023-03-04 12:30',
      status: 'completed',
      statusText: '已完成',
      restaurant: {
        name: '学生食堂',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      items: [
        { name: '黄焖鸡米饭', price: 18, quantity: 1 },
        { name: '可乐', price: 5, quantity: 1 },
      ],
      total: 26,
      isRated: true,
      rating: 5
    },
    {
      id: 'SO12345679',
      date: '2023-03-03 18:45',
      status: 'completed',
      statusText: '已完成',
      restaurant: {
        name: '麦当劳校园店',
        image: 'https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      items: [
        { name: '巨无霸套餐', price: 32, quantity: 1 },
        { name: '薯条', price: 8, quantity: 1 },
      ],
      total: 40,
      isRated: true,
      rating: 4
    },
    {
      id: 'SO12345680',
      date: '2023-03-03 12:15',
      status: 'processing',
      statusText: '配送中',
      restaurant: {
        name: '星巴克校园店',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      items: [
        { name: '拿铁咖啡', price: 28, quantity: 1 },
        { name: '提拉米苏', price: 22, quantity: 1 },
      ],
      total: 50,
      isRated: false
    },
    {
      id: 'SO12345681',
      date: '2023-03-02 19:30',
      status: 'pending',
      statusText: '待付款',
      restaurant: {
        name: '川湘小厨',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      items: [
        { name: '麻辣香锅', price: 45, quantity: 1 },
        { name: '米饭', price: 2, quantity: 2 },
      ],
      total: 49,
      isRated: false
    },
    {
      id: 'SO12345682',
      date: '2023-03-01 20:15',
      status: 'cancelled',
      statusText: '已取消',
      restaurant: {
        name: '学生食堂',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      items: [
        { name: '红烧牛肉面', price: 16, quantity: 1 },
      ],
      total: 16,
      isRated: false
    }
  ];
  
  // 根据当前选中的选项卡过滤订单
  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);
  
  // 获取订单状态对应的颜色
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'text-yellow-500';
      case 'processing': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      case 'cancelled': return 'text-gray-500';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex items-center">
        <button className="mr-4">
          <FiChevronLeft className="text-gray-700" size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">我的订单</h1>
        <div className="w-6"></div> {/* 占位，保持标题居中 */}
      </div>
      
      {/* 订单状态选项卡 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
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
      
      {/* 订单列表 */}
      <div className="flex-1 overflow-auto p-4">
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* 订单头部 */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded overflow-hidden mr-3">
                      <img 
                        src={order.restaurant.image} 
                        alt={order.restaurant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{order.restaurant.name}</span>
                  </div>
                  <span className={getStatusColor(order.status)}>{order.statusText}</span>
                </div>
                
                {/* 订单内容 */}
                <div className="p-4">
                  {/* 订单商品 */}
                  <div className="mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.name} x{item.quantity}</span>
                        <span className="text-gray-600">¥{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* 订单信息 */}
                  <div className="text-xs text-gray-500 space-y-1 mb-3">
                    <div className="flex items-center">
                      <FiClock className="mr-1" />
                      <span>下单时间: {order.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      <span>配送至: 大学城第一宿舍楼 3号楼 507室</span>
                    </div>
                    {order.isRated && (
                      <div className="flex items-center">
                        <FiStar className="mr-1 text-yellow-400" />
                        <span>我的评分: {order.rating}星</span>
                      </div>
                    )}
                  </div>
                  
                  {/* 订单总价和操作按钮 */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="font-medium">
                      <span className="text-gray-500 text-sm mr-1">合计:</span>
                      <span className="text-red-500">¥{order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2">
                      {order.status === 'completed' && !order.isRated && (
                        <button className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded">
                          评价
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <button className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded">
                          再来一单
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                          去支付
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded">
                          查看配送
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>暂无订单</p>
          </div>
        )}
      </div>
    </div>
  );
} 