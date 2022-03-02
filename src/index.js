import VueAccessibleSelect from './components/VueAccessibleSelect/VueAccessibleSelect.vue'

import config from './config'

const Plugin = {
  install(app) {
    app.component('VueAccessibleSelect', VueAccessibleSelect)
  },
}

export default Plugin

export { VueAccessibleSelect, config }
