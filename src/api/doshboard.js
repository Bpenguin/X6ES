import request from '@/utils/request'
import QS from 'qs'


// 获取 sim 卡速率信息
export function getMobileRxTxRate (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_mobile_rx_tx_rate',
      ...data
    }
  })
}



// 获取 连接的设备信息
export function getConnectedDevicesInfo (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_connected_devices_info',
      ...data
    }
  })
}


// 获取 Dual状态
export function getDualWanConfigurationApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_dual_wan_configuration',
      ...data
    }
  })
}

// 获取 HOST wifi信息
export function getWifiSettingNotificationApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_wifi_setting_notification',
      ...data
    }
  })
}

// 获取 guest wifi信息
export function getGuestWifiSettingNotificationApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_guest_wifi_setting_notification',
      ...data
    }
  })
}
