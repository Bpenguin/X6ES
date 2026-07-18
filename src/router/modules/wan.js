import layout from '@/layout'
export default {
  path: '/wan',
  name: 'wan',
  component: layout,
  redirect: '/wan/status',
  meta: { title: 'wan', icon: 'wan' },
  children: [
    {
      path: 'status',
      name: '/wan/status',
      component: () => import('@/views/wan/status.vue'),
      meta: { title: 'wanStatus' }
    },
    {
      path: 'setting',
      name: '/wan/setting',
      component: () => import('@/views/wan/setting.vue'),
      meta: { title: 'wanSetting', keepAlive: false }
    },
    {
      path: 'dualWanSetting',
      name: '/wan/dualWanSetting',
      component: () => import('@/views/wan/dualWanSetting.vue'),
      meta: { title: 'wanDualWanSetting' }
    },
    {
      path: 'dmz',
      name: '/wan/dmz',
      component: () => import('@/views/wan/dmz.vue'),
      meta: { title: 'wanDmz' }
    },
    {
      path: 'ping',
      name: '/wan/ping',
      component: () => import('@/views/wan/ping.vue'),
      meta: { title: 'wanPing' }
    },
    {
      path: 'natPassthrough',
      name: '/wan/natPassthrough',
      component: () => import('@/views/wan/natPassthrough.vue'),
      meta: { title: 'wanNatPassthrough' }
    },
    {
      path: 'firewall',
      name: '/wan/firewall',
      component: () => import('@/views/wan/firewall.vue'),
      meta: { title: 'wanFirewall' }
    },
    {
      path: 'portForwarding',
      name: '/wan/portForwarding',
      component: () => import('@/views/wan/portForwarding.vue'),
      meta: { title: 'wanPortForwarding' }
    },
    {
      path: 'vpnServer',
      name: '/wan/vpnServer',
      component: () => import('@/views/wan/vpnServer.vue'),
      meta: { title: 'wanVPNServer' }
    },
    {
      path: 'ddns',
      name: '/wan/ddns',
      component: () => import('@/views/wan/ddns.vue'),
      meta: { title: 'wanDDNS' }
    }
  ]
}
