import layout from '@/layout'
export default {
  path: '/homeNetwork',
  name: 'homeNetwork',
  component: layout,
  redirect: '/homeNetwork/parentalControl',
  meta: { title: 'homeNetwork', icon: 'home' },
  children: [
    // {
    //   path: 'networkSetting',
    //   name: '/homeNetwork/networkSetting',
    //   component: () => import('@/views/homeNetwork/networkSetting.vue'),
    //   meta: { title: 'networkSecuritySetting' }
    // },
    {
      path: 'parentalControl',
      name: '/homeNetwork/parentalControl',
      component: () => import('@/views/homeNetwork/parentalControl.vue'),
      meta: { title: 'parentalControl' }
    }
  ]
}
