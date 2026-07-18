import request from '@/utils/request'
import QS from 'qs'

// 获取IPv6配置信息
export function getIpv6ConfigurationApi (data) {
  return request.get('', {
    params: {
      CgiName: 'web_get_ipv6_configuration',
      ...data
    }
  })
}

// 设置IPv6信息
export function setIpv6ConfigurationApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_ipv6_configuration', ...data }))
}