import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'

export default [resolve(), commonjs(), vue({ needMap: false })]
