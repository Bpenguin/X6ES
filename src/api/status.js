import request from '@/utils/request'
import store from '../store'
import QS from 'qs'


// 网络连接信息
export function getMobileInfoStatus (data) {
  return new Promise((resolve, reject) => {
    getMobileInfoStatusApi().then((res) => {
      console.log('getMobileInfoStatusApi:', res)
      store.dispatch('status/setMobileInfo', res)
      resolve(res)
    })
  })
}
export function getMobileInfoStatusApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_mobile_info', ...data }
  })
}

// 获取设备信息
export function getDeviceInfoStatusApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_device_info', ...data }
  })
}

// 获取 WAN 口 网络连接状态.
export function getWanConnectStatusApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wan_connect_status',
      ...data
    }
  })
}

// 获取 Ethernet WAN 口 网络连接状态.getEthernetConnectStatusApi
export function getEthernetConnectStatusApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_ethernet_connect_status',
      ...data
    }
  })
}

// 获取 WIFI开关 状态.
export function getWifiDetailsInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wifi_details_info',
      ...data
    }
  })
}


// 获取SIM卡状态信息
export function getNetworkStatusBarInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_network_status_bar_info',
      ...data
    }
  })
}
