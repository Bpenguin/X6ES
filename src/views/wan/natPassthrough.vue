<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wan.wanNatPassthroughscri') }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('nav.wanNatPassthrough') }}:</div>
        </el-col>
        <el-col :span="12">
          <el-switch v-model="NATSwitch" active-color="#00dc50" inactive-color="#8d9092" @change="changeSwitch"></el-switch>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="scri-view">{{ $t('wan.wanPingscri2') }}</div> -->
  </div>
</template>

<script>
import {
  getWanNATPassthroughStatusApi,
  setWanNATPassthroughStatusApi
} from '@/api/wan'
import { Message } from 'element-ui'
import theme from '@/styles/theme.module.scss'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'NatPassthrough',
  computed: {
    theme() {
      return theme
    }
  },
  data() {
    return {
      NATSwitch: false
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    getWanNATPassthroughStatusApi().then((data) => {
      if (data.retcode == 0) {
        this.NATSwitch = data.enable == 1 ? true : false
      }
    })
  },
  methods: {
    changeSwitch(val) {
      console.log(val)
      setWanNATPassthroughStatusApi({ enable: this.NATSwitch ? 1 : 0 }).then(
        (data) => {
          if (data.retcode == 0) {
            this.$publicFun.showSucMessage(this)
          } else {
            this.$publicFun.showErrMessage(this)
          }
        }
      )
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
