# FE-MU 管理系统前端

基于 **React 19**、**Vite 7** 和 **Shadcn UI** 构建的高性能、现代化的管理系统前端框架。

## 🛠️ 运行环境要求

本项目采用了较前沿的技术栈，请确保你的开发环境满足以下版本要求：

- **Node.js**: `^24.13.1` 或更高版本
- **Package Manager**: [pnpm](https://pnpm.io/) `^10.30.2` 或更高版本

## 🚀 技术栈选型

* **核心框架**: [React 19](https://react.dev/) (已启用 React Compiler)
* **构建工具**: [Vite 7](https://vite.dev/)
* **路由管理**: [React Router 7](https://reactrouter.com/)
* **样式方案**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
* **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
* **数据表格**: [TanStack Table v8](https://tanstack.com/table/v8)
* **表单处理**: [React Hook Form](https://react-hook-form.com/)
* **网络请求**: [Axios](https://axios-http.com/)

## 📂 目录结构

```text
src/
├── api/            # 接口定义 (按业务模块划分)
├── components/     # 公共组件
│   ├── crud/       # 自动化 CRUD 配置化页面核心逻辑
│   ├── data-table/  # 基于 TanStack Table 的通用表格封装
│   └── ui/         # Shadcn UI 基础原子组件
├── layouts/        # 页面布局 (AdminLayout 等)
├── pages/          # 业务页面 (kebab-case 命名，如 login-log)
├── stores/         # Zustand 状态存储
├── styles/         # 全局样式 (Tailwind v4 配置文件)
├── types/          # 全局 TypeScript 类型
└── utils/          # 核心工具类 (axios 拦截器等)
```