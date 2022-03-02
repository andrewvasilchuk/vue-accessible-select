const path = require('path')
const vuePlugin = require('@vitejs/plugin-vue')
const { default: pugPlugin } = require('vite-plugin-pug')
const { defineConfig } = require('vite')

module.exports = defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        external: ['vue'],
        input: path.resolve(__dirname, '..', 'demo', 'index.js'),
        output: {
          file: path.resolve(__dirname, '..', 'demo', 'demo.js'),
          format: 'iife',
          sourcemap: true,
        },
      },
    },
    plugins: [pugPlugin(), vuePlugin()],
    server: {
      base: path.resolve(__dirname, '..', 'demo'),
      open: true,
      port: 8080,
    },
  }
})
