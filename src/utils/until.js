import { password_encode } from '@/utils/encryption'
// 密码加密
export const montagepwd = function (prikey, pwd) {
  if (!prikey) return
  if (!pwd) return
  let A = prikey.split('x')[0]
  let B = prikey.split('x')[1]
  let C = parseInt(new Date().getTime() / 1000)

  let secPwd = password_encode(pwd, A, B, C)
  return secPwd
}

export const connectMode_fill = function (type) {
  const typeStr = type
  switch (type) {
    case 1:
      return 'Static IP'
    case 2:
      return 'DHCP'
    case 0:
      return 'PPPoE'
    case 3:
      return 'switch wan to lan'
    default:
      return ''
  }
}

export const connect_status_fill = function (type) {
  const typeStr = type + ''
  switch (type) {
    case 0:
      return 'IDLE'
    case 1:
      return 'CONNECTING'
    case 2:
      return 'CONNECTED'
    case 3:
      return 'DISCONNECTING'
    default:
      return '--'
  }
}

export const wan_connect_status_fill = function (type) {
  const typeStr = type + ''
  switch (type) {
    case 0:
      return 'dashboard.Disconnected'
    case 1:
      return 'other.Connected'
    default:
      return '--'
  }
}
// encryption选项的动态赋值
export const encryptions_update = function (val) {
  let defaultEncryptions = [
    { value: 0, label: 'Auto' },
    { value: 1, label: 'TKIP' },
    { value: 2, label: 'AES' }
  ]
  let simpleEncryptions = [{ value: 2, label: 'AES' }]
  if (val == 'Disable' || val == 'Enhanced open') {
    return ''
  } else if (val == 3 || val == 4) {
    return simpleEncryptions
  } else {
    return defaultEncryptions
  }
}

// DUAL connnectionconfig IP选项
export const dualIpTypeFilter = function (val) {
  switch (val) {
    case 0:
      return 'IPV4'
    case 1:
      return 'IPV6'
    case 2:
      return 'IPV4V6'
    default:
      return 'IPV4'
  }
}

// DUAL connnectionconfig protoModels选项
export const protoTypeFilter = function (val) {
  switch (val) {
    case 0:
      return 'None'
    case 1:
      return 'PAP'
    case 2:
      return 'CHAP '
    case 3:
      return 'PAP-CHAP'
    default:
      return 'None'
  }
}


// DUAL connnectionconfig protoModels选项
export const simTypeFilter = function (val) {
  switch (val) {
    case 0:
      return 'No SIM card'
    case 1:
      return 'SIM normal'
    case 2:
      return 'SIM normal '
    case 3:
      return 'need PIN'
    case 4:
      return 'need PUK'
    default:
      return 'None'
  }
}


export const mobileStatusFilter = function (val) {
  console.log('mobileStatusFilter:', val)
  switch (val) {
    case 0:
      return 'dashboard.Disconnected'
    case 1:
      return 'other.Connecting'
    case 2:
      return 'other.Connected'
    case 3:
      return 'other.Disconnecting'
    default:
      return 'dashboard.Disconnected'
  }
}

export const weekDayFilter = function (val) {
  switch (val) {
    case '1':
      return 'Mon'
    case '2':
      return 'Tue'
    case '3':
      return 'Wed'
    case '4':
      return 'Thu'
    case '5':
      return 'Fri'
    case '6':
      return 'Sat'
    case '7':
      return 'Sun'
  }
}

export function getBrowserLanguage () {
  console.log("navigator.language || navigator.userLanguage:==", navigator.language || navigator.userLanguage)
  switch (navigator.language || navigator.userLanguage) {
    case 'en-US':
    case 'en-GB':
    case 'en':
      return 'en';
    case 'zh-CN':
    case 'zh-TW':
    case 'zh-HK':
      return 'zh';
    case 'de':
      return 'de';
    case 'fr':
      return 'fr';
    case 'it':
      return 'it';
    case 'es':
      return 'es';
    case 'es-US':
      return 'sp';
    case 'pl':
      return 'po';
    case 'pt-BR':
      return 'portb';
    case 'pt-PT':
    case 'pt':
      return 'port';
    case 'no':
      return 'nor';
    case 'da':
      return 'da';
    case 'cs':
      return 'cz';
    case 'sv':
      return 'sw';
    case 'nl':
      return 'ne';
    case 'fi':
      return 'fi';
    default:
      return 'en';
  }
}

export const getCountryNum = function (val) {
  switch (val) {
    case 0:
      return 'US'
    case 1:
      return 'CN'
    case 2:
      return 'ES'
    case 3:
      return 'JP'
    case 4:
      return 'OM'
    case 5:
      return 'KW'
    case 6:
      return 'SA'
    case 7:
      return 'DE'
    case 8:
      return 'GB'
    case 9:
      return 'IN'
    default:
      return 'US'
  }
}