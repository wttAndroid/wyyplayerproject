import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import musicModule from './module/music'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    musicModule
  }
})
