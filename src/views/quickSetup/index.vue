<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <!-- <main-view v-if="showIndex" @startSetting="startSetting"></main-view> -->
    <!-- <div v-else> -->
    <!-- 头部进度条 -->
    <progress-head v-show="currentProgress!=0" :wan-type="wanType" :current-progress="currentProgress"></progress-head>
    <div v-if="currentProgress == 0" class="block-body">
      <div class="page-description t-c">{{ $t('other.quickStartDes') }}</div>
      <div class="c-row">
        <div class="pri-buttons">
          <div class="pri-left-button">
            <div class="btn pri-button-wan-container" @click="startSet('5G')">
              <!-- <svg-icon class-name="fill-light-color pri-img-5g-wan" :icon-class="'WAN-5G'"></svg-icon> -->
              <svg-icon class-name="fill-light-color pri-img-5g-wan" :icon-class="'network5G'"></svg-icon>
              <div class="pri-button-wan light-color">{{ $t('wan.WAN5G') }}</div>
            </div>
          </div>
          <div class="pri-right-button">
            <div class="btn pri-button-wan-container" @click="startSet('WAN')">
              <!-- <svg-icon class-name="fill-light-color pri-img-5g-wan" :icon-class="'WAN-Q'"></svg-icon> -->
              <svg-icon class-name="fill-light-color pri-img-5g-wan" :icon-class="'port-1'"></svg-icon>
              <div class="pri-button-wan light-color">{{ $t('nav.wan') }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.back')" @clickBtn="showIndex = true"></mine-button>
      </div> -->
    </div>
    <!-- 首页 -->
    <page-one v-if="currentProgress == 1" :wan-type="wanType" @goToPageIndex="goToPageIndex"></page-one>
    <page-two v-if="currentProgress == 2" :wan-type="wanType" @goToPageIndex="goToPageIndex"></page-two>
    <page-three v-if="currentProgress == 3 || currentProgress == 4" :mode-type="modeType" @goToPageIndex="goToPageIndex"></page-three>
    <!-- </div> -->
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="goToDashboard"></mine-dialog>
  </div>
</template>

<script>
import ProgressHead from './progressHead.vue'
import PageOne from './pageOne.vue'
import PageTwo from './pageTwo.vue'
import PageThree from './pageThree.vue'
import MainView from './main.vue'
import { getMobileInfoStatus } from '../../api/status'
import {
  setWlanBasicInfo,
  getWlanGuestBasicInfoApi,
  setWlanGuestBasicInfoApi
} from '../../api/wifi'
import { setWANInfo } from '../../api/wan'
import {
  setWanNetworkConnectionApi,
  setNetworkModeApi,
  setWanNr5gModeInfoApi,
  setProfileApi
} from '@/api/network5G'
import MineDialog from '@/components/MineDialog'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  components: {
    // MainView,
    ProgressHead,
    PageOne,
    PageTwo,
    PageThree,
    MineDialog
  },
  computed: {},
  data() {
    return {
      showIndex: true,
      wanType: '5G', // 5G WAN
      modeType: '', // mode type
      currentProgress: 0,
      wanData: {},
      wan5GData: {},
      wifiData: {},
      guestData: {},
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.quickSetup', // 标题
        msgTitle: 'quickSetup.setSuccessTip',
        leftBtnText: 'common.ok' //右侧按钮的描述
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    startSet(type) {
      this.currentProgress = 1
      this.wanType = type
    },
    initData() {
      getMobileInfoStatus().then((data) => {
        if (data.retcode == 0) {
          this.$nextTick(() => {
            console.log('success', this.mobileStatus)
          })
        } else {
          console.log('error', this.mobileStatus)
        }
      })
      getWlanGuestBasicInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.guestData = data
        }
      })
      // 获取wifi信息
      this.$store.dispatch('wifi/setWifiInfo')
    },
    startSetting(modeType) {
      this.modeType = modeType
      this.showIndex = false
    },
    goToPageIndex(data) {
      this.currentProgress = data.index
      if (data.index == 3) {
        if (this.wanType == '5G') {
          this.wan5GData = data.params
        } else {
          this.wanData = data.params
        }
      } else if (data.index == 4) {
        this.wifiData = data.params
        if (this.wanType == 'WAN') {
          this.setWanAdnWifiData()
        } else if (this.wanType == '5G') {
          this.setWan5gAdnWifiData()
        }
      }
    },
    // 设置5G和wifi
    setWan5gAdnWifiData() {
      const { networkModelInfo, connectInfo, currentData } = this.wan5GData
      let parma = {
        data_roaming: connectInfo.data_roaming ? 1 : 0,
        connection_mode: connectInfo.connection_mode
      }
      setWanNetworkConnectionApi(parma).then((data) => {
        if (currentData.index != 0) {
          // let parama = { ...currentData }
          currentData.apnmode = currentData.readonly == 1 ? 0 : 1
          currentData.preferred = 1
          setProfileApi(currentData).then(() => {})
        }
      })

      let networkModelNums = networkModelInfo.networkModel.split('-')
      setNetworkModeApi({ mode: networkModelNums[0] }).then((data) => {})
      if (networkModelNums[0] != '3') {
        setWanNr5gModeInfoApi({ mode: networkModelNums[1] }).then(() => {})
      }
      // 关闭guest相关开关
      this.getGuestWifiParams(this.wifiData)
      setWlanGuestBasicInfoApi(this.guestData).then((data) => {})
      setWlanBasicInfo(this.wifiData).then((data) => {
        if (data.retcode == 0) {
          this.showDialogInfo.showDialog = true
        } else {
          this.showDialogInfo.showDialog = true
        }
      })
    },
    // 设置wan和WIFI
    setWanAdnWifiData() {
      // 关闭guest相关开关
      this.getGuestWifiParams(this.wifiData)
      setWlanGuestBasicInfoApi(this.guestData).then((data) => {})

      let p1 = setWANInfo(this.wanData).then((data) => {
        return new Promise((resolve, reject) => {
          if (data.retcode == 0) {
            resolve()
          } else if (data.retcode == 401) {
            console.log('userName or pwd error')
            reject()
          } else {
            reject()
          }
        })
      })
      let p2 = setWlanBasicInfo(this.wifiData).then((data) => {
        return new Promise((resolve, reject) => {
          if (data.retcode == 0) {
            resolve()
          } else {
            reject()
          }
        })
      })
      Promise.all([p1, p2])
        .then((res) => {
          this.showDialogInfo.showDialog = true
        })
        .catch((error) => {
          this.$publicFun.showErrMessage(this)
        })
    },
    getGuestWifiParams(wifiParams) {
      // params.Host2Status
      // 主wifi6G关闭时，关闭guest 的5G和6G
      if (wifiParams.Host3Status == 1 && this.guestData.Guest3Status == 1) {
        this.guestData.Guest3Status == 0
      }
      if (wifiParams.Host3Status == 0 && this.guestData.Guest2Status == 1) {
        this.guestData.Guest2Status == 0
      }
      if (wifiParams.Host2Status == 1 && this.guestData.Guest3Status == 1) {
        this.guestData.Guest3Status == 0
      }
      if (wifiParams.Host2Status == 0 && this.guestData.Guest2Status == 1) {
        this.guestData.Guest2Status == 0
      }
    },
    goToDashboard() {
      this.$router.push({ path: '/' })
    }
  },
  destroyed() {}
}
</script>

<style lang="scss">
.page-item {
  color: $light-style-color;
  text-align: center;
  margin: 30px 0;
}
.top-title {
  text-align: left;
  color: $light-style-color;
}
.pri-buttons {
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding-right: 13px;
  width: 100%;
}
.pri-left-button {
  margin-right: 40px;
}
.pri-right-button {
  margin-left: 40px;
}
.btn {
  font-size: 18px;
  border: 7px solid;
  padding: 3px 10px;
  min-width: 105px;
}
.pri-button-wan-container {
  width: 155px;
  height: 102px !important;
  display: flex;
  flex-flow: column;
  padding: 10px;
  border: 1px solid $light-style-color !important;
  background-color: rgba(0, 0, 0, 0.4);
}
.pri-img-5g-wan {
  margin: auto;
  width: 30px !important;
  height: 45px !important;
  // fill: $light-style-color !important;
}
.pri-button-wan {
  width: 100%;
  text-align: center;
  // color: $light-style-color;
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
label {
  font-weight: 100;
}
.t-c {
  text-align: center !important;
}
</style>
