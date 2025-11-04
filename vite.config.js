import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
    ...(mode === 'development'
      ? [
          electron({
            main: { entry: 'electron/main.cjs' },
            preload: { input: { preload: 'electron/preload.cjs' } },
          }),
          electronRenderer(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/cloudauth': {
        target: 'https://cloudauth-device.aliyuncs.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/steamlease/, ''),
      },
      '/steamlease': {
        target: 'https://api.steamlease.cn',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/steamlease/, ''),
      },
    },
  },
  build: {
    outDir: 'dist', // 打包输出目录
  },
}))