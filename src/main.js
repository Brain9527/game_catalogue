// src/main.js
// 入口：挂载 App，加载全局样式
import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.css'   // 全局基础样式

createApp(App).mount('#app')
