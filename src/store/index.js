import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import user from './modules/user'
import wifi from './modules/wifi'
import device from './modules/device'
import status from './modules/status'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    wifi,
    device,
    status
  },
  getters
})