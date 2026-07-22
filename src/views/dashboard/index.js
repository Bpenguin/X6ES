import NetworkEchart from './networkEchart.vue'
import moment from 'moment'
import MineDialog from '@/components/MineDialog'
import { getMobileInfoStatusApi, getWanConnectStatusApi } from '@/api/status'

import { getNetworkStatusBarInfoApi } from '@/api/status'
import {
  getEthernetWanRateInfoApi,
  getEthernetCableAccessStateApi,
  getEthernetWanDialInfoApi
} from '@/api/wan'

import {
  getMobileRxTxRate,
  getConnectedDevicesInfo,
  getDualWanConfigurationApi,
  getWifiSettingNotificationApi,
  getGuestWifiSettingNotificationApi
} from '@/api/doshboard'
import { getUsageInfoApi, getUsageCfgInfoApi } from '@/api/network5G'
export default {
  name: 'DashboardView',
  components: { NetworkEchart, MineDialog },
  data () {
    return {
      connectionStatus: false,
      dualModeData: {
        dualModeStatus: '',
        PrimaryWanType: 0,
        wanEthDualType: 1
      },
      wan5GInfo: {
        signal_level: 0,
        net_type: '',
        service_state: 0,
        ipv4Addr: '--.--.--.--',
        ipv6Addr: '--.--.--.--.--.--.--.--.--.--.--',
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'bps',
        tx_unit: 'bps'
      },
      ethWanInfo: {
        ipAddr: '--.--.--.--',
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'bps',
        tx_unit: 'bps'
      },
      connectDevicNum: 0,
      startTime: 0,
      duraDay: '', // 连接天数
      duraTime: '', // 连接时间
      duraTimer: '', // 持续时间计时器
      rxTxRate: {
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'bps',
        tx_unit: 'bps'
      }, // 实时速率
      Wan5GRateNum: 0, // 实时速率
      ethWanRateNum: 0, // 实时速率
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
      },
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'network5G.SIMPINBlocked', // 标题
        msgTitle: 'other.unlockSimPin',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'other.enterSIMPIN' //右侧按钮的描述
      }
    }
  },
  created () {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted () {
    this.initData() // 初始化数据
    // 获取连接设备数量
    getConnectedDevicesInfo().then((data) => {
      this.connectDevicNum = 0
      if (data.retcode == 0) {
        this.connectDevicNum = data.ConnectedDevicesList.length
      }
    })

  },
  methods: {
    // 解锁PIN或者PUK码
    enterPinOrPuk () {
      this.showDialogInfo.showDialog = false
      this.$router.push({ path: '/network5G/simPinmana' })
    },
    dualModeStatusFormat (val) {
      switch (val) {
        case 0:
          return 'wan.failover'
        case 1:
          return 'wan.loadBalance'
        case 2:
          return 'other.off'
        default:
          return 'other.off'
      }
    },
    initData () {
      // DUAL Model 信息
      getDualWanConfigurationApi().then((data) => {
        if (data.retcode == 0) {
          let dualWanStatus = data.DualWanStatus == 0 ? 2 : data.DualWanMode == 1 ? 1 : 0
          this.dualModeData.dualModeStatus = this.dualModeStatusFormat(
            dualWanStatus
          )
          this.dualModeData.PrimaryWanType = data.PrimaryWanType
        }
      })
      this.duraTimer = setInterval(() => {
        // this.formateSeconds(this.startTime)
        this.initWifiInfo() // 初始化wifi的开启状态
        /* 5G WAN上传、下行速率 */
        getMobileRxTxRate({ hiddenLoading: true }).then((data) => {
          if (data.retcode == 0) {
            this.wan5GInfo = {
              ...this.wan5GInfo,
              ...this.initRateData(data, '5G')
            }
          } else {
            this.Wan5GRateNum = 0
            this.wan5GInfo.rx_rate = 0
            this.wan5GInfo.tx_rate = 0
            this.wan5GInfo.rx_unit = 'bps'
            this.wan5GInfo.tx_unit = 'bps'
          }
        })
        // 5GWAN IP地址
        getMobileInfoStatusApi({ hiddenLoading: true }).then((data) => {
          if (data.retcode == 0) {
            this.wan5GInfo.ipv4Addr =
              data.mobile_ip_address == ''
                ? '--.--.--.--'
                : data.mobile_ip_address

            this.wan5GInfo.ipv6Addr =
              data.mobile_ip6_address == ''
                ? '--.--.--.--.--.--.--.--.--.--.--'
                : data.mobile_ip6_address
          } else {
            this.wan5GInfo.ipv4Addr = '--.--.--.--'
            this.wan5GInfo.ipv6Addr = '--.--.--.--.--.--.--.--.--.--.--'
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
              ...this.ethWanInfo,
              ...{ rx_rate: 0, tx_rate: 0, rx_unit: 'bps', tx_unit: 'bps' }
            }
          }
        })
        // 5G的信号强度和网络模式
        getNetworkStatusBarInfoApi({ hiddenLoading: true }).then((data) => {
          if (data.retcode == 0) {
            this.wan5GInfo.signal_level = data.signal_level
            this.wan5GInfo.service_state = data.service_state
            this.wan5GInfo.net_type = data.net_type // 待API添加该字段
            if (data.sim_card_state == 3) {
              if (!sessionStorage.getItem('needSIMPINKey')) {
                sessionStorage.setItem('needSIMPINKey', 1)
                this.showDialogInfo.title = 'network5G.SIMPINBlocked'
                this.showDialogInfo.msgTitle = 'other.unlockSimPin'
                this.showDialogInfo.rightBtnText = 'other.enterSIMPIN'
                this.showDialogInfo.showDialog = true
              }
            } else if (data.sim_card_state == 4) {
              if (!sessionStorage.getItem('needPUKPINKey')) {
                sessionStorage.setItem('needPUKPINKey', 1)
                this.showDialogInfo.title = 'network5G.SIMPIUKBlocked'
                this.showDialogInfo.msgTitle = 'other.unlockSimPUK'
                this.showDialogInfo.rightBtnText = 'other.enterSIMPUK'
                this.showDialogInfo.showDialog = true
              }
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
            // this.usageDatainfo.dataRemaining = '--'
            // this.usageDatainfo.dataRemaining =
            //   data.statistics_month.monthly_data_remaining
            getUsageCfgInfoApi({ hiddenLoading: true }).then((res) => {
              if (res.retcode == 0) {
                if (res.monthly_data_plan == 0) {
                  this.usageDatainfo.dataRemaining = '--'
                } else {
                  this.usageDatainfo.dataRemaining =
                    data.statistics_month.monthly_data_remaining
                }
              }
            })
          }
        })
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
        // 网口状态 -LAN
        getEthernetCableAccessStateApi({ hiddenLoading: true }).then((data) => {
          if (data.retcode == 0) {
            this.clientStatus.totalNum = 0
            this.clientStatus.lanPort1 = data.Eth0CableStatus
            this.clientStatus.lanPort2 = data.Eth1CableStatus
            data.Eth0CableStatus == 1 ? this.clientStatus.totalNum++ : ''
            data.Eth1CableStatus == 1 ? this.clientStatus.totalNum++ : ''
          }
        })
        // 获取状态信息
        getEthernetWanDialInfoApi({ hiddenLoading: true }).then((data) => {
          if (data.retcode == 0) {
            this.ethWanInfo.ipAddr =
              data.IPv4Address == '' ? '--.--.--.--' : data.IPv4Address
          } else {
            this.ethWanInfo.ipAddr = '--.--.--.--'
          }
        })
      }, 2000)
    },
    initRateData (data, type) {
      let rate = {
        rx_rate: 0, // 接收
        tx_rate: 0, // 上传
        rx_unit: 'bps',
        tx_unit: 'bps',
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

      let rx_unitLength = 4
      if (
        data.rx_rate.indexOf('Kbps') > -1 ||
        data.rx_rate.indexOf('Mbps') > -1 ||
        data.rx_rate.indexOf('Gbps') > -1
      ) {
        rx_unitLength = 4
      } else {
        rx_unitLength = 3
      }
      rate.rx_rate = data.rx_rate.substr(0, data.rx_rate.length - rx_unitLength)
      rate.rx_unit = data.rx_rate.substr(-rx_unitLength)

      let tx_unitLength = 4
      if (
        data.tx_rate.indexOf('Kbps') > -1 ||
        data.tx_rate.indexOf('Mbps') > -1 ||
        data.tx_rate.indexOf('Gbps') > -1
      ) {
        tx_unitLength = 4
      } else {
        tx_unitLength = 3
      }
      rate.tx_rate = data.tx_rate.substr(0, data.tx_rate.length - tx_unitLength)
      rate.tx_unit = data.tx_rate.substr(-tx_unitLength)

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

    formaterRateNum (rateNum, rateType) {
      let currentRateNum = 0
      if (!rateNum || !rateType) {
        currentRateNum = 0
        return currentRateNum
      }
      rateNum -= 0
      switch (rateType) {
        case 'bps':
          currentRateNum = parseFloat((rateNum / 1024).toFixed(3))
          return currentRateNum
        case 'Kbps':
          currentRateNum = rateNum
          return currentRateNum
        case 'Mbps':
          currentRateNum = rateNum * 1024
          return currentRateNum
        case 'Gbps':
          currentRateNum = rateNum * 1024 * 1024
          return currentRateNum
        default:
          return currentRateNum
      }
    },
    initWifiInfo () {
      // 获取host wifi信息
      getWifiSettingNotificationApi({ hiddenLoading: true }).then((data) => {
        if (data.retcode == 0) {
          this.hostWifiData.host4GStatus = data.Host1Status
          this.hostWifiData.Host4GSsid = data.Host1Ssid
          this.hostWifiData.Host4GNum = data.Host1ConnectedDevice

          this.hostWifiData.host5GStatus = data.Host2Status
          this.hostWifiData.Host5GSsid = data.Host2Ssid
          this.hostWifiData.Host5GNum = data.Host2ConnectedDevice

          this.hostWifiData.host6GStatus = data.Host3Status
          this.hostWifiData.Host6GSsid = data.Host3Ssid
          this.hostWifiData.Host6GNum = data.Host3ConnectedDevice
        }
      })
      // 获取guest wifi信息
      getGuestWifiSettingNotificationApi({ hiddenLoading: true }).then(
        (data) => {
          if (data.retcode == 0) {
            this.guestWifiData.host4GStatus = data.Guest1Status
            this.guestWifiData.Host4GSsid = data.Guest1Ssid
            this.guestWifiData.Host4GNum = data.Guest1ConnectedDevice

            this.guestWifiData.host5GStatus = data.Guest2Status
            this.guestWifiData.Host5GSsid = data.Guest2Ssid
            this.guestWifiData.Host5GNum = data.Guest2ConnectedDevice

            this.guestWifiData.host6GStatus = data.Guest3Status
            this.guestWifiData.Host6GSsid = data.Guest3Ssid
            this.guestWifiData.Host6GNum = data.Guest3ConnectedDevice
          }
        }
      )
    },
    goToWanDevice () {
      this.$router.push({ name: 'connectedDevices' })
    },
    //将秒转化为天时分秒
    formateSeconds (endTime) {
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
  beforeDestroy () {
    clearInterval(this.duraTimer)
    this.timer = null
  },
  destroyed () {
    this.duraTimer = null
  }
}

