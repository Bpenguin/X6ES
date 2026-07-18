<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('lan.settingScr') }}</div>
    </div>
    <div class="block-body block-top">
      <el-form ref="lanSettingsInfo" key="lanSettingsInfo" :model="lanSettingsInfo" :rules="lanSettingsInfoRules" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('wifi.gatewayAddress')+':'" prop="gatewayAddress">
          <mine-input :key="'gatewayAddress'" v-model="lanSettingsInfo.gatewayAddress" @blur="initIpinfo" :placeholder="''"></mine-input>
        </el-form-item>
        <!-- <el-row class="c-row ">
          <el-col :span="10" :xs="0">
            <div></div>
          </el-col>
          <el-col :span="14" :xs="24">
            <div class="page-note">
              {{ $t('lan.gateWayAddressScr') }}<br /><br />
              {{ $t('lan.gateWayAddressScr1') }}<br />
              {{ $t('lan.gateWayAddressScr2') }}<br />
              {{ $t('lan.gateWayAddressScr3') }}<br />
              {{ $t('lan.gateWayAddressScr4') }}<br /><br />
              {{ $t('lan.gateWayAddressScr5') }}<br />
            </div>
          </el-col>
        </el-row> -->
        <el-form-item :label="$t('quickSetup.subnetMask')+':'" prop="subnetMask">
          <mine-input :key="'subnetMask'" v-model="lanSettingsInfo.subnetMask" :disabled="true" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('lan.dhcpServer')+':'" prop="dhcpServer">
          <el-switch v-model="lanSettingsInfo.dhcpServer" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('lan.startIpAddress')+':'" prop="startIpAddress">
          <mine-input :key="'startIpAddress'" v-model="lanSettingsInfo.startIpAddress" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('lan.endIpAddress')+':'" prop="endIpAddress">
          <mine-input :key="'endIpAddress'" v-model="lanSettingsInfo.endIpAddress" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('lan.dhcpLeaseTime')+':'" prop="dhcpLeaseTime">
          <el-select v-model="lanSettingsInfo.dhcpLeaseTime" popper-class="x6-select" :placeholder="''">
            <el-option v-for="item in dhcpLeaseTimes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.primaryDNSServer')+':'" prop="primarydns">
          <mine-input :key="'primarydns'" v-model="lanSettingsInfo.primarydns" :placeholder="'e.g., 8.8.8.8'"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.secondaryDNSServer')+':'" prop="secondarydns">
          <mine-input :key="'secondarydns'" v-model="lanSettingsInfo.secondarydns" :placeholder="'e.g., 8.8.4.4'"></mine-input>
        </el-form-item>
      </el-form>

    </div>
    <div class="block-body">
      <div class="btn-row c-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelSetting"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="applySetting"></mine-button>
      </div>
    </div>

    <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" :right-btn-text="showDialogInfo.rightBtnText" @leftBtnClick="cancelReboot" @rightBtnClick="changeLanSetting" @closeDialog="cancelReboot"></mine-dialog>
    <restarting-dialog v-if="showRestartLoading"></restarting-dialog>
  </div>
</template>
<script>
import MineDialog from '@/components/MineDialog'
import RestartingDialog from '@/components/MineDialog/restartingDialog'
import { getLanDhcpInfoApi, setLanDhcpApi, rebootDevice } from '@/api/system'
import formVaRule from '@/formValidator/index'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AdvanceSettings',
  components: { MineDialog, RestartingDialog },
  props: {},
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  data() {
    // let startipValitate = (rule, value, callback) => {
    //   if (value == '') callback()
    //   var ipReg =
    //     /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

    //   if (value == this.staticIPform.StaticIPGateway) {
    //     callback(this.$t('ruleTip.IPMatchGateRule'))
    //   } else if (!ipReg.test(value)) {
    //     callback(new Error(this.$t('ruleTip.WanIPRule')))
    //     // callback(new Error('The WAN IP address is invalid, please enter a valid address.'))
    //   } else {
    //     callback()
    //   }
    // }
    let SubnetmaskValidate = (rule, value, callback) => {
      var ipReg = /^25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?\.{2}[0-9]{1,3}$/
      if (!ipReg.test(value)) {
        callback(new Error(this.$t('ruleTip.SubnetmaskRule')))
      } else {
        // this.lanSettingsInfo.startIpAddress = '192.168.76.2'
        callback()
      }
    }
    return {
      showRestartLoading: false,
      // 2.4G数据
      lanSettingsInfo: {
        gatewayAddress: '',
        subnetMask: '',
        dhcpServer: true,
        startIpAddress: '',
        endIpAddress: '',
        dhcpLeaseTime: 12,
        primarydns: '',
        secondarydns: ''
      },
      initInfo: {},
      lanSettingsInfoRules: {
        gatewayAddress: [
          {
            required: true,
            message: this.$t('ruleTip.gatewayipRule'),
            // validator: formVaRule.SubnetmaskRule,
            trigger: 'blur'
          }
        ],
        subnetMask: [
          {
            required: true,
            validator: formVaRule.SubnetmaskRule,
            trigger: ['blur', 'change']
          },
          {
            validator: SubnetmaskValidate,
            trigger: ['blur', 'change']
          }
        ],
        startIpAddress: [
          {
            required: true,
            message: this.$t('ruleTip.startipRule'),
            validator: formVaRule.startipRule,
            trigger: 'blur'
          }
        ],
        endIpAddress: [
          {
            required: true,
            message: this.$t('ruleTip.endipRule'),
            // validator: formVaRule.endipRule,
            trigger: 'blur'
          }
        ],
        primarydns: [
          {
            required: false,
            validator: formVaRule.primaryDNSRule,
            trigger: ['blur', 'change']
          }
        ],
        secondarydns: [
          {
            required: false,
            validator: formVaRule.secondaryDNSRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      dhcpLeaseTimes: [
        { value: 1, label: '1 hour' },
        { value: 6, label: '6 hours' },
        { value: 12, label: '12 hours' },
        { value: 24, label: '24 hours' },
        { value: 48, label: '2 days' },
        { value: 72, label: '3 days' },
        { value: 168, label: '1 week' }
      ],
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.confirm', // 标题
        msgTitle: 'other.lanRestartSrcNew',
        leftBtnText: 'common.cancel', //左侧按钮的描述
        rightBtnText: 'common.ok' //右侧按钮的描述
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getLanDhcpInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.initFormateData(data)
          this.initInfo = { ...data }
          console.log('this.initInfo:', this.initInfo)
          // this.lanSettingsInfo.startIpAddress = data.startip
          // this.lanSettingsInfo.endIpAddress = data.endip
          // this.lanSettingsInfo.dhcpLeaseTime = data.leasetime
          // this.lanSettingsInfo.dhcpServer = data.status == 1 ? true : false
          // this.lanSettingsInfo.subnetMask =
          //   data.netmask == '' ? '255.255.255.0' : data.netmask
          // this.lanSettingsInfo.gatewayAddress = data.ipaddr
          // this.lanSettingsInfo.primarydns = data.primarydns
          //   ? data.primarydns
          //   : ''
          // this.lanSettingsInfo.secondarydns = data.secondarydns
          //   ? data.secondarydns
          //   : ''
        }
      })
    },
    initFormateData(data) {
      this.lanSettingsInfo.startIpAddress = data.startip
      this.lanSettingsInfo.endIpAddress = data.endip
      this.lanSettingsInfo.dhcpLeaseTime = data.leasetime
      this.lanSettingsInfo.dhcpServer = data.status == 1 ? true : false
      this.lanSettingsInfo.subnetMask =
        data.netmask == '' ? '255.255.255.0' : data.netmask
      this.lanSettingsInfo.gatewayAddress = data.ipaddr
      this.lanSettingsInfo.primarydns = data.primarydns ? data.primarydns : ''
      this.lanSettingsInfo.secondarydns = data.secondarydns
        ? data.secondarydns
        : ''
    },
    // 修改设置
    changeLanSetting() {
      this.showDialogInfo.showDialog = false
      let params = {}
      params.startip = this.lanSettingsInfo.startIpAddress
      params.endip = this.lanSettingsInfo.endIpAddress
      params.leasetime = this.lanSettingsInfo.dhcpLeaseTime
      params.status = this.lanSettingsInfo.dhcpServer == true ? 1 : 0
      params.netmask = this.lanSettingsInfo.subnetMask
      params.ipaddr = this.lanSettingsInfo.gatewayAddress
      params.primarydns = this.lanSettingsInfo.primarydns
      params.secondarydns = this.lanSettingsInfo.secondarydns
      setLanDhcpApi(params).then((data) => {
        if (data.retcode == 0) {
          rebootDevice().then((data) => {})
          this.showRestartLoading = true
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    // 恢复设置
    cancelSetting() {
      this.initFormateData(this.initInfo)
      // this.initData()
    },
    cancelReboot() {
      this.showDialogInfo.showDialog = false
      this.initFormateData(this.initInfo)
    },
    // 提示修改弹框
    applySetting() {
      this.$refs['lanSettingsInfo'].validate((valid) => {
        if (!valid) return
        this.showDialogInfo.showDialog = true
        // let params = {}
        // params.startip = this.lanSettingsInfo.startIpAddress
        // params.endip = this.lanSettingsInfo.endIpAddress
        // params.leasetime = this.lanSettingsInfo.dhcpLeaseTime
        // params.status = this.lanSettingsInfo.dhcpServer == true ? 1 : 0
        // params.netmask = this.lanSettingsInfo.subnetMask
        // params.ipaddr = this.lanSettingsInfo.gatewayAddress
        // params.primarydns = this.lanSettingsInfo.primarydns
        // params.secondarydns = this.lanSettingsInfo.secondarydns
        // setLanDhcpApi(params).then((data) => {
        //   if (data.retcode == 0) {
        //     this.showDialogInfo.showDialog = true
        //   } else {
        //     this.$publicFun.showErrMessage(this)
        //   }
        // })
      })
    },
    initIpinfo() {
      const regex = /^(\d{1,3}\.){3}/ // IP地址的正则表达式模式
      const matchResult = this.lanSettingsInfo.gatewayAddress.match(regex) // 进行匹配操作
      let firstThreeSegments = ''
      if (matchResult) {
        firstThreeSegments = matchResult[0].slice(0, -1) // 去除最后一位点号并输出结果
        this.lanSettingsInfo.subnetMask = '255.255.255.0'
        let startipMatchResult =
          this.lanSettingsInfo.startIpAddress.match(regex)
        if (startipMatchResult[0].slice(0, -1) != firstThreeSegments) {
          this.lanSettingsInfo.startIpAddress = firstThreeSegments + '.100'
        }
        let endipMatchResult = this.lanSettingsInfo.endIpAddress.match(regex)
        if (endipMatchResult[0].slice(0, -1) != firstThreeSegments) {
          this.lanSettingsInfo.endIpAddress = firstThreeSegments + '.254'
        }
        // this.lanSettingsInfo.endIpAddress = firstThreeSegments + '.254'
      }
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.block-top {
  margin-top: 30px !important;
}
.dfs-view {
  position: relative;
  .right-tip {
    position: absolute;
    right: 0;
    top: 0;
    // color: $default-font-color;
    width: 24px;
    height: 24px;
  }
  .dfs-item {
    margin-bottom: 20px;
  }
  .dfs-scr {
    padding-left: 20px;
    line-height: 20px;
    color: $gray-font-color;
  }
}
.pop-view {
  width: 200px;
  line-height: 18px;
  padding: 4px;
}
.scri-view {
  margin-left: 20px;
  margin-top: 20px;
  color: $gray-font-color;
}
.main-view {
  color: white;
  padding: 20px 2%;
  .item-view {
    // width: 90%;
  }
}
.padding-view {
  padding: 20px 5%;
  font-size: 16px;
  text-align: left;
}
.line-view {
  width: 100%;
  height: 1px;
  background: $light-style-color;
  margin: 0 0 20px 0;
}
.bottom-btn {
  display: flex;
  flex-direction: row;
  float: right;
  color: white;
  div {
    margin-right: 20px;
  }
}
.top-title {
  text-align: left;
  color: $light-style-color;
  font-size: 14px;
}
</style>