<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('other.newFirmwareScr') }}</div>
    </div>
    <div class="block-body">
      <div class="c-row"></div>
      <el-row class="c-row">
        <el-col :span="8" :xs="18">
          <!-- <div v-if="devType == 0 && checking">{{ $t('system.checking')+'...'}}</div>
          <div v-else>{{ $t('system.currentVersion') + ': '}}</div> -->
          <div>{{ $t('system.firmwareVersion') + ': '}}</div>
        </el-col>
        <el-col :span="10" :xs="18">
          <!-- <div v-if="devType == 0 &&checking"></div>
          <div v-else>{{deviceInfo.device_software_version}}</div> -->
          <div>{{deviceInfo.device_software_version}}</div>
        </el-col>
        <el-col :span="6" :xs="18">
          <mine-button :btn-title="$t('system.checking')" @clickBtn="checkNewVersion(0)"></mine-button>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8" :xs="18">
          <div>{{ $t('other.firmwareVersionModule') + ': '}}</div>
        </el-col>
        <el-col :span="10" :xs="18">
          <!-- <div v-if="devType == 1 && checking"></div>
          <div v-else>{{deviceInfo.device_module_version}}</div> -->
          <div>{{deviceInfo.device_module_version}}</div>
        </el-col>
        <el-col :span="6" :xs="18">
          <mine-button :btn-title="$t('system.checking')" @clickBtn="checkNewVersion(1)"></mine-button>
        </el-col>
      </el-row>
      <div class="c-row"></div>
    </div>
    <div class="block-body">
      <div class="page-note">
        {{$t('common.note')+':'}}<br />
        {{$t('system.firmwareScr1',{ProductName:GLOBAL.PRODUCT_NAME})}}
      </div>
    </div>
    <!-- 新版本信息 -->
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" :right-btn-text="showDialogInfo.rightBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @rightBtnClick="downNewVersion" @closeDialog="showDialogInfo.showDialog = false">
      <template>
        <div v-show="devType== 0">{{$t('system.firmwareVersion')+": "+ newVerison }}</div>
        <div v-show="devType== 1">{{$t('other.firmwareVersionModule')+": "+ newVerison }}</div>
      </template>
    </mine-dialog>
    <mine-dialog :show-dialog='showDownDialogInfo.showDialog' :title="showDownDialogInfo.title">
      <template>
        <el-progress :text-inside="true" :percentage="percentage" :stroke-width="26" :color="customColor"></el-progress>
        <div><br />{{$t('system.downloading')}}...</div>
      </template>
    </mine-dialog>
    <mine-dialog :show-dialog='showUpdateDialogInfo.showDialog' :title="showUpdateDialogInfo.title" :msg-title="showUpdateDialogInfo.msgTitle">
      <template>
        <div>{{$t('system.updateTitle')}}...<br /></div>
        <div>{{$t('system.updatingMsg',{ProductName:GLOBAL.PRODUCT_NAME})}}<br /></div>
      </template>
    </mine-dialog>
    <mine-dialog :show-dialog='showWillUpdateDialogInfo.showDialog' :title="showWillUpdateDialogInfo.title" :show-close-btn="true" :msg-title="showWillUpdateDialogInfo.msgTitle" :left-btn-text="showWillUpdateDialogInfo.leftBtnText" :right-btn-text="showWillUpdateDialogInfo.rightBtnText" @rightBtnClick="startupdateVersion" @leftBtnClick="showWillUpdateDialogInfo.showDialog = false" @closeDialog="showWillUpdateDialogInfo.showDialog = false">
    </mine-dialog>
    <mine-dialog :show-dialog='showNoVersionDialogInfo.showDialog' :title="showNoVersionDialogInfo.title" :show-close-btn="true" :msg-title="showNoVersionDialogInfo.msgTitle" :left-btn-text="showNoVersionDialogInfo.leftBtnText" @leftBtnClick="showNoVersionDialogInfo.showDialog = false" @closeDialog="showNoVersionDialogInfo.showDialog = false">
    </mine-dialog>
    <mine-dialog :show-dialog='showErrorDialogInfo.showDialog' :title="showErrorDialogInfo.title" :show-close-btn="true" :msg-title="showErrorDialogInfo.msgTitle" :left-btn-text="showErrorDialogInfo.leftBtnText" @leftBtnClick="showErrorDialogInfo.showDialog = false" @closeDialog="showErrorDialogInfo.showDialog = false">
    </mine-dialog>
  </div>
</template>

<script>
import { getDeviceInfo } from '@/api/system'
import {
  getOtaStatusApi,
  checkNewVersionApi,
  getOtaNewVersionInfoApi,
  startOtaDownloadApi,
  startOtaUpdateApi,
  cancelOtaApi,
  onekeyUpgradeApi
} from '@/api/ota'
import MineDialog from '@/components/MineDialog'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SystemRestart',
  components: { MineDialog },
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    }
  },
  data() {
    return {
      devType: 0, // 0：fota  :1：module
      newVerison: '', // 新版本
      checking: false,
      percentage: 0,
      customColor: '#00dc50',
      timer: '',
      getVersionTimer: '',
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.systemFirmware', // 标题
        msgTitle: 'system.updateVersionMsg',
        leftBtnText: 'common.cancel', //左侧按钮的描述
        rightBtnText: 'common.download'
      },
      showDownDialogInfo: {
        showDialog: false,
        title: 'system.downloading' // 标题
      },
      showUpdateDialogInfo: {
        showDialog: false,
        title: 'system.updateTitle', // 标题
        msgTitle: ''
      },
      // 没有新版本
      showNoVersionDialogInfo: {
        showDialog: false,
        title: 'nav.systemFirmware', // 标题
        msgTitle: 'other.noNewVersion',
        leftBtnText: 'common.ok'
      },
      // 下载完成后，提示是否更新
      showWillUpdateDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.systemFirmware', // 标题
        msgTitle: 'other.willUpdateTip',
        leftBtnText: 'common.cancel', //左侧按钮的描述
        rightBtnText: 'common.update'
      },
      showErrorDialogInfo: {
        showDialog: false,
        title: 'nav.systemFirmware', // 标题
        msgTitle: 'other.fotaCheckError',
        leftBtnText: 'common.ok'
      },
      FirmwareTittle: 'nav.systemFirmware',
      modemTittle: 'system.systemFirmwareModule'
    }
  },
  created() {},
  mounted() {
    console.log('this.$store', this.$store)
    this.getDeviceInfoFun()
    this.getVersionTimer = setInterval(() => {
      this.getDeviceInfoFun()
    }, 5000)
  },
  methods: {
    // 下载新版本
    downNewVersion() {
      this.showDialogInfo.showDialog = false
      startOtaDownloadApi({ devType: this.devType }).then((data) => {
        if (data.retcode == 0) {
          this.showDownDialogInfo.showDialog = true
          this.getOtaStatus(true)
        } else {
          this.showCheckErrTip(true)
          // this.$publicFun.showErrMessage(this)
        }
      })
    },
    // 开始升级
    updateVersion() {
      this.showDownDialogInfo.showDialog = false
      this.showWillUpdateDialogInfo.title = this.showTipTitle()
      this.showWillUpdateDialogInfo.showDialog = true
    },
    startupdateVersion() {
      this.showWillUpdateDialogInfo.showDialog = false
      startOtaUpdateApi({ devType: this.devType }).then((data) => {
        if (data.retcode == 0) {
          this.getOtaStatus(true)
          this.showUpdateDialogInfo.showDialog = true
        } else {
          this.$publicFun.showErrMessage()
        }
      })
    },
    // 获取OTA状态
    getOtaStatus(hiddenLoading = false) {
      this.timer = setInterval(() => {
        // 查看下载进度
        getOtaStatusApi({ devType: this.devType, hiddenLoading }).then(
          (data) => {
            if (data.retcode == 0) {
              if (data.state == 2) {
                this.percentage = data.percent
              } else if (data.state == 9) {
                this.clearInter()
                // 下载成功 开始升级
                this.updateVersion()
              } else if (data.state == 10) {
                // 下载出错
                this.clearInter()
                this.showDownDialogInfo.showDialog = false
                this.showCheckErrTip(true)
              } else if (data.state == 12) {
                this.clearInter()
                this.showUpdateDialogInfo.showDialog = true
              } else if (data.state == 8) {
                this.clearInter()
                if (data.have_version == 0) {
                  this.showNoVersionDialogInfo.msgTitle =
                    this.devType == 0
                      ? 'other.noNewVersion'
                      : 'system.noNewVersionModule'
                  this.showNoVersionDialogInfo.title = this.showTipTitle()
                  this.showNoVersionDialogInfo.showDialog = true
                } else {
                  this.getOtaNewVersionInfo()
                }
              } else if (data.state == 7) {
                // 检查更新出错
                this.clearInter()
                this.showCheckErrTip()
                // this.$publicFun.showErrMessage(this)
              }
            }
          }
        )
      }, 2000)
    },

    // 开始检测新版本
    async checkNewVersion(val) {
      this.devType = val
      this.checking = true
      await cancelOtaApi().then()
      await cancelOtaApi({ devType: 1 }).then()
      checkNewVersionApi({ devType: this.devType }).then((data) => {
        this.checking = false
        getOtaStatusApi({ keepLoading: true, devType: this.devType }).then()
        if (data.retcode == 0) {
          this.getOtaStatus()
        } else {
          getOtaStatusApi({ cancelLoading: true, devType: this.devType }).then()
          this.showCheckErrTip()
          // this.$publicFun.showErrMessage()
        }
      })
    },
    // 获取新版本信息
    getOtaNewVersionInfo() {
      getOtaNewVersionInfoApi({ devType: this.devType }).then((data) => {
        if (data.retcode == 0) {
          this.newVerison = data.version
          this.showDialogInfo.msgTitle =
            this.devType == 0
              ? 'system.updateVersionMsg'
              : 'system.updateVersionMsgModule'
          this.showDialogInfo.title = this.showTipTitle()
          this.showDialogInfo.showDialog = true
        } else {
          this.showCheckErrTip()
        }
      })
    },
    showCheckErrTip(type = false) {
      this.showErrorDialogInfo.title = this.showTipTitle()
      this.showNoVersionDialogInfo.msgTitle = 'other.fotaCheckError'
      if (type) {
        this.showErrorDialogInfo.msgTitle = 'other.fotaDownloadError'
      }
      this.showErrorDialogInfo.showDialog = true
    },
    clearInter() {
      getOtaStatusApi({ cancelLoading: true, devType: this.devType }).then(
        (data) => {}
      )
      clearInterval(this.timer)
      this.timer = null
    },
    clearVersionInter() {
      clearInterval(this.getVersionTimer)
      this.getVersionTimer = null
    },
    // 修改弹框的标题
    showTipTitle() {
      return this.devType == 0
        ? 'nav.systemFirmware'
        : 'system.systemFirmwareModule'
    },
    getDeviceInfoFun() {
      getDeviceInfo().then((data) => {
        if (data.retcode == 0) {
          this.$store.dispatch('device/setDeviceInfo', data)
          if (
            data.device_software_version &&
            data.device_software_version != '' &&
            data.device_module_version &&
            data.device_module_version != ''
          ) {
            this.clearVersionInter()
          }
        }
      })
    }
  },
  destroyed() {
    this.clearInter()
    this.clearVersionInter()
  }
}
</script>

<style lang="scss" scoped>
.block-margin {
  margin: 50px 0 !important;
}
</style>
