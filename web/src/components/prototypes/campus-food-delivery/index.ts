import { registerProjectComponents } from '@/utils/projectRegistry';

// 校园外卖APP项目组件列表
const components = [
  'HomePage',
  'RestaurantDetailPage',
  'OrderPage',
  'ProfilePage',
  'OrderHistoryPage',
  'FavoritesPage',
  'CartPage',
  'AddressManagePage',
  'RatingPage',
  'LoginRegisterPage'
];

// 注册组件
registerProjectComponents('campus-food-delivery', components);

export default components; 