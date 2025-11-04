# 🎮 SteamLease 游戏下载查询平台

[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?logo=vite)](https://vite.dev/)
[![Electron](https://img.shields.io/badge/Electron-39.x-47848F.svg?logo=electron)](https://www.electronjs.org/)
[![Deploy](https://img.shields.io/badge/Deployed-GitHub%20Pages-121013?logo=github)](https://brain9527.github.io/game_catalogue/)

> 一个基于 **Vue 3 + Vite + Electron** 的 Steam 游戏信息与下载查询平台。  
> 已成功部署到 GitHub Pages 👉 [在线访问](https://brain9527.github.io/game_catalogue/)

---

## ✨ 项目简介

**SteamLease 游戏下载查询平台** 是一个聚合型 Steam 游戏数据浏览工具。  
支持搜索、筛选、排序和导出游戏信息，提供清晰的卡片式展示界面。  
项目采用 Vue 3 + Vite 开发，并支持 Electron 打包为桌面端应用。

---

## 🧩 功能特性

| 功能模块              | 说明                                       |
| --------------------- | ------------------------------------------ |
| 🔍 **游戏查询**        | 按游戏名称、类型、平台等多条件查询         |
| 🧱 **多维筛选**        | 支持动作、冒险、模拟、策略、角色扮演等分类 |
| 💻 **平台过滤**        | PC、NS、PS4、PS5 等主机平台筛选            |
| 🕹️ **卡片展示**        | 显示游戏封面、标题、标签、发布时间等信息   |
| 📦 **JSON 导出**       | 可一键导出当前查询结果数据                 |
| ⚡ **响应式布局**      | 自动适配桌面和移动端                       |
| 🪟 **Electron 桌面版** | 一键打包为 Windows / macOS 可执行程序      |

---

## 🚀 在线体验

- **Web 版本（GitHub Pages）**  
  🔗 [https://brain9527.github.io/game_catalogue/](https://brain9527.github.io/game_catalogue/)

- **桌面版**  
  支持 Windows 与 macOS，打包命令见下方。

---

## 🛠️ 技术栈

| 分类     | 技术                                                         |
| -------- | ------------------------------------------------------------ |
| 前端框架 | [Vue 3](https://vuejs.org/)                                  |
| 构建工具 | [Vite](https://vite.dev/)                                    |
| 桌面打包 | [Electron 39](https://www.electronjs.org/) + [electron-builder](https://www.electron.build/) |
| UI 组件  | Element Plus                                                 |
| 部署方式 | GitHub Actions 自动构建 + Pages 静态托管                     |
| 语言     | JavaScript / TypeScript                                      |

---

## 🧰 本地开发

```bash
# 克隆项目
git clone https://github.com/brain9527/game_catalogue.git
cd game_catalogue

# 安装依赖
npm install

# 启动开发环境（默认端口 5173）
npm run dev
```

访问地址：`http://localhost:5173`

---

## 📦 打包与构建

### 🔹 构建 Web 版本

```bash
npm run build
```

生成静态资源目录：`dist/`  
可直接部署到 GitHub Pages、Netlify、Vercel 或任意静态服务器。

---

### 🔹 打包 Electron 桌面应用

#### Windows（x64 + ia32）

```bash
npm run build:win
```

输出目录：`release/`  
生成的文件包括：

- `资源大全 Setup x.x.x.exe`（安装版）
- `资源大全 x.x.x.exe`（便携版）

#### macOS（Apple Silicon）

```bash
npm run build:mac
```

输出目录：`release/`  
生成 `.dmg` 与 `.zip` 文件，可直接安装或分发。

---

## 🧠 项目结构概览

```
vue_game_catalogue/
├── src/                  # 前端源码
│   ├── components/       # 通用组件
│   ├── views/            # 页面组件
│   ├── assets/           # 静态资源
│   └── main.js           # 入口文件
├── electron/             # Electron 主进程文件
│   ├── main.cjs
│   └── preload.cjs
├── public/               # 公共静态资源
├── build/                # 图标及构建资源（icon.ico / icon.icns）
├── release/              # 打包输出目录
├── vite.config.ts        # Vite 配置
└── package.json          # 项目配置与脚本
```

---

## ⚙️ 部署流程说明

本项目使用 GitHub Actions 自动化构建部署。  
推送到 `main` 分支后会自动：

1. 安装依赖并运行 `npm run build`
2. 上传构建产物到 GitHub Pages
3. 自动发布到 `https://brain9527.github.io/game_catalogue/`

Actions 文件路径：

```
.github/workflows/deploy.yml
```

---

## 📄 License

MIT License © 2025 [Brian](mailto:hduanxiang@gmail.com)

---

> 💡 如果你觉得这个项目有帮助，欢迎点个 ⭐ 支持一下！
