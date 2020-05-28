import Vue from 'vue'
import Vuex from 'vuex'
import task from './modules/task'
import profile from './modules/profile'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  strict: true,
  modules: {
    task,
    profile,
    auth
  }
})
