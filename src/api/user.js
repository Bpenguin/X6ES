import request from '@/utils/request'
import QS from 'qs'

// 登录
// export function login (data) {
//   return request.get('', {
//     params: { CgiName: 'web_login_exe', ...data }
//   })
// }
export function login (data) {
  return new Promise((resolve, reject) => {
    loginAPI(data).then((res) => {
      console.log('getMobileInfoStatusApi:', res)
      resolve(res)
    })
  })
}
// 登录
export function loginAPI (data) {
  return request.post('', QS.stringify({ CgiName: 'web_login_exe', ...data }))
}
// 获取密码私钥信息
export function getLoginInfo (data) {
  return request.get('', {
    params: { CgiName: 'web_get_first_login_flag', ...data }
  })
}

// 配置快速导航标记信息
export function setFirstLoginFlag (data) {
  return request.post('', QS.stringify({ CgiName: 'web_set_first_login_flag', ...data }))
}

// 修改密码
export function changeLoginPwd (data) {
  console.log('0000', data)
  return request.post('', QS.stringify({ CgiName: 'web_set_admin_exe', ...data }))
}


// 退出登录
export function logOut (data) {
  return request.post('', QS.stringify({ CgiName: 'web_logout_exe', ...data }))
}