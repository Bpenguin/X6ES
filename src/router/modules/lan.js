import layout from '@/layout'
export default {
  path: '/lan',
  name: 'lan',
  component: layout,
  redirect: '/lan/status',
  meta: { title: 'lan', icon: 'lan' },
  children: [
    {
      path: 'status',
      name: '/lan/status',
      component: () => import('@/views/lan/status.vue'),
      meta: { title: 'lanStatus' }
    },
    {
      path: 'setting',
      name: '/lan/setting',
      component: () => import('@/views/lan/setting.vue'),
      meta: { title: 'lanSetting' }
    }
  ]
}
