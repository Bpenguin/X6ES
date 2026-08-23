export const navMenus = [
  { title: 'dashboard', icon: 'dashboard', name: 'dashboard', topath: '/dashboard/index' },
  { title: 'quickSetup', icon: 'quickSetup', name: '/quickSetup/index', topath: '/quickSetup/index' },
  {
    title: 'network5G', icon: 'network5G', name: 'network5G', topath: '/network5G/network5GStatus',
    children: [
      {
        title: 'network5GStatus', name: '/network5G/network5GStatus', childMenu: true, topath: '/network5G/network5GStatus'
      },
      {
        title: 'networkConnection', name: '/network5G/networkConnection', childMenu: true, topath: '/network5G/networkConnection',
      },
      {
        title: 'networkConnectionConfig', name: '/network5G/connectionConfig', childMenu: true, topath: '/network5G/connectionConfig',
      },
      {
        title: 'networkMode', name: '/network5G/networkMode', childMenu: true, topath: '/network5G/networkMode'
      },
      {
        title: 'dataUsage', name: '/network5G/dataUsage', childMenu: true, topath: '/network5G/dataUsage',
      },
      {
        title: 'simPinmana', name: '/network5G/simPinmana', childMenu: true, topath: '/network5G/simPinmana',
      },
      {
        title: 'smsInbox', name: '/network5G/smsInbox', childMenu: true, topath: '/network5G/smsInbox',
      },
      // {
      //   title: 'smsforwarding', name: '/network5G/smsforwarding', childMenu: true, topath: '/network5G/smsforwarding',
      // }
    ]
  },
  {
    title: 'wan', icon: 'wan', name: 'wan', topath: '/wan/status',
    children: [
      {
        title: 'wanStatus', name: '/wan/status', childMenu: true, topath: '/wan/status'
      },
      {
        title: 'wanSetting', name: '/wan/setting', childMenu: true, topath: '/wan/setting',
      },
      {
        title: 'wanDualWanSetting', name: '/wan/dualWanSetting', childMenu: true, topath: '/wan/dualWanSetting',
      },
      {
        title: 'wanDmz', name: '/wan/dmz', childMenu: true, topath: '/wan/dmz'
      },
      {
        title: 'wanPing', name: '/wan/ping', childMenu: true, topath: '/wan/ping',
      },
      {
        title: 'wanNatPassthrough', name: '/wan/natPassthrough', childMenu: true, topath: '/wan/natPassthrough',
      },
      {
        title: 'wanFirewall', name: '/wan/firewall', childMenu: true, topath: '/wan/firewall',
      },
      {
        title: 'wanPortForwarding', name: '/wan/portForwarding', childMenu: true, topath: '/wan/portForwarding',
      },
      // {
      //   title: 'wanVPNServer', name: '/wan/vpnServer', childMenu: true, topath: '/wan/vpnServer',
      // },
      // {
      //   title: 'wanDDNS', name: '/wan/ddns', childMenu: true, topath: '/wan/ddns',
      // }
    ]
  },
  {
    title: 'wifi', icon: 'wifi', name: 'wifi', topath: '/wifi/status',
    children: [
      {
        title: 'wifiStatus', name: '/wifi/status', childMenu: true, topath: '/wifi/status'
      },
      {
        title: 'wifiBasicSetting', name: '/wifi/basicSetting', childMenu: true, topath: '/wifi/basicSetting',
      },
      {
        title: 'wifiAdvanceSettings', name: '/wifi/advanceSettings', childMenu: true, topath: '/wifi/advanceSettings',
      },
      {
        title: 'countryCode', name: '/wifi/countryCode', childMenu: true, topath: '/wifi/countryCode',
      },
      {
        title: 'wifiMacFilter', name: '/wifi/macFilter', childMenu: true, topath: '/wifi/macFilter',
      },
      {
        title: 'wifiWps', name: '/wifi/wps', childMenu: true, topath: '/wifi/wps',
      },
      // {
      //   title: 'wifiSmartHome', name: '/wifi/smartHome', childMenu: true, topath: '/wifi/smartHome',
      // },
      {
        title: 'wifiGuest', name: '/wifi/guest', childMenu: true, topath: '/wifi/guest',
      },
      // {
      //   title: 'wifiAntennaCalibration', name: '/wifi/antennaCalibration', childMenu: true, topath: '/wifi/antennaCalibration',
      // },
      {
        title: 'wifiAcs', name: '/wifi/acs', childMenu: true, topath: '/wifi/acs',
      },
      // {
      //   title: 'NFC', name: '/wifi/NFC', childMenu: true, topath: '/wifi/NFC'
      // },
    ]
  },
  {
    title: 'lan', icon: 'lan', name: 'lan', topath: '/lan/status',
    children: [
      {
        title: 'lanStatus', name: '/lan/status', childMenu: true, topath: '/lan/status'
      },
      {
        title: 'lanSetting', name: '/lan/setting', childMenu: true, topath: '/lan/setting',
      }
    ]
  },
  { title: 'ipv6', icon: 'IPv6', name: '/ipv6/index', topath: '/ipv6/index' },
  // {
  //   title: 'homeNetwork', icon: 'home', name: '/homeNetwork', topath: '/homeNetwork/parentalControl',
  //   children: [
  //     // {
  //     //   title: 'networkSecuritySetting', name: '/homeNetwork/networkSetting', childMenu: true, topath: '/homeNetwork/networkSetting'
  //     // },
  //     {
  //       title: 'parentalControl', name: '/homeNetwork/parentalControl', childMenu: true, topath: '/homeNetwork/parentalControl'
  //     }
  //   ]
  // },
  {
    title: 'system', icon: 'system', name: 'system', topath: '/system/password',
    children: [
      {
        title: 'systemPassword', name: '/system/password', childMenu: true, topath: '/system/password'
      },
      {
        title: 'systemTime', name: '/system/time', childMenu: true, topath: '/system/time'
      },

      {
        title: 'systemlanguages', name: '/system/languages', childMenu: true, topath: '/system/languages'
      },
      {
        title: 'systemBackRestore', name: '/system/backRestore', childMenu: true, topath: '/system/backRestore'
      },
      {
        title: 'systemInformation', name: '/system/information', childMenu: true, topath: '/system/information'
      },
      {
        title: 'systemRestart', name: '/system/restart', childMenu: true, topath: '/system/restart'
      },
      {
        title: 'systemFirmware', name: '/system/firmware', childMenu: true, topath: '/system/firmware'
      },
      // {
      //   title: 'systemAntenaSwitch', name: '/system/antenaSwitch', childMenu: true, topath: '/system/antenaSwitch'
      // },
      // {
      //   title: 'systemLogs', name: '/system/logs', childMenu: true, topath: '/system/logs'
      // },
      // {
      //   title: 'systemUsbStorage', name: '/system/usbStorage', childMenu: true, topath: '/system/usbStorage'
      // },
      // {
      //   title: 'systemMainLED', name: '/system/mainLED', childMenu: true, topath: '/system/mainLED'
      // },
      {
        title: 'systemLogout', name: '/logOut', childMenu: true, topath: '/logOut'
      },
      // {
      //   title: 'TR069', name: '/system/TR069', childMenu: true, topath: '/system/TR069'
      // },
    ]
  },
  // { title: 'appDownload', icon: 'appDownload', name: '/appDownload/index', topath: '/appDownload/index' },
  { title: 'userGuide', icon: 'userGuide', name: '/userGuide/index', topath: '/userGuide/index' },
]