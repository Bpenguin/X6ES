<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wan.wanDualScr',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
    </div>
    <div class="block-body">
      <div class="page-description">{{ $t('wan.wanDualNote') }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="6" :xs="12">
          <div>{{ $t('wan.dualWan') }}:</div>
        </el-col>
        <el-col :span="12" :xs="12">
          <el-switch v-model="DualWanStatus" @change="dualChangeSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="6" :xs="24">
          <div>{{ $t('wan.primaryWAN') }}:</div>
        </el-col>
        <el-col :span="8" :xs="12">
          <el-radio v-model="PrimaryWanType" :label="1">{{ $t('nav.wan') }}</el-radio>
        </el-col>
        <el-col :span="8" :xs="12">
          <el-radio v-model="PrimaryWanType" :label="0">{{ $t('wan.WAN5G') }}</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" v-show="DualWanStatus">
        <el-col :span="6" :xs="24">
          <div>{{ $t('wan.secondaryWAN') }}:</div>
        </el-col>
        <el-col :span="8" :xs="12">
          <el-radio v-model="SecondaryWanType" :label="1">{{ $t('nav.wan') }}</el-radio>
        </el-col>
        <el-col :span="8" :xs="12">
          <el-radio v-model="SecondaryWanType" :label="0">{{ $t('wan.WAN5G') }}</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" v-show="DualWanStatus">
        <el-col :span="6" :xs="24">
          <div>{{ $t('wan.mode') }}:</div>
        </el-col>
        <el-col :span="8" :xs="12">
          <div class="c-row">
            <el-radio v-model="DualWanMode" :label="0">{{ $t('wan.failover') }}</el-radio>
            <el-tooltip class="item" effect="light" placement="bottom">
              <div class="pop-view" slot="content">{{$t('wan.failoverScr')}}</div>
              <div class="right-tip">
                <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
              </div>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8" :xs="12">
          <div class="c-row">
            <el-radio v-model="DualWanMode" :label="1">{{ $t('wan.loadBalance') }}</el-radio>
            <el-tooltip class="item" effect="light" placement="bottom">
              <div class="pop-view" slot="content">{{$t('wan.loadBalanceScr')}}</div>
              <div class="right-tip">
                <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
              </div>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="block-body" v-show="DualWanMode == 0 && DualWanStatus">
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="25%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('wan.checkInterval')+':'" prop="CheckInterval">
          <el-row :gutter="10">
            <el-col :span="16">
              <mine-input :key="'CheckInterval'" v-model="formData.CheckInterval"></mine-input>
            </el-col>
            <el-col :span="4">
              <div>{{ $t('wan.seconds') }}</div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px" :label="$t('wan.numberOfFailures')+':'" prop="NumBeforeFailover">
          <el-row :gutter="10">
            <el-col :span="16">
              <mine-input :key="'NumBeforeFailover'" v-model="formData.NumBeforeFailover"></mine-input>
            </el-col>
            <el-col :span="4">
              <div>{{ $t('wan.times') }}</div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px" :label="$t('wan.numberOfSuccessful')+':'" prop="NumBeforeSwitchBack">
          <el-row :gutter="10">
            <el-col :span="16">
              <mine-input :key="'NumBeforeSwitchBack'" v-model="formData.NumBeforeSwitchBack"></mine-input>
            </el-col>
            <el-col :span="4">
              <div>{{ $t('wan.times') }}</div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
      </div>
    </div>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="cancelWanMode" :right-btn-text="showDialogInfo.rightBtnText" @rightBtnClick="applySetting" @closeDialog="cancelWanMode"></mine-dialog>
  </div>
</template>

<script>
import {
  setDualWanConfigurationApi,
  getDualWanConfigurationApi,
  getWANModeInfo
} from '@/api/wan'
import formVaRule from '@/formValidator/index'
import MineDialog from '@/components/MineDialog'
export default {
  name: 'DualWanSetting',
  components: { MineDialog },
  data() {
    return {
      defalutDualInfo: {},
      wanToLanModeType: false,
      DualWanStatus: false, // 已设置的信息
      DualWanMode: 1, // 已设置的信息
      PrimaryWanType: 1,
      SecondaryWanType: 0,
      changeNum: 0,
      formData: {
        CheckInterval: 30,
        NumBeforeFailover: 3,
        NumBeforeSwitchBack: 3
      },
      formDataRules: {
        CheckInterval: [
          {
            required: true,
            message: this.$t('ruleTip.intervalRqRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.intervalRule, trigger: ['blur', 'change'] }
        ],
        NumBeforeFailover: [
          {
            required: true,
            message: this.$t('ruleTip.successfulBackRqRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: formVaRule.failuresFailoverRule,
            trigger: ['blur', 'change']
          }
        ],
        NumBeforeSwitchBack: [
          {
            required: true,
            message: this.$t('ruleTip.successfulBackRqRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: formVaRule.successfulBackRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      // 设置advande确认提示
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'other.enableDualMode', // 标题
        msgTitle: 'other.enableDualModeMsg',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'other.changeSetting' //右侧按钮的描述
      }
    }
  },
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  watch: {
    PrimaryWanType: function () {
      if (this.changeNum == 0) {
        this.changeNum += 1
        this.SecondaryWanType = this.PrimaryWanType == 1 ? 0 : 1
      } else {
        this.changeNum = 0
      }
      if (this.wanToLanModeType && this.PrimaryWanType == 1) {
        this.showDialogInfo.showDialog = true
      }
    },
    SecondaryWanType: function () {
      if (this.changeNum == 0) {
        this.changeNum += 1
        this.PrimaryWanType = this.SecondaryWanType == 1 ? 0 : 1
      } else {
        this.changeNum = 0
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.checkWanMode()
    this.initData()
  },
  methods: {
    initData() {
      getDualWanConfigurationApi().then((data) => {
        if (data.retcode == 0) {
          this.defalutDualInfo = {}
          this.defalutDualInfo = { ...data }
          this.setDualInfo(data)
        }
      })
    },
    setDualInfo(data) {
      this.DualWanStatus = data.DualWanStatus == 1 ? true : false
      this.DualWanMode = data.DualWanMode
      this.PrimaryWanType = data.PrimaryWanType
      this.SecondaryWanType = data.SecondaryWanType
      this.formData.CheckInterval = data.CheckInterval
      this.formData.NumBeforeFailover = data.NumBeforeFailover
      this.formData.NumBeforeSwitchBack = data.NumBeforeSwitchBack
    },
    apply() {
      let parma = {
        DualWanStatus: this.DualWanStatus ? 1 : 0,
        PrimaryWanType: this.PrimaryWanType
      }
      if (this.DualWanStatus) {
        parma['DualWanMode'] = this.DualWanMode
        parma['SecondaryWanType'] = this.SecondaryWanType
        if (this.DualWanMode == 0) {
          this.$refs.formData.validate((valid, val) => {
            if (valid) {
              parma['CheckInterval'] = this.formData.CheckInterval
              parma['NumBeforeFailover'] = this.formData.NumBeforeFailover
              parma['NumBeforeSwitchBack'] = this.formData.NumBeforeSwitchBack
              setDualWanConfigurationApi(parma).then((data) => {
                if (data.retcode == 0) {
                  this.$publicFun.showSucMessage(this)
                } else {
                  this.$publicFun.showErrMessage(this)
                }
              })
            }
          })
        } else {
          setDualWanConfigurationApi(parma).then((data) => {
            if (data.retcode == 0) {
              this.$publicFun.showSucMessage(this)
            } else {
              this.$publicFun.showErrMessage(this)
            }
          })
        }
      } else {
        setDualWanConfigurationApi(parma).then((data) => {
          if (data.retcode == 0) {
            this.$publicFun.showSucMessage(this)
          } else {
            this.$publicFun.showErrMessage(this)
          }
        })
      }
    },
    applySetting() {
      this.$router.push({ path: '/wan/setting' })
    },
    dualChangeSwitch(val) {
      if (this.wanToLanModeType) {
        this.showDialogInfo.showDialog = true
      }
    },
    // 取消跳转WAN setting
    cancelWanMode() {
      this.showDialogInfo.showDialog = false
      this.DualWanStatus = false
      this.PrimaryWanType = 0
    },
    checkWanMode() {
      getWANModeInfo().then((data) => {
        if (data.retcode == 0 && data.EthConnectMode == 3) {
          this.wanToLanModeType = true
        } else {
          this.wanToLanModeType = false
        }
      })
    },
    cancel() {
      // this.setDualInfo(this.defalutDualInfo)
      this.initData()
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.status-content {
  color: $default-font-color;
  padding: 40px;
  .scri-view {
    font-size: 16px;
    padding-right: 20px;
    color: $gray-font-color;
  }

  .item-view {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 40px 0;
    height: 40px;
    line-height: 40px;
    align-items: center;
    div {
      width: 50%;
    }
  }
}
.item {
  margin-left: -20px;
}
.pop-view {
  width: 200px;
  line-height: 18px;
  padding: 4px;
}

/deep/ .el-form-item--mini .el-form-item__label {
  line-height: 22px !important;
}
// .el-form-item--mini.el-form-item {
//   margin-bottom: 60px !important;
// }
</style>
