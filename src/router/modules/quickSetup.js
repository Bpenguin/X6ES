import layout from '@/layout'
export default {
  path: '/quickSetup',
  name: 'quickSetup',
  component: layout,
  redirect: '/quickSetup/index',
  meta: { title: 'quickSetup', icon: 'quickSetup' },
  children: [
    {
      path: 'index',
      name: '/quickSetup/index',
      component: () => import('@/views/quickSetup/index.vue'),
      meta: { title: 'quickSetup' }
    }
  ]
}
