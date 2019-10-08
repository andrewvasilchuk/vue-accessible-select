import Vue from 'vue'
import App from './App.vue'
import VueAccessibleSelectPlugin from '../src'

Vue.config.productionTip = false

Vue.use(VueAccessibleSelectPlugin)

new Vue({
  el: '#app',
  render: h => h(App),
})
