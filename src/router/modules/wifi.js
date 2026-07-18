import layout from '@/layout'
export default {
  path: '/wifi',
  name: 'wifi',
  component: layout,
  redirect: '/wifi/index',
  meta: { title: 'wifi', icon: 'wifi' },
  children: [
    {
      path: 'status',
      name: '/wifi/index',
      component: () => import('@/views/wifi/status.vue'),
      meta: { title: 'wifiStatus' }
    },
    {
      path: 'basicSetting',
      name: '/wifi/basicSetting',
      component: () => import('@/views/wifi/basicSetting.vue'),
      meta: { title: 'wifiBasicSetting' }
    },
    {
      path: 'advanceSettings',
      name: '/wifi/advanceSettings',
      component: () => import('@/views/wifi/advanceSettings.vue'),
      meta: { title: 'wifiAdvanceSettings' }
    },
    {
      path: 'countryCode',
      name: '/wifi/countryCode',
      component: () => import('@/views/wifi/countryCode.vue'),
      meta: { title: 'countryCode' }
    },
    {
      path: 'macFilter',
      name: '/wifi/macFilter',
      component: () => import('@/views/wifi/macFilter.vue'),
      meta: { title: 'wifiMacFilter' }
    },
    {
      path: 'wps',
      name: '/wifi/wps',
      component: () => import('@/views/wifi/wps.vue'),
      meta: { title: 'wifiWps' }
    },
    {
      path: 'smartHome',
      name: '/wifi/smartHome',
      component: () => import('@/views/wifi/smartHome.vue'),
      meta: { title: 'wifiSmartHome' }
    },
    {
      path: 'guest',
      name: '/wifi/guest',
      component: () => import('@/views/wifi/guest.vue'),
      meta: { title: 'wifiGuest' }
    },
    {
      path: 'antennaCalibration',
      name: '/wifi/antennaCalibration',
      component: () => import('@/views/wifi/antennaCalibration.vue'),
      meta: { title: 'wifiAntennaCalibration' }
    },
    {
      path: 'acs',
      name: '/wifi/acs',
      component: () => import('@/views/wifi/acs.vue'),
      meta: { title: 'wifiAcs' }
    },
    {
      path: 'NFC',
      name: '/wifi/NFC',
      component: () => import('@/views/wifi/NFC.vue'),
      meta: { title: 'NFC' },
    },
  ]
}
