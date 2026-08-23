<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('system.tip',{ProductName:GLOBAL.PRODUCT_NAME} ) }}</div>
    </div>
    <div class="block-body">
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordFormRules" label-width="50%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('system.currentPwd')+':'" prop="currentPwd">
          <pwd-input v-model="passwordForm.currentPwd" :validate-event="true"></pwd-input>
        </el-form-item>
        <el-form-item :label="$t('system.newPwd')+':'" prop="newPwd">
          <pwd-input v-model="passwordForm.newPwd" :validate-event="true"></pwd-input>
        </el-form-item>
        <el-form-item :label="$t('system.confirmNewPwd')+':'" prop="confirmNewPwd">
          <pwd-input v-model="passwordForm.confirmNewPwd" :validate-event="true"></pwd-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelBtnClick"></mine-button>
        <mine-button class="apply-btn" :btn-title="$t('common.apply')" @clickBtn="applyBtnClick"></mine-button>
      </div>
    </div>
    <mine-dialog :show-dialog='showPwdDialogInfo.showDialog' :title="showPwdDialogInfo.title" :msg-title="showPwdDialogInfo.msgTitle" :show-close-btn="showPwdDialogInfo.showCloseBtn" :left-btn-text="showPwdDialogInfo.leftBtnText" @closeDialog="showPwdDialogInfo.showDialog = false" @leftBtnClick="showPwdDialogInfo.showDialog = false"></mine-dialog>
    <!-- <mine-dialog :show-dialog='showIframeDialogInfo.showDialog' :title="showIframeDialogInfo.title" :msg-title="showIframeDialogInfo.msgTitle" :show-close-btn="showIframeDialogInfo.showCloseBtn" :left-btn-text="showIframeDialogInfo.leftBtnText" :right-btn-text="showIframeDialogInfo.rightBtnText" @closeDialog="showIframeDialogInfo.showDialog = false" @leftBtnClick="showIframeDialogInfo.showDialog = false" @rightBtnClick="showIframe"></mine-dialog>
    <agreement-iframe :show-dialog='iframeInfo.showIframe' :show-close-btn="iframeInfo.showCloseBtn" :left-btn-text="iframeInfo.leftBtnText" :right-btn-text="iframeInfo.rightBtnText" @leftBtnClick="cancelAgreement" @rightBtnClick="applyAgreement" @closeDialog="iframeInfo.showIframe = false"></agreement-iframe> -->
    <mine-dialog :show-dialog='showQuickSetupDialogInfo.showDialog' :title="showQuickSetupDialogInfo.title" :msg-title="showQuickSetupDialogInfo.msgTitle" :show-close-btn="showQuickSetupDialogInfo.showCloseBtn" :left-btn-text="showQuickSetupDialogInfo.leftBtnText" :right-btn-text="showQuickSetupDialogInfo.rightBtnText" @closeDialog="showQuickSetupDialogInfo.showDialog = false" @leftBtnClick="trunStartX6" @rightBtnClick="qucikSetUp"></mine-dialog>
  </div>
</template>

<script>
import PwdInput from '@/components/PwdInput'
import MineButton from '@/components/MineButton'
// import AgreementIframe from './agreement.vue'
import MineDialog from '@/components/MineDialog'
import { changeLoginPwd, setFirstLoginFlag } from '@/api/user'
import bus from '@/utils/bus'
export default {
  name: 'ChangePwd',
  // components: { PwdInput, MineButton, AgreementIframe, MineDialog },
  components: { PwdInput, MineButton, MineDialog },
  data() {
    var curPwdRuleNew = (rule, value, callback) => {
      let re = /^[\x00-\x7F]*$/
      if (!re.test(value)) {
        callback(new Error(this.$t('ruleTip.loginPasswordRule')))
      } else if (value.length < 8) {
        callback(new Error(this.$t('ruleTip.loginPasswordLengthRule')))
      } else {
        callback()
      }
    }

    var passwordRuleNew = (rule, value, callback) => {
      if (this.passwordForm.confirmNewPwd != '') {
        this.$refs.passwordForm.validateField('confirmNewPwd')
      }
      // rule规则对象
      if (value == '') {
        callback(new Error(this.$t('ruleTip.loginNewPasswordRqRule')))
      }
      let reg1 = / /
      if (reg1.test(value)) {
        callback(new Error(this.$t('ruleTip.loginPasswordRule')))
      }
      let re = /^[\x00-\x7F]*$/
      if (!re.test(value)) {
        callback(new Error(this.$t('ruleTip.loginPasswordRule')))
      } else if (value.length < 8) {
        callback(new Error(this.$t('ruleTip.loginPasswordLengthRule')))
      } else {
        callback()
      }
    }

    var passwordRuleConfirm = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('ruleTip.loginConfirmPwdRqRule')))
      }
      let reg1 = / /
      if (reg1.test(value)) {
        callback(new Error(this.$t('ruleTip.loginPasswordRule')))
      }
      let re = /^[\x00-\x7F]*$/
      // rule规则对象
      if (!re.test(value)) {
        callback(new Error(this.$t('ruleTip.loginPasswordRule')))
      } else if (value != this.passwordForm.newPwd) {
        callback(callback(new Error(this.$t('ruleTip.loginConfirmPwdRule'))))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        currentPwd: '', // 当前密码
        newPwd: '', // 新密码
        confirmNewPwd: '' //确认新密码
      },
      passwordFormRules: {
        currentPwd: [
          {
            required: true,
            message: this.$t('ruleTip.loginPasswordRqRule'),
            trigger: ['blur', 'change']
          },
          {
            required: true,
            validator: curPwdRuleNew,
            trigger: ['blur', 'change']
          }
        ],
        newPwd: [
          {
            required: true,
            validator: passwordRuleNew,
            trigger: ['blur', 'change']
          }
        ],
        confirmNewPwd: [
          {
            required: true,
            validator: passwordRuleConfirm,
            trigger: ['blur', 'change']
          }
        ]
      },
      iframeInfo: {
        showIframe: false,
        showCloseBtn: true,
        title: 'system.agreement', // 标题
        leftBtnText: 'system.cancelAgreemnet', //左侧按钮的描述
        rightBtnText: 'system.applyAgreemnet' //右侧按钮的描述
      },
      showIframeDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.homeNetwork', // 标题
        msgTitle: 'networkSec.toNetWorkSecTip',
        rightBtnText: 'networkSec.turnOn', //左侧按钮的描述
        leftBtnText: 'networkSec.skip' //右侧按钮的描述
      },
      showQuickSetupDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.quickSetup', // 标题
        msgTitle: 'quickSetup.toSetupTips',
        rightBtnText: 'nav.quickSetup', //左侧按钮的描述
        leftBtnText: 'quickSetup.startX6E' //右侧按钮的描述
      },
      showPwdDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'login.errPwd', // 标题
        msgTitle: 'login.errPwd',
        leftBtnText: 'common.ok' //左侧按钮的描述
      }
    }
  },
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {},
  mounted() {},
  methods: {
    cancelBtnClick() {
      this.$refs['passwordForm'].resetFields()
    },
    // // X6E的快速导航逻辑
    // applyBtnClick() {
    //   this.$refs.passwordForm.validate((valid, val) => {
    //     if (valid) {
    //       let pargmas = {
    //         currentpsd: this.passwordForm.currentPwd,
    //         newpsd: this.passwordForm.newPwd
    //       }
    //       changeLoginPwd(pargmas).then((data) => {
    //         if (data.retcode == 0) {
    //           this.setLocalPassword(this.passwordForm.newPwd)
    //           // 配置快速导航标记
    //           setFirstLoginFlag({ login_flag: 0 }).then(() => {})
    //           this.$publicFun.showSucMessage(this)
    //           this.$refs['passwordForm'].resetFields()
    //           setTimeout(() => {
    //             this.$router.replace({ path: '/logOut' })
    //           }, 2000)
    //         } else {
    //           this.$publicFun.showErrMessage(this)
    //           // this.showPwdDialogInfo.msgTitle = 'login.errPwd'
    //           // this.showPwdDialogInfo.showDialog = true
    //         }
    //       })
    //     }
    //   })
    // },
    // X6E的快速导航逻辑
    applyBtnClick() {
      this.$refs.passwordForm.validate((valid, val) => {
        if (valid) {
          let pargmas = {
            currentpsd: this.passwordForm.currentPwd,
            newpsd: this.passwordForm.newPwd
          }
          changeLoginPwd(pargmas).then((data) => {
            if (data.retcode == 0) {
              this.setLocalPassword(this.passwordForm.newPwd)
              this.$store.dispatch('user/setDefaultLoginPwd', false) //
              bus.$emit('updatePwd', false)
              if (sessionStorage.getItem('login_flag') == 0) {
                this.$publicFun.showSucMessage(this)
                this.$refs['passwordForm'].resetFields()
                setTimeout(() => {
                  this.$router.replace({ path: '/logOut' })
                }, 2000)
              } else {
                this.$refs['passwordForm'].resetFields()
                sessionStorage.setItem('login_flag', 0)
                // 配置快速导航标记
                setFirstLoginFlag({ login_flag: 0 }).then(() => {})
                // this.showIframeDialogInfo.showDialog = true  // X6ES 跳过阅读协议
                this.showQuickSetupDialogInfo.showDialog = true
              }
            } else if (data.retcode == 209) {
              // 新旧密码不能一致
              this.$publicFun.showErrMessage(this, 'other.newUnSameCur')
            } else if (data.retcode == 203) {
              // d当期密码错误
              this.$publicFun.showErrMessage(this, 'other.curPwdErr')
            } else {
              this.$publicFun.showErrMessage(this)
              // this.showPwdDialogInfo.msgTitle = 'login.errPwd'
              // this.showPwdDialogInfo.showDialog = true
            }
          })
        }
      })
    },
    // 更新本地保存的密码
    setLocalPassword(value) {
      let rememberInfo = localStorage.getItem('remeberKey')
      if (rememberInfo) {
        rememberInfo = JSON.parse(rememberInfo)
        if (rememberInfo.checked) {
          localStorage.setItem(
            'remeberKey',
            JSON.stringify({
              checked: rememberInfo.checked,
              abcp: value
            })
          )
        }
      }
    },
    showIframe() {
      this.showIframeDialogInfo.showDialog = false
      this.iframeInfo.showIframe = true
    },
    trunStartX6() {
      this.showQuickSetupDialogInfo.showDialog = false
      this.$router.replace({ path: '/dashboard/index' })
    },
    qucikSetUp() {
      this.showQuickSetupDialogInfo.showDialog = false
      this.$router.replace({ path: '/quickSetup/index' })
    },
    cancelAgreement() {
      this.iframeInfo.showIframe = false
    },
    applyAgreement() {
      this.iframeInfo.showIframe = false
      this.showQuickSetupDialogInfo.showDialog = true
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.change-pwd-content {
  // height: 800px;
  padding: 20px;
  .head-tip {
    color: gray;
    font-size: 16px;
    text-align: left;
    // margin-left: 40px;
  }
}
.mian-content {
  padding: 20px 0;
}
.section-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: white;
  margin: 40px 5px;
  .red-style {
    color: red;
  }
  .pass-word {
    width: 50%;
  }
}
.bottom-btn {
  display: flex;
  flex-direction: row;
  float: right;
  .apply-btn {
    margin-left: 20px;
  }
}
</style>
