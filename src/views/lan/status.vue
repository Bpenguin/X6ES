<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="c-row">
      <div class="block-header">LAN1</div>
      <!-- <div class="top-title">2.4GHz</div> -->
      <div class="block-body">
        <div v-if="lan1PortStatus =='WAN'">
          <el-row class="c-row">
            <el-col :span="12">
              <div>{{ $t('wan.connectStatus') +':'}}</div>
            </el-col>
            <el-col :span="12">
              <div>{{$t('other.SwitchedToWAN')}}</div>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-row class="c-row">
            <el-col :span="12">
              <div>{{ $t('wan.connectStatus') +':'}}</div>
            </el-col>
            <el-col :span="12">
              <div>{{$t(lan1.lanStatus)}}</div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="12">
              <div>{{ $t('quickSetup.ipAddress') +':'}}</div>
            </el-col>
            <el-col :span="12">
              <div>{{ lan1.ipAddress | empStr}}</div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="12">
              <div>{{ $t('wan.macAddress') +':'}}</div>
            </el-col>
            <el-col :span="12">
              <div>{{ lan1.macAddress | empStr}}</div>
            </el-col>
          </el-row>
          <el-row class="c-row">
            <el-col :span="12">
              <div>{{ $t('lan.dhcpServer') +':'}}</div>
            </el-col>
            <el-col :span="12">
              <div>{{ lan1.dhcpServer | empStr}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 2.4G菜单设置 -->
    <div class="c-row" v-for="(item,index) in [lan2]" :key="index">
      <div class="block-divide-line"></div>
      <div class="block-header">{{ $t(item.title) }}</div>
      <div class="block-body">
        <el-row class="c-row">
          <el-col :span="12">
            <div>{{ $t('wan.connectStatus') +':'}}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ $t(item.lanStatus)}}</div>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="12">
            <div>{{ $t('quickSetup.ipAddress') +':'}}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ item.ipAddress}}</div>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="12">
            <div>{{ $t('wan.macAddress') +':'}}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ item.macAddress}}</div>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="12">
            <div>{{ $t('lan.dhcpServer') +':'}}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ item.dhcpServer}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getWanConnectStatusApi } from '@/api/status'
import { getWANModeInfo } from '@/api/wan'
import { getEthernetClientsAccessInfo } from '@/api/system'
export default {
  name: 'LanStatus',
  computed: {},
  data() {
    return {
      lan1PortStatus: 'WAN',
      connectionStatus: 'Disconnected',
      lan1: {
        title: 'lan.lan1',
        lanStatus: '--',
        ipAddress: '--',
        macAddress: '--',
        dhcpServer: '--'
      },
      lan2: {
        title: 'lan.lan2',
        lanStatus: '--',
        ipAddress: '--',
        macAddress: '--',
        dhcpServer: '--'
      },
      lan3: {
        title: 'lan.lan3',
        lanStatus: 'Disconnected',
        ipAddress: '--',
        macAddress: '--',
        dhcpServer: '--'
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
    // this.$store.dispatch('wifi/setWifiInfo')
  },
  methods: {
    initData() {
      // 网络状态
      // getWanConnectStatusApi().then((data) => {
      //   if (data.retcode == 0) {
      //     this.connectionStatus =
      //       data.ethernet_wan_status == 1 ? 'WAN' : 'dashboard.Disconnected'
      //   }
      // })
      getEthernetClientsAccessInfo().then((data) => {
        if (data.retcode == 0) {
          this.lan1.lanStatus =
            data.eth0_status == 1 ? 'other.Connected' : 'dashboard.Disconnected'
          this.lan1.ipAddress = data.eth0_ip
          this.lan1.macAddress = data.eth0_mac
          this.lan1.dhcpServer = data.eth0_dhcpserver

          this.lan2.lanStatus =
            data.eth1_status == 1 ? 'other.Connected' : 'dashboard.Disconnected'
          this.lan2.ipAddress = data.eth1_ip
          this.lan2.macAddress = data.eth1_mac
          this.lan2.dhcpServer = data.eth1_dhcpserver
        }
        getWANModeInfo().then((data) => {
          if (data.retcode == 0 && data.EthConnectMode == 3) {
            this.lan1PortStatus = 'LAN'
          } else {
            this.lan1PortStatus = 'WAN'
          }
        })
      })
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
.content-view {
  padding-top: 30px;
}
.top-title {
  font-size: 18px;
  color: $light-style-color;
}
.padding-view {
  width: 95%;
  margin: 0 auto;
}
.section-item {
  display: flex;
  flex-direction: row;
  margin: 30px 0;
  align-items: center;
  .left-label {
    // width: 40%;
    // min-width: 160px;
  }
}
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
}
</style>
