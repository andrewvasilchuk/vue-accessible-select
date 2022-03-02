const path = require('path')
const { defineConfig } = require('vite')
const { createVuePlugin } = require('vite-plugin-vue2')

module.exports = defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, '..', 'demo', 'index.js'),
        name: 'VueAccessibleSelect',
        fileName: format => `vue-accessible-select.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        input: path.resolve(__dirname, '..', 'src', 'index.js'),
      },
    },
    plugins: [createVuePlugin()],
    server: {
      port: 8080,
    },
  }
})
