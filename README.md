# Next.js Chat Frontend

一个基于 Next.js 的现代化聊天应用前端界面。

## 功能特性

- 🎨 现代化 UI 设计，使用 Tailwind CSS 和 DaisyUI
- 💬 实时聊天功能，支持 Markdown 渲染
- 🌓 支持明暗主题切换
- 📱 响应式设计，适配移动端和桌面端
- 🔄 实时消息推送，使用 Server-Sent Events (SSE)
- 🎯 路由管理，支持多会话聊天
- 📝 代码语法高亮显示
- 📊 用户信息管理

## 技术栈

- **前端框架**: Next.js 14.2.4
- **UI 库**: Tailwind CSS + DaisyUI
- **状态管理**: Redux Toolkit
- **HTTP 客户端**: Axios
- **Markdown 渲染**: Marked + KaTeX 扩展
- **代码高亮**: Highlight.js
- **类型检查**: TypeScript
- **环境配置**: dotenv

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 根布局
│   └── [id]/              # 动态路由页面
├── components/            # React 组件
│   ├── icon/              # 图标组件
│   └── ui/                # UI 组件
└── lib/                   # 工具库
    ├── chat.ts           # 聊天相关功能
    ├── markdownParse.ts  # Markdown 解析
    └── store.ts          # Redux 存储
```

## 安装和运行

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
npm start
```

### 其他命令

```bash
npm run lint          # 代码检查
npm run start         # 启动生产服务器
```

## 环境配置

在项目根目录创建 `.env` 文件：

```env
# 后端 API 地址
NEXT_PUBLIC_API_URL=http://localhost:5000

# 其他环境变量
NEXT_PUBLIC_APP_NAME=Next.js Chat
```

## API 接口

前端与后端通过以下 API 接口通信：

- `POST /chat` - 发送聊天消息
- `POST /setBaInfor` - 设置用户信息
- `POST /getBaInfor` - 获取用户信息
- `POST /setallList` - 创建聊天列表
- `POST /getallList` - 获取聊天列表
- `POST /delallList` - 删除聊天列表
- `POST /setContent` - 保存聊天内容
- `POST /getContent` - 获取聊天内容

## 主要组件

### 页面组件
- `src/app/page.tsx` - 首页，显示聊天选项卡片
- `src/app/[id]/page.tsx` - 聊天页面

### UI 组件
- `src/components/ui/top.tsx` - 顶部导航栏
- `src/components/ui/bottom.tsx` - 底部输入区域
- `src/components/ui/side-block.tsx` - 侧边栏
- `src/components/ui/rightArea.tsx` - 右侧内容区域

### 工具库
- `src/lib/chat.ts` - 聊天逻辑和 SSE 连接
- `src/lib/markdownParse.ts` - Markdown 解析和渲染
- `src/lib/store.ts` - Redux 状态管理

## 开发说明

### 添加新功能

1. 在 `src/components/` 下创建新组件
2. 在 `src/lib/` 下添加工具函数
3. 更新 Redux store（如需要）
4. 在页面中引入和使用

### 样式定制

- 修改 `tailwind.config.js` 配置 Tailwind
- 使用 DaisyUI 组件类名
- 在 `src/app/globals.css` 中添加自定义样式

### 类型安全

项目使用 TypeScript，确保类型安全：
- 为组件 props 定义接口
- 为 API 响应定义类型
- 使用泛型提高代码复用性

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

### 其他平台

参考 Next.js 官方文档进行部署配置。

## 许可证

MIT License