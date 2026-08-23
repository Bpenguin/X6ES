const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  phoneDevice: state => state.app.phoneDevice,
  routers: state => state.routers.routers,
  prikey: state => state.user.prikey,
  token: state => state.user.token,
  simStatus: state => state.status.simStatus,
  defaultLogPwd: state => state.user.defaultLoginPwd,
}
export default getters