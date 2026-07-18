<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <no-sim v-if="!(SIMStatus == 1 || SIMStatus == 2 )" :sim-status='SIMStatus'></no-sim>
    <div v-else>
      <div class="block-body">
        <div class="page-description">{{ $t('network5G.SIMPinManagementScr') }}</div>
      </div>
      <div v-if="!changePinStatus">
        <div v-if="defaultPinStatus == PINStatus" class="block-body">
          <el-row class="c-row">
            <el-col :span="8">
              <div>{{ $t('network5G.SIMPINStatus') }}:</div>
            </el-col>
            <el-col :span="12">
              <el-switch v-model="PINStatus" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-col>
          </el-row>
        </div>
        <!-- 开启/关闭PIN码保护 -->
        <div v-if="defaultPinStatus != PINStatus" class="block-body">
          <div class="c-row">
            <div>{{ $t('network5G.SIMPINBlocked') }}:</div>
          </div>
          <el-form :model="pinFormData" :rules="pinRule" ref="pinFormData" label-width="25%" :label-position="formLablePos" size="mini">
            <el-form-item :label="$t('network5G.SIMPIN')+':'" prop="SIMPinNum">
              <mine-input :key="'SIMPinNum'" v-model="pinFormData.SIMPinNum" :maxlength='8'></mine-input>
            </el-form-item>
          </el-form>
          <div class="c-row">
            <el-checkbox class="check-box" v-model="localPinTag"></el-checkbox>
            <label class="remmber-pwd-text">{{ $t('network5G.RememberSIMPIN') }}</label>
          </div>
          <div class="c-row">
            <div>{{ $t('network5G.remaining') }}: {{ pin_retry_times }}</div>
          </div>
          <div class="c-row btn-row">
            <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
            <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
          </div>
        </div>
        <div v-if="PINStatus && defaultPinStatus == PINStatus" class="block-body">
          <div class="c-row btn-row flex-cent">
            <mine-button :btn-title="$t('network5G.ChangeSimPin')" @clickBtn="ChangeSimPin"></mine-button>
          </div>
        </div>
      </div>
      <!-- 修改PIN码 -->
      <div v-else class="block-body">
        <div class="c-row">{{ $t('network5G.ChangeSimPin') }}:</div>
        <el-form ref="changePinFormData" :model="changePinFormData" :rules="changePinFormDataRules" label-width="30%" :label-position="formLablePos" size="mini">
          <el-form-item :label="$t('network5G.OldSIMPIN')+':'" prop="currentPin">
            <mine-input v-model="changePinFormData.currentPin" :maxlength='8' :validate-event="true"></mine-input>
          </el-form-item>
          <el-form-item :label="$t('network5G.NewSIMPIN')+':'" prop="newPIN">
            <mine-input v-model="changePinFormData.newPIN" :maxlength='8' :validate-event="true"></mine-input>
          </el-form-item>
          <el-form-item :label="$t('network5G.ConfirmSIMPIN')+':'" prop="confirmNewPIN">
            <mine-input v-model="changePinFormData.confirmNewPIN" :maxlength='8' :validate-event="true"></mine-input>
          </el-form-item>
          <el-form-item :label="$t('network5G.remaining')+':'" prop="remaining">
            <div>{{ pin_retry_times }}</div>
          </el-form-item>
        </el-form>
        <div class="c-row btn-row">
          <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelChange"></mine-button>
          <mine-button :btn-title="$t('common.apply')" @clickBtn="applyChange"></mine-button>
        </div>
      </div>
      <div v-show="(defaultPinStatus != PINStatus) || changePinStatus" class="block-body">
        <div class="page-note">{{ $t('common.note')+':' + $t('network5G.SIMPinManagementNote') }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import NoSim from './noSim.vue'
import { Message } from 'element-ui'
import formVaRule from '@/formValidator/index'

import { getSimPinMngInfoApi, setSimPinMngInfoApi } from '@/api/network5G'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'NetworkConnnection',
  components: { NoSim },

  data() {
    var pinRuleSec = (rule, value, callback) => {
      // rule规则对象
      if (value != this.changePinFormData.newPIN) {
        // The entered SIM PIN does not match the new SIM PIN.
        callback(new Error(this.$t('ruleTip.confirmPinRule')))
      } else {
        callback()
      }
    }
    return {
      simStatusTimer: '', // 实时刷新卡状态
      defaultPinStatus: false,
      changePinStatus: false,
      PINStatus: true,
      SIMPinNum: '',
      localPinTag: false,
      pin_retry_times: 3,
      puk_retry_times: 10,
      pinFormData: {
        SIMPinNum: ''
      },
      pinRule: {
        SIMPinNum: [
          {
            required: true,
            message: this.$t('ruleTip.SIMPinRqRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.SIMPinRule, trigger: ['blur', 'change'] }
        ]
      },
      changePinFormData: {
        currentPin: '', // 当前PIN
        newPIN: '', // 新pin
        confirmNewPIN: '', //确认PIN
        remaining: 3
      },
      changePinFormDataRules: {
        currentPin: [
          {
            required: true,
            message: this.$t('ruleTip.oldPinRqRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.PUKPinRule, trigger: ['blur', 'change'] }
        ],
        newPIN: [
          {
            required: true,
            message: this.$t('ruleTip.newPinRqRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.newPinRule, trigger: ['blur', 'change'] }
        ],
        confirmNewPIN: [
          {
            required: true,
            message: this.$t('ruleTip.confirmPinRqRule'),
            trigger: ['blur', 'change']
          },
          { validator: pinRuleSec, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    SIMStatus() {
      this.initData()
      return this.$store.state.status.simStatus
    },
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {
    this.$store.dispatch('status/setSimInfo')
  },
  mounted() {
    let rememberInfo = localStorage.getItem('SIMPinInfo')
    if (rememberInfo) {
      rememberInfo = JSON.parse(rememberInfo)
      if (rememberInfo.SIMPinNum) {
        this.pinFormData.SIMPinNum = rememberInfo.SIMPinNum
      }
      if (rememberInfo.localPinTag) {
        this.localPinTag = rememberInfo.localPinTag
      }
    }
    this.initData()
    this.initSimStatus() // 循环获取SIM卡状态
  },
  methods: {
    initSimStatus() {
      this.simStatusTimer = setInterval(() => {
        this.$store.dispatch('status/setSimInfo')
      }, 3000)
    },
    initData() {
      getSimPinMngInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.defaultPinStatus = data.pin_enable == 1 ? true : false
          this.PINStatus = data.pin_enable == 1 ? true : false
          this.pin_retry_times = data.pin_retry_times
          this.puk_retry_times = data.puk_retry_times
        }
      })
    },
    ChangeSimPin() {
      this.changePinStatus = !this.changePinStatus
    },
    apply() {
      this.$refs.pinFormData.validate((valid, val) => {
        if (valid) {
          let parma = {
            operate: 1,
            pincode: this.pinFormData.SIMPinNum
          }
          if (this.defaultPinStatus) {
            parma.enable = 0
          } else {
            parma.enable = 1
          }
          // parma.enable = 1
          setSimPinMngInfoApi(parma).then((data) => {
            if (data.retcode == 0) {
              this.$publicFun.showSucMessage(this)
              this.initData()
            } else if (data.retcode == 12) {
              this.pin_retry_times -= 1
              this.$publicFun.showErrMessage(this, 'other.pinErrorTip', {
                time: this.pin_retry_times
              })
              // this.$publicFun.showErrMessage(this)
            } else if (data.retcode == 35) {
              this.$publicFun.showErrMessage(this, 'network5G.SIMPINBlocked')
              setTimeout(() => {
                this.$refs.pinFormData.resetFields()
                this.$store.dispatch('status/setSimInfo')
              }, 2000)
            } else if (data.retcode == -42) {
              this.puk_retry_times -= 1
              this.$publicFun.showErrMessage(this)
            } else if (data.retcode == 36) {
              if (this.puk_retry_times > 0) {
                this.puk_retry_times -= 1
              }
              this.$publicFun.showErrMessage(this, 'other.PUKBlockePermanently')
            } else {
              this.$publicFun.showErrMessage(this)
            }
          })
        }
      })
    },
    cancel() {
      this.$refs.pinFormData.resetFields()
      this.PINStatus = !this.PINStatus
    },
    // 修改PIN码
    applyChange() {
      this.$refs.changePinFormData.validate((valid, val) => {
        if (valid) {
          let parma = {
            operate: 4,
            pincode: this.changePinFormData.currentPin,
            newpincode: this.changePinFormData.newPIN
          }
          setSimPinMngInfoApi(parma).then((data) => {
            if (data.retcode == 0) {
              this.$refs.changePinFormData.resetFields()
              this.changePinStatus = false
              this.$publicFun.showSucMessage(this)
            } else if (data.retcode == 12) {
              if (this.pin_retry_times <= 0) {
                setTimeout(() => {
                  this.$store.dispatch('status/setSimInfo')
                }, 2000)
              }
              this.pin_retry_times -= 1
              this.$publicFun.showErrMessage(this, 'other.pinErrorTip', {
                time: this.pin_retry_times
              })
              // this.$publicFun.showErrMessage(this)
            } else if (data.retcode == 35) {
              if (this.pin_retry_times > 0) {
                this.pin_retry_times -= 1
              }
              this.$refs.changePinFormData.resetFields()
              this.$publicFun.showErrMessage(this)
              setTimeout(() => {
                this.$store.dispatch('status/setSimInfo')
              }, 2000)
            }
          })
        }
      })
    },
    // 取消修改PIN码
    cancelChange() {
      this.$refs.changePinFormData.resetFields()
      this.changePinStatus = false
    }
  },
  beforeDestroy() {
    clearInterval(this.simStatusTimer)
    this.simStatusTimer = null
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.flex-cent {
  justify-content: center !important;
}
</style>
