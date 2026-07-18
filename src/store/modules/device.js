import { constantRouters } from '@/router'
const state = {
  deviceInfo: {
    "device_module_version": '',  // module版本号
    "device_software_version": "", // 软件版本号
    "device_hardwar e_version": "", // 硬件版本号
    "device_name": "", // 设备名称
    "device_imei": "", // IMEI 号
    "device_lan_Mac": "", // MAC 地址
    "device_lan_ip": "", // IP 地址
    "device_lan_netma sk": "", // 网络掩码
    "device_uuid": "" // UUID
  }
}

const getters = {
  getDeviceInfo (state) {
    return state.deviceInfo
  }
}

const mutations = {
  SET_DEVICE_INFO (state, deviceInfo) {
    if (!deviceInfo) return
    state.deviceInfo = deviceInfo
  }
}

const actions = {
  setDeviceInfo ({ commit }, data) {
    commit('SET_DEVICE_INFO', data)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
