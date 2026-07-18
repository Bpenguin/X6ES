import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'
import wifi from './modules/wifi'
import ipv6 from './modules/ipv6'
import dashboard from './modules/dashboard'
import network5G from './modules/network5G'
import wan from './modules/wan'
import lan from './modules/lan'
import homeNetwork from './modules/homeNetwork'
import system from './modules/system'
import quickSetup from './modules/quickSetup'
import layout from '@/layout'
Router.prototype.isBack = false
Vue.use(Router)
console.log(wifi)
export const constantRouters = [
  {
    path: '/login',
    component: login,
    name: 'Login',
    hidden: true,
    meta: { title: 'login' },
  },
  {
    path: '/logOut',
    component: login,
    name: 'logOut',
    hidden: true,
    meta: { title: 'logOut' },
  },

  // 协议阅读页面
  {
    path: '/userGuide',
    name: 'userGuide',
    component: layout,
    redirect: '/userGuide/index',
    meta: { title: 'userGuide', icon: 'userGuide' },
    children: [
      {
        path: 'index',
        name: 'userGuide/index',
        component: () => import('@/views/userGuide/index.vue'),
        meta: {
          title: 'userGuide'
        }
      }
    ]
  },
  // APP下载页面
  {
    path: '/appDownload',
    name: 'appDownload',
    component: layout,
    redirect: '/appDownload/index',
    meta: { title: 'appDownload', icon: 'appDownload' },
    children: [
      {
        path: 'index',
        name: 'appDownload/index',
        component: () => import('@/views/appDownload/index.vue'),
        meta: {
          title: 'appDownload'
        }
      }
    ]
  },
  dashboard,
  quickSetup,
  network5G,
  wifi,
  lan,
  ipv6,
  homeNetwork,
  wan,
  system
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouters
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
