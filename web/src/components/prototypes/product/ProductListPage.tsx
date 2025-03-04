'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: '智能手机 Pro',
    price: 4999,
    category: '电子产品',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=手机'
  },
  {
    id: 2,
    name: '超薄笔记本电脑',
    price: 6999,
    category: '电子产品',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=笔记本'
  },
  {
    id: 3,
    name: '无线耳机',
    price: 999,
    category: '配件',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=耳机'
  },
  {
    id: 4,
    name: '智能手表',
    price: 1599,
    category: '配件',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=手表'
  },
  {
    id: 5,
    name: '平板电脑',
    price: 3299,
    category: '电子产品',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=平板'
  },
  {
    id: 6,
    name: '智能音箱',
    price: 499,
    category: '家居',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=音箱'
  }
];

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['全部', '电子产品', '配件', '家居'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">商品列表</h2>
      
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex space-x-2 mb-4 md:mb-0">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="搜索商品..."
            className="w-full md:w-64 px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-red-600 font-bold">¥{product.price}</span>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                加入购物车
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">没有找到匹配的商品</p>
        </div>
      )}
    </div>
  );
} 