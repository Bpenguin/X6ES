import request from '@/utils/request'
import QS from 'qs'

// 获取OTA状态
export function getOtaStatusApi (data) {
  return request.get('', {
    params: { CgiName: 'web_get_ota_status', ...data }
  })
}

// 检查新版本
export function checkNewVersionApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_start_ota_check', ...data }))
}

// 获取版本信息
export function getOtaNewVersionInfoApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_get_ota_new_version_info', ...data }))
}

// 开始下载新版本
export function startOtaDownloadApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_start_ota_download', ...data }))
}

// 开始升级新版本
export function startOtaUpdateApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_start_ota_update', ...data }))
}

// 取消升级
export function cancelOtaApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_cancel_ota', ...data }))
}

// 一键升级
export function onekeyUpgradeApi (data) {
  return request.post('', QS.stringify({ CgiName: 'web_  onekey_upgrade', ...data }))
}

