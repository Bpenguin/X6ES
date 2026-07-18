<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <no-sim v-if="!(SIMStatus == 1 || SIMStatus == 2)" :sim-status='SIMStatus'></no-sim>
    <div v-else>
      <div class="block-body">
        <div class="page-description">{{ $t('network5G.networkConnectScr') }}</div>
      </div>
      <div class="block-body">
        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('quickSetup.connectMode') }}:</div>
          </el-col>
          <el-col :span="8" :xs="12">
            <el-radio v-model="connectInfo.connection_mode" :label="0">{{ $t('network5G.Auto') }}</el-radio>
          </el-col>
          <el-col :span="8" :xs="12">
            <el-radio v-model="connectInfo.connection_mode" :label="1">{{ $t('network5G.Manual') }}</el-radio>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('network5G.DataRoaming') }}:</div>
          </el-col>
          <el-col :span="12" :xs="18">
            <el-switch v-model="connectInfo.data_roaming" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-col>
        </el-row>
      </div>
      <div class="block-body">
        <div class="c-row btn-row">
          <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
          <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoSim from './noSim.vue'
import { Message } from 'element-ui'
import {
  getWanNetworkConnectionApi,
  setWanNetworkConnectionApi
} from '@/api/network5G'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'NetworkConnnection',
  components: { NoSim },
  data() {
    return {
      simStatusTimer: '', // 实时刷新卡状态
      defaultInfo: {},
      connectInfo: {
        connection_mode: 0, // 已设置的信息
        data_roaming: false
      }
    }
  },
  computed: {
    SIMStatus() {
      this.initData()
      return this.$store.state.status.simStatus
    }
  },
  created() {
    this.$store.dispatch('status/setSimInfo')
  },
  mounted() {
    this.initData()
    this.initSimStatus() // 循环获取SIM卡状态
  },
  methods: {
    initData() {
      getWanNetworkConnectionApi().then((data) => {
        if (data.retcode == 0) {
          this.defaultInfo = { ...data }
          this.setInfo(data)
        }
      })
    },
    setInfo(data) {
      this.connectInfo.data_roaming = data.data_roaming == 0 ? false : true
      this.connectInfo.connection_mode = data.connection_mode
    },
    apply() {
      let parma = {
        data_roaming: this.connectInfo.data_roaming ? 1 : 0,
        connection_mode: this.connectInfo.connection_mode
      }
      setWanNetworkConnectionApi(parma).then((data) => {
        if (data.retcode == 0) {
          this.defaultInfo = { ...data }
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    initSimStatus() {
      this.simStatusTimer = setInterval(() => {
        this.$store.dispatch('status/setSimInfo')
      }, 3000)
    },
    cancel() {
      this.initData()
    }
  },
  beforeDestroy() {
    clearInterval(this.simStatusTimer)
    this.simStatusTimer = null
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
    width: 100%;
    margin: 40px 0;
    height: 40px;
    line-height: 40px;
    align-items: center;
    div {
      width: 50%;
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
