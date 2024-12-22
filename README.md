# ChatGPT-like Frontend Project

这是一个基于 Next.js 框架的前端项目，旨在模拟 ChatGPT 的用户界面和交互功能。

## 特性

- 用户可以输入问题并接收来自后端的实时回复
- 历史会话存储与管理
- 响应式设计，适应各种屏幕尺寸
- 使用 Redux 管理全局状态
- 与后端 API 的流畅集成

## 技术栈

- **前端**: 
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Redux](https://redux.js.org/)

- **后端**: 
  - Flask
  - Redis
  - Server-Sent Events (SSE)

## 安装与使用

1. 克隆仓库：

   ```bash
   git clone https://github.com/wen0523/nextjs-chat.git
   ```

2. 进入项目目录：

    ```bash
    cd chatgpt-like-frontend
    ```

3. 安装依赖：

    ```bash
    npm install
    ```
4. 运行开发服务器：

    ```bash
    npm run dev
    ```

5. 打开浏览器访问 http://localhost:3000