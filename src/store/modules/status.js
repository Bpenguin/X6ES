import { getNetworkStatusBarInfoApi } from '@/api/status'

const state = {
  mobileInfo: {
    con_method: 1,
    con_mode: 0,
    mobile_dns1: "",
    mobile_dns2: "",
    mobile_dnsv6_1: "",
    mobile_dnsv6_2: "",
    mobile_gateway: "",
    mobile_ip6_address: "",
    mobile_ip_address: "",
    mobile_netmask: "",
    mobile_status: 2,
    mobile_uptime: 0,
  },
  // SIMk卡状态
  simInfo: {
    data_state: 0,
    sim_card_state: 0,
    service_state: 0,
    signal_level: 0
  },
  simStatus: ''
}

const getters = {
  getMobileInfo (state) {
    return state.mobileInfo
  },
  getSimInfo (state) {
    return state.simInfo
  },
  getSimStatus (state) {
    return state.simInfo.sim_card_state
  }
}

const mutations = {
  SET_MOBILE_INFO (state, data) {
    if (!data) return
    state.mobileInfo = { ...data }

  },
  SET_SIM_INFO (state, data) {
    if (!data) return
    state.simInfo = { ...data }
    state.simStatus = data.sim_card_state
  },
}

const actions = {
  setMobileInfo ({ commit }, data) {
    commit('SET_MOBILE_INFO', data)
  },
  setSimInfo ({ commit }, data) {
    getNetworkStatusBarInfoApi({ hiddenLoading: true }).then((data) => {
      if (data.retcode == 0) {
        commit('SET_SIM_INFO', data)
      }
    })
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
