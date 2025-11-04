# 🎮 SteamLease 游戏下载查询平台

[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?logo=vite)](https://vite.dev/)
[![Electron](https://img.shields.io/badge/Electron-39.x-47848F.svg?logo=electron)](https://www.electronjs.org/)
[![Deploy](https://img.shields.io/badge/Deployed-GitHub%20Pages-121013?logo=github)](https://brain9527.github.io/game_catalogue/)

> 一个基于 **Vue 3 + Vite + Element Plus** 的 Steam 游戏信息与下载查询平台。  
> 已部署到 GitHub Pages 👉 [在线访问](https://brain9527.github.io/game_catalogue/)

---

## ✨ 项目简介

SteamLease 游戏下载查询平台是一个聚合型 Steam 游戏数据浏览工具，支持快速检索、筛选和导出游戏信息。  
前端基于 **Vue 3 + Vite** 构建，提供简洁高效的交互体验，同时支持 **Electron 桌面端打包**。

---

## 🧩 核心功能

| 功能模块 | 说明 |
|-----------|------|
| 🔍 **游戏查询** | 支持按名称、平台、类型、标签等条件搜索游戏 |
| 🧱 **分类筛选** | 动作、冒险、角色扮演、模拟经营等多维筛选 |
| 💻 **多平台支持** | PC、NS、PS4、PS5 等主机类型快速切换 |
| 🕹️ **结果展示** | 游戏封面、标题、标签、Steam 链接清晰呈现 |
| 📦 **JSON 导出** | 一键导出当前查询结果为 JSON 文件 |
| ⚡ **响应式界面** | 自适应布局，兼容桌面与移动端浏览 |
| 🪟 **Electron 打包** | 可打包成 Windows/macOS 桌面应用 |

---

## 🚀 在线体验

- **GitHub Pages 部署地址**  
  👉 [https://brain9527.github.io/game_catalogue/](https://brain9527.github.io/game_catalogue/)

- **桌面端版本**  
  支持 Windows / macOS（基于 Electron 打包）。

---

## 🛠️ 技术栈

| 分类 | 使用技术 |
|------|-----------|
| 前端框架 | [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/) |
| UI 组件库 | [Element Plus](https://element-plus.org/) |
| 打包工具 | [Electron Builder](https://www.electron.build/) |
| 部署方式 | GitHub Pages + GitHub Actions 自动化部署 |
| 语言 | TypeScript / JavaScript |

---

## 🧰 本地开发

```bash
# 安装依赖
npm install

# 启动开发环境（默认端口 5173）
npm run dev

# 构建生产环境静态文件
npm run build

# 运行 Electron 桌面版（需先启动 dev 服务器）
npm run electron:dev
