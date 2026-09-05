/**
 *  公共函数
 *   只能新增或修改自己的函数，不能修改原有非自己的函数
 */
import { Message } from "element-ui"
export default {
  /* 成功的弹框 */
  showSucMessage (that, msg = 'other.success01') {
    Message({
      message: that.$t(msg),
      type: 'success',
      duration: 2 * 1000,
    })
  },

  /* 失败的弹框 */
  showErrMessage (that, msg = 'common.error', obj) {
    Message({
      message: obj ? that.$t(msg, obj) : that.$t(msg),
      type: 'error',
      duration: 2 * 1000,
    })
  }
}