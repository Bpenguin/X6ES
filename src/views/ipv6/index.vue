<template>
  <div class="container-main-content-body">
    <div class="head-view">{{$t('nav.ipv6')}}</div>
    <div class="block-header radio-item">{{ $t('other.curPriWAN')+': ' + $t(PrimaryWanType)}}</div>
    <div class="block-header">{{ $t('other.ipv6Src')}}</div>
    <div class="block-divide-line"></div>
    <div class="block-body">
      <el-form ref="ipv6Info" key="ipv6Info" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('quickSetup.connectMode')+':'" prop="connectMode">
          <el-select v-model="connectMode" popper-class="x6-select" :placeholder="''" @change="changeSelectMode">
            <el-option v-for="item in connectModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="connectMode != 0 && connectMode != 4" class="block-divide-line"></div>
    <div v-show="connectMode != 0 && connectMode != 4" class="block-header">{{ $t('ipv6.ipv6WanSetting')+':' }}</div>
    <!-- // DHCPv6的页面展示 -->
    <div class="block-body">
      <el-form v-show="connectMode == 1" ref="formdata0" key="formdata0" :rules="formdata0Rule" :model="formdata0" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('ipv6.automaticDNS')+':'" prop="automaticDNS">
          <el-switch v-model="formdata0.automaticDNS" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-form-item>
        <el-form-item v-if="!formdata0.automaticDNS" :label="$t('quickSetup.primaryDNSServer')+':'" prop="primaryDNSServer">
          <mine-input :key="'primaryDNSServer'" v-model="formdata0.primaryDNSServer" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item v-if="!formdata0.automaticDNS" :label="$t('quickSetup.secondaryDNSServer')+':'" prop="secondaryDNSServer">
          <mine-input :key="'secondaryDNSServer'" v-model="formdata0.secondaryDNSServer" :placeholder="''"></mine-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- // Static Pv6的页面展示 -->
    <div class="block-body">
      <el-form v-show="connectMode == 2" ref="formdata1" key="formdata1" :model="formdata1" :rules="formdata1Rule" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('network5G.IPv6Address')+':'" prop="ipv6Address">
          <mine-input :key="'ipv6Address'" v-model="formdata1.ipv6Address" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('ipv6.ipv6DefaultGateway')+':'" prop="ipv6DefaultGateway">
          <mine-input :key="'ipv6DefaultGateway'" v-model="formdata1.ipv6DefaultGateway" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.primaryDNSServer')+':'" prop="primaryDNSServer">
          <mine-input :key="'primaryDNSServer'" v-model="formdata1.primaryDNSServer" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.secondaryDNSServer')+':'" prop="secondaryDNSServer">
          <mine-input :key="'secondaryDNSServer'" v-model="formdata1.secondaryDNSServer" :placeholder="''"></mine-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- // PPPoE的页面展示 -->
    <div class="block-body">
      <el-form v-show="connectMode == 3" ref="formdata2" key="formdata2" :model="formdata2" :rules="formdata2Rule" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('common.username')+':'" prop="username">
          <mine-input :key="'username'" v-model="formdata2.username" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('common.password')+':'" prop="password">
          <mine-input :key="'password'" v-model="formdata2.password" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('ipv6.automaticDNS')+':'" prop="automaticDNS">
          <el-switch v-model="formdata2.automaticDNS" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-form-item>
        <el-form-item v-if="!formdata2.automaticDNS" :label="$t('quickSetup.primaryDNSServer')+':'" prop="primaryDNSServer">
          <mine-input :key="'primaryDNSServer'" v-model="formdata2.primaryDNSServer" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item v-if="!formdata2.automaticDNS" :label="$t('quickSetup.secondaryDNSServer')+':'" prop="secondaryDNSServer">
          <mine-input :key="'secondaryDNSServer'" v-model="formdata2.secondaryDNSServer" :placeholder="''"></mine-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="connectMode != 0 && connectMode != 4" class="block-divide-line"></div>
    <div v-show="connectMode != 0 && connectMode != 4" class="block-header">{{ $t('ipv6.ipv6LanSetting')+':' }}</div>
    <!-- // IPv6 LAN setting的页面展示 -->
    <div class="block-body">
      <el-form v-show="connectMode != 0 && connectMode != 4" ref="lanSettingInfo" key="lanSettingInfo" :model="lanSettingInfo" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('ipv6.ipAssignment')+':'" prop="ipAssignment">
          <div class="radio-item">
            <el-radio :label="1" v-model="lanSettingInfo.ipAssignment">{{$t('ipv6.statefulDHCPv6')}}</el-radio>
            <div class="scri-view">{{ $t('ipv6.lanScri') }}</div>
          </div>
          <div class="radio-item">
            <el-radio :label="2" v-model="lanSettingInfo.ipAssignment">{{$t('ipv6.slaacState')}}</el-radio>
            <div class="scri-view">{{ $t('ipv6.lanScri1') }}</div>
          </div>
          <div class="radio-item">
            <el-radio :label="3" v-model="lanSettingInfo.ipAssignment">{{$t('ipv6.slaacRdnss')}}</el-radio>
            <div class="scri-view">{{ $t('ipv6.lanScri2') }}</div>
          </div>
        </el-form-item>
      </el-form>
      <div v-show="connectMode == 2">
        <el-form ref="ipv6PrefixForm" key="ipv6PrefixForm" :model="ipv6PrefixForm" :rules="ipv6PrefixFormRule" label-width="40%" :label-position="formLablePos" size="mini">
          <el-form-item :label="$t('ipv6.ipv6Prefix')+':'" prop="ipv6Prefix">
            <mine-input :key="'ipv6Prefix'" v-model="ipv6PrefixForm.ipv6Prefix" :placeholder="''"></mine-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelSetting"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm"></mine-button>
      </div>
    </div>
  </div>
</template>

<script>
import formVaRule from '@/formValidator/index'
import { getDualWanConfigurationApi } from '@/api/wan'
import { getIpv6ConfigurationApi, setIpv6ConfigurationApi } from '@/api/ipv6'
export default {
  name: 'Ipv6Index',
  data() {
    return {
      PrimaryWanType: 'nav.wan',
      primaryWan: 1,
      connectMode: 0,
      formdata0: {
        automaticDNS: true,
        primaryDNSServer: '',
        secondaryDNSServer: ''
      },
      formdata0Rule: {
        primaryDNSServer: [
          {
            required: true,
            message: this.$t('ruleTip.primaryDNSRqRule'),
            trigger: ['blur', 'change']
          },
          { validator: formVaRule.ipv6PriDNSRule, trigger: ['blur', 'change'] }
        ],
        secondaryDNSServer: [
          {
            required: false,
            trigger: ['blur', 'change']
          }
        ]
      },
      formdata1: {
        ipv6Address: '',
        ipv6DefaultGateway: '',
        primaryDNSServer: '',
        secondaryDNSServer: ''
      },
      formdata1Rule: {
        ipv6Address: [
          { required: true, validator: formVaRule.ipv6IPRule, trigger: 'blur' }
        ],
        ipv6DefaultGateway: [
          {
            required: true,
            validator: formVaRule.ipv6GatewayRule,
            trigger: ['blur', 'change']
          }
        ],
        primaryDNSServer: [
          {
            required: true,
            validator: formVaRule.ipv6PriDNSRule,
            trigger: ['blur', 'change']
          }
        ],
        secondaryDNSServer: [
          {
            required: false,
            trigger: ['blur', 'change']
          }
        ]
      },
      formdata2: {
        username: '',
        password: '',
        automaticDNS: true,
        primaryDNSServer: '',
        secondaryDNSServer: ''
      },
      formdata2Rule: {
        username: [
          {
            required: true,
            validator: formVaRule.ipv6UsernameRule,
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            validator: formVaRule.ipv6PwdRule,
            trigger: ['blur', 'change']
          }
        ],
        primaryDNSServer: [
          {
            required: true,
            validator: formVaRule.ipv6PriDNSRule,
            trigger: ['blur', 'change']
          }
        ],
        secondaryDNSServer: [
          {
            required: false,
            trigger: ['blur', 'change']
          }
        ]
      },
      lanSettingInfo: {
        ipAssignment: 1,
        ipv6Prefix: ''
      },
      ipv6PrefixForm: {
        ipv6Prefix: ''
      },
      ipv6PrefixFormRule: {
        ipv6Prefix: [
          {
            required: true,
            validator: formVaRule.IPv6PrefixRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      connectModes: [
        { value: 0, label: 'Disable' },
        { value: 1, label: 'DHCPv6' },
        { value: 2, label: 'Static IPv6' },
        { value: 3, label: 'PPPoE' },
        { value: 4, label: 'Passthrough' }
      ]
    }
  },
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getDualWanConfigurationApi().then((data) => {
        if (data.retcode == 0) {
          this.primaryWan = data.PrimaryWanType
          this.PrimaryWanType =
            data.PrimaryWanType == 1 ? 'nav.wan' : 'wan.WAN5G'
          if (data.PrimaryWanType == 1) {
            this.connectModes = [
              { value: 0, label: 'Disable' },
              { value: 1, label: 'DHCPv6' },
              { value: 2, label: 'Static IPv6' },
              { value: 3, label: 'PPPoE' },
              { value: 4, label: 'Passthrough' }
            ]
          } else {
            this.connectModes = [
              { value: 0, label: 'Disable' },
              { value: 1, label: 'DHCPv6' },
              { value: 4, label: 'Passthrough' }
            ]
          }
        }
      })
      getIpv6ConfigurationApi().then((data) => {
        if (data.retcode == 0) {
          this.connectMode = data.IPv6ConnectionMode
          // LAN信息
          this.lanSettingInfo.ipAssignment = data.LanIPv6Assign

          //DHCP
          this.formdata0.automaticDNS =
            data.DHCPv6.IPv6DNSObtainMethod == 0 ? true : false
          this.formdata0.primaryDNSServer = data.DHCPv6.IPv6PrimaryDNS
          this.formdata0.secondaryDNSServer = data.DHCPv6.IPv6SecondaryDNS

          //static
          this.formdata1.primaryDNSServer = data.StaticIPv6.IPv6PrimaryDNS
          this.formdata1.secondaryDNSServer = data.StaticIPv6.IPv6SecondaryDNS
          this.formdata1.ipv6Address = data.StaticIPv6.StaticIPv6Address
          this.formdata1.ipv6DefaultGateway = data.StaticIPv6.StaticIPv6Gateway
          this.ipv6PrefixForm.ipv6Prefix = data.StaticIPv6.StaticIPv6Prefix

          //pppoe
          this.formdata2.username = data.PPPoEIPv6.IPv6PPPoEUserName
          this.formdata2.password = data.PPPoEIPv6.IPv6PPPoEPassword
          this.formdata2.automaticDNS =
            data.PPPoEIPv6.IPv6DNSObtainMethod == 0 ? true : false
          this.formdata2.primaryDNSServer = data.PPPoEIPv6.IPv6PrimaryDNS
          this.formdata2.secondaryDNSServer = data.PPPoEIPv6.IPv6SecondaryDNS
        }
      })
    },
    // 修改数据
    applyForm() {
      let params = {}
      params.IPv6ConnectionMode = this.connectMode
      if (this.connectMode == 1) {
        //  DHCP
        params.IPv6DNSObtainMethod = this.formdata0.automaticDNS ? 0 : 1
        if (!this.formdata0.automaticDNS) {
          params.IPv6PrimaryDNS = this.formdata0.primaryDNSServer
          params.IPv6SecondaryDNS = this.formdata0.secondaryDNSServer
        }
      } else if (this.connectMode == 2) {
        /* static */
        params.IPv6PrimaryDNS = this.formdata1.primaryDNSServer
        params.IPv6SecondaryDNS = this.formdata1.secondaryDNSServer
        params.StaticIPv6Address = this.formdata1.ipv6Address
        params.StaticIPv6Gateway = this.formdata1.ipv6DefaultGateway
        params.StaticIPv6Prefix = this.ipv6PrefixForm.ipv6Prefix
      } else if (this.connectMode == 3) {
        /* pppoe */
        params.IPv6PPPoEUserName = this.formdata2.username
        params.IPv6PPPoEPassword = this.formdata2.password
        if (!this.formdata2.automaticDNS) {
          params.IPv6PrimaryDNS = this.formdata2.primaryDNSServer
          params.IPv6SecondaryDNS = this.formdata2.secondaryDNSServer
        }
      } else if (this.connectMode == 4) {
      }
      if (this.connectMode != 0 && this.connectMode != 4) {
        params.LanIPv6Assign = this.lanSettingInfo.ipAssignment
        console.log('formdata' + (this.connectMode - 1))
        this.$refs['formdata' + (this.connectMode - 1)].validate((valid) => {
          if (valid) {
            if (this.connectMode == 2) {
              this.$refs.ipv6PrefixForm.validate((valid) => {
                if (valid) {
                  this.setIpv6Configuration(params)
                }
              })
            } else {
              this.setIpv6Configuration(params)
            }
          }
        })
      } else {
        this.setIpv6Configuration(params)
      }
      // if (this.connectMode != 0) {
      //   params.LanIPv6Assign = this.lanSettingInfo.ipAssignment
      // }
    },
    setIpv6Configuration(params) {
      setIpv6ConfigurationApi(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    cancelSetting() {
      this.initData()
    },
    changeSelectMode() {}
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.head-view {
  width: 100%;
  text-align: left;
  color: $light-style-color;
  font-size: 26px;
  margin-bottom: 20px;
}
.main-view {
  padding: 30px 0;
}
.top-title {
  text-align: left;
  color: $light-style-color;
  font-size: 14px;
}
.radio-item {
  margin-bottom: 20px;
}
.scri-view {
  font-size: 16px;
  padding-left: 26px;
  color: $gray-font-color;
  line-height: 16px;
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
.line-view {
  width: 100%;
  height: 1px;
  background: $light-style-color;
  margin: 30px 0 20px 0;
}
/deep/ .el-form-item {
  padding: 20px 30px 0 30px;
}
@media screen and (max-width: 768px) {
  /deep/ .el-form-item {
    padding: 0 !important;
  }
}
</style>
