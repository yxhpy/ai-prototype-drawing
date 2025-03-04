import { Project } from '@/types';
import videoGeneration from './video-generation';
import campusFoodDelivery from './campus-food-delivery';

// 所有项目的集合
const projects: Project[] = [
  videoGeneration,
  campusFoodDelivery,
  // 在这里添加新项目...
];

export default projects; 