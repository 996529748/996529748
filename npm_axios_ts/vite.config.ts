import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'
import vue from '@vitejs/plugin-vue'
const path  = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      useSource: true,
    }),
  ],
  //构建选项
  build:{
    outDir:'lib',
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      name: 'customAxios',
      fileName: (format) => `customAxios.${format}.js`
    },
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ['vue'],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // },
    // minify: "esbuild",// 压缩
    // brotliSize: false, // 进行压缩计算
  }
})
