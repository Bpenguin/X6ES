import { getWlanBasicInfo } from '@/api/wifi'
const state = {
  wifiInfo: {
    ssid: ''
  },
  wifiInfo_4G: {
    hzSwitch: true,
    freqband: '', // 2.4G频段
    ssid: '', // wifi 名称
    broadcast: 0, // 广播
    securitymode: 0, // 加密
    securitymode_filter: '', // 加密
    channel: '', // ?
    connectedDevice: '', // ?
    securitykey: '',
    isolate: ''
  },
  wifiInfo_5G: {
    hzSwitch: false,
    freqband: '', // 2.4G频段
    ssid: '', // wifi 名称
    broadcast: 0, // 广播
    securitymode: 0, // 加密
    securitymode_filter: '', // 加密
    channel: '', // ?
    connectedDevice: '', // ?
    securitykey: '',
    isolate: ''
  },
  wifiInfo_6G: {
    hzSwitch: false,
    freqband: '', // 2.4G频段
    ssid: '', // wifi 名称
    broadcast: 0, // 广播
    securitymode: 0, // 加密
    securitymode_filter: '', // 加密
    channel: '', // ?
    connectedDevice: '', // ?
    securitykey: '',
    isolate: ''
  }
}

const getters = {
  getWifiInfo (state) {
    return state.wifiInfo
  },
  getWifiInfo4G (state) {
    return state.wifiInfo_4G
  },
  getWifiInfo5G (state) {
    return state.wifiInfo_5G
  },
  getWifiInfo6G (state) {
    return state.wifiInfo_6G
  }
}

const mutations = {
  SET_WIFI_INFO (state, data) {
    if (!data) return
    // state.wifiInfo = { ...state.wifiInfo, ...data }
    // state.wifiInfo_4G = {}
    // state.wifiInfo_5G = {}
    // state.wifiInfo_6G = {}
    var x
    for (x in state.wifiInfo_4G) {
      // initData(data, 'host1')freqband
      state.wifiInfo_4G.hzSwitch = true
      state.wifiInfo_4G.ssid = data.Host1Ssid
      state.wifiInfo_4G.securitymode = data.Host1Securitymode
      state.wifiInfo_4G.securitykey = data.Host1Securitykey
      state.wifiInfo_4G.broadcast = data.Host1Broadcast
      state.wifiInfo_4G.isolate = data.Host1Isolate
    }
    if (data.Host2Freq == 1) {
      state.wifiInfo_5G.hzSwitch = true
      state.wifiInfo_6G.hzSwitch = false
      // state.wifiInfo_5G.ssid = data.Host2Ssid
      // state.wifiInfo_5G.securitymode = data.Host2Securitymode
      // state.wifiInfo_5G.securitykey = data.Host2Securitykey
      // state.wifiInfo_5G.broadcast = data.Host2Broadcast
      // state.wifiInfo_5G.isolate = data.Host2Isolate
    } else if (data.Host2Freq == 2) {
      state.wifiInfo_6G.hzSwitch = true
      state.wifiInfo_5G.hzSwitch = false
      // state.wifiInfo_6G.ssid = data.Host2Ssid
      // state.wifiInfo_6G.securitymode = data.Host2Securitymode
      // state.wifiInfo_6G.securitykey = data.Host2Securitykey
      // state.wifiInfo_6G.broadcast = data.Host2Broadcast
      // state.wifiInfo_6G.isolate = data.Host2Isolate
    }
    state.wifiInfo_5G.ssid = data.Host2Ssid
    state.wifiInfo_5G.securitymode = data.Host2Securitymode
    state.wifiInfo_5G.securitykey = data.Host2Securitykey
    state.wifiInfo_5G.broadcast = data.Host2Broadcast
    state.wifiInfo_5G.isolate = data.Host2Isolate
    state.wifiInfo_6G.ssid = data.Host2Ssid
    state.wifiInfo_6G.securitymode = data.Host2Securitymode
    state.wifiInfo_6G.securitykey = data.Host2Securitykey
    state.wifiInfo_6G.broadcast = data.Host2Broadcast
    state.wifiInfo_6G.isolate = data.Host2Isolate
  }
}
const actions = {
  setWifiInfo ({ commit }, data) {
    console.log('1111')
    return new Promise((resolve) => {
      getWlanBasicInfo().then((data) => {
        if (data.retcode == 0) {
          console.log('getWlanBasicInfo:response', data)
          commit('SET_WIFI_INFO', data)
          resolve(data)
        }
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
