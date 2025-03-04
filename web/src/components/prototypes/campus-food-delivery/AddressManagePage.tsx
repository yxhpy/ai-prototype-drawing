'use client';

import { useState } from 'react';
import { FiChevronLeft, FiPlus, FiEdit2, FiTrash2, FiMapPin, FiCheck } from 'react-icons/fi';

export default function AddressManagePage() {
  // 模拟地址数据
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: '张同学',
      phone: '138****1234',
      address: '大学城第一宿舍楼 3号楼 507室',
      isDefault: true,
      tag: '宿舍'
    },
    {
      id: 2,
      name: '张同学',
      phone: '138****1234',
      address: '大学城图书馆',
      isDefault: false,
      tag: '学校'
    },
    {
      id: 3,
      name: '张同学',
      phone: '138****1234',
      address: '大学城第二食堂旁边',
      isDefault: false,
      tag: '食堂'
    }
  ]);
  
  // 是否显示新增/编辑地址表单
  const [showForm, setShowForm] = useState(false);
  
  // 当前编辑的地址
  const [currentAddress, setCurrentAddress] = useState<any>(null);
  
  // 表单数据
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    tag: '宿舍',
    isDefault: false
  });
  
  // 可选标签
  const tags = ['宿舍', '学校', '食堂', '公司', '家', '其他'];
  
  // 打开新增地址表单
  const openAddForm = () => {
    setCurrentAddress(null);
    setFormData({
      name: '',
      phone: '',
      address: '',
      tag: '宿舍',
      isDefault: false
    });
    setShowForm(true);
  };
  
  // 打开编辑地址表单
  const openEditForm = (address: any) => {
    setCurrentAddress(address);
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      tag: address.tag,
      isDefault: address.isDefault
    });
    setShowForm(true);
  };
  
  // 关闭表单
  const closeForm = () => {
    setShowForm(false);
  };
  
  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 处理复选框变化
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // 处理标签选择
  const handleTagSelect = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tag
    }));
  };
  
  // 保存地址
  const saveAddress = () => {
    if (currentAddress) {
      // 更新现有地址
      setAddresses(prev => {
        const newAddresses = prev.map(addr => {
          if (addr.id === currentAddress.id) {
            return {
              ...addr,
              ...formData
            };
          }
          // 如果当前地址设为默认，其他地址取消默认
          if (formData.isDefault && addr.id !== currentAddress.id) {
            return {
              ...addr,
              isDefault: false
            };
          }
          return addr;
        });
        return newAddresses;
      });
    } else {
      // 添加新地址
      const newAddress = {
        id: Date.now(),
        ...formData
      };
      
      setAddresses(prev => {
        // 如果新地址设为默认，其他地址取消默认
        const updatedAddresses = formData.isDefault 
          ? prev.map(addr => ({ ...addr, isDefault: false }))
          : [...prev];
        
        return [...updatedAddresses, newAddress];
      });
    }
    
    setShowForm(false);
  };
  
  // 删除地址
  const deleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };
  
  // 设为默认地址
  const setAsDefault = (id: number) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {showForm ? (
        // 地址表单
        <>
          {/* 表单顶部导航 */}
          <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex items-center">
            <button className="mr-4" onClick={closeForm}>
              <FiChevronLeft className="text-gray-700" size={24} />
            </button>
            <h1 className="text-lg font-semibold flex-1 text-center">
              {currentAddress ? '编辑地址' : '新增地址'}
            </h1>
            <div className="w-6"></div>
          </div>
          
          {/* 表单内容 */}
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">联系人</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="请输入姓名"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">手机号码</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="请输入手机号"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">详细地址</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="请输入详细地址，如宿舍楼栋、房间号等"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  rows={3}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">地址标签</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${
                        formData.tag === tag 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">设为默认地址</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* 保存按钮 */}
          <div className="p-4 bg-white border-t border-gray-200">
            <button 
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium"
              onClick={saveAddress}
            >
              保存
            </button>
          </div>
        </>
      ) : (
        // 地址列表
        <>
          {/* 顶部导航 */}
          <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex items-center">
            <button className="mr-4">
              <FiChevronLeft className="text-gray-700" size={24} />
            </button>
            <h1 className="text-lg font-semibold flex-1 text-center">收货地址</h1>
            <div className="w-6"></div>
          </div>
          
          {/* 地址列表 */}
          <div className="flex-1 overflow-auto p-4">
            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map(address => (
                  <div key={address.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{address.name}</span>
                          <span className="ml-3 text-gray-500">{address.phone}</span>
                          {address.isDefault && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-500 text-xs rounded">
                              默认
                            </span>
                          )}
                        </div>
                        <div className="flex items-start mt-2">
                          <FiMapPin className="text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{address.address}</p>
                        </div>
                        <div className="mt-2">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {address.tag}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button 
                          className="text-gray-400"
                          onClick={() => openEditForm(address)}
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          className="text-gray-400"
                          onClick={() => deleteAddress(address.id)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {!address.isDefault && (
                      <button 
                        className="mt-3 text-sm text-blue-500 flex items-center"
                        onClick={() => setAsDefault(address.id)}
                      >
                        <FiCheck className="mr-1" size={14} />
                        设为默认
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiMapPin className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-500">暂无收货地址</p>
              </div>
            )}
          </div>
          
          {/* 添加地址按钮 */}
          <div className="p-4 bg-white border-t border-gray-200">
            <button 
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center"
              onClick={openAddForm}
            >
              <FiPlus className="mr-1" />
              新增收货地址
            </button>
          </div>
        </>
      )}
    </div>
  );
} 