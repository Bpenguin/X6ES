const state = {
  loginInfo: {
    login_flag: '', // 快速导航标记
    priKey: '' // 登录密码加密的key
  },
  showNav: false,
  token: '' // token
}

const getters = {
  getLoginInfo (state) {
    return state.loginInfo
  },
  getShowNav (state) {
    return state.showNav
  },
  getLoginFlag (state) {
    return state.loginInfo.login_flag
  },
  getPriKey (state) {
    return state.loginInfo.priKey
  },
  getToken (state) {
    return state.token
  }
}

const mutations = {
  SET_LOGIN_INFO (state, data) {
    if (!data) return
    state.loginInfo = data
  },
  SET_TOKEN (state, data) {
    state.token = data
  },
  SET_SHOW_NAV (state, data) {
    state.showNav = data
  }
}

const actions = {
  setLoginInfo ({ commit }, data) {
    commit('SET_LOGIN_INFO', data)
  },
  setToken ({ commit }, data) {
    commit('SET_TOKEN', data)
  },
  setShowNav ({ commit }, data) {
    commit('SET_SHOW_NAV', data)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
