import layout from '@/layout'
export default {
  path: '/system',
  name: 'system',
  component: layout,
  // redirect: '/system/time',
  meta: { title: 'system', icon: 'system' },
  children: [
    {
      path: 'time',
      name: '/system/time',
      component: () => import('@/views/system/time.vue'),
      meta: { title: 'systemTime' }
    },
    {
      path: 'password',
      name: '/system/password',
      component: () => import('@/views/system/changePwd.vue'),
      meta: { title: 'systemPassword' }
    },
    {
      path: 'password/agreement',
      name: '/system/password/agreement',
      component: () => import('@/views/system/agreement.vue'),
      meta: { title: 'agreement' },
    },
    {
      path: 'languages',
      name: '/system/languages',
      component: () => import('@/views/system/languages.vue'),
      meta: { title: 'systemlanguages' }
    },
    {
      path: 'backRestore',
      name: '/system/backRestore',
      component: () => import('@/views/system/backRestore.vue'),
      meta: { title: 'systemBackRestore' },
    },
    {
      path: 'information',
      name: '/system/information',
      component: () => import('@/views/system/information.vue'),
      meta: { title: 'systemInformation' }
    },
    {
      path: 'restart',
      name: '/system/restart',
      component: () => import('@/views/system/restart.vue'),
      meta: { title: 'systemRestart' },
    },
    {
      path: 'firmware',
      name: '/system/firmware',
      component: () => import('@/views/system/firmware.vue'),
      meta: { title: 'systemFirmware' }
    },
    {
      path: 'logs',
      name: '/system/logs',
      component: () => import('@/views/system/logs.vue'),
      meta: { title: 'systemLogs' }
    },
    {
      path: 'usbStorage',
      name: '/system/usbStorage',
      component: () => import('@/views/system/usbStorage.vue'),
      meta: { title: 'systemUsbStorage' },
    },
    {
      path: 'mainLED',
      name: '/system/mainLED',
      component: () => import('@/views/system/mainLED.vue'),
      meta: { title: 'systemMainLED' },
    },
    {
      path: 'logout',
      name: '/system/logout',
      component: () => import('@/views/system/logout.vue'),
      meta: { title: 'systemLogout' },
    },
    // {
    //   path: 'NFC',
    //   name: '/system/NFC',
    //   component: () => import('@/views/wifi/NFC.vue'),
    //   meta: { title: 'NFC' },
    // },
    {
      path: 'TR069',
      name: '/system/TR069',
      component: () => import('@/views/system/TR069.vue'),
      meta: { title: 'TR069' },
    },

  ]
}
