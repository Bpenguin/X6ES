<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wan.wanSetScriTop') }}</div>
    </div>
    <div class="block-body">

      <el-form ref="DHCPform" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('quickSetup.connectMode')+':'" prop="connectMode">
          <el-select v-model="connectMode" popper-class="x6-select" @change="changeSelectMode">
            <el-option v-for="item in connnectModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form v-show="connectMode == 2" ref="DHCPform" :model="DHCPform" :rules="DHCPformformRules" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('quickSetup.primaryDNSServer')+':'" prop="DHCPPrimaryDNS">
          <mine-input :key="'DHCPPrimaryDNS'" v-model="DHCPform.DHCPPrimaryDNS" :placeholder="'e.g., 8.8.8.8'"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.secondaryDNSServer')+':'" prop="DHCPSecondaryDNS">
          <mine-input :key="'DHCPSecondaryDNS'" v-model="DHCPform.DHCPSecondaryDNS" :placeholder="'e.g., 8.8.4.4'"></mine-input>
        </el-form-item>
      </el-form>

      <el-form v-show="connectMode == 1" :model="staticIPform" :rules="staticIPformRules" ref="staticIPform" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('quickSetup.ipAddress')+':'" prop="StaticIPAddress">
          <mine-input :key="'StaticIPAddress'" v-model="staticIPform.StaticIPAddress" :placeholder="'e.g., 192.168.2.20'"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.subnetMask')+':'" prop="StaticIPNetmask">
          <mine-input :key="'StaticIPNetmask'" v-model="staticIPform.StaticIPNetmask" :placeholder="'e.g., 255.255.255.0'"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.defaultGateway')+':'" prop="StaticIPGateway">
          <mine-input :key="'StaticIPGateway'" v-model="staticIPform.StaticIPGateway" :placeholder="'e.g., 192.168.2.30'"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.MTU')+':'" prop="StaticIPMTU">
          <mine-input :key="'StaticIPMTU'" v-model="staticIPform.StaticIPMTU" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.primaryDNSServer')+':'" prop="StaticIPPrimaryDNS">
          <mine-input :key="'StaticIPPrimaryDNS'" v-model="staticIPform.StaticIPPrimaryDNS" :placeholder="'e.g., 8.8.8.8'"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.secondaryDNSServer')+':'" prop="StaticIPSecondaryDNS">
          <mine-input :key="'StaticIPSecondaryDNS'" v-model="staticIPform.StaticIPSecondaryDNS" :placeholder="'e.g., 8.8.4.4'"></mine-input>
        </el-form-item>
      </el-form>

      <el-form v-show="connectMode == 0" :model="PPPoEform" :rules="PPPoEformRules" ref="PPPoEform" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('common.username')+':'" prop="PPPoEUsername">
          <mine-input :key="'PPPoEUsername'" v-model="PPPoEform.PPPoEUsername" :maxlength='63' :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('common.password')+':'" prop="PPPoEPassword">
          <mine-input :key="'PPPoEPassword'" v-model="PPPoEform.PPPoEPassword" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.MTU')+':'" prop="PPPoEMTU">
          <mine-input :key="'PPPoEMTU'" v-model="PPPoEform.PPPoEMTU" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.primaryDNSServer')+':'" prop="PPPoEPrimaryDNS">
          <mine-input :key="'PPPoEPrimaryDNS'" v-model="PPPoEform.PPPoEPrimaryDNS" :placeholder="'e.g., 8.8.8.8'"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.secondaryDNSServer')+':'" prop="PPPoESecondaryDNS">
          <mine-input :key="'PPPoESecondaryDNS'" v-model="PPPoEform.PPPoESecondaryDNS" :placeholder="'e.g., 8.8.4.4'"></mine-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="block-body">
      <div class="page-note">{{ $t('wan.wanSetScribottom') }}<br />{{ $t('wan.wanSetScribottom1',{ProductName:GLOBAL.PRODUCT_NAME}) }}<br />{{ $t('wan.wanSetScribottom2') }}<br />{{ $t('wan.wanSetScribottom3',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
    </div> -->
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
      </div>
    </div>
    <!-- <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog> -->
    <mine-dialog :show-dialog='showSwitchDialogInfo.showDialog' :show-close-btn="showSwitchDialogInfo.showCloseBtn" :title="showSwitchDialogInfo.title" :msg-title="showSwitchDialogInfo.msgTitle" :left-btn-text="showSwitchDialogInfo.leftBtnText" @leftBtnClick="showSwitchDialogInfo.showDialog = false" :right-btn-text="showSwitchDialogInfo.rightBtnText" @rightBtnClick="switchWanToLan" @closeDialog="showSwitchDialogInfo.showDialog = false"></mine-dialog>
  </div>
</template>
<script>
import {
  getWANModeInfo,
  setWANInfo,
  getDualWanConfigurationApi
} from '@/api/wan'
import { getEthernetConnectStatusApi } from '@/api/status'
import MineDialog from '@/components/MineDialog'
// import { connectMode_fill } from '@/utils/until'
import formVaRule from '@/formValidator/index'
export default {
  name: 'WANSetting',
  // eslint-disable-next-line vue/multi-word-component-names
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  components: { MineDialog },
  data() {
    let validateT1 = (rule, value, callback) => {
      if (value == '') callback()
      var ipReg =
        /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

      if (value == this.staticIPform.StaticIPGateway) {
        callback(this.$t('ruleTip.IPMatchGateRule'))
      } else if (!ipReg.test(value)) {
        callback(new Error(this.$t('ruleTip.WanIPRule')))
        // callback(new Error('The WAN IP address is invalid, please enter a valid address.'))
      } else {
        callback()
      }
    }
    let validateT2 = (rule, value, callback) => {
      if (value == '') callback()
      this.$refs.staticIPform.validateField('StaticIPAddress')
      var gatewayReg =
        /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
      if (!gatewayReg.test(value)) {
        callback(new Error(this.$t('ruleTip.defaultGatewayRule')))
      } else {
        callback()
      }

      // callback(this.$t('ruleTip.IPMatchGateRule'))
    }
    return {
      connectStatus: {
        eth_connect_status: 1, // Ethernet WAN 网络连接状态 0- connected  1- connected
        nw_cable_status: 1 // WAN 口网线接入状态 0- connected  1- connected
      },
      showSwitchTip: true, // 是否可以切换wan to Lan
      defaultForm: {}, // 已设置的默认值
      connnectModes: [
        { value: 2, label: 'DHCP' },
        { value: 1, label: 'Static IP' },
        { value: 0, label: 'PPPoE' },
        { value: 3, label: 'Switch WAN port LAN' }
      ],
      connectMode: 2,
      DHCPform: {
        DHCPPrimaryDNS: '',
        DHCPSecondaryDNS: ''
      },
      DHCPformformRules: {
        DHCPPrimaryDNS: [
          { required: true, trigger: 'change' },
          { validator: formVaRule.primaryDNSRule, trigger: ['blur', 'change'] }
        ],
        DHCPSecondaryDNS: [
          { required: false, trigger: 'change' },
          {
            validator: formVaRule.secondaryDNSRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      staticIPform: {
        StaticIPAddress: '',
        StaticIPNetmask: '',
        StaticIPGateway: '',
        StaticIPMTU: 1500,
        StaticIPPrimaryDNS: '',
        StaticIPSecondaryDNS: ''
      },
      staticIPformRules: {
        StaticIPAddress: [
          {
            required: true,
            message: this.$t('ruleTip.WanIPRqRule'),
            trigger: ['blur', 'change']
          },
          // { validator: formVaRule.WanIPRule, trigger: ['blur', 'change'] },
          { validator: validateT1, trigger: ['blur', 'change'] }
        ],
        StaticIPNetmask: [
          {
            required: true,
            message: this.$t('ruleTip.SubnetmaskRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.SubnetmaskRule, trigger: ['blur', 'change'] }
        ],
        StaticIPGateway: [
          {
            required: true,
            message: this.$t('ruleTip.gatewayRqRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: validateT2,
            trigger: ['blur', 'change']
          }
        ],
        StaticIPMTU: [
          {
            required: true,
            message: this.$t('ruleTip.MTURqRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.MtuRule, trigger: ['blur', 'change'] }
        ],
        StaticIPPrimaryDNS: [
          {
            required: true,
            message: this.$t('ruleTip.primaryDNSRqRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.primaryDNSRule, trigger: ['blur', 'change'] }
        ],
        StaticIPSecondaryDNS: [
          { required: false, trigger: ['blur', 'change'] },
          {
            validator: formVaRule.secondaryDNSRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      PPPoEform: {
        PPPoEPrimaryDNS: '',
        PPPoESecondaryDNS: '',
        PPPoEUsername: '',
        PPPoEPassword: '',
        PPPoEMTU: '1492'
      },
      PPPoEformRules: {
        PPPoEUsername: [
          {
            required: true,
            message: this.$t('ruleTip.pppoeUserNameRule'),
            trigger: 'blur'
          }
        ],
        PPPoEPassword: [
          {
            required: true,
            message: this.$t('ruleTip.pppoePasswordRule'),
            trigger: 'blur'
          }
        ],
        PPPoEMTU: [
          {
            required: true,
            message: this.$t('ruleTip.PPPoEMTURule'),
            trigger: 'blur'
          },
          { validator: formVaRule.MtuPpoeRule, trigger: ['blur', 'change'] }
        ],
        PPPoEPrimaryDNS: [
          // { required: false, trigger: 'change' },
          {
            required: false,
            validator: formVaRule.primaryDNSRule,
            trigger: ['blur', 'change']
          }
        ],
        PPPoESecondaryDNS: [
          // { required: false, trigger: 'change' },
          {
            required: false,
            validator: formVaRule.secondaryDNSRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      // showDialogInfo: {
      //   showDialog: false,
      //   showCloseBtn: true,
      //   title: 'wan.wanSetSuccesstitle', // 标题
      //   msgTitle: 'wan.wanSetSuccessMsg',
      //   leftBtnText: 'common.ok' //右侧按钮的描述
      // },
      showSwitchDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'wan.switchWanToLanTitle', // 标题
        msgTitle: 'wan.switchWanPort',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'wan.changeSetting'
      }
    }
  },

  created() {},
  mounted() {
    console.log('1111111')
    this.initWanModeInfo() // 初始化配置信息
  },
  methods: {
    // 获取wan配置信息
    initWanModeInfo() {
      getWANModeInfo().then((data) => {
        if (data.retcode == 0) {
          // data.eth_connect_mode_fill = connectMode_fill(data.eth_connect_mode)
          this.defaultForm = data
          this.initFormData(data)
        }
      })
      getDualWanConfigurationApi().then((data) => {
        if (data.retcode == 0) {
          if (data.DualWanStatus == 0 && data.PrimaryWanType == 0) {
            this.showSwitchTip = false
          } else {
            this.showSwitchTip = true
          }
        } else {
          this.showSwitchTip = true
        }
      })
    },
    // 初始化表单的值
    initFormData(data) {
      this.connectMode = data.EthConnectMode
      const { DHCP, PPPoE, Static } = data
      if (DHCP.DHCPPrimaryDNS == '') {
        DHCP.DHCPPrimaryDNS = '8.8.8.8'
      }
      if (Static.StaticIPPrimaryDNS == '') {
        Static.StaticIPPrimaryDNS = '8.8.8.8'
      }
      // if (PPPoE.PPPoEPrimaryDNS == '') {
      //   PPPoE.PPPoEPrimaryDNS = '8.8.8.8'
      // }
      this.DHCPform = { ...this.DHCPform, ...DHCP }
      this.PPPoEform = { ...this.PPPoEform, ...PPPoE }
      this.staticIPform = { ...this.staticIPform, ...Static }
    },
    changeSelectMode(val) {
      this.connectMode = val
      console.log('this.connectMode', this.connectMode)
    },
    cancel() {
      let arr = ['PPPoEform', 'staticIPform', 'DHCPform']
      arr.forEach((formName) => {
        this.$refs[formName].resetFields()
      })
      this.initFormData(this.defaultForm)
    },

    // 设置WAN的参数
    async apply() {
      let formName = ''
      let parmas = {}
      let formData = {}
      let connect_mode_parma = { EthConnectMode: this.connectMode }
      // if (this.connectMode == 3 && type != 'wanToLan') {
      //   // this.showSwitchDialogInfo.msgTitle = 'wan.switchWanPort'
      //   this.showSwitchDialogInfo.showDialog = true
      //   return
      // }
      if (this.connectMode == 3) {
        if (this.showSwitchTip) {
          this.showSwitchDialogInfo.showDialog = true
          return
        }
      }
      if (this.connectMode == 0) {
        formName = 'PPPoEform'
        formData = this.PPPoEform
      } else if (this.connectMode == 1) {
        formName = 'staticIPform'
        formData = this.staticIPform
      } else if (this.connectMode == 2) {
        formName = 'DHCPform'
        formData = this.DHCPform
      } else {
        formName = 'DHCPform'
      }
      parmas = { ...formData, ...connect_mode_parma }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.showSwitchDialogInfo.showDialog = false
          // 取消wan口查询状态的逻辑
          // await this.getWanConnectStatus()
          // if (this.connectStatus.NwCableStatus == 0) {
          //   this.$publicFun.showErrMessage(this)
          //   return
          // }
          setWANInfo(parmas).then((data) => {
            if (data.retcode == 0) {
              getWANModeInfo().then((data) => {
                if (data.retcode == 0) {
                  // data.eth_connect_mode_fill = connectMode_fill(data.eth_connect_mode)
                  this.defaultForm = data
                }
              })
              this.$publicFun.showSucMessage(this)
            } else if (data.retcode == 401) {
              console.log('userName or pwd error')
              this.$publicFun.showErrMessage(this, 'other.ppoeError')
            } else {
              this.$publicFun.showErrMessage(this)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getWanConnectStatus() {
      await getEthernetConnectStatusApi().then((data) => {
        if (data.retcode == 0) {
          this.connectStatus = { ...data }
        }
      })
    },
    switchWanToLan() {
      this.$router.push({ path: '/wan/dualWanSetting' })
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.scri-view {
  font-size: 16px;
  padding-right: 20px;
  color: $gray-font-color;
}
.mari-bot {
  margin-bottom: 20px;
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
</style>