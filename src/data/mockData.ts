import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'video-generation',
    name: '文生成视频平台',
    description: 'AI驱动的文本到视频生成平台，支持自动生成文案、资源管理、口播匹配、背景音乐和视频合成',
    thumbnail: '/images/projects/video-generation.jpg',
    modules: [
      {
        id: 'module-1',
        name: '自动生成文案',
        description: '基于AI技术自动生成视频文案',
        pages: [
          {
            id: 'page-1-1',
            title: '文案生成页面',
            description: '输入关键词和主题，自动生成视频文案',
            componentPath: 'ScriptGenerationPage',
          }
        ],
      },
      {
        id: 'module-2',
        name: '资源管理',
        description: '管理视频制作所需的图片和视频资源',
        pages: [
          {
            id: 'page-2-1',
            title: '资源列表页面',
            description: '查看和管理所有上传的资源',
            componentPath: 'ResourceListPage',
          },
          {
            id: 'page-2-2',
            title: '资源添加页面',
            description: '上传新的图片或视频资源',
            componentPath: 'ResourceUploadPage',
          }
        ],
      },
      {
        id: 'module-3',
        name: '口播匹配画面',
        description: '将口播内容与视觉元素匹配',
        pages: [
          {
            id: 'page-3-1',
            title: '口播匹配页面',
            description: '将文案段落与视觉资源匹配',
            componentPath: 'VoiceoverMatchingPage',
          }
        ],
      },
      {
        id: 'module-4',
        name: '背景音乐',
        description: '管理视频背景音乐',
        pages: [
          {
            id: 'page-4-1',
            title: '音乐列表页面',
            description: '查看和管理背景音乐库',
            componentPath: 'MusicListPage',
          },
          {
            id: 'page-4-2',
            title: '音乐上传页面',
            description: '上传新的背景音乐',
            componentPath: 'MusicUploadPage',
          }
        ],
      },
      {
        id: 'module-5',
        name: '视频合成',
        description: '将所有元素合成为最终视频',
        pages: [
          {
            id: 'page-5-1',
            title: '专场动画管理',
            description: '管理视频中的转场动画效果',
            componentPath: 'TransitionEffectsPage',
          },
          {
            id: 'page-5-2',
            title: '一键生成视频',
            description: '将所有元素合成为最终视频',
            componentPath: 'VideoGenerationPage',
          }
        ],
      }
    ],
  }
]; 