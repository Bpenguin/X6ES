import layout from '@/layout'
export default {
  path: '/',
  name: 'dashboard',
  component: layout,
  redirect: '/dashboard/index',
  meta: { title: 'dashboard', icon: 'dashboard' },
  children: [
    {
      path: 'dashboard/index',
      name: '/dashboard/index',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: 'dashboard' }
    },
    {
      path: 'connectedDevices',
      name: 'connectedDevices',
      component: () => import('@/views/dashboard/connectDevice.vue'),
      meta: { title: 'connectedDevices' }
    },
  ]
}
