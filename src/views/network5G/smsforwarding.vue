<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{$t('common.unuse')}}</div>
    </div>
  </div>
  <!-- <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('network5G.SMSForwardingScr') }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="12" :xs="16">
          <div>{{ $t('network5G.SMSForwarding') }}:</div>
        </el-col>
        <el-col :span="12" :xs="16">
          <el-switch v-model="forwardingSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12" :xs="16">
          <div>{{ $t('wan.RecipientNumber') }}:</div>
        </el-col>
        <el-col :span="12" :xs="18">
          <mine-input :key="'RecipientNumber'" v-model="phoneNumber" :placeholder="'e.g., 192.168.0.100'"></mine-input>
        </el-col>
      </el-row>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
      </div>
    </div>
  </div> -->
</template>

<script>
import { Message } from 'element-ui'
import { getWanDMZInfo, setWanDMZInfo } from '@/api/wan'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'DMZ',
  data() {
    return {
      defaultforwardingSwitch: false, // 已设置的信息
      defaultphoneNumber: '', // 已设置的信息
      forwardingSwitch: false,
      phoneNumber: ''
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    getWanDMZInfo().then((data) => {
      if (data.retcode == 0) {
        this.defaultDmzSwitch = data.dmz_status == 0 ? false : true
        this.defaultDmzHostIP = data.dmz_ipaddr
      }
      this.dmzSwitch = this.defaultDmzSwitch
      this.dmzHostIP = this.defaultDmzHostIP
    })
  },
  methods: {
    apply() {
      let parma = {
        dmz_status: this.dmzSwitch ? 1 : 0,
        dmz_ipaddr: this.dmzHostIP
      }
      setWanDMZInfo(parma).then((data) => {
        if (data.retcode == 0) {
          this.defaultDmzSwitch = this.dmzSwitch
          this.defaultDmzHostIP = this.dmzHostIP
          Message({
            message: this.$t('common.success'),
            type: 'success',
            duration: 2 * 1000
          })
        }
      })
    },
    cancel() {
      this.dmzSwitch = this.defaultDmzSwitch
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
