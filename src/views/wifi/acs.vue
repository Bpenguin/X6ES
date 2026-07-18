<template>

  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wifi.acsScr') }}</div>
    </div>
    <!-- 不支持ACS -->
    <div v-if="supprotAcs==0" class="block-body dis-support">
      {{ $t('other.acsDisable') }}
    </div>
    <div v-else>
      <div class="block-body">
        <div class="c-row">
          <div class="apply-btn" @click="applyClick">{{ $t('common.apply') }}</div>
        </div>
      </div>
      <div class="block-header">{{ $t('wifi.currentChannel') }}</div>
      <div class="block-body">
        <el-row class="c-row">
          <el-col :span="8" :xs="24">
            <div v-if="channel_4G_show">2.4GHz: {{ channel_4G}}</div>
            <div v-else>2.4GHz: {{ $t('common.disabled')}}</div>
          </el-col>
          <el-col :span="8" :xs="24">
            <div v-if="channel_5G_show">5GHz: {{ channel_5G}}</div>
            <div v-else>5GHz: {{ $t('common.disabled')}}</div>
          </el-col>
          <el-col :span="8" :xs="24">
            <div v-if="channel_6G_show">6GHz: {{ channel_6G}}</div>
            <div v-else>6GHz: {{ $t('common.disabled')}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="block-body">
      <div class="page-note">{{ $t('wifi.acBottomScr') }}</div>
    </div>
    <mine-dialog :show-dialog='showApplyDialogInfo.showDialog' :title="showApplyDialogInfo.title" :msg-title="showApplyDialogInfo.msgTitle" :show-close-btn="showApplyDialogInfo.showCloseBtn" :left-btn-text="showApplyDialogInfo.leftBtnText" :right-btn-text="showApplyDialogInfo.rightBtnText" @closeDialog="showApplyDialogInfo.showDialog = false" @leftBtnClick="showApplyDialogInfo.showDialog = false" @rightBtnClick="applyAcs"></mine-dialog>
  </div>
</template>
<script>
import MineDialog from '@/components/MineDialog'
import {
  webWlanAcsGetApi,
  webWlanAcsSetApi,
  webWlanAcsResultApi
} from '@/api/wifi'
import { Message } from 'element-ui'
export default {
  name: 'WIFIAcs',
  components: { MineDialog },
  data() {
    return {
      num: 0,
      supprotAcs: 0,
      channel_4G: 0,
      channel_5G: 0,
      channel_6G: 0,
      channel_4G_show: false,
      channel_5G_show: false,
      channel_6G_show: false,
      showApplyDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.confirm', // 标题
        msgTitle: 'wifi.applyTip',
        leftBtnText: 'common.cancel', //左侧按钮的描述
        rightBtnText: 'common.confirm' //右侧按钮的描述
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      webWlanAcsGetApi().then((data) => {
        if (data.retcode == 0) {
          if (data.AcsStatus == 1) {
            this.supprotAcs = data.AcsStatus
            this.channel_4G_show = data.Host1Status == 1 ? true : false
            this.channel_5G_show = data.Host2Status == 1 ? true : false
            this.channel_6G_show = data.Host3Status == 1 ? true : false
            this.channel_4G = data.Host1ConnectedChannel
            this.channel_5G = data.Host2ConnectedChannel
            this.channel_6G = data.Host3ConnectedChannel
          }
        }
      })
    },
    applyAcs() {
      this.showApplyDialogInfo.showDialog = false
      webWlanAcsSetApi().then((data) => {
        if (data.retcode == 0) {
          this.webWlanAcsResult()
        }
      })
    },
    webWlanAcsResult() {
      this.num++
      if (this.num >= 20) {
        this.num = 0
        return
      }
      webWlanAcsResultApi().then((data) => {
        if (data.retcode == 0 && data.AcsResult == 1) {
          setTimeout(() => {
            this.webWlanAcsResult()
          }, 1500)
        } else if (data.retcode == 0 && data.AcsResult == 0) {
          this.num = 0
          this.initData()
        } else {
          this.num = 0
          Message({
            message: 'Error',
            type: 'error',
            duration: 2 * 1000
          })
        }
      })
    },
    applyClick() {
      this.showApplyDialogInfo.showDialog = true
    }
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0 3%;
}
.scri-view {
  font-size: 16px;
  line-height: 18px;
  padding: 20px 0;
  color: $gray-font-color;
}
.light-title {
  color: $light-style-color;
  padding: 30px 0;
}
.apply-btn {
  width: 184px;
  height: 184px;
  text-align: center;
  line-height: 184px;
  color: $light-style-color;
  margin: 20px auto !important;
  border-radius: 50%;
  border: 1px solid $light-style-color;
  background: transparent;
  box-shadow: 0 0 11px -1px $light-style-color;
}
.apply-btn:hover {
  transform: scale(1.01);
}
.channel-view {
  color: $default-font-color;
  display: flex;
  // justify-content: space-between;
}
.dis-support {
  height: 184px;
  line-height: 184px;
  text-align: center;
}
</style>