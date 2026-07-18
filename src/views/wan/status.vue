<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('wan.duration') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.ConnectUpTime_fill | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('wan.connectStatus') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{$t(statusInfo.ConnectStatus_fill)}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('wan.macAddress') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.IfaceMACAddress | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('quickSetup.connectMode') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.connect_mode_fill | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.IPv4Address') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.IPv4Address | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.IPv6Address') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.IPv6Address | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('quickSetup.subnetMask') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.IPv4Netmask | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('quickSetup.defaultGateway') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.IPv4Gateway | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('quickSetup.primaryDNSServer') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.IPv4PrimaryDNS | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('quickSetup.secondaryDNSServer') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{statusInfo.IPv4SecondaryDNS | empStr}}</div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import { getWANModeInfo, getEthernetWanDialInfoApi } from '@/api/wan'
import { getDeviceInfoStatusApi, getMobileInfoStatusApi } from '@/api/status'
import { connectMode_fill, wan_connect_status_fill } from '@/utils/until'
import { Message } from 'element-ui'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      beginTime: '', // 开始时间
      sessionDuration: '', // 持续时间
      device_lan_Mac: '--', // MAC地址
      statusInfo: {
        ConnectUpTime: '--', // 连接时间  ConnectUpTime
        ConnectUpTime_fill: '', // ConnectUpTime_fill
        ConnectStatus: 3, // 连接状态  ConnectStatus
        ConnectStatus_fill: '--', // ConnectStatus_fill
        connect_mode_fill: '--',
        IPv4Address: '--', // IPv4 地址  IPv4Address
        IPv6Address: '--', // IPv6 地址  IPv6Address
        IPv4Netmask: '--', // 掩码   IPv4Netmask
        IPv4Gateway: '--', // 网关   IPv4Gateway
        IPv4PrimaryDNS: '--', // 主 DNS    IPv4PrimaryDNS
        IPv4SecondaryDNS: '--', // 次 DNS   IPv4SecondaryDNS
        IfaceMACAddress: '--'
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // 获取状态信息
      getEthernetWanDialInfoApi().then((data) => {
        if (data.retcode == 0) {
          data.ConnectStatus_fill = wan_connect_status_fill(data.ConnectStatus)
          data.ConnectUpTime_fill = this.formateSeconds(data.ConnectUpTime)
          data.connect_mode_fill = connectMode_fill(data.ConnectMode)
          this.statusInfo = { ...this.statusInfo, ...data }
        }
      })
    },
    //将秒转化为时分秒
    formateSeconds(endTime) {
      let secondTime = parseInt(endTime) //将传入的秒的值转化为Number
      console.log('secondTime', secondTime)
      let min = 0 // 初始化分
      let h = 0 // 初始化小时
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
      }
      result = `${h.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
      return result
    }
  },
  deactivated() {
    this.$destroy()
  }
}
</script>
<style lang="scss" scoped>
.status-content {
  color: $default-font-color;
  padding: 40px;
  .item-view {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 40px 0;
    div {
      width: 50%;
    }
  }
}
@media screen and (max-width: 650px) {
  // div.container-main-content {
  //   padding: 0;
  // }
  .status-content {
    padding: 0;
  }
}
</style>

