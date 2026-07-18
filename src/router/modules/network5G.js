import layout from '@/layout'
export default {
  path: '/network5G',
  name: 'network5G',
  component: layout,
  redirect: '/network5G/network5GStatus',
  meta: { title: 'network5G', icon: 'network5G' },
  children: [
    {
      path: 'network5GStatus',
      name: '/network5G/network5GStatus',
      component: () => import('@/views/network5G/network5GStatus.vue'),
      meta: { title: 'network5GStatus' }
    },
    {
      path: 'networkConnection',
      name: '/network5G/networkConnection',
      component: () => import('@/views/network5G/networkConnection.vue'),
      meta: { title: 'networkConnection', keepAlive: false }
    },
    {
      path: 'connectionConfig',
      name: '/network5G/connectionConfig',
      component: () => import('@/views/network5G/connectionConfig.vue'),
      meta: { title: 'networkConnectionConfig' }
    },
    {
      path: 'networkMode',
      name: '/network5G/networkMode',
      component: () => import('@/views/network5G/networkMode.vue'),
      meta: { title: 'networkMode' }
    },
    {
      path: 'dataUsage',
      name: '/network5G/dataUsage',
      component: () => import('@/views/network5G/dataUsage.vue'),
      meta: { title: 'dataUsage' }
    },
    {
      path: 'simPinmana',
      name: '/network5G/simPinmana',
      component: () => import('@/views/network5G/simPinmana.vue'),
      meta: { title: 'simPinmana' }
    },
    {
      path: 'smsInbox',
      name: '/network5G/smsInbox',
      component: () => import('@/views/network5G/smsInbox.vue'),
      meta: { title: 'smsInbox' }
    },
    {
      path: 'smsforwarding',
      name: '/network5G/smsforwarding',
      component: () => import('@/views/network5G/smsforwarding.vue'),
      meta: { title: 'smsforwarding' }
    }
  ]
}
