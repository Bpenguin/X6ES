import Vue from 'vue'
Vue.filter('securityType', val => {
  if (val === 0) return 'OPEN'
  if (!val) return ''
  const securitymodes = [
    { value: 0, label: 'OPEN' },
    { value: 1, label: 'WPA2' },
    { value: 2, label: 'WPA/WPA2' },
    { value: 3, label: 'WPA3' },
    { value: 4, label: 'WPA2/WPA3' },
    { value: 5, label: 'ENHANCED OPEN' }
  ]
  for (let i in securitymodes) {
    if (val == securitymodes[i].value) {
      return securitymodes[i].label
    }
  }
  return ''
})
Vue.filter('wifiMethodType', val => {
  if (!val) return ''
  switch (val) {
    case 0:
      return 'ethernet'
    case 1:
      return 'Host WiFi-2.4GHz'
    case 2:
      return 'Guest WiFi-2.4GHz'
    case 3:
      return 'Host WiFi-5GHz-6GHz'
    case 4:
      return 'Guest WiFi-5GHz-6GHz'

  }
  return ''
})


Vue.filter('simTypeFilter', val => {
  switch (val) {
    case 0:
      return 'No SIM card'
    case 1:
      return 'SIMNormal'
    case 2:
      return 'SIMNormal'
    case 3:
      return 'need PIN'
    case 4:
      return 'need PUK'
    default:
      return 'None'
  }
})

Vue.filter('mobileStatusFilter', val => {
  switch (val) {
    case 0:
      return 'Disconnected'
    case 1:
      return 'Connecting'
    case 2:
      return 'Connected'
    case 3:
      return 'Disconnecting'
    default:
      return 'Disconnected'
  }
})

Vue.filter('dualModeTypeFilter', val => {
  switch (val) {
    case 0:
      return "wan.failover"
    case 1:
      return "wan.loadBalance"
    case 2:
      return "other.off"
    default:
      return "other.off"
  }
})


Vue.filter('conMethod5GTypeFilter', val => {
  switch (val) {
    case 2:
      return '5G'
    case 3:
      return '4G'
    case 1:
      return 'Auto'
    default:
      return 'Auto'
  }
})

Vue.filter('empStr', val => {
  switch (val) {
    case '':
      return '--'
    default:
      return val
  }
})
