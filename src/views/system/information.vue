<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{ $t('homeNet.deviceName') + ': '}}</div>
        </el-col>
        <el-col :span="14">
          <div>{{ deviceInfo.device_name }}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{ $t('other.IMEI') + ': '}}</div>
        </el-col>
        <el-col :span="14">
          <div>{{ deviceInfo.device_imei }}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{ $t('system.serialNum') + ': '}}</div>
        </el-col>
        <el-col :span="14">
          <div>{{ deviceInfo.device_sncode }}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{ $t('system.firmwareVersion') + ': '}}</div>
        </el-col>
        <el-col :span="14">
          <div>{{ deviceInfo.device_software_version }}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{ $t('system.webVersion') + ': '}}</div>
        </el-col>
        <el-col :span="14">
          <div>{{ GLOBAL.WEB_VERSION }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDeviceInfo } from '@/api/system'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SystemInformation',
  data() {
    return {}
  },
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    }
  },
  created() {},
  mounted() {
    console.log('this.$store', this.$store)
    getDeviceInfo().then((data) => {
      if (data.retcode == 0) {
        console.log('getDeviceInfo: data', data)
        this.$store.dispatch('device/setDeviceInfo', data)
        console.log('deviceInfo:', this.deviceInfo)
      }
    })
  },
  methods: {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.main-content {
  color: $default-font-color;
  padding: 30px;
  .c-row {
    margin: 30px 0;
  }
}
.scri-view {
  color: $gray-font-color;
}
.bottom-view {
  display: block;
  width: 100%;
  color: white;
  text-align: right;
  margin-top: 30px;
  margin-bottom: 20px;
  div {
    margin-right: 20px;
  }
}
</style>
