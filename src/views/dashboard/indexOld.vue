<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pri-main content-full-page">
    <!-- 头部视图 -->
    <section class="pri-dash-board-row">
      <div class="pri-dash-board-card pri-grid-container">
        <!-- 状态展示区 -->
        <div class="pri-relative pri-internet-status pri-text-align-center">
          <div class="pri-wan-icon">
            <svg-icon v-if="connectionStatus" :icon-class="'connection'" class-name="link-svg fill-light-color"></svg-icon>
            <svg-icon v-else :icon-class="'disconnected'" class-name="link-svg"></svg-icon>
          </div>
          <div class="pri-wan-title">
            <p>{{$t('other.DualWANMode')}}</p>
            <p class="pri-text-color-blue">
              {{dualModeData.dualModeStatus | dualModeTypeFilter}}
            </p>
          </div>
        </div>
        <!-- 速率展示区 -->
        <div class="pri-signal priColumn">
          <div class="pri-data-box-block pri-data-box-padding">
            <div class="pri-data-box-bg" v-if="dualModeData.PrimaryWanType == 1">
              <p class="pri-data-box-title">
                <span>{{$t('wan.primaryWAN')}}</span>
              </p>
              <div class="pri-data-box-value pri-data-box-align pri-d-flex-justify-around pri-padding-bottom0">
                <div class="pri-signal-logo" style="margin: auto 0px;">
                  <div class="pri-signal-title">
                    WAN
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{ethWanInfo.rx_rate}}
                    </label>
                    <span>{{ethWanInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{ethWanInfo.tx_rate}}
                    </label>
                    <span>{{ethWanInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address pri-ip-text pri-wan-ip">
                <label>IP: {{ethWanInfo.ipAddr}}</label>
              </div>
            </div>
            <div class="pri-data-box-bg" v-else>
              <p class="pri-data-box-title">
                <span>{{$t('wan.primaryWAN')}}</span>
              </p>
              <div class="pri-data-box-value pri-data-box-align pri-d-flex-justify-around pri-padding-bottom0">
                <div class="pri-signal-logo">
                  <div class="pri-signal-bar">
                    <svg-icon v-if="wan5GInfo.signal_level == 4" :icon-class="'client4'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else-if="wan5GInfo.signal_level ==3" :icon-class="'client3'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else-if="wan5GInfo.signal_level ==2" :icon-class="'client2'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else-if="wan5GInfo.signal_level ==1" :icon-class="'client1'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else :icon-class="'client0'" class-name="client-svg"></svg-icon>
                  </div>
                  <div class="pri-signal-title" style="max-width: 90px; margin: auto 0px;">
                    {{ wan5GInfo.service_state | serverStateTypeFilter }}
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{wan5GInfo.rx_rate}}
                    </label>
                    <span>{{wan5GInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{wan5GInfo.tx_rate}}
                    </label>
                    <span>{{wan5GInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address">
                <div class="pri-ip-text"><label>IP: {{wan5GInfo.ipv4Addr}}</label></div>
                <div class="pri-ipv6-text"><label>IPv6: {{wan5GInfo.ipv6Addr}}</label></div>
              </div>
            </div>
          </div>
          <div class="pri-dash-board-block-divide-line"></div>
          <div class="pri-data-box-block pri-data-box-padding">
            <div class="pri-data-box-bg" v-if="dualModeData.PrimaryWanType == 1">
              <p class="pri-data-box-title">
                <span>{{$t('wan.secondaryWAN')}}</span>
              </p>
              <div class="pri-data-box-value pri-data-box-align pri-d-flex-justify-around pri-padding-bottom0">
                <div class="pri-signal-logo">
                  <div class="pri-signal-bar">
                    <svg-icon v-if="wan5GInfo.signal_level == 4" :icon-class="'client4'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else-if="wan5GInfo.signal_level ==3" :icon-class="'client3'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else-if="wan5GInfo.signal_level ==2" :icon-class="'client2'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else-if="wan5GInfo.signal_level ==1" :icon-class="'client1'" class-name="client-svg"></svg-icon>
                    <svg-icon v-else :icon-class="'client0'" class-name="client-svg"></svg-icon>
                  </div>
                  <div class="pri-signal-title" style="max-width: 90px; margin: auto 0px;">
                    {{ wan5GInfo.service_state | serverStateTypeFilter }}
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{wan5GInfo.rx_rate}}
                    </label>
                    <span>{{wan5GInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{wan5GInfo.tx_rate}}
                    </label>
                    <span>{{wan5GInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address">
                <div class="pri-ip-text"><label>IP: {{wan5GInfo.ipv4Addr}}</label></div>
                <div class="pri-ipv6-text"><label>IPv6: {{wan5GInfo.ipv6Addr}}</label></div>
              </div>
            </div>
            <div class="pri-data-box-bg" v-else>
              <p class="pri-data-box-title">
                <span>{{$t('wan.secondaryWAN')}}</span>
              </p>
              <div class="pri-data-box-value pri-data-box-align pri-d-flex-justify-around pri-padding-bottom0">
                <div class="pri-signal-logo" style="margin: auto 0px;">
                  <div class="pri-signal-title">
                    WAN
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{ethWanInfo.rx_rate}}
                    </label>
                    <span>{{ethWanInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-traffic-data">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-blue pri-traffic-value">
                      {{ethWanInfo.tx_rate}}
                    </label>
                    <span>{{ethWanInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address pri-ip-text pri-wan-ip">
                <label>IP: {{ethWanInfo.ipAddr}}</label>
              </div>
            </div>

          </div>
        </div>
        <!-- 路由器图标 -->
        <div class="pri-router-icon pri-text-align-center">
          <div class="pri-wan-icon pri-wan-icon-router">
            <svg-icon :icon-class="'wan-moddel'" class-name="link-svg fill-light-color"></svg-icon>
          </div>
        </div>
        <!-- 接口信息 -->
        <div class="pri-connected-amount">
          <div class="pri-data-box-block  pri-data-box-padding">
            <div class="pri-data-box-bg">
              <p class="pri-data-box-title"> Clents </p>
              <div class="pri-data-box-value pri-d-flex-justify-around">
                <div>
                  <svg-icon :icon-class="'wifi-4G'" :class-name="hostWifiData.host4GStatus == 1?'flow-dir':'flow-dir fill-light-color'"></svg-icon>
                  <div class="pri-amount-circle priBgConnect">{{hostWifiData.Host4GNum}}</div>
                </div>
                <div v-if="hostWifiData.Host2Freq == 1">
                  <svg-icon :icon-class="'wifi-5G'" :class-name="hostWifiData.host5GStatus == 1?'flow-dir':'flow-dir fill-light-color'"></svg-icon>
                  <div class="pri-amount-circle priBgConnect">{{hostWifiData.Host5GNum}}</div>
                </div>
                <div v-else>
                  <svg-icon :icon-class="'wifi-6G'" :class-name="hostWifiData.host6GStatus == 1?'flow-dir':'flow-dir fill-light-color'"></svg-icon>
                  <div class="pri-amount-circle priBgConnect">{{hostWifiData.Host6GNum}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="pri-dash-board-block-divide-line"></div>
          <!-- LAN接入状态 -->
          <div class="pri-data-box-block pri-data-box-padding">
            <div class="pri-data-box-bg">
              <p class="pri-data-box-title">
                Clients
              </p>
              <div class="pri-data-box-value pri-d-flex-justify-around">
                <div class="pri-data-value">
                  <div class="pri-ports">
                    <svg-icon :icon-class="'port-1'" :class-name="clientStatus.lanPort1 == 1?'port-svg fill-light-color':'port-svg priFillDisconnect'"></svg-icon>
                    <svg-icon :icon-class="'port-2'" :class-name="clientStatus.lanPort2 == 1?'port-svg fill-light-color':'port-svg priFillDisconnect'"></svg-icon>
                  </div>
                  <span class="pri-amount-circle pri-lan-port-amount priBgConnect">
                    {{clientStatus.totalNum}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 接入的设备信息 -->
        <div class="pri-connected-device pri-text-align-center">
          <div class="mouseMode" style="display: inline-block;" @click="goToWanDevice">
            <div class="pri-wan-icon pri-relative">
              <svg-icon :icon-class="'wan-device'" class-name="pri-device-icon fill-light-color"></svg-icon>
              <span class="pri-device-amount">{{connectDevicNum}}</span>
              <svg-icon :icon-class="'wan-right'" class-name="pri-more"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pri-dash-board-row">
      <div class="pri-dash-board-card pri-left-block">
        <h3 class="pri-dash-board-title">
          Network traffic
        </h3>
        <network-echart :rate-num="Wan5GRateNum" :eth-rate-num="ethWanRateNum"></network-echart>
      </div>
      <div class="pri-dash-board-card pri-right-block">
        <h3 class="pri-dash-board-title-center">
          5G data usage
        </h3>
        <div class="pri-dashboard-padding-top-20 pri-d-flex">
          <div class="pri-data-box-block">
            <div class="pri-data-box-bg">
              <p class="pri-data-box-title">Since {{usageDatainfo.startMonth}} / {{usageDatainfo.start_date}}</p>
              <div class="pri-data-value">
                <div class="pri-text-color-blue">{{usageDatainfo.used}}</div>
                <!-- <span>GB</span> -->
              </div>
              <div>Used amount</div>
            </div>
          </div>
          <div>
            <div class="pri-data-usage-line"></div>
          </div>
          <div class="pri-data-box-block">
            <div class="pri-data-box-bg">
              <p class="pri-data-box-title">Since {{usageDatainfo.startMonth}} / {{usageDatainfo.start_date}}</p>
              <div class="pri-data-value">
                <div class="pri-text-color-blue">{{usageDatainfo.dataRemaining}}</div>
                <!-- <span>GB</span> -->
              </div>
              <div>Used amount</div>
            </div>
          </div>
        </div>
        <div class="pri-dataUsage-note">
          <label>{{ $t('other.dataUsageDes') }}</label>
        </div>
      </div>
    </section>
    <section class="pri-dash-board-row">
      <div class="pri-dash-board-card" style="height: 850px;">
        <h4 class="pri-dash-board-title">
          {{$t('dashboard.Speedtest')}}
        </h4>
        <div class="framSize" style="height: 100%;">
          <iframe src="https://connect-m5.speedtestcustom.com" width="100%" height="85%" frameborder="0"></iframe>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import NetworkEchart from './networkEchart.vue'
import moment from 'moment'
import { getMobileInfoStatusApi, getWanConnectStatusApi } from '@/api/status'
import { getWlanGuestBasicInfoApi } from '@/api/wifi'
import {
  getWifiDetailsInfoApi,
  getNetworkStatusBarInfoApi,
  getDeviceInfoStatusApi
} from '@/api/status'
import { getEthernetWanRateInfoApi } from '@/api/wan'
import { getEthernetClientsAccessInfo } from '@/api/system'
import {
  getMobileRxTxRate,
  getLanAssociatedClientInfo,
  getDualWanConfigurationApi
} from '@/api/doshboard'
import { getUsageInfoApi } from '@/api/network5G'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: { NetworkEchart },
  data() {
    return {
      connectionStatus: false,
      dualModeData: {
        dualModeStatus: '',
        PrimaryWanType: 0,
        wanEthDualType: 1
      },
      wan5GInfo: {
        signal_level: 0,
        service_state: 0,
        ipv4Addr: '--.--.--.--',
        ipv6Addr: '--.--.--.--.--.--.--.--.--.--.--',
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'KBps',
        tx_unit: 'KBps'
      },
      ethWanInfo: {
        ipAddr: '--.--.--.--',
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'KBps',
        tx_unit: 'KBps'
      },
      connectDevicNum: 0,
      startTime: 0,
      duraDay: '', // 连接天数
      duraTime: '', // 连接时间
      duraTimer: '', // 持续时间计时器
      rxTxRate: {
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'KBps',
        tx_unit: 'KBps'
      }, // 实时速率
      Wan5GRateNum: 0, // 实时速率
      ethWanRateNum: 0, // 实时速率
      ipAddress: '',
      clientStatus: {
        lanPort1: false,
        lanPort2: false,
        totalNum: 0
      },
      // client 信息
      hostWifiData: {
        host4GStatus: 1,
        Host4GSsid: '',
        Host4GNum: 0,
        Host2Freq: 1,
        host5GStatus: 1,
        Host5GSsid: '',
        Host5GNum: 0,
        host6GStatus: 1,
        Host6GSsid: '',
        Host6GNum: 0
      },
      guestWifiData: {
        host4GStatus: 1,
        Host4GSsid: '',
        Host4GNum: 0,
        host5GStatus: 1,
        Host5GSsid: '',
        Host5GNum: 0,
        host6GStatus: 1,
        Host6GSsid: '',
        Host6GNum: 0
      },
      usageDatainfo: {
        startMonth: '', // 起始月份
        start_date: 1, // 起始日期
        used: '--', // 已使用流量
        dataRemaining: '--' // 剩余流量
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData() // 初始化数据
    this.initWifiInfo() // 初始化wifi的开启状态
    // 获取连接设备数量
    getLanAssociatedClientInfo().then((data) => {
      this.connectDevicNum = 0
      if (data.retcode == 0) {
        this.connectDevicNum += data.clientList1.length
        this.connectDevicNum += data.clientList.length
      }
    })
    // 网口状态 -LAN
    getEthernetClientsAccessInfo().then((data) => {
      if (data.retcode == 0) {
        this.clientStatus.totalNum = 0
        // this.clientStatus.wanPort = data.NwCableStatus
        this.clientStatus.lanPort1 = data.eth0_status
        this.clientStatus.lanPort2 = data.eth1_status
        // this.clientStatus.lanPort3 = data.lanPort3Status
        // this.clientStatus.lanPort4 = data.lanPort4Status
        data.eth0_status == 1 ? this.clientStatus.totalNum++ : ''
        data.eth1_status == 1 ? this.clientStatus.totalNum++ : ''
      }
    })
  },
  methods: {
    initData() {
      // DUAL Model 信息
      getDualWanConfigurationApi().then((data) => {
        if (data.retcode == 0) {
          this.dualModeData.dualModeStatus =
            data.DualWanStatus == 0 ? 2 : data.DualWanMode == 1 ? 1 : 0
          this.dualModeData.PrimaryWanType = data.PrimaryWanType
        }
      })
      getNetworkStatusBarInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.wan5GInfo.signal_level = data.signal_level
          this.wan5GInfo.service_state = data.service_state
        }
      })
      getDeviceInfoStatusApi().then((data) => {
        if (data.retcode == 0) {
          this.ethWanInfo.ipAddr = data.device_lan_ip
        }
      })
      // 5GWAN IP地址和持续时间
      getMobileInfoStatusApi().then((data) => {
        if (data.retcode == 0) {
          this.wan5GInfo.ipv4Addr = data.mobile_ip_address
          this.wan5GInfo.ipv6Addr = data.mobile_ip6_address
          this.startTime = data.mobile_uptime
          this.ipAddress = data.mobile_ip_address
          this.duraTimer = setInterval(() => {
            // this.formateSeconds(this.startTime)
            this.startTime += 1
            /* 5G WAN上传、下行速率 */
            getMobileRxTxRate({ hiddenLoading: true }).then((data) => {
              if (data.retcode == 0) {
                this.wan5GInfo = {
                  ...this.wan5GInfo,
                  ...this.initRateData(data, '5G')
                }
              } else {
                this.Wan5GRateNum = 0
                this.wan5GInfo = {
                  ...{
                    rx_rate: 0,
                    tx_rate: 0,
                    rx_unit: 'KBps',
                    tx_unit: 'KBps'
                  }
                }
              }
            })
            // ethWan 速率
            getEthernetWanRateInfoApi({ hiddenLoading: true }).then((data) => {
              if (data.retcode == 0) {
                data.tx_rate = data.eth_tx_rate
                data.rx_rate = data.eth_rx_rate
                this.ethWanInfo = {
                  ...this.ethWanInfo,
                  ...this.initRateData(data, 'eth')
                }
              } else {
                this.ethWanRateNum = 0
                this.ethWanInfo = {
                  ...{ rx_rate: 0, tx_rate: 0, rx_unit: 'Kps', tx_unit: 'Kps' }
                }
              }
            })

            // 获取流量使用情况
            getUsageInfoApi({ hiddenLoading: true }).then((data) => {
              if (data.retcode == 0) {
                this.usageDatainfo.startMonth = moment().toObject().months + 1
                this.usageDatainfo.start_date =
                  data.statistics_month.statistics_start_date
                this.usageDatainfo.used = data.statistics_month.statistics_used
                this.usageDatainfo.dataRemaining =
                  data.statistics_month.monthly_data_remaining
              }
            }),
              // 获取网络状态信息
              getWanConnectStatusApi({ hiddenLoading: true }).then((data) => {
                if (data.retcode == 0) {
                  if (
                    data.cellular_wan_status === 0 &&
                    data.ethernet_wan_status === 0
                  ) {
                    this.connectionStatus = true
                  } else {
                    this.connectionStatus = false
                  }
                } else {
                  this.connectionStatus = false
                }
              })
          }, 2000)
        }
      })
    },
    initRateData(data, type) {
      let rate = {
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'KBps',
        tx_unit: 'KBps',
        rateNum: 0
      }
      if (!data.rx_rate || !data.tx_rate) {
        if (type == '5G') {
          this.Wan5GRateNum = 0
        } else {
          this.ethWanRateNum = 0
        }
        return rate
      }
      let unitLength = 3
      if (data.rx_rate.indexOf('KBps') > -1) {
        unitLength = 4
      }
      rate.rx_rate = data.rx_rate.substr(0, data.rx_rate.length - unitLength)
      rate.tx_rate = data.tx_rate.substr(0, data.tx_rate.length - unitLength)
      rate.rx_unit = data.rx_rate.substr(-unitLength)
      rate.tx_unit = data.tx_rate.substr(-unitLength)
      console.log('=====:', data)
      rate.rateNum = this.formaterRateNum(rate.rx_rate, rate.rx_unit)
      console.log('rate', rate)
      if (type == '5G') {
        this.Wan5GRateNum = rate.rateNum
        console.log('Wan5GRateNum', this.Wan5GRateNum)
      } else {
        this.ethWanRateNum = rate.rateNum
      }
      return rate
    },

    formaterRateNum(rateNum, rateType) {
      let currentRateNum = 0
      if (!rateNum || !rateType) {
        currentRateNum = 0
        return currentRateNum
      }
      rateNum -= 0
      switch (rateType) {
        case 'Bps':
          currentRateNum = parseInt(rateNum / 1024)
          return currentRateNum
        case 'KBps':
          currentRateNum = parseInt(rateNum)
          return currentRateNum
        case 'Mps':
          currentRateNum = parseInt(rateNum * 1024)
          return currentRateNum
        case 'Gps':
          currentRateNum = parseInt(rateNum * 1024 * 1024)
          return currentRateNum
        default:
          return currentRateNum
      }
    },
    initWifiInfo() {
      // 获取host wifi信息
      getWifiDetailsInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.hostWifiData.host4GStatus = data.Host1Status
          // this.hostWifiData.Host4GSsid = data.Host1Ssid
          this.hostWifiData.Host4GNum = data.Host1ConnectedDevice
          this.hostWifiData.Host2Freq = data.Host2Freq
          if (data.Host2Freq == 1) {
            this.hostWifiData.host5GStatus = data.Host2Status
            // this.hostWifiData.Host5GSsid = data.Host2Ssid
            this.hostWifiData.Host5GNum = data.Host2ConnectedDevice
          } else {
            this.hostWifiData.host6GStatus = data.Host2Status
            // this.hostWifiData.Host6GSsid = data.Host2Ssid
            this.hostWifiData.Host6GNum = data.Host2ConnectedDevice
          }
        }
      })
      // 获取guest wifi信息
      // getWlanGuestBasicInfoApi({ GuestWifiIndex: 0 }).then((data) => {
      //   if (data.retcode == 0) {
      //     this.guestWifiData.host4GStatus = data.Host1Status
      //     this.guestWifiData.Host4GSsid = data.Host1Ssid
      //     this.guestWifiData.host5GStatus = data.Host2Status
      //     this.guestWifiData.Host5GSsid = data.Host2Ssid
      //     this.guestWifiData.host6GStatus = data.Host2Status
      //     this.guestWifiData.Host6GSsid = data.Host2Ssid
      //   }
      // })
      // 连接WIFI的设备数量
      // getLanAssociatedClientInfo().then((data) => {
      //   if (data.retcode == 0) {
      //     if (data.clientlist1 && data.clientlist1.length > 0) {
      //       data.clientlist1.forEach((item) => {
      //         switch (item.method) {
      //           case 1:
      //             this.hostWifiData.Host4GNum++
      //             return
      //           case 2:
      //             this.guestWifiData.Host4GNum++
      //             return
      //           case 3:
      //             this.hostWifiData.Host5GNum++
      //             return
      //           case 4:
      //             this.guestWifiData.Host5GNum++
      //             return
      //         }
      //       })
      //     }
      //   }
      // })
    },
    goToWanDevice() {
      this.$router.push({ name: 'connectedDevices' })
    },
    //将秒转化为天时分秒
    formateSeconds(endTime) {
      let secondTime = parseInt(endTime) //将传入的秒的值转化为Number
      let min = 0 // 初始化分
      let h = 0 // 初始化小时
      let day = 0 // 初始化天数
      let result = ''
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        min = parseInt(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
        if (min > 60) {
          //如果分钟大于60，将分钟转换成小时
          h = parseInt(min / 60) //获取小时，获取分钟除以60，得到整数小时
          min = parseInt(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
        }
        if (h > 24) {
          day = parseInt(h / 24) //获取天，获取小时除以24，得到整数天
          h = parseInt(min % 24)
        }
      }
      result = `${h.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
      this.duraDay = day
      this.duraTime = result
    }
  },
  beforeDestroy() {
    clearInterval(this.duraTimer)
    this.timer = null
  },
  destroyed() {
    this.duraTimer = null
  }
}
</script>

<style lang="scss" scoped>
.content-full-page {
  width: 100%;
}
.pri-main {
  overflow: hidden;
  padding: 10px;
  .pri-dash-board-row {
    display: flex;
    margin-bottom: 5%;
    .pri-dash-board-card {
      border-left: 3px solid;
      border-image: linear-gradient(#00b4ff, #1eff96) 10;
      background-color: rgba(0, 174, 199, 0.1);
      box-shadow: -3px 2px #000;
      padding: 2%;
      width: 100%;
      .pri-wan-icon {
        width: fit-content;
        min-width: 145px;
        min-height: 145px;
        text-align: center;
        transform: translateY(110%);
        margin: 0 auto;
        .pri-device-amount {
          position: absolute;
          background-color: #00aec7;
          border-radius: 50%;
          width: 58px;
          height: 58px;
          line-height: 52px;
          right: 0;
          top: 12px;
          font-size: 22px;
          border: 4px solid #242424;
          transition: all 0.2s ease-in-out;
        }
      }
      .pri-wan-title {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 110px;
        p {
          margin: 0;
          font-size: 14px;
          line-height: 16px;
        }
      }
      .pri-data-box-block {
        text-align: center;
        width: 100%;
        .pri-data-box-bg {
          background-color: #242424;
          height: 100%;
        }
        .pri-data-box-title {
          margin: 0;
          padding: 10px 0;
          border-bottom: 0.5px solid #3e3e3e;
          min-height: 45px;
        }
        .pri-data-box-value {
          padding: 15px 5px;
          min-height: 105px;
          .pri-signal-logo {
            width: 180px;
            display: flex;
            justify-content: space-around;
            .pri-signal-bar svg {
              width: 53px;
            }
            .pri-signal-title {
              font-family: acer-bold;
              font-size: 26px;
              text-align: center;
            }
          }
          .pri-traffic-data {
            width: 130px;
            .pri-traffic-value {
              font-size: 20px;
              margin: 0;
            }
          }
          .pri-amount-circle {
            line-height: 35px;
            width: 35px;
            height: 35px;
            margin: 0 auto;
            border-radius: 60%;
          }
          .pri-data-value {
            display: flex;
            justify-content: center;
            align-items: baseline;
            margin-bottom: 10px;
            margin: 0 20px 10px 20px;
            div.pri-ports {
              display: flex;
              margin: auto;
              padding: 3px;
              border: 1px solid #00aec7;
              svg {
                margin: 3px 5px;
              }
            }
          }
          .pri-amount-circle {
            line-height: 35px;
            width: 35px;
            height: 35px;
            margin: 0 auto;
            border-radius: 60%;
          }
          .pri-amount-circle.pri-lan-port-amount {
            margin: auto 10px;
          }
        }
        .pri-data-box-value.pri-data-box-align {
          align-items: center;
        }
        .pri-data-box-value.pri-padding-bottom0 {
          padding-bottom: 0;
        }
        .pri-ip-address {
          text-align: left;
          width: 100%;
          padding: 0 3%;
          padding-bottom: 10px;
          .pri-ip-text {
            font-size: 10pt;
          }
          .pri-ipv6-text {
            font-size: 8pt;
          }
        }
      }
      .pri-data-box-block.pri-data-box-padding {
        padding: 0 40px;
      }
      .pri-dash-board-block-divide-line {
        border-top: 3px solid;
        border-image: linear-gradient(90deg, #00aec7, #fff, #00aec7) 10;
        margin: 20px 0;
      }
      .pri-dash-board-title-center {
        margin: 0;
        margin-top: 20px;
        text-align: center;
        color: #00aec7;
      }
    }
    .pri-dash-board-card.pri-left-block {
      width: 65%;
    }
    .pri-dash-board-card.pri-right-block {
      margin-left: 2%;
      width: 35%;
    }
  }
}
.pri-grid-container {
  display: grid;
  grid-template-areas: 'internet signal signal signal signal router amount amount device ';
}
.pri-text-align-center {
  text-align: center;
}

.pri-relative {
  position: relative;
}
.pri-internet-status {
  grid-area: internet;
}
.pri-text-color-blue {
  color: #00aec7;
}
.priColumn {
  flex-direction: column;
}
.pri-signal {
  grid-area: signal;
  display: flex;
  margin: 0 15px;
}

.pri-router-icon {
  grid-area: router;
}
.pri-connected-device {
  grid-area: device;
}
.pri-d-flex-justify-around {
  display: flex;
  justify-content: space-around;
  justify-items: center;
}
.pri-connected-amount {
  grid-area: amount;
  margin: 0 15px;
}
.pri-grid-container .pri-data-box-block {
  min-height: 216px;
}
.priBgConnect {
  background-color: #00aec7;
}

.pri-d-flex {
  display: flex;
  margin: 40px 0;
}
.pri-dashboard-padding-top-20 {
  padding-top: 20px;
}
.pri-data-usage-line {
  border-left: 0.5px solid #ccc;
  height: 100%;
  margin: 0 10px;
  width: 0 !important;
  flex: unset;
}
.pri-dataUsage-note {
  color: #8d9092;
  font-size: 18px;
  width: 100%;
}
.link-svg {
  width: 140px !important;
  height: 140px !important;
}
.client-svg {
  width: 53px !important;
  height: 45px !important;
}
.flow-dir {
  width: 40px;
  height: 40px;
}
.port-svg {
  width: 37px !important;
  height: 32px !important;
}
.pri-more {
  width: 6px;
  height: 24px;
  position: absolute;
  top: 30px;
  left: 150px;
  transition: all 0.2s ease-in-out;
}
.pri-device-icon {
  width: 140px;
  height: 140px;
  transition: all 0.2s ease-in-out;
}
.fill-light-color {
  fill: #00aec7;
}
.priFillDisconnect {
  fill: $gray-font-color;
}
@media screen and (max-width: 1599px) {
  // 首页
  .pri-main .pri-dash-board-row {
    flex-wrap: wrap;
    font-size: 18px;
  }
  .pri-grid-container {
    grid-template-areas:
      'internet internet internet'
      'signal signal signal'
      'device device device'
      'amount amount amount';
  }
  .pri-grid-container .pri-internet-status {
    margin-bottom: 10px;
    // height: 192px;
  }
  .pri-main .pri-dash-board-row .pri-dash-board-card.pri-left-block {
    width: 100%;
  }
  .pri-main .pri-dash-board-row .pri-dash-board-card.pri-right-block {
    margin-left: 0;
    margin-top: 1%;
    width: 100%;
  }
  .pri-grid-container .pri-router-icon {
    display: none;
  }
  .pri-main .pri-dash-board-row .pri-dash-board-card .pri-wan-icon {
    transform: translateY(0) !important;
  }
  .pri-main .pri-dash-board-row .pri-dash-board-card .pri-wan-title {
    position: static !important;
    bottom: 0;
    margin-top: 15px;
  }
  .pri-main .pri-dash-board-row .pri-dash-board-card .pri-wan-title p {
    font-size: 14px;
    line-height: 16px;
  }
  .pri-grid-container .pri-line1,
  .pri-grid-container .pri-line2 {
    display: block;
    margin-top: 50%;
    transform: translateY(25%);
  }
  .pri-grid-container .pri-signal {
    margin: 0;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .pri-grid-container .pri-router-icon {
    min-height: 202px;
  }
  .pri-grid-container .pri-connected-device {
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 650px) {
  .pri-grid-container {
    grid-template-areas:
      'internet'
      'line1'
      'router'
      'line2'
      'device'
      'signal'
      'amount';
  }
  .pri-grid-container .pri-line1,
  .pri-grid-container .pri-line2 {
    border-top: 0 !important;
    border-left: 3px solid;
    border-image: linear-gradient(
        180deg,
        $main-style-color,
        #fff,
        $main-style-color
      )
      10 !important;
    height: 50px;
    width: 0;
    margin: 15px auto !important;
    transform: translateY(0);
  }
  .visible-contrainer {
    width: 300px !important;
  }
  .slider-list-2 {
    display: none;
  }
}
@media screen and (max-width: 450px) {
  .pri-main
    .pri-dash-board-row
    .pri-dash-board-card
    .pri-data-box-block.pri-data-box-padding {
    padding: 0;
  }
}
</style>
