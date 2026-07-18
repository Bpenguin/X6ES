import request from '@/utils/request'
import store from '../store'
import QS from 'qs'


// 显示网络搜索结果
export function getNetworkCellInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_network_cell_info', ...data }
  })
}

// 设置 LAN信息
export function setLanDhcpApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_lan_dhcp_exe', ...data }))
}


// 连接SIM卡 数据
export function connectDataApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_connect_data', ...data }))
}


// 断开SIM卡 数据
export function deactiveDataCallApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_deactive_data_call', ...data }))
}

// 获取 SIM网络连接配置信息.
export function getWanNetworkConnectionApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_wan_network_connection', ...data }
  })
}

// 设置 SIM网络连接配置信息.
export function setWanNetworkConnectionApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wan_network_connection_exe', ...data }))
}

// 获取 Profile.信息
export function getProfileInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_profile_info', ...data }
  })
}

// 添加 Profile.信息.
export function addProfileApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_add_profile_exe', ...data }))
}

// 删除 Profile.信息.
export function delProfileApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_profile_exe', ...data }))
}

// 设置 Profile.信息.
export function setProfileApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_profile_exe', ...data }))
}

// 获取 NR5G 模式信息
export function getWanNr5gModeInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_wan_nr5g_mode_info', ...data }
  })
}

// 配置 NR5G 模式.
export function setWanNr5gModeInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_wan_nr5g_mode_exe', ...data }))
}

// 获取网络模式信息
export function getNetworkModeApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_network_mode_info', ...data }
  })
}

// 配置网络模式.
export function setNetworkModeApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_network_mode_exe', ...data }))
}

// 获取网络搜索模式信息
export function getNetworkSelectmodeInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_network_selectmode_info', ...data }
  })
}

// 配置网络搜索模式
export function setNetworkSelectmodeInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_network_selectmode_exe', ...data }))
}

// 显示网络搜索结果
export function getScanNetworkResultsApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_scan_network_results', ...data }
  })
}

// 启动搜索网络
export function scanNetworklistApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_scan_networklist_exe', ...data }))
}

// 网络注册.
export function setNetworkRatRegisterApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_network_rat_register', ...data }))
}

// 获取 PIN 码管理信息
export function getSimPinMngInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_sim_pin_mng_info', ...data }
  })
}

// 配置 PIN 码管理.
export function setSimPinMngInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_sim_pin_mng_exe', ...data }))
}

// 获取本地短信邮箱状态
export function getSmsboxInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_smsbox_info', ...data }
  })
}


// 通过获取本地短信内容
export function getMessagesByTypeApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_messages_by_type', ...data }
  })
}

// 发送信息
export function sendMessageApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_send_message', ...data }))
}

// 标记为已读信息
export function setMessagesStatusApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_messages_status_by_id_and_type', ...data }))
}


// 删除信息
export function delMessagesApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_messages_by_type', ...data }))
}

// 获取 Data usage 信息
export function getUsageInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_usage_info',
      ...data
    }
  })
}

// 设置流量套餐数据
export function setUsageCfgInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_usage_cfg_info', ...data }))
}
// 获取流量套餐设置数据..
export function getUsageCfgInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_usage_cfg_info', ...data }
  })
}
// 获取本地流量源数据.
export function getOrgUsageInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_org_usage_info', ...data }
  })
}

// 获取SIM信息.
export function getSimInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_sim_info', ...data }
  })
}

// 获取此月每天的数据.
export function getUsageOneMonthEveryDayInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_usage_one_month_every_day_info', ...data }
  })
}

// 获取当天每小时的数据.
export function getUsageOneDayEveryHourInfoApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_usage_one_day_every_hour_info', ...data }
  })
}

// 获取时间区域内的数据.
export function getUsageBetweenTwoDate (data) {
  return request.get('', {
    params: { CgiName: 'web_get_usage_between_two_date', ...data }
  })
}