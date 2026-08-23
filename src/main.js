import Vue from 'vue'
import element from 'element-ui'
import i18n from './i18n'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'
// px2rem 自适应
// import 'lib-flexible'

import global_ from './config/global'
import publicFun from './utils/publicFun' // 公共方法
import versionTood from '@/utils/versionUpdate'
import './utils/filters' // 全局过滤器
import { logOut } from './api/user'
import { setToken, removeToken, getToken } from './utils/auth'
import MineButton from '@/components/MineButton'
import MineInput from '@/components/MineInput'
// register globally
import '@/styles/index.scss'
import '@/styles/media.scss'
import '@/styles/theme.module.scss'
import './icons/index' // icon
import '@/styles/elecomponent.scss'

import { getBrowserLanguage } from '@/utils/until'
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_ // 挂载全局变量
Vue.prototype.$publicFun = publicFun // 挂载公共函数

Vue.use(element, {
  size: 'medium', // set element-ui default size设置元素默认大小
  i18n: (key, value) => i18n.t(key, value)// 在注册Element时设置i18n的处理方法
})

Vue.component('mine-button', MineButton)
Vue.component('mine-input', MineInput);
(function identifyDevicePlatform () {
  if (window.innerWidth < 650) {
    store.dispatch('app/setPhoneDevice', true)
  } else {
    store.dispatch('app/setPhoneDevice', false)
  }
  // var os = function () {
  //   var ua = navigator.userAgent,
  //     isWindowsPhone = /(?:Windows Phone)/.test(ua),
  //     isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
  //     isAndroid = /(?:Android)/.test(ua),
  //     isFireFox = /(?:Firefox)/.test(ua),
  //     isChrome = /(?:Chrome|CriOS)/.test(ua),
  //     isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) ||
  //       (isFireFox && /(?:Tablet)/.test(ua)),
  //     isPhone = /(?:iPhone)/.test(ua) && !isTablet,
  //     isPc = !isPhone && !isAndroid && !isSymbian;
  //   let isPhoneDevice = false
  //   if (os.isAndroid || os.isPhone) {
  //     isPhoneDevice = true
  //   }
  //   console.log('111111111', window.innerWidth)
  //   store.dispatch('app/setPhoneDevice', isPhoneDevice)
  // }
})()

const loadedLanguages = ['en'] // 我们的预装默认语言

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  // 如果语言相同
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }
  if (lang == undefined) {
    lang = i18n.locale

    localStorage.setItem('locale', getBrowserLanguage())
  }
  // 如果尚未加载语言
  return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/lang/${lang}.js`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}

router.beforeEach((to, from, next) => {
  // let token = getToken()
  let token = sessionStorage.getItem('login-token')
  console.log('to', to)
  const lang = localStorage.getItem('locale')
  versionTood.isNewVersion()
  if (to.path == '/logOut') {
    logOut().then((data) => {
      if (data.retcode == 0) {
        sessionStorage.setItem('login-token', '')
        window.location.href = '/'
      }
    })
  }
  if (token) {
    // const lang = to.params.lang
    if (sessionStorage.getItem('login_flag') == 1) {
      // 默认密码
      if (to.path == '/system/password' || to.path == '/login' || to.path == '/logOut') {
        loadLanguageAsync(lang).then(() => next())
        return
      } else {
        loadLanguageAsync(lang).then(() => next('/system/password'))
        return
      }
    } else {
      loadLanguageAsync(lang).then(() => next())
    }
  } else {
    sessionStorage.clear()
    if (to.path == '/login') {
      // const lang = to.params.lang
      loadLanguageAsync(lang).then(() => next())
    } else {
      // const lang = to.params.lang
      loadLanguageAsync(lang).then(() => next('/login'))
    }
  }
})



new Vue({
  router,
  store,//使用store
  i18n, //使用国际化
  render: h => h(App)
}).$mount('#app')
