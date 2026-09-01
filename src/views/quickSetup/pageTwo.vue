<template>
  <div>
    <div v-show="wanType=='WAN'" class="top-title">{{ $t('nav.wan') }}</div>
    <div v-show="wanType == '5G'" class="top-title">{{ $t('wan.WAN5G') }}</div>
    <div v-show="wanType=='WAN'" class="block-body">

      <el-form ref="DHCPform" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('quickSetup.connectMode')+':'" label-width="40%" label-position="left" prop="connectMode">
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
    <div v-show="wanType == '5G'" class="block-body">
      <el-row class="c-row">
        <el-col :span="8" :xs="16">
          <div>{{ $t('nav.networkMode') }}:</div>
        </el-col>
        <el-col :span="12" :xs="18">
          <el-row class="c-row">
            <el-col :span="20">
              <el-select v-model="networkModelInfo.networkModel" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in networkModes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-tooltip class="item" effect="light" placement="bottom">
                <div class="pop-view" slot="content">
                  {{$t('other.mode5GToolTipScr1')}}<br />
                  - {{$t('other.mode5GToolTipScr2')}}<br />
                  - {{$t('other.mode5GToolTipScr3')}}<br />
                  - {{$t('other.mode5GToolTipScr4')}}<br />
                  - {{$t('other.mode5GToolTipScr5')}}<br />
                </div>
                <div class="right-tip">
                  <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8">
          <div>{{ $t('quickSetup.connectMode') }}:</div>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="connectInfo.connection_mode" :label="0">{{ $t('network5G.Auto') }}</el-radio>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="connectInfo.connection_mode" :label="1">{{ $t('network5G.Manual') }}</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8">
          <div>{{ $t('network5G.DataRoaming') }}:</div>
        </el-col>
        <el-col :span="12">
          <el-switch v-model="connectInfo.data_roaming" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8">
          <div>{{ $t('network5G.ConfigurationName') }}:</div>
        </el-col>
        <el-col :span="16" :xs="16">
          <el-select v-model="currentIndex" @change="changeProfile" popper-class="x6-select" :placeholder="''">
            <el-option v-for="item in nameList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.back')" @clickBtn="toPage('before')"></mine-button>
        <mine-button :btn-title="$t('common.next')" @clickBtn="toPage('next')"></mine-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getWANModeInfo } from '@/api/wan'
import {
  getWanNr5gModeInfoApi,
  getNetworkModeApi,
  getWanNetworkConnectionApi,
  getProfileInfoApi
} from '@/api/network5G'
import formVaRule from '@/formValidator/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'PageTwo',
  props: {
    wanType: {
      type: String,
      default: 'WAN'
    }
  },
  computed: {
    mobileStatus() {
      return this.$store.state.status.mobileInfo
    },
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
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
    }
    return {
      wan5GData: {},
      defaultForm: {}, // 已设置的默认值
      connnectModes: [
        { value: 2, label: 'DHCP' },
        { value: 1, label: 'Static IP' },
        { value: 0, label: 'PPPoE' }
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
        StaticIPMTU: '1500',
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
      networkModes: [
        { value: '0-1', label: 'Auto (5G NSA/4G)' },
        { value: '0-0', label: 'Auto (5G SA/NSA/4G)' },
        { value: '2-2', label: '5G SA only' },
        { value: '3', label: '4G only' }
      ],
      networkModelInfo: {
        searchMode: 0,
        networkModel: '0-1'
      },
      networdModeltotal: {
        NR5G: 1,
        networkModel: 0
      },

      connectInfo: {
        connection_mode: 0, // 已设置的信息
        data_roaming: false
      },
      defaultIndex: 0,
      currentIndex: '',
      currentData: [],
      dataList: [],
      nameList: []
    }
  },
  created() {},
  mounted() {
    this.initWanModeInfo() // 初始化配置信息
    this.initNetworkModels() // 初始化5G信息
    this.initNetworkConnection() // 获取5G信息
  },
  methods: {
    // 获取wan配置信息
    initWanModeInfo() {
      getWANModeInfo().then((data) => {
        if (data.retcode == 0) {
          this.defaultForm = data
          this.initFormData(data)
        }
      })
    },

    initFormData(data) {
      this.connectMode =
        data.EthConnectMode == 3 ? 'disable' : data.EthConnectMode
      const { DHCP, PPPoE, Static } = data
      this.DHCPform = { ...this.DHCPform, ...DHCP }
      this.PPPoEform = { ...this.PPPoEform, ...PPPoE }
      this.staticIPform = { ...this.staticIPform, ...Static }
    },

    // 获取network model信息
    initNetworkModels() {
      getNetworkModeApi().then((data) => {
        if (data.retcode == 0) {
          this.networdModeltotal.networkModel = data.mode
          getWanNr5gModeInfoApi().then((data) => {
            if (data.retcode == 0) {
              this.networdModeltotal.NR5G = data.mode
              // 拼接网络模式
              if (this.networdModeltotal.networkModel == 3) {
                this.networkModelInfo.networkModel = '3'
              } else if (this.networdModeltotal.networkModel == 2) {
                this.networkModelInfo.networkModel = '2-2'
              } else {
                this.networkModelInfo.networkModel =
                  this.networdModeltotal.networkModel +
                  '-' +
                  this.networdModeltotal.NR5G
              }
            }
          })
        }
      })
    },
    initNetworkConnection() {
      getWanNetworkConnectionApi().then((data) => {
        if (data.retcode == 0) {
          this.defaultInfo = { ...data }
          this.connectInfo.data_roaming = data.data_roaming == 0 ? false : true
          this.connectInfo.connection_mode = data.connection_mode
        }
      })
      getProfileInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.currentIndex = data.curid != 0 ? data.curid : ''
          this.defaultIndex = data.curid
          if (data.profileList.length > 0) {
            this.dataList = [...data.profileList]
            this.initNameLists()
            this.getCurrentData(this.currentIndex)
          }
        }
      })
    },
    changeProfile(val) {
      this.getCurrentData(val)
    },
    getCurrentData(index) {
      let hasDefaultIndex = false
      this.dataList.map((item) => {
        if (item.index == index) {
          this.currentData = item
          hasDefaultIndex = true
        }
      })
      if (!hasDefaultIndex) {
        this.currentData = this.dataList[0]
        this.currentIndex = this.dataList[0].index
      }
    },
    initNameLists() {
      let defStr = '(' + this.$t('common.default') + ')'
      if (!this.dataList || this.dataList.length < 1) return
      this.nameList = this.dataList.map((item) => {
        let labelName = item.profilename
        if (this.defaultIndex == item.index) {
          labelName += defStr
        }
        return { value: item.index, label: labelName }
      })
    },
    changeSelectMode(val) {
      this.connectMode = val
      console.log('this.connectMode', this.connectMode)
    },
    toPage(val) {
      if (val == 'before') {
        this.$emit('goToPageIndex', { index: 1 })
        return
      }
      if (this.wanType == '5G') {
        this.wan5GData = {
          networkModelInfo: { ...this.networkModelInfo },
          connectInfo: { ...this.connectInfo },
          currentData: { ...this.currentData }
        }
        this.$emit('goToPageIndex', { index: 3, params: this.wan5GData })
        return
      }
      // 跳转到下个页面
      let currentForm = this.$refs.DHCPform
      let wanData = this.DHCPform
      let connect_mode_parma = { EthConnectMode: this.connectMode }
      if (this.connectMode == 1) {
        currentForm = this.$refs.staticIPform
        wanData = this.staticIPform
      } else if (this.connectMode == 0) {
        console.log('PPPoEform')
        currentForm = this.$refs.PPPoEform
        wanData = this.PPPoEform
      } else if (this.connectMode == 2) {
        currentForm = this.$refs.DHCPform
        wanData = this.DHCPform
      } else {
        connect_mode_parma = { EthConnectMode: 3 }
        wanData = {}
      }
      wanData = { ...wanData, ...connect_mode_parma }
      currentForm.validate((valid, val) => {
        if (valid) {
          this.$emit('goToPageIndex', { index: 3, params: wanData })
        } else {
          console.log(valid, val)
        }
      })
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.main-view {
  color: white;
  padding: 20px 10%;
}
.pop-view {
  width: 200px;
  line-height: 18px;
  padding: 4px;
}
.item {
  margin-left: 20px;
}
</style>