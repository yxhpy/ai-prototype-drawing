import { Project } from '@/types';

const campusFoodDelivery: Project = {
  id: 'campus-food-delivery',
  name: '校园外卖APP',
  description: '为大学校园提供便捷的外卖订餐服务，支持多家校内餐厅，提供快速配送到宿舍楼',
  thumbnail: '/images/projects/campus-food-delivery.jpg',
  modules: [
    {
      id: 'module-1',
      name: '首页与发现',
      description: '浏览校园餐厅和美食',
      pages: [
        {
          id: 'page-1-1',
          title: '首页',
          description: '展示热门餐厅和美食分类',
          componentPath: 'HomePage',
        }
      ],
    },
    {
      id: 'module-2',
      name: '餐厅与点餐',
      description: '查看餐厅详情和菜单',
      pages: [
        {
          id: 'page-2-1',
          title: '餐厅详情页',
          description: '展示餐厅信息和菜单，支持添加商品到购物车',
          componentPath: 'RestaurantDetailPage',
        },
        {
          id: 'page-2-2',
          title: '购物车页面',
          description: '管理购物车中的商品，支持结算',
          componentPath: 'CartPage',
        }
      ],
    },
    {
      id: 'module-3',
      name: '订单与支付',
      description: '管理订单和支付流程',
      pages: [
        {
          id: 'page-3-1',
          title: '订单确认页',
          description: '确认订单信息和支付方式',
          componentPath: 'OrderPage',
        },
        {
          id: 'page-3-2',
          title: '订单历史页',
          description: '查看历史订单和订单状态',
          componentPath: 'OrderHistoryPage',
        },
        {
          id: 'page-3-3',
          title: '订单评价页',
          description: '对已完成的订单进行评价和打分',
          componentPath: 'RatingPage',
        }
      ],
    },
    {
      id: 'module-4',
      name: '个人中心',
      description: '用户个人信息和功能',
      pages: [
        {
          id: 'page-4-1',
          title: '个人中心页',
          description: '展示用户信息和功能入口',
          componentPath: 'ProfilePage',
        },
        {
          id: 'page-4-2',
          title: '收藏页面',
          description: '展示用户收藏的餐厅和食品',
          componentPath: 'FavoritesPage',
        },
        {
          id: 'page-4-3',
          title: '地址管理页',
          description: '管理用户的收货地址',
          componentPath: 'AddressManagePage',
        }
      ],
    },
    {
      id: 'module-5',
      name: '用户账户',
      description: '用户登录、注册和账户管理',
      pages: [
        {
          id: 'page-5-1',
          title: '登录注册页',
          description: '用户登录和注册功能，支持第三方登录和找回密码',
          componentPath: 'LoginRegisterPage',
        }
      ],
    }
  ],
};

export default campusFoodDelivery; 