import layout from '@/layout'
export default {
  path: '/IPv6',
  name: 'IPv6',
  component: layout,
  redirect: '/IPv6/index',
  meta: { title: 'IPv6', icon: 'IPv6' },
  children: [
    {
      path: 'index',
      name: 'ipv6/index',
      component: () => import('@/views/ipv6/index.vue'),
      meta: {
        title: 'ipv6'
      }
    }
  ]
}
