<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pri-main content-full-page">
    <!-- 头部视图 -->
    <section class="pri-dash-board-row">
      <div class="pri-dash-board-card">
        <!-- 选择语言 -->
        <div class="pri-dashboard-lang-row"></div>
        <!-- 主视图 -->
        <div class="pri-grid-container">
          <!-- 状态栏 -->
          <div class="pri-relative pri-internet-status pri-text-align-center">
            <div class="pri-wan-icon">
              <svg-icon :icon-class="'connect-status'" class-name="link-svg top-svg"></svg-icon>
            </div>
            <div class="pri-wan-title">
              <p>{{$t('network5G.ConnectionStatus')}}</p>
              <p class="priTextColorNormal">{{connectionStatus == 1?'Good':'Disconnected'}}</p>
            </div>
          </div>
          <div class="pri-dash-board-block-divide-line pri-line1"></div>

          <div class="pri-signal priColumn">
            <div class="pri-data-box-block pri-data-box-padding">
              <div class="pri-data-box-bg pri-wan-area">
                <p class="pri-data-box-title"><span>
                    {{$t('nav.wan')}}
                  </span></p>
                <div class="pri-data-box-value pri-wan-value">
                  <div class="pri-traffic-data">
                    <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                    <div>
                      <label class="pri-text-color-blue pri-traffic-value">
                        {{rxTxRate.rx_rate}}
                      </label>
                      <span> {{rxTxRate.rx_unit}}</span>
                    </div>
                  </div>
                  <div class="pri-traffic-data">
                    <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                    <div>
                      <label class="pri-text-color-blue pri-traffic-value">
                        {{rxTxRate.tx_rate}}
                      </label>
                      <span> {{rxTxRate.tx_unit}}</span>
                    </div>
                  </div>
                </div>
                <div class="pri-ip-address pri-ip-text pri-wan-ip"><label>IP: {{ipAddress}}</label></div>
              </div>
            </div>
            <div class="pri-dash-board-block-divide-line"></div>
            <div class="pri-data-box-block pri-data-box-padding">
              <div class="pri-data-box-bg">
                <p class="pri-data-box-title"><span>
                    System up time
                  </span></p>
                <div class="pri-data-box-value fix-height">
                  <div class="pri-system-time"><span>{{ duraDay }} </span><span class="pri-system-day">days</span><br> <span>{{duraTime}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pri-dash-board-block-divide-line pri-line2"></div>
          <div class="pri-router-icon pri-text-align-center pri-relative">
            <div class="pri-wan-icon pri-wan-icon-router">
              <svg-icon :icon-class="'wan-moddel'" class-name="pri-icon-main-color"></svg-icon>
            </div>
          </div>
          <!-- WIFI状态视图 -->
          <div class="pri-connected-amount">
            <div class="pri-data-box-block pri-data-box-padding slider-container pri-relative">
              <div id="visible-contrainer" class="visible-contrainer">
                <div class="pri-wifi-area">

                  <div class="pri-data-box-bg slider-list-item-3" style="min-width: 203px;">
                    <div class="pri-wifi-card">
                      <p class="pri-data-box-title wifi-card">Host WiFi</p>
                      <div class="pri-data-box-value pri-wifi-column">
                        <div class="pri-wifi-data" style="">
                          <svg-icon :class-name="hostWifiData.host4GStatus == 1?'':'priFillConnect'" :icon-class="'wifi-4G'"></svg-icon>
                          <div class="pri-amount-circle priBgConnect">{{hostWifiData.Host4GNum}}</div>
                          <div class="pri-wifi-ssid">{{ hostWifiData.Host4GSsid }}</div>
                        </div>
                        <div class="pri-wifi-data" style="">
                          <svg-icon :class-name="hostWifiData.host5GStatus == 1?'':'priFillConnect'" :icon-class="'wifi-5G'"></svg-icon>
                          <div class="pri-amount-circle priBgConnect">{{hostWifiData.Host5GNum}}</div>
                          <div class="pri-wifi-ssid">{{ hostWifiData.Host5GSsid }}</div>
                        </div>
                        <!-- <div class="pri-wifi-data">
                          <svg-icon :class-name="hostWifiData.host6GStatus == 1?'':'priFillConnect'" :icon-class="'wifi-6G'"></svg-icon>
                          <div class="pri-amount-circle priBgConnect">{{hostWifiData.Host6GNum}}</div>
                          <div class="pri-wifi-ssid">{{ hostWifiData.Host6GSsid }}</div>
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="pri-data-box-bg slider-list-item-3 slider-list-2" style="min-width: 203px;">
                    <div class="pri-wifi-card">
                      <p class="pri-data-box-title wifi-card">Guest WiFi</p>
                      <div class="pri-data-box-value pri-wifi-column">
                        <div class="pri-wifi-data" style="">
                          <svg-icon :class-name="guestWifiData.host4GStatus == 1?'':'priFillConnect'" :icon-class="'wifi-4G'"></svg-icon>
                          <div class="pri-amount-circle priBgConnect">{{guestWifiData.Host4GNum}}</div>
                          <div class="pri-wifi-ssid">{{ guestWifiData.Host4GSsid }}</div>
                        </div>
                        <div class="pri-wifi-data" style="">
                          <svg-icon :class-name="guestWifiData.host5GStatus == 1?'':'priFillConnect'" :icon-class="'wifi-5G'"></svg-icon>
                          <div class="pri-amount-circle priBgConnect">{{guestWifiData.Host5GNum}}</div>
                          <div class="pri-wifi-ssid">{{ guestWifiData.Host5GSsid }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="pri-dash-board-block-divide-line"></div>
            <div class="pri-data-box-block pri-data-box-padding">
              <div class="pri-data-box-bg">
                <p class="pri-data-box-title">
                  Clients
                </p>
                <div class="pri-data-box-value pri-ports-area">
                  <div class="pri-data-value">
                    <!-- <div class="pri-ports pri-wan-port">
                      <svg-icon :icon-class="'port-wan'" :class-name="clientStatus.wanPort == 1?'priFillConnect':'priFillDisconnect'"></svg-icon>
                    </div> -->
                    <div class="pri-ports pri-lan-port">
                      <!-- <svg-icon :icon-class="'port-game'" :class-name="clientStatus.lanPort1 == 1?'priFillConnect':'priFillDisconnect'"></svg-icon> -->
                      <svg-icon :icon-class="'port-1'" :class-name="clientStatus.lanPort1 == 1?'priFillConnect':'priFillDisconnect'"></svg-icon>
                      <svg-icon :icon-class="'port-2'" :class-name="clientStatus.lanPort2 == 1?'priFillConnect':'priFillDisconnect'"></svg-icon>
                      <svg-icon :icon-class="'port-3'" :class-name="clientStatus.lanPort3 == 1?'priFillConnect':'priFillDisconnect'"></svg-icon>
                    </div>
                    <div class="pri-amount-circle pri-lan-port-amount priBgConnect">
                      {{ clientStatus.totalNum }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧图片 -->
          <div class="pri-connected-device pri-text-align-center">
            <div class="mouseMode" style="display: inline-block;" @click="goToWanDevice">
              <div class="pri-wan-icon pri-relative">
                <svg-icon :icon-class="'wan-device'" class-name="pri-device-icon"></svg-icon>
                <span class="pri-device-amount">1</span>
                <svg-icon :icon-class="'wan-right'" class-name="pri-more"></svg-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pri-dash-board-row">
      <div class="pri-dash-board-card">
        <h3 class="pri-dash-board-title">
          Network traffic
        </h3>
        <network-echart :rate-num="currentRateNum"></network-echart>
      </div>
    </section>
  </div>

</template>

<script>
import NetworkEchart from './networkEchart.vue'
import { getMobileInfoStatusApi, getWanConnectStatusApi } from '@/api/status'
import { getWlanGuestBasicInfoApi } from '@/api/wifi'
import { getWifiDetailsInfoApi } from '@/api/status'
import {
  getEthernetCableAccessStateApi,
  getEthernetWanRateInfoApi
} from '@/api/wan'
import { getMobileRxTxRate, getLanAssociatedClientInfo } from '@/api/doshboard'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: { NetworkEchart },
  data() {
    return {
      connectionStatus: 0,
      startTime: 0,
      duraDay: '', // 连接天数
      duraTime: '', // 连接时间
      duraTimer: '', // 持续时间计时器
      rxTxRate: {
        rx_rate: '', // 接收
        tx_rate: '', // 上传
        rx_unit: 'Kps',
        tx_unit: 'Kps'
      }, // 实时速率
      currentRateNum: 0, // 实时速率
      ipAddress: '',
      clientStatus: {
        wanPort: false,
        lanPort1: false,
        lanPort2: false,
        lanPort3: false,
        lanPort4: false,
        totalNum: 0
      },
      hostWifiData: {
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
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData() // 初始化数据
    this.initWifiInfo() // 初始化wifi的开启状态
    // 网口状态 -LAN
    getEthernetCableAccessStateApi().then((data) => {
      if (data.retcode == 0) {
        this.clientStatus.totalNum = 0
        // this.clientStatus.wanPort = data.NwCableStatus
        this.clientStatus.lanPort1 = data.Eth0CableStatus
        this.clientStatus.lanPort2 = data.Eth1CableStatus
        // this.clientStatus.lanPort3 = data.lanPort3Status
        // this.clientStatus.lanPort4 = data.lanPort4Status
        data.Eth0CableStatus == 1 ? this.clientStatus.totalNum++ : ''
        data.Eth1CableStatus == 1 ? this.clientStatus.totalNum++ : ''
      }
    })
  },
  methods: {
    initData() {
      // 网络状态
      getWanConnectStatusApi().then((data) => {
        if (data.retcode == 0) {
          this.connectionStatus =
            data.ethernet_wan_status == 1 || data.cellular_wan_status == 1
              ? 1
              : 0
        }
      })
      // IP地址和持续时间
      getMobileInfoStatusApi().then((data) => {
        if (data.retcode == 0) {
          this.startTime = data.mobile_uptime
          this.ipAddress = data.mobile_ip_address
          this.duraTimer = setInterval(() => {
            this.formateSeconds(this.startTime)
            this.startTime += 1
            /* 上传、下行速率 */
            getEthernetWanRateInfoApi({ hiddenLoading: true }).then((data) => {
              if (data.retcode == 0) {
                if (!data.eth_rx_rate || !data.eth_tx_rate) {
                  this.currentRateNum = 0
                  return
                }
                data.rx_rate = data.eth_rx_rate.substr(
                  0,
                  data.eth_rx_rate.length - 3
                )
                data.tx_rate = data.eth_tx_rate.substr(
                  0,
                  data.eth_tx_rate.length - 3
                )
                data.rx_unit = data.eth_rx_rate.substr(-3)
                data.tx_unit = data.eth_tx_rate.substr(-3)
                console.log('=====:', data)
                this.formaterRateNum(data.rx_rate, data.rx_unit)
                this.rxTxRate = { ...data }
              } else {
                this.currentRateNum = 0
                this.rxTxRate = {
                  ...this.rxTxRate,
                  ...{ rx_rate: 0, tx_rate: 0 }
                }
              }
            })
          }, 2000)
        }
      })
    },
    formaterRateNum(rateNum, rateType) {
      if (!rateNum || !rateType) {
        this.currentRateNum = 0
        return
      }
      rateNum -= 0
      switch (rateType) {
        case 'Bps':
          this.currentRateNum = parseInt(rateNum / 1024)
          return
        case 'Kps':
          this.currentRateNum = parseInt(rateNum)
          return
        case 'Mps':
          this.currentRateNum = parseInt(rateNum * 1024)
          return
        case 'Gps':
          this.currentRateNum = parseInt(rateNum * 1024 * 1024)
          return
        default:
          this.currentRateNum = 0
      }
    },
    initWifiInfo() {
      // 获取host wifi信息
      getWifiDetailsInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.hostWifiData.host4GStatus = data.Host1Status
          this.hostWifiData.Host4GSsid = data.Host1Ssid
          this.hostWifiData.host5GStatus = data.Host2Status
          this.hostWifiData.Host5GSsid = data.Host2Ssid
          // this.hostWifiData.host6GStatus = data.Host2Status
          // this.hostWifiData.Host6GSsid = data.Host2Ssid
        }
      })
      // 获取guest wifi信息
      getWlanGuestBasicInfoApi({ GuestWifiIndex: 0 }).then((data) => {
        if (data.retcode == 0) {
          this.guestWifiData.host4GStatus = data.Host1Status
          this.guestWifiData.Host4GSsid = data.Host1Ssid
          this.guestWifiData.host5GStatus = data.Host2Status
          this.guestWifiData.Host5GSsid = data.Host2Ssid
          this.guestWifiData.host6GStatus = data.Host2Status
          this.guestWifiData.Host6GSsid = data.Host2Ssid
        }
      })
      // 连接WIFI的设备数量
      getLanAssociatedClientInfo().then((data) => {
        if (data.retcode == 0) {
          if (data.clientlist1 && data.clientlist1.length > 0) {
            data.clientlist1.forEach((item) => {
              switch (item.method) {
                case 1:
                  this.hostWifiData.Host4GNum++
                  return
                case 2:
                  this.guestWifiData.Host4GNum++
                  return
                case 3:
                  this.hostWifiData.Host5GNum++
                  return
                case 4:
                  this.guestWifiData.Host5GNum++
                  return
              }
            })
          }
        }
      })
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
      background: url('../../assets/img/index-bg.svg') no-repeat left 12px
          bottom 12px,
        linear-gradient(180deg, #014a4b, #082126);
      border: 1px solid #006476;
      padding: 2%;
      width: 100%;
      .pri-dash-board-block-divide-line {
        border-top: 3px solid;
        border-image: linear-gradient(
            90deg,
            $main-style-color,
            #fff,
            $main-style-color
          )
          10;
        margin: 20px 0;
      }
      .pri-wan-icon {
        width: fit-content;
        min-width: 145px;
        min-height: 145px;
        text-align: center;
        transform: translateY(130%);
        margin: 0 auto;
      }
      .pri-wan-title {
        text-align: center;
        width: 100%;
        position: absolute;
        top: 350px;
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
          background-color: #001a1e;
        }
        .pri-data-box-bg.pri-wan-area {
          height: calc(100% - 15px);
        }
        .pri-data-box-title {
          font-size: 16px;
          margin: 0;
          padding: 10px 0;
          border-bottom: 0.5px solid #3e3e3e;
          min-height: 45px;
        }
        .pri-ip-address {
          text-align: left;
          width: 100%;
          padding: 0 3%;
          padding-bottom: 10px;
        }
        .pri-ip-text {
          font-size: 14px;
        }
        .pri-ip-address.pri-wan-ip {
          padding-inline-start: 2%;
          label {
            width: 100%;
            text-align: center;
          }
        }
        .visible-contrainer {
          display: flex;
          flex-direction: row;
          width: 425px;
          overflow: hidden;
          .pri-wifi-area {
            display: flex;
            padding: 0;
            .pri-wifi-column {
              flex-direction: column;
              width: 100%;
              height: 80%;
            }
            .pri-wifi-data {
              display: flex;
              align-items: center;
            }
            .pri-wifi-ssid {
              font-size: 16px;
              flex-grow: 1;
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 100px;
              overflow: hidden;
              margin-inline-start: 5%;
              text-align: start;
            }
            svg {
              margin: 3px 5px;
              width: 40px;
              height: 40px;
            }
          }
          .pri-wifi-area > div {
            margin-inline: 5px;
          }
          .pri-wifi-card {
            height: 230px;
          }
        }
        .pri-data-box-title {
          margin: 0;
          padding: 10px 0;
          border-bottom: 0.5px solid #3e3e3e;
          min-height: 45px;
        }
      }

      .pri-data-box-value {
        padding: 15px 10px;
        min-height: 105px;
        display: flex;
        justify-content: space-around;
        justify-items: center;
        .pri-traffic-data {
          width: 115px;
          height: 100%;
          margin: auto 0;
          font-size: 14px;
          .pri-traffic-value {
            margin: 0;
            font-size: 14px;
          }
          .flow-dir {
            width: 40px;
            height: 40px;
          }
        }
        .pri-system-time {
          font-size: 25px;
          font-weight: 700;
          display: block;
          width: 124px;
          margin: auto;
          text-align: start;
          padding-inline: 0;
          line-height: 25px;
          .pri-system-day {
            font-size: 15px;
            font-weight: 400;
          }
        }
        .pri-data-value {
          display: flex;
          justify-content: center;
          align-items: baseline;
          // width: 90%;
          div.pri-ports {
            display: flex;
            margin: auto;
            padding: 3px;
            border: 2px solid #00752b;
            svg {
              margin: 3px 5px;
              width: 37px;
              height: 32px;
            }
          }
          div.pri-ports.pri-wan-port {
            width: 55px;
            margin-inline-end: 10px;
          }
          .pri-amount-circle {
            line-height: 35px;
            font-size: 18px;
            width: 35px;
            height: 35px;
            margin: 0 auto;
            border-radius: 60%;
          }
          .pri-amount-circle.pri-lan-port-amount {
            margin: auto 10px;
          }
        }
        .pri-amount-circle {
          line-height: 35px;
          font-size: 18px;
          width: 35px;
          height: 35px;
          margin: 0 auto;
          border-radius: 60%;
        }
      }
      .pri-data-box-value.pri-wan-value {
        min-height: 150px;
      }
      .pri-data-box-value.fix-height {
        height: calc(100% - 45px);
      }
      .pri-wan-icon {
        width: fit-content;
        min-width: 145px;
        min-height: 145px;
        text-align: center;
        transform: translateY(130%);
        margin: 0 auto;
        .pri-device-amount {
          position: absolute;
          background-color: #00752b;
          border-radius: 50%;
          width: 58px;
          height: 58px;
          line-height: 52px;
          right: 0;
          top: 12px;
          font-size: 22px;
          border: 4px solid #04393b;
          transition: all 0.2s ease-in-out;
        }
        .pri-device-icon {
          width: 140px;
          height: 140px;
          transition: all 0.2s ease-in-out;
          fill: $main-style-color;
        }
        .pri-more {
          position: absolute;
          top: 30px;
          left: 150px;
          width: 6px;
          height: 24px;
          transition: all 0.2s ease-in-out;
          fill: $login-font-color;
        }
      }

      .pri-data-box-block.pri-data-box-padding {
        padding: 0 10px;
      }
    }
  }
}

.pri-connected-device {
  grid-area: device;
}
.pri-grid-container {
  display: grid;
  grid-template-areas: 'internet signal signal router amount amount amount amount device ';
  .pri-data-box-block {
    min-height: 245px;
  }
}
.pri-relative {
  position: relative;
}
.pri-internet-status {
  grid-area: internet;
}
.pri-text-align-center {
  text-align: center;
}
.priTextColorNormal {
  color: #00e80e;
}
.pri-text-color-blue {
  color: #00752b;
}
.priColumn {
  flex-direction: column;
}
.pri-signal {
  grid-area: signal;
  display: flex;
  margin: 0 15px;
}
.pri-line1 {
  grid-area: line1;
  display: none;
}
.pri-line2 {
  grid-area: line2;
  display: none;
}
.pri-router-icon {
  grid-area: router;
}
label {
  display: inline-block;
  margin-bottom: 10px;
}
.pri-icon-main-color {
  width: 140px;
  height: 140px;
  fill: $main-style-color;
}
.priFillConnect {
  fill: $main-style-color;
}
.priFillDisconnect {
  fill: $gray-font-color;
}
.pri-connected-amount {
  grid-area: amount;
  margin: 0 15px;
}
.slider-container {
  width: 100%;
  max-width: 445px;
  margin-inline: auto;
}
.priBgConnect {
  display: block;
  box-sizing: initial;
  background-color: $main-style-color;
}
.link-svg {
  width: 140px !important;
  height: 140px !important;
  // color: black;
  // fill: #ff5d00;
  fill: #00752b;
}

@media screen and (max-width: 1599px) {
  // 首页
  .pri-main .pri-dash-board-row {
    flex-wrap: wrap;
  }
  .pri-grid-container {
    grid-template-areas:
      'internet line1 router line2 device'
      'signal signal signal signal signal'
      'amount amount amount amount amount';
  }
  .pri-grid-container .pri-internet-status {
    margin-bottom: 10px;
    height: 192px;
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
    .pri-data-box-block.pri-data-box-padding[data-v-1bfc79b4] {
    padding: 0;
  }
}
</style>
