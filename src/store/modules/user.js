const state = {
  loginInfo: {
    login_flag: '', // 快速导航标记
    priKey: '' // 登录密码加密的key
  },
  showNav: false,
  token: '', // token
  defaultLoginPwd: false
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
  },
  getDefaultLoginPwd (state) {
    let tempStatus = state.defaultLoginPwd
    console.log('tempStatus:', tempStatus)
    if (!tempStatus) {
      tempStatus = sessionStorage.getItem('login_flag') == 2 ? true : false
      console.log('tempStatus:', tempStatus)
    }
    return tempStatus
  },
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
  },
  SET_DEFAULTLOGINPWD: (state, pwdStatus) => {
    state.defaultLoginPwd = pwdStatus
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
  },

  setDefaultLoginPwd ({ commit }, data) {
    commit('SET_DEFAULTLOGINPWD', data)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
