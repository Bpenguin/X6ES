import request from '@/utils/request'
import QS from 'qs'

// 登录
// export function login (data) {
//   return request.get('', {
//     params: { CgiName: 'web_login_exe', ...data }
//   })
// }

// 获取homeSec 规则信息
export function getUrlFilterRulesApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_url_filter_rules', ...data }
  })
}

// 添加homeSec 规则信息
export function addUrlFilterRulesApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_add_url_filter_rules', ...data }))
}

// 删除homeSec 规则信息
export function delUrlFilterRulesApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_url_filter_rules', ...data }))
}

// 获取LAN信息
export function getLanDhcpInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_lan_dhcp_info', ...data }
  })
}

// 设置 LAN信息
export function setLanDhcpApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_lan_dhcp_exe', ...data }))
}

// 获取LAN 接口的信息
export function getEthernetClientsAccessInfo (data) {
  return request.get('', {
    params: { CgiName: 'web_get_ethernet_clients_access_info', ...data }
  })
}


// 设置时间
export function setSysNtp (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_sys_ntp_exe', ...data }))
}

// 获取时间
export function getSysNtp (data) {
  return request.get('', {
    params: { CgiName: 'web_get_sys_ntp_exe', ...data }
  })
}

// 设置时间
export function setSysNtpTime (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_sync_sys_time_exe', ...data }))
}

// 获取时间
export function getSysNtpTime (data) {
  return request.get('', {
    params: { CgiName: 'web_get_sync_sys_time_exe', ...data }
  })
}


// 获取 LED  灯休眠时间计划
export function getLedSleepTimePlanExe (data) {
  return request.get('', {
    params: { CgiName: 'web_get_led_sleep_time_plan_exe', ...data }
  })
}

// 设置 LED  灯休眠时间计划
export function setLedSleepTimePlanExe (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_led_sleep_time_plan_exe', ...data }))
}

// 上传文件
export function uploadFile (data) {
  return request.post('', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 备份配置文件
export function exportFileApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_export_file_exe', ...data }))
}

// 设置配置文件
export function restoreDevice (data) {
  return request.post('', QS.stringify({ CgiName: 'web_import_file_exe', ...data }))
}

// 更新本地服务
export function setUpgradeApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_upgrade_exe', ...data }))
}

// 获取系统信息
export function getDeviceInfo (data) {
  return request.get('', {
    params: { CgiName: 'web_get_device_info', ...data }
  })
}

// 重启设备
export function rebootDevice (data) {
  return request.post('', QS.stringify({ CgiName: 'web_reboot_exe', ...data }))
}

// 恢复默认数据功能
export function resetDevice (data) {
  return request.post('', QS.stringify({ CgiName: 'web_reset_exe', ...data }))
}


// 获取NFC信息
export function getNfcWifiInfo (data) {
  return request.get('', {
    params: { CgiName: 'web_get_nfc_wifi_info', ...data }
  })
}

// 设置NFC
export function setNfcWifiExe (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_nfc_wifi_exe', ...data }))
}

// 获取TR069信息
export function getRemoteMngInfo (data) {
  return request.get('', {
    params: { CgiName: 'web_get_remote_mng_info', ...data }
  })
}

// 设置TR069
export function setRemoteMngExe (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_remote_mng_exe', ...data }))
}

// 获取parental control规则开关
export function getParentalControlSwitch (data) {
  return request.get('', {
    params: { CgiName: 'web_get_parental_control_switch', ...data }
  })
}

// 设置parental control规则开关
export function setParentalControlSwitch (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_parental_control_switch', ...data }))
}

// 获取所有rule列表
export function getParentalControlFilterRules (data) {
  return request.get('', {
    params: { CgiName: 'web_get_parental_control_filter_rules', ...data }
  })
}

// 设置parental control规则
export function setParentalControlFilterRules (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_parental_control_filter_rule', ...data }))
}

// 删除parental control规则
export function delParentalControlFilterRules (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_parental_control_filter_rule', ...data }))
}
