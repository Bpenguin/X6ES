import request from '@/utils/request'
import QS from 'qs'

// 获取WAN状态信息
export function getWANModeInfo (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_ethernet_wan_mode_info',
      ...data
    }
  })
}

// 设置WAN状态信息
export function setWANInfo (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_ethernet_wan_mode_info', ...data }))
}

// 获取DUAl 的状态
export function getDualWanConfigurationApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_dual_wan_configuration',
      ...data
    }
  })
}

// 设置DUAl 的状态
export function setDualWanConfigurationApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_dual_wan_configuration', ...data }))
}


// 获取DMZ状态
export function getWanDMZInfo (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_dmz_configuration',
      ...data
    }
  })
}

// 设置DMZ状态
export function setWanDMZInfo (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_dmz_configuration', ...data }))
}

// 设置WAN PING
export function setSecurityConfigApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_sys_security_configuration', ...data }))
}

// 获取WAN PING
export function getSecurityConfigApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_sys_security_configuration',
      ...data
    }
  })
}

// 设置WAN FireWall 开关
export function setPortFilterSwitchApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_port_filter_switch', ...data }))
}

// 设置WAN FireWall 开关
export function getPortFilterSwitchApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_port_filter_switch',
      ...data
    }
  })
}

// 添加WAN FireWall 规则
export function addPortFilterRulesApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_add_port_filter_rules', ...data }))
}



// 修改WAN FireWall 规则
export function editPortFilterRulesApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_edit_port_filter_rules', ...data }))
}

// 删除WAN FireWall 规则
export function delPortFilterRulesApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_port_filter_rules', ...data }))
}

// 获取WAN FireWall 规则
export function getPortFilterRulesApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_port_filter_rules',
      ...data
    }
  })
}

// // ========
// // 设置WAN port_forwarding 开关
// export function setPortFilterSwitchApi (data) {
//   return request.post('', QS.stringify({ CgiName: 'web_set_port_forwarding_switch', ...data }))
// }



// // 设置WAN port_forwarding 开关
// export function getPortFilterSwitchApi (data) {
//   return request.get('', {
//     params: {
//       CgiName: 'web_get_port_forwarding_switch',
//       ...data
//     }
//   })
// }

// // 添加WAN port_forwarding 规则
// export function addPortFilterRulesApi (data) {
//   return request.post('', QS.stringify({ CgiName: 'web_add_port_filter_rules', ...data }))
// }



// // 修改WAN port_forwarding 规则
// export function editPortFilterRulesApi (data) {
//   return request.post('', QS.stringify({ CgiName: 'web_edit_port_filter_rules', ...data }))
// }

// // 删除WAN port_forwarding 规则
// export function delPortFilterRulesApi (data) {
//   return request.post('', QS.stringify({ CgiName: 'web_del_port_filter_rules', ...data }))
// }

// // 获取WAN FireWall 规则
// export function getPortFilterRulesApi (data) {
//   return request.get('', {
//     params: {
//       CgiName: 'web_get_port_filter_rules',
//       ...data
//     }
//   })
// }
// // ===========

// 获取NAT passthrough配置
export function getWanNATPassthroughStatusApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_nat_passthrough_configuration',
      ...data
    }
  })
}
// 设置NAT passthrough配置
export function setWanNATPassthroughStatusApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_nat_passthrough_configuration', ...data }))
}


// 获取ethernet口的接入状态
export function getEthernetCableAccessStateApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_ethernet_cable_access_state',
      ...data
    }
  })
}

// 获取WAN口的接入速率
export function getEthernetWanRateInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_ethernet_wan_rate_info',
      ...data
    }
  })
}

// 获取WAN的状态信息
export function getEthernetWanDialInfoApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_ethernet_wan_dial_info',
      ...data
    }
  })
}


// 获取 Firewall Port Forwarding 规则列表
export function getPortForwardingRules (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_port_forwarding_rules',
      ...data
    }
  })
}

// 添加port forwarding配置
export function addPortForwardingRules (data) {
  return request.post('', QS.stringify({ CgiName: 'web_add_port_forwarding_rules', ...data }))
}

// 删除port forwarding配置
export function delPortForwardingRules (data) {
  return request.post('', QS.stringify({ CgiName: 'web_del_port_forwarding_rules', ...data }))
}

// 修改port forwarding配置
export function editPortForwardingRules (data) {
  return request.post('', QS.stringify({ CgiName: 'web_edit_port_forwarding_rules', ...data }))
}


