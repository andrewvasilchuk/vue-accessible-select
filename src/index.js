import VueAccessibleSelect from './components/VueAccessibleSelect/VueAccessibleSelect.vue'

import config from './config'

const Plugin = {
  instal(Vue, options = {}) {
    // Make sure that plugin can be installed only once
    if (this.installed) {
      return
    }

    this.installed = true

    if (options.transition) {
      this.transition = options.transition
    }

    Vue.component('VueAccessibleSelect', VueAccessibleSelect)
  },
}

export default Plugin

export { VueAccessibleSelect, config }
