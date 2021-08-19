import * as utils from './base.js'

export default {
  install(Vue) {
    Vue.prototype.$utils = utils
  }
}
