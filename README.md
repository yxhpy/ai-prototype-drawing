# 产品原型展示平台

这是一个用于展示网站/APP产品原型图的框架，可以按项目分类展示不同的产品原型。每个页面展示的是完整的代码支撑的交互式原型，而不是静态图片。

## 功能特点

- 项目列表页面：展示所有产品项目
- 项目详情页面：左侧显示模块列表，右侧展示页面原型
- 模块化组织：每个项目包含多个模块，每个模块包含多个页面
- 响应式设计：适配不同屏幕尺寸的设备
- 交互式原型：每个页面展示的是可交互的原型，而不是静态图片
- 项目分类：原型组件按项目类型分类存储和加载

## 技术栈

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion (动画效果)

## 安装和运行

1. 克隆仓库

```bash
git clone <仓库地址>
cd ai-prototype-drawing
```

2. 安装依赖

```bash
npm install
npm install framer-motion react-icons
```

3. 运行开发服务器

```bash
npm run dev
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
├── app/                  # Next.js 应用目录
│   ├── page.tsx          # 首页
│   ├── projects/         # 项目详情页面
│   │   └── [projectId]/  # 动态路由
│   │       └── page.tsx  # 项目详情页面
├── components/           # React 组件
│   ├── ProjectCard.tsx   # 项目卡片组件
│   ├── ModuleList.tsx    # 模块列表组件
│   ├── PageCard.tsx      # 页面卡片组件
│   ├── PageGrid.tsx      # 页面网格组件
│   ├── ZoomablePrototype.tsx # 可缩放原型容器
│   ├── PrototypeLoader.tsx # 原型加载器组件
│   └── prototypes/       # 原型组件目录
│       ├── video-generation/ # 视频生成项目原型
│       │   ├── ScriptGenerationPage.tsx
│       │   ├── ResourceListPage.tsx
│       │   └── ...
│       ├── user-auth/    # 用户认证项目原型
│       │   ├── LoginPage.tsx
│       │   └── RegisterPage.tsx
│       └── product/      # 产品相关项目原型
│           └── ProductListPage.tsx
├── data/                 # 数据文件
│   └── mockData.ts       # 示例数据
└── types/                # TypeScript 类型定义
    └── index.ts          # 类型定义文件
```

## 添加新项目

要添加新的项目，请按照以下步骤操作：

1. 在 `src/data/projects/` 目录下创建新的项目配置文件，例如 `my-new-project.ts`：

```ts
import { Project } from '@/types';

const myNewProject: Project = {
  id: 'my-new-project',
  name: '我的新项目',
  description: '新项目描述',
  thumbnail: '/images/projects/my-new-project.jpg',
  modules: [
    {
      id: 'module-1',
      name: '模块1',
      description: '模块1描述',
      pages: [
        {
          id: 'page-1-1',
          title: '页面1',
          description: '页面1描述',
          componentPath: 'MyNewPage1',
        },
        // 更多页面...
      ],
    },
    // 更多模块...
  ],
};

export default myNewProject;
```

2. 在 `src/data/projects/index.ts` 文件中导入并添加新项目：

```ts
import { Project } from '@/types';
import videoGeneration from './video-generation';
import campusFoodDelivery from './campus-food-delivery';
import myNewProject from './my-new-project'; // 导入新项目

// 所有项目的集合
const projects: Project[] = [
  videoGeneration,
  campusFoodDelivery,
  myNewProject, // 添加新项目
  // 在这里添加更多项目...
];

export default projects;
```

3. 在 `public/images/projects/` 目录下添加项目封面图片。

## 添加新原型组件

### 1. 创建项目组件目录

如果是新项目类型，在 `src/components/prototypes/` 目录下创建新的项目目录：

```
src/components/prototypes/my-new-project/
```

### 2. 注册项目组件

在项目目录下创建 `index.ts` 文件，注册项目组件：

```ts
// src/components/prototypes/my-new-project/index.ts
import { registerProjectComponents } from '@/utils/projectRegistry';

// 项目组件列表
const components = [
  'MyNewPage1',
  'MyNewPage2',
  // 更多组件...
];

// 注册组件
registerProjectComponents('my-new-project', components);

export default components;
```

### 3. 创建组件文件

在项目目录下创建组件文件：

```tsx
// src/components/prototypes/my-new-project/MyNewPage1.tsx
'use client';

import { useState } from 'react';

export default function MyNewPage1() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">我的新页面</h2>
      <p>当前计数: {count}</p>
      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(count + 1)}
      >
        增加计数
      </button>
    </div>
  );
}
```

### 4. 导入项目组件注册文件

在应用启动时导入项目组件注册文件，确保组件被正确注册。

在 `src/app/layout.tsx` 或其他合适的地方导入：

```tsx
// 导入项目组件注册
import '@/components/prototypes/my-new-project';
```

这样，系统就会自动加载和注册新项目的组件。

## 开发建议

1. 每个原型组件应该是独立的，不依赖于其他组件。
2. 使用 `'use client'` 指令确保组件在客户端渲染。
3. 尽量使用 Tailwind CSS 进行样式设计，保持一致的设计风格。
4. 对于复杂的交互，可以使用 Framer Motion 添加动画效果。
5. 原型组件应该专注于展示UI和基本交互，不需要实现完整的业务逻辑。

## 许可证

MIT

## 如果你在使用curosr编写代码请遵守如下规则
- 初始化项目原型的时候，请先完成1-3个页面即可，不易太多先让用户确认好样式和需求后再往下继续
- 没完成一次编码后，提供用户1-3条建议，方便用户继续维护项目原型
- 使用 unsplash 加载示例图片
- 编写代码的时候注意项目属于PC还是APP，并且要观察同项目风格，防止出现风格不一致的页面
- 框架如何变更了，请及时更新本文件 @README.md