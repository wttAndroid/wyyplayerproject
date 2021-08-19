import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.config.productionTip = false

// import * as utils from "./index"
import utils from './utils/index'
Vue.use(utils)

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
