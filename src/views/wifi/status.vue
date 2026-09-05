<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <!-- 2.4G菜单设置 -->
    <div class="block-body" v-for="(item,index) in [wifiInfo_4G,wifiInfo_5G,wifiInfo_6G]" :key="index">
      <template>
        <div class="block-header">{{index == 0?'2.4GHz':index == 1?'5Ghz':index == 2?'6GHz':''}}</div>

        <div v-if="item.hzSwitch" class="block-body">
          <el-row class="c-row">
            <el-col :span="10" :xs="12">
              <div class="left-label">{{ $t('quickSetup.wifiSSID') +':'}}</div>
            </el-col>
            <el-col :span="10" :xs="12">
              <div class="middle-label">{{ item.ssid}}</div>
            </el-col>
            <el-col :span="4" :xs="20">
              <div class="right-label">
                <mine-button :btn-title="$t('common.change')" @clickBtn="changeStatus"></mine-button>
              </div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="10" :xs="12">
              <div class="left-label">{{ $t('quickSetup.SSIDBroadcast')+':' }}</div>
            </el-col>
            <el-col :span="10" :xs="12">
              <div class="middle-label">{{ item.broadcastSwitch == 1? $t('common.enabled'):$t('other.disabled01')}}</div>
            </el-col>
            <el-col :span="4">
              <div class="right-label"></div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="10" :xs="12">
              <div class="left-label">{{ $t('quickSetup.security') +':'}}</div>
            </el-col>
            <el-col :span="10" :xs="12">
              <div class="middle-label">{{ item.securitymode | securityType}}</div>
            </el-col>
            <el-col :span="4">
              <div class="right-label"></div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="10" :xs="12">
              <div class="left-label">{{ $t('wifi.channel') +':'}}</div>
            </el-col>
            <el-col :span="10" :xs="12">
              <div class="middle-label">{{ item.channel}}</div>
            </el-col>
            <el-col :span="4">
              <div class="right-label"></div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="10" :xs="12">
              <div class="left-label">{{ $t('nav.connectedDevices') +':'}}</div>
            </el-col>
            <el-col :span="10" :xs="12">
              <div class="middle-label">{{ item.connectedDevice}}</div>
            </el-col>
            <el-col :span="4">
              <div class="right-label"></div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="10" :xs="12">
              <div class="left-label">{{ $t('wifi.gatewayAddress') +':'}}</div>
            </el-col>
            <el-col :span="4">
              <div class="middle-label">{{ item.gatewayAddress}}</div>
            </el-col>
            <el-col :span="4">
              <div class="right-label"></div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="10" :xs="12">
              <div class="left-label">{{ $t('wan.macAddress')+':' }}</div>
            </el-col>
            <el-col :span="10" :xs="12">
              <div class="middle-label">{{ item.macAddress}}</div>
            </el-col>
            <el-col :span="4">
              <div class="right-label"></div>
            </el-col>
          </el-row>
        </div>
        <div v-else class="block-body">
          <el-row class="c-row">
            <el-col :span="10" :xs="0">
              <div></div>
            </el-col>
            <el-col :span="10" :xs="12">
              <div class="middle-label">{{$t('other.disabled01')}}</div>
            </el-col>
            <el-col :span="4" :xs="12">
              <div class="right-label">
                <mine-button :btn-title="$t('common.change')" @clickBtn="changeStatus"></mine-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="line-view"></div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  getWifiDetailsInfoApi,
  getDeviceInfoStatusApi,
  getMobileInfoStatusApi
} from '@/api/status'
import {
  getAdvancedSettingInfoApi,
  getAdvanced1SettingInfoApi,
  getWifiClientInfo
} from '@/api/wifi'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WifiStatus',
  computed: {},
  data() {
    return {
      // connectedDevice: 0, // 连接设备总数
      wifiInfo_4G: {
        hzSwitch: true,
        // wifiStatus: false,
        ssid: '',
        broadcastSwitch: false,
        ssidSwitch: true,
        securitymode: 4,
        channel: 0,
        encryption: 2,
        securitykey: '',
        gatewayAddress: '--.--.--.--',
        macAddress: '--.--.--.--',
        connectedDevice: 0
      },
      wifiInfo_5G: {
        hzSwitch: false,
        // wifiStatus: false,
        ssid: '',
        broadcastSwitch: false,
        ssidSwitch: true,
        securitymode: 4,
        channel: 0,
        encryption: 2,
        securitykey: '',
        gatewayAddress: '--.--.--.--',
        macAddress: '--.--.--.--',
        connectedDevice: 0
      },
      wifiInfo_6G: {
        hzSwitch: false,
        // wifiStatus: false,
        ssid: '',
        broadcastSwitch: false,
        ssidSwitch: true,
        securitymode: 4,
        channel: 0,
        encryption: 2,
        securitykey: '',
        gatewayAddress: '--.--.--.--',
        macAddress: '--.--.--.--',
        connectedDevice: 0
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // 初始化信息
      getWifiDetailsInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.wifiInfo_4G.hzSwitch = data.Host1Status == 1 ? true : false
          this.wifiInfo_4G.ssid = data.Host1Ssid
          this.wifiInfo_4G.broadcastSwitch = data.Host1Broadcast
          this.wifiInfo_4G.securitymode = data.Host1Security
          this.wifiInfo_4G.channel = this.formChannel(
            data.Host1AcsStatus,
            data.Host1Channel
          )
          this.wifiInfo_4G.connectedDevice = data.Host1ConnectedDevice
          this.wifiInfo_4G.macAddress = data.Host1MacAddress
          this.wifiInfo_4G.gatewayAddress = data.Host1GatewayIp

          // 5G WIFI信息
          this.wifiInfo_5G.hzSwitch = data.Host2Status == 1 ? true : false
          this.wifiInfo_5G.ssid = data.Host2Ssid
          this.wifiInfo_5G.broadcastSwitch = data.Host2Broadcast
          this.wifiInfo_5G.securitymode = data.Host2Security
          this.wifiInfo_5G.channel = this.formChannel(
            data.Host2AcsStatus,
            data.Host2Channel
          )
          this.wifiInfo_5G.connectedDevice = data.Host2ConnectedDevice
          this.wifiInfo_5G.macAddress = data.Host2MacAddress
          this.wifiInfo_5G.gatewayAddress = data.Host2GatewayIp

          // 6G信息
          this.wifiInfo_6G.hzSwitch = data.Host3Status == 1 ? true : false
          this.wifiInfo_6G.ssid = data.Host3Ssid
          this.wifiInfo_6G.broadcastSwitch = data.Host3Broadcast
          this.wifiInfo_6G.securitymode = data.Host3Security
          this.wifiInfo_6G.channel = this.formChannel(
            data.Host3AcsStatus,
            data.Host3Channel
          )
          this.wifiInfo_6G.connectedDevice = data.Host3ConnectedDevice
          this.wifiInfo_6G.macAddress = data.Host3MacAddress
          this.wifiInfo_6G.gatewayAddress = data.Host3GatewayIp
        }
      })
    },
    // 格式化信道展示
    formChannel(channelType, num = 0) {
      let channelStr = ''
      if (channelType == 1) {
        channelStr += 'Auto'
        channelStr += '(channel' + num + ')'
      } else {
        channelStr = num
      }
      return channelStr
    },

    changeStatus() {
      this.$router.push({ path: '/wifi/basicSetting' })
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.content {
  text-align: left;
  color: $default-font-color;
}
.top-title {
  font-size: 18px;
  color: $light-style-color;
  padding: 30px 0 10px 0;
}
.padding-view {
  width: 95%;
  margin: 0 auto;
}
// .c-row {
//   display: flex;
//   flex-direction: row;
//   margin: 30px 0;
//   align-items: center;
//   .left-label {
//     // width: 40%;
//     // min-width: 160px;
//   }
// }
.middle-label {
  // width: 40%;
  // min-width: 200px;
}
.right-label {
  // width: 20%;
  text-align: right;
}
.line-view {
  width: 100%;
  height: 1px;
  background: $light-style-color;
  margin: 0 0 20px 0;
}
</style>
