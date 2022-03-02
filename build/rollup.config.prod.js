import path from 'path'
import replace from '@rollup/plugin-replace'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

import plugins from './base/plugins/index.js'

const name = 'VueAccessibleSelect'

export default [
  {
    input: path.join(__dirname, '../src/index.js'),
    output: [
      {
        file: 'dist/vue-accessible-select.js',
        format: 'umd',
        name,
      },
      {
        file: 'dist/vue-accessible-select.common.js',
        format: 'cjs',
      },
      {
        file: 'dist/vue-accessible-select.esm.js',
        format: 'esm',
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ].concat(plugins),
  },
  {
    input: path.join(__dirname, '../src/index.js'),
    output: {
      file: 'dist/vue-accessible-select.min.js',
      format: 'umd',
      name,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      babel(),
      terser(),
    ].concat(plugins),
  },
]
