import request from '@/utils/request'
import QS from 'qs'

// 获取Wlan状态信息
export function getWlanBasicInfo (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wlan_basic_info',
      ...data
    }
  })
}
// 获取WIFI接入总数
export function getWifiClientInfo (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wifi_client_info',
      ...data
    }
  })
}
// 设置Wlan状态信息
export function setWlanBasicInfo (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wlan_basic_exe', ...data }))
}


// 获取Wlan开关信息
export function getWlanSwicthInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wlan_swicth_info',
      ...data
    }
  })
}

// 设置获取Wlan开关
export function setWlanSwicthApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wlan_swicth_exe', ...data }))
}

// 获取advanced setting状态信息
export function getAdvancedSettingInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wlan_advanced_info',
      ...data
    }
  })
}

// 设置advanced setting状态信息
export function setAdvancedSettingInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wlan_advanced_exe', ...data }))
}

// 获取advanced setting状态信息
export function getAdvanced1SettingInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wlan1_advanced_info',
      ...data
    }
  })
}

// 设置advanced setting状态信息
export function setAdvanced1SettingInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wlan1_advanced_exe', ...data }))
}

// 获取WIFI Mac filter信息
export function getLanMacFilterInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_lan_mac_filter',
      ...data
    }
  })
}

// 设置WIFI Mac filter信息
export function setLanMacFilterInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_lan_mac_filter', ...data }))
}


// 获取WIFI Mac filter开关信息
export function getLanMacFilterSwitch (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_lan_mac_filter_switch',
      ...data
    }
  })
}

// 设置WIFI Mac filter 开关信息
export function setLanMacFilterSwitch (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_lan_mac_filter_switch', ...data }))
}

// 获取wps开关信息
export function getWpsStatusInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wps_status_info',
      ...data
    }
  })
}


// 获取开启的WIFI SSID
export function getWifiStatusBarInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wifi_status_bar_info',
      ...data
    }
  })
}

// 获取wps信息
export function getWpsStateApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wps_state',
      ...data
    }
  })
}

// 获取wps 默认pin码信息
export function getWpsApDefaultPinCodeApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wps_ap_default_pin_code',
      ...data
    }
  })
}

// 获取wps 随机pin码信息
export function getWpsApRandomPinCodeApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wps_ap_random_pin_code',
      ...data
    }
  })
}

// 取消WPS
export function cancelWpsConnectCancelApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_wps_connect_cancel', ...data }))
}


// 获取wps 连接状态
export function getWpsConnectStateApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wps_connect_state',
      ...data
    }
  })
}

// 设置WPS 开关信息
export function setWpsConnectApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wps_connect_exe', ...data }))
}

// 设置WPS 开关
export function setWpsSwitchStateExe (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wps_switch_state_exe', ...data }))
}


// 获取guest 开关状态
export function getWlanGuestControlInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wlan_guest_control_info',
      ...data
    }
  })
}

// 设置guest 开关状态
export function setWlanGuestControlInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wlan_guest_control_exe', ...data }))
}

// 获取guest WIFI信息
export function getWlanGuestBasicInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wlan_guest_basic_info',
      ...data
    }
  })
}

// 设置guest WIFI信息
export function setWlanGuestBasicInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wlan_guest_basic_exe', ...data }))
}

// 获取ACE 信息
export function webWlanAcsGetApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_wlan_acs_get',
      ...data
    }
  })
}

// 设置ACE 信息
export function webWlanAcsSetApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_wlan_acs_set', ...data }))
}

// 获取ACE 信息
export function webWlanAcsResultApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_wlan_acs_result',
      ...data
    }
  })
}

// 获取WIFI Mac filter信息
export function getBlockedDeviceInfo (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_blocked_device_info',
      ...data
    }
  })
}

// 设置WIFI Mac filter 信息
export function setBlockedDeviceExe (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_blocked_device_exe', ...data }))
}

// 设置WIFI Mac filter 信息
export function delBlockedDeviceExe (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_blocked_device_exe', ...data }))
}

// 编辑WIFI Mac filter 信息
export function editBlockedDeviceExe (data) {
  return request.post('', QS.stringify({ CgiName: 'web_edit_blocked_device_exe', ...data }))
}


// 获取国家码
export function getWlanCountryCodeInfo (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wlan_country_code_info',
      ...data
    }
  })
}

// 设置国家码
export function setWlanCountryCodeApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wlan_country_code_exe', ...data }))
}

// 获取家长控制规则表
export function getLimitVisitTimeApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_limit_visit_time_exe',
      ...data
    }
  })
}

// 设置家长控制规则表
export function setLimitVisitTimeApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_limit_visit_time_exe', ...data }))
}

// 清空家长控制规则表
export function delAllLimitVisitApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_all_limit_visit_exe', ...data }))
}

// 启用家长控制规则表
export function setLimitVisitTimeSwitch (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_limit_visit_time_switch', ...data }))
}


