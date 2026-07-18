<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('other.nfcSrc',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="8">
          <div>
            {{$t('nav.NFC')}}:
          </div>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="nfcInfo.nfcSwitch" :label="1">{{ $t('other.Enable') }}</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="nfcInfo.nfcSwitch" :label="0">{{ $t('other.disable') }}</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" v-show="nfcInfo.nfcSwitch == 1">
        <el-col :span="8">
          <div>{{$t('nav.wifi')}}</div>
        </el-col>
        <el-col :span="16">
          <el-select v-model="nfcInfo.ssid" popper-class="x6-select">
            <el-option v-for="item in ssidList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="block-body">
      <div class="page-note">{{$t('common.note')+': '+ $t('other.noteNfcSrc') }}</div>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
      </div>
    </div>
    <!-- <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showSwitchDialogInfo.showDialog' :show-close-btn="showSwitchDialogInfo.showCloseBtn" :title="showSwitchDialogInfo.title" :msg-title="showSwitchDialogInfo.msgTitle" :left-btn-text="showSwitchDialogInfo.leftBtnText" @leftBtnClick="showSwitchDialogInfo.showDialog = false" :right-btn-text="showSwitchDialogInfo.rightBtnText" @rightBtnClick="switchWanToLan" @closeDialog="showSwitchDialogInfo.showDialog = false"></mine-dialog> -->
  </div>
</template>
<script>
import { getNfcWifiInfo, setNfcWifiExe } from '@/api/system'
import {
  getWifiSettingNotificationApi,
  getGuestWifiSettingNotificationApi
} from '@/api/doshboard'
import MineDialog from '@/components/MineDialog'

export default {
  name: 'NFC',
  // eslint-disable-next-line vue/multi-word-component-names
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  // components: { MineDialog },
  data() {
    return {
      nfcInfo: {
        nfcSwitch: 1,
        ssid: '',
        NfcHostList: []
      },
      ssidList: []
    }
  },

  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData() // 初始化配置信息
  },
  methods: {
    initData() {
      getNfcWifiInfo().then((data) => {
        if (data.retcode == 0) {
          this.nfcInfo.nfcSwitch = data.NfcStatus
          this.nfcInfo.ssid = data.NfcIndex
          this.nfcInfo.NfcHostList = data.NfcHostList.split(',')
          this.initWifiInfo(data.Support5G, data.Support6G)
        }
      })
    },
    initWifiInfo(Support5G, Support6G) {
      this.ssidList = []
      // 获取host wifi信息
      getWifiSettingNotificationApi({ GuestWifiIndex: 0 }).then((data) => {
        if (data.retcode == 0) {
          let tempArray = this.nfcInfo.NfcHostList
          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i] == 'ath0') {
              this.ssidList.push({ value: 'ath0', label: data.Host1Ssid })
            } else if (tempArray[i] == 'ath1') {
              if (Support5G == 1) {
                this.ssidList.push({ value: 'ath1', label: data.Host2Ssid })
              } else if (Support6G == 1) {
                this.ssidList.push({ value: 'ath1', label: data.Host3Ssid })
              }
            }
          }
        }
      })
      // 获取guest wifi信息
      getGuestWifiSettingNotificationApi({ GuestWifiIndex: 0 }).then((data) => {
        if (data.retcode == 0) {
          let tempArray = this.nfcInfo.NfcHostList
          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i] == 'ath01') {
              this.ssidList.push({ value: 'ath01', label: data.Guest1Ssid })
            } else if (tempArray[i] == 'ath11') {
              if (Support5G == 1) {
                this.ssidList.push({ value: 'ath11', label: data.Guest2Ssid })
              } else if (Support6G == 1) {
                this.ssidList.push({ value: 'ath11', label: data.Guest3Ssid })
              }
            }
          }
        }
      })
    },
    apply() {
      let params = {
        NfcIndex: this.nfcInfo.ssid,
        NfcStatus: this.nfcInfo.nfcSwitch
      }
      setNfcWifiExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    cancel() {
      this.initData()
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.scri-view {
  font-size: 16px;
  padding-right: 20px;
  color: $gray-font-color;
}
.mari-bot {
  margin-bottom: 20px;
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