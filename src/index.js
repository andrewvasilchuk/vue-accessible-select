import VueAccessibleSelect from './components/VueAccessibleSelect/VueAccessibleSelect.vue'

import config from './config'

const Plugin = {
  instal(Vue) {
    // Make sure that plugin can be installed only once
    if (this.installed) {
      return
    }

    Vue.component('VueAccessibleSelect', VueAccessibleSelect)
  },
}

export default Plugin

export { VueAccessibleSelect, config }
