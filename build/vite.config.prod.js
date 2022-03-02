const path = require('path')
const vuePlugin = require('@vitejs/plugin-vue')
const { default: pugPlugin } = require('vite-plugin-pug')
const { defineConfig } = require('vite')

module.exports = defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, '..', 'demo', 'index.js'),
        name: 'VueAccessibleSelect',
        fileName: (format) => `vue-accessible-select.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        input: path.resolve(__dirname, '..', 'src', 'index.js'),
      },
    },
    plugins: [pugPlugin(), vuePlugin()],
  }
})
