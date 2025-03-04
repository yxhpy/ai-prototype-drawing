'use client';

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiMapPin, FiClock, FiCreditCard, FiDollarSign } from 'react-icons/fi';

export default function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState('微信支付');
  
  // 模拟订单数据
  const order = {
    id: 'SO12345678',
    restaurant: {
      name: '学生食堂',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    items: [
      { id: 1, name: '黄焖鸡米饭', price: 18, quantity: 1 },
      { id: 2, name: '可乐', price: 5, quantity: 1 },
    ],
    subtotal: 23,
    deliveryFee: 3,
    total: 26,
    address: {
      name: '张同学',
      phone: '138****1234',
      address: '大学城第一宿舍楼 3号楼 507室',
    },
    estimatedTime: '30-40分钟',
  };
  
  // 支付方式选项
  const paymentOptions = ['微信支付', '支付宝', '校园卡', '到付'];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex items-center">
        <button className="mr-4">
          <FiChevronLeft className="text-gray-700" size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">确认订单</h1>
        <div className="w-6"></div> {/* 占位，保持标题居中 */}
      </div>
      
      {/* 主要内容区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* 配送地址 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start">
            <FiMapPin className="text-blue-500 mt-1 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <span className="font-medium">{order.address.name}</span>
                  <span className="ml-3 text-gray-500">{order.address.phone}</span>
                </div>
              </div>
              <p className="text-gray-600 mt-1">{order.address.address}</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </div>
        </div>
        
        {/* 配送时间 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiClock className="text-blue-500 mr-3" />
              <span>预计送达时间</span>
            </div>
            <div className="text-gray-600">{order.estimatedTime}</div>
          </div>
        </div>
        
        {/* 餐厅和商品信息 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center">
            <div className="w-10 h-10 rounded overflow-hidden mr-3">
              <img 
                src={order.restaurant.image} 
                alt={order.restaurant.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">{order.restaurant.name}</span>
          </div>
          
          <div className="p-4">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between py-2">
                <div>
                  <div className="font-medium">{item.name}</div>
                </div>
                <div className="text-right">
                  <div>x{item.quantity}</div>
                  <div className="text-gray-600">¥{item.price}</div>
                </div>
              </div>
            ))}
            
            <div className="border-t border-gray-100 mt-3 pt-3">
              <div className="flex justify-between text-gray-600 text-sm mb-1">
                <span>小计</span>
                <span>¥{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm mb-1">
                <span>配送费</span>
                <span>¥{order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium mt-2">
                <span>合计</span>
                <span className="text-red-500">¥{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 支付方式 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3 flex items-center">
            <FiCreditCard className="text-blue-500 mr-2" />
            支付方式
          </h3>
          <div className="space-y-2">
            {paymentOptions.map(option => (
              <div 
                key={option}
                className="flex items-center justify-between p-2 rounded border border-gray-200"
                onClick={() => setPaymentMethod(option)}
              >
                <span>{option}</span>
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  {paymentMethod === option && (
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 备注 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-2">订单备注</h3>
          <textarea 
            placeholder="请输入备注信息，如不要辣、多加米饭等"
            className="w-full border border-gray-200 rounded p-2 text-sm"
            rows={2}
          ></textarea>
        </div>
      </div>
      
      {/* 底部支付按钮 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <div>
          <span className="text-gray-600 mr-1">实付:</span>
          <span className="text-red-500 font-medium text-lg">¥{order.total.toFixed(2)}</span>
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center">
          <FiDollarSign className="mr-1" />
          <span>立即支付</span>
        </button>
      </div>
    </div>
  );
} 