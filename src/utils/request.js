import axios from 'axios'
import { Loading } from 'element-ui'
import { MessageBox, Message } from 'element-ui'
import router from '../router'

let loadingInstance
let loadingCount = 0

let logoutTimeNum = 0
let logoutTimer = null


function parseQueryString (url) {
  if (typeof url != 'string') return
  var obj = {};
  var arr = (url.split('&'));
  arr.forEach((v, i) => {/*  */
    let str = v.split('=')[1];
    if (str.indexOf('%') === -1) {
      obj[v.split("=")[0]] = v.split("=")[1];
    } else {
      obj[v.split("=")[0]] = decodeURIComponent(v.split("=")[1]);
    }
  })
  return obj;
}

// 自动退出登录
function autoLogOut () {
  logoutTimeNum = 0
  clearInterval(logoutTimer)
  logoutTimer = setInterval(() => {
    logoutTimeNum++
    if (logoutTimeNum >= 300) {
      let token = sessionStorage.getItem('login-token')
      logoutTimeNum = 0
      clearInterval(logoutTimer)
      if (token) {
        router.push({ path: '/logOut' })
      }
    }
  }, 1000);
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    "X-Requested-With": "XMLHttpRequest"
  }
})

// 当外界调用这个接口axios请求 （自动拼接上/api）
service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log('logoutTimeNum==:', logoutTimeNum)
    const params = config?.params;
    if (!params) {
      autoLogOut();
    } else {
      const cgiName = params.CgiName;
      // 合法接口白名单，新增接口只需往数组加
      const allowCgiList = ['web_get_usage_info', 'web_get_network_status_bar_info', 'web_get_wifi_setting_notification', 'web_get_guest_wifi_setting_notification', 'web_get_mobile_rx_tx_rate', 'web_get_mobile_info', 'web_get_ethernet_wan_rate_info', 'web_get_wan_connect_status', 'web_get_ethernet_cable_access_state', 'web_get_ethernet_wan_dial_info', 'web_get_usage_cfg_info'];
      if (allowCgiList.includes(cgiName)) {
        console.log('web_get_usage_info');
      } else {
        autoLogOut();
      }
    }
    // if (config.params && (config.params['CgiName'] == "web_get_usage_info" || config.params['CgiName'] == "web_get_network_status_bar_info")) {
    //   console.log('web_get_usage_info')
    // } else {
    //   autoLogOut()
    // }
    if (!config.data) {
      config.data = true // 解决请求没有参数时添加不上Content-Type问题
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    // 隐藏loading
    if (config.params && config.params['hiddenLoading']) return config
    let url = parseQueryString(config.data)
    if (url && url['hiddenLoading']) {
      return config
    }

    if (config.params && config.params['keepLoading']) {
      loadingCount = 99
    }
    if (config.params && config.params['cancelLoading']) {
      loadingCount = 0
    }
    let options = {
      lock: true,
      text: '',
      fullscreen: true,
      spinner: 'el-icon-loading-mine',
      background: 'transparent'
    }
    loadingInstance = Loading.service(options);
    loadingCount++

    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  })

// response interceptor
service.interceptors.response.use(
  res => {
    console.log('res:', res)
    if (loadingCount !== 0) {
      let url = parseQueryString(res.config.data)
      if ((res.config.params && res.config.params.hiddenLoading) || (url && url['hiddenLoading'])) {
        console.log('cancel -')
      } else {
        loadingCount--
        if (loadingCount == 0) {
          loadingInstance.close()
        }
      }
    }
    // const res = response.data
    // return Promise.resolve(response)
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      console.log('error!=200', res)
      if (res.config.method == 'get') {
        url = res.config.params.CgiName
        if (url == 'web_get_wan_connect_status') {
          return res.data
        }
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 2 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      let url = ''
      if (res.config.method == 'get') {
        url = res.config.params.CgiName
      } else {
        url = parseQueryString(res.config.data)
      }
      console.log(res.data)
      // 超时退出登录
      if (res.data.retcode == 210) {
        sessionStorage.setItem('login-token', '')
        window.location.href = '/'
      }
      return res.data
    }
  },
  error => {
    if (loadingCount !== 0) {
      loadingCount--
      if (loadingCount == 0) {
        loadingInstance.close()
      }
    }
    loadingCount = 0
    console.log('err' + error) // for debug
    loadingInstance.close()
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service