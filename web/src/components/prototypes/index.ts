// 视频生成项目组件
export const VIDEO_GENERATION_COMPONENTS = [
  'ScriptGenerationPage',
  'ResourceListPage',
  'ResourceUploadPage',
  'VoiceoverMatchingPage',
  'MusicListPage',
  'MusicUploadPage',
  'TransitionEffectsPage',
  'VideoGenerationPage'
];

// 用户认证项目组件
export const USER_AUTH_COMPONENTS = [
  'LoginPage',
  'RegisterPage'
];

// 产品相关项目组件
export const PRODUCT_COMPONENTS = [
  'ProductListPage'
];

// 校园外卖APP项目组件
export const CAMPUS_FOOD_DELIVERY_COMPONENTS = [
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

// 组件到项目类型的映射
export const COMPONENT_TO_PROJECT_TYPE: Record<string, string> = {};

// 注册视频生成项目组件
VIDEO_GENERATION_COMPONENTS.forEach(component => {
  COMPONENT_TO_PROJECT_TYPE[component] = 'video-generation';
});

// 注册用户认证项目组件
USER_AUTH_COMPONENTS.forEach(component => {
  COMPONENT_TO_PROJECT_TYPE[component] = 'user-auth';
});

// 注册产品相关项目组件
PRODUCT_COMPONENTS.forEach(component => {
  COMPONENT_TO_PROJECT_TYPE[component] = 'product';
});

// 注册校园外卖APP项目组件
CAMPUS_FOOD_DELIVERY_COMPONENTS.forEach(component => {
  COMPONENT_TO_PROJECT_TYPE[component] = 'campus-food-delivery';
}); 