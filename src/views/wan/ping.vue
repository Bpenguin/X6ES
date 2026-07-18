<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wan.wanPingscri1',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('wan.wanPortPing') }}:</div>
        </el-col>
        <el-col :span="12">
          <el-switch v-model="pingSwitch" active-color="#00dc50" inactive-color="#8d9092" @change="pingSwitchChange"></el-switch>

        </el-col>
      </el-row>
    </div>
    <!-- <section class="item-view">
      <div class="left-title">{{ $t('wan.wanPortPing') }}:</div>
    </section> -->
    <div class="block-body">
      <div class="page-note">{{ $t('wan.wanPingscri2') }}</div>
    </div>
  </div>
</template>

<script>
import { getSecurityConfigApi, setSecurityConfigApi } from '@/api/wan'
import { Message } from 'element-ui'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WANPing',
  data() {
    return {
      defaultPingSwitch: false, // 已设置的信息
      pingSwitch: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    getSecurityConfigApi().then((data) => {
      if (data.retcode == 0) {
        this.defaultPingSwitch = data.wan_ping == 0 ? false : true
      }
      this.pingSwitch = this.defaultPingSwitch
    })
  },
  methods: {
    pingSwitchChange(val) {
      let parma = {
        wan_ping: this.pingSwitch ? 1 : 0,
        wan_webui: 0
      }
      setSecurityConfigApi(parma).then((data) => {
        if (data.retcode == 0) {
          this.defaultPingSwitch = this.pingSwitch
          Message({
            message: this.$t('common.success'),
            type: 'success',
            duration: 2 * 1000
          })
        } else {
          Message({
            message: 'Network error',
            type: 'error',
            duration: 2 * 1000
          })
        }
      })
    },
    cancel() {
      this.pingSwitch = this.defaultPingSwitch
      this.dmzHostIP = this.defaultDmzHostIP
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.status-content {
  color: $default-font-color;
  padding: 40px;
  .scri-view {
    font-size: 16px;
    padding-right: 20px;
    color: $gray-font-color;
  }
  .item-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 40px 0;
    height: 40px;
    line-height: 40px;
    .left-title {
      // width: 20%;
      margin-right: 40px;
    }
  }
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
