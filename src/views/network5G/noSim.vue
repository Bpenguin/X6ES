<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="block-body">
    <div v-show="simStatus == 0 || simStatus == ''">
      <el-row class="c-row">
        <svg-icon :icon-class="'noSIM'" class-name="sim-svg"></svg-icon>
        <div>{{ $t('other.noSimText') }}</div>
      </el-row>
    </div>
    <!-- 开启/关闭PIN码保护 -->
    <div v-show="simStatus == 3 || simStatus == 4">
      <div class="block-body">
        <div class="page-description">{{ $t('network5G.SIMPinManagementScr') }}</div>
      </div>

      <div class="block-body">
        <el-row class="c-row">
          <el-col :span="16">
            <div v-show='simStatus == 3'>{{ $t('network5G.SIMPINBlocked') }}:</div>
            <div v-show='simStatus == 4'>{{ $t('network5G.SIMPIUKBlocked') }}:</div>
          </el-col>
        </el-row>
        <div v-show="simStatus == 3">
          <el-form :model="pinFormData" :rules="pinRule" ref="pinFormData" label-width="25%" :label-position="formLablePos" size="mini">
            <el-form-item :label="$t('network5G.SIMPIN')+':'" prop="SIMPinNum">
              <mine-input :key="'SIMPinNum'" v-model="pinFormData.SIMPinNum" :maxlength='8'></mine-input>
            </el-form-item>
          </el-form>
          <!-- <el-row class="c-row">
            <el-col :span="8">
              <div> {{ $t('network5G.SIMPIN') }}:</div>
            </el-col>
            <el-col :span="16">
              <mine-input :key="'SIMPinNum'" :maxlength='8' v-model="SIMPinNum"></mine-input>
            </el-col>
          </el-row> -->
          <div class="c-row">
            <el-checkbox class="check-box" v-model="localPinTag"></el-checkbox>
            <label class="remmber-pwd-text">{{ $t('network5G.RememberSIMPIN') }}</label>
          </div>
          <div class="c-row">
            <div>{{ $t('network5G.remaining') }}: {{ pin_retry_times }}</div>
          </div>
        </div>
        <div v-show="simStatus == 4">
          <el-form ref="PukFormData" :model="PukFormData" :rules="PukFormDataRules" label-width="25%" :label-position="formLablePos" size="mini">
            <el-form-item :label="$t('network5G.SIMPUK')+':'" prop="currentPUK">
              <mine-input v-model="PukFormData.currentPUK" :maxlength='8'></mine-input>
            </el-form-item>
            <el-form-item :label="$t('network5G.NewSIMPIN')+':'" prop="newPIN">
              <mine-input v-model="PukFormData.newPIN" :maxlength='8'></mine-input>
            </el-form-item>
            <el-form-item :label="$t('network5G.ConfirmSIMPIN')+':'" prop="confirmNewPIN">
              <mine-input v-model="PukFormData.confirmNewPIN" :maxlength='8'></mine-input>
            </el-form-item>
            <el-form-item :label="$t('network5G.remaining')+':'" prop="remaining">
              <div class="remian-num">{{ puk_retry_times }}</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="c-row btn-row">
          <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
          <mine-button :btn-title="$t('common.apply')" :un-click="puk_retry_times <= 0?true:false" @clickBtn="apply"></mine-button>
        </div>
      </div>
      <div class="block-body">
        <div class="page-note">{{ $t('common.note')+':' + $t('network5G.SIMPinManagementNote') }}</div>
      </div>
    </div>

  </div>
</template>
<script>
import { getSimPinMngInfoApi, setSimPinMngInfoApi } from '@/api/network5G'
import formVaRule from '@/formValidator/index'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'NoSim',
  props: {
    simStatus: {
      type: Number,
      default: 0
    },
    pageType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var pinRuleSec = (rule, value, callback) => {
      // rule规则对象
      if (value != this.PukFormData.newPIN) {
        callback(new Error(this.$t('ruleTip.confirmPinRule')))
      } else {
        callback()
      }
    }
    return {
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
      SIMPinNum: '',
      localPinTag: false,
      pin_retry_times: 3,
      puk_retry_times: 10,
      PukFormData: {
        currentPUK: '', // 当前PIN
        newPIN: '', // 新pin
        confirmNewPIN: '', //确认PIN
        remaining: 10
      },
      PukFormDataRules: {
        currentPUK: [
          {
            required: true,
            message: this.$t('ruleTip.PUKPinRule'),
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
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {},
  mounted() {
    let rememberInfo = localStorage.getItem('SIMPinInfo')
    if (rememberInfo) {
      rememberInfo = JSON.parse(rememberInfo)
      if (rememberInfo.localPinTag) {
        this.localPinTag = rememberInfo.localPinTag
        if (rememberInfo.SIMPinNum) {
          this.pinFormData.SIMPinNum = rememberInfo.SIMPinNum
        }
      }
    }
    this.initData()
  },
  methods: {
    initData() {
      getSimPinMngInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.pin_retry_times = data.pin_retry_times
          this.puk_retry_times = data.puk_retry_times
        }
      })
    },
    applyClick() {
      let parma = {}
      if (this.simStatus == 3) {
        parma = {
          operate: 2,
          pincode: this.pinFormData.SIMPinNum
        }
      } else if (this.simStatus == 4) {
        parma = {
          operate: 3,
          pukcode: this.PukFormData.currentPUK,
          pincode: this.PukFormData.newPIN,
          newpincode: this.PukFormData.confirmNewPIN
        }
      }
      setSimPinMngInfoApi(parma).then((data) => {
        if (data.retcode == 0) {
          if (this.simStatus == 3) {
            const rememberInfo = {
              localPinTag: this.localPinTag ? true : false,
              SIMPinNum: this.pinFormData.SIMPinNum
            }
            localStorage.setItem('SIMPinInfo', JSON.stringify(rememberInfo))
          }
          this.$publicFun.showSucMessage(this)
          setTimeout(() => {
            this.$store.dispatch('status/setSimInfo')
          }, 2000)
        } else if (data.retcode == 12) {
          if (this.simStatus == 3) {
            this.pin_retry_times -= 1
            this.$publicFun.showErrMessage(this, 'other.pinErrorTip', {
              time: this.pin_retry_times
            })
          } else if (this.simStatus == 4) {
            this.puk_retry_times -= 1
            this.$publicFun.showErrMessage(this, 'other.pukErrorTip', {
              time: this.puk_retry_times
            })
          }
        } else if (data.retcode == 35) {
          this.$publicFun.showErrMessage(this, 'network5G.SIMPINBlocked')
          setTimeout(() => {
            this.$store.dispatch('status/setSimInfo')
          }, 2000)
        } else if (data.retcode == -42) {
          this.puk_retry_times -= 1
          this.$publicFun.showErrMessage(this)
        } else if (data.retcode == 36) {
          // this.puk_retry_times -= 1
          this.$publicFun.showErrMessage(this, 'other.PUKBlockePermanently')
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    apply() {
      if (this.simStatus == 3) {
        this.$refs.pinFormData.validate((valid, val) => {
          if (valid) {
            this.applyClick()
          }
        })
      } else if (this.simStatus == 4) {
        this.$refs.PukFormData.validate((valid, val) => {
          if (valid) {
            this.applyClick()
          }
        })
      }
    },
    cancel() {
      if (this.simStatus == 3) {
        this.$refs.pinFormData.resetFields()
      } else if (this.simStatus == 4) {
        this.$refs.PukFormData.resetFields()
      }
      if (this.pageType) {
        this.$emit('toPage')
      }
    }
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
.remian-num {
  height: 40px;
  line-height: 40px;
}
.sim-svg {
  width: 120px !important;
  height: 120px !important;
  fill: red;
}
</style>

