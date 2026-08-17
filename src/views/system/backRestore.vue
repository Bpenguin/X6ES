<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">
        {{$t('system.backUpScr1')}}<br /><br />
        {{$t('system.backUpScr2')}}<br /><br />
        {{$t('system.backUpScr3')}}<br /><br />
        {{$t('system.backUpScr4')}}<br /><br />
        {{$t('system.backUpScr5')}}<br />
      </div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="6" :xs="24">
          <div class="white-space" @click="triggerVconsole(true)">{{$t('system.backup')+':'}}</div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div>{{$t('system.backupDetil')}}</div>
        </el-col>
        <el-col :span="6" :xs="24">
          <mine-button :btn-title="$t('system.backup')" @clickBtn="backupSetting"></mine-button>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="6" :xs="24">
          <div @click="triggerVconsole()">{{$t('system.restore')+':'}}</div>
        </el-col>
        <el-col :span="12" :xs="24">
          <!-- <el-upload action="#" ref="upload" :file-list="fileList" list-type="picture-card" :auto-upload="false"> -->
          <div class="input-view">
            <input class="input-item" key="fileInput" ref="fileInput" type="file" @change="fileChange($event)">
            <div class="mask">
              <span>{{fileName}}</span>
              <div class="right-view">
                <div class="text_tip">
                  {{$t('system.browse')}}</div>
              </div>
            </div>
          </div>
          <!-- </el-upload> -->
        </el-col>
        <el-col :span="6" :xs="24">
          <mine-button :btn-title="$t('system.restore')" :un-click="fileName.length==0?true:false" @clickBtn="applySetting"></mine-button>
        </el-col>
      </el-row>
      <el-row v-show="showTest" class="c-row">
        <el-col :span="4" :xs="24">
          <div>{{$t('common.update')+':'}}</div>
        </el-col>
        <el-col :span="14" :xs="24">
          <!-- <el-upload action="#" ref="upload" :file-list="fileList" list-type="picture-card" :auto-upload="false"> -->
          <div class="input-view">
            <input class="input-item" key="opfaInput" ref="opfaInput" type="file" @change="updateOPFA($event)">
            <div class="mask">
              <span>{{opfaName}}</span>
              <div class="right-view">
                <div class="text_tip">
                  {{$t('system.browse')}}</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <mine-button :btn-title="'localUpdate'" @clickBtn="restoreOPFAFile"></mine-button>
        </el-col>
      </el-row>
    </div>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" :right-btn-text="showDialogInfo.rightBtnText" @rightBtnClick="restoreConfigFile" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showFileDialogInfo.showDialog' :show-close-btn="showFileDialogInfo.showCloseBtn" :title="showFileDialogInfo.title" :msg-title="showFileDialogInfo.msgTitle" :left-btn-text="showFileDialogInfo.leftBtnText" @leftBtnClick="showFileDialogInfo.showDialog = false" @closeDialog="showFileDialogInfo.showDialog = false"></mine-dialog>
    <restarting-dialog v-if="showRestartLoading"></restarting-dialog>
  </div>
</template>

<script>
import MineDialog from '@/components/MineDialog'
import RestartingDialog from '@/components/MineDialog/restartingDialog'
import {
  exportFileApi,
  uploadFile,
  restoreDevice,
  setUpgradeApi
} from '@/api/system'
import { Message } from 'element-ui'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: { RestartingDialog, MineDialog },
  data() {
    return {
      showRestartLoading: false,
      setTimeSwitch: true,
      saveTimeSwitch: true,
      time: '',
      fileName: '', // 上传的文件名称
      fileList: [],
      showTest: false,
      count: 0,
      lastTime: 0,
      interval: 300,
      opfaName: '',
      opfaList: [],
      // 设置advande确认提示
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'system.restore', // 标题
        msgTitle: 'other.restoreMsg',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'system.restore' //右侧按钮的描述
      },
      // 设置错误文件类型提示
      showFileDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'other.IncorrectFile', // 标题
        msgTitle: 'other.IncorrectFileSrc',
        leftBtnText: 'common.close' //右侧按钮的描述
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    fileChange(e) {
      this.fileName = e.target.files[0].name
      this.fileList = e.target.files[0]
      // this.fileNameFilter = val.split('\\').slice(-1)[0]
      console.log('tempName', this.fileName)
    },
    // 备份配置信息
    backupSetting() {
      exportFileApi().then((data) => {
        if (data.retcode == 0) {
          window.open(data.url)
        }
      })
    },
    applySetting() {
      this.showDialogInfo.showDialog = true
    },
    // 上传配置文件
    restoreConfigFile() {
      this.showDialogInfo.showDialog = false
      if (this.fileName.indexOf('.') !== -1) {
        this.showFileDialogInfo.showDialog = true
        return
      }
      var formdata = new FormData()
      formdata.enctype = 'multipart/form-data'
      formdata.append('file', this.fileList)
      uploadFile(formdata).then((data) => {
        if (data.retcode == 0) {
          restoreDevice().then((data) => {
            if (data.retcode == 0) {
              console.log('restoreDevice:res', data)
            } else {
              Message({
                message: 'Network error',
                type: 'error',
                duration: 2 * 1000
              })
            }
          })
          this.showRestartLoading = true
        } else {
          this.$publicFun.showErrMessage(this)
        }
        console.log(data)
      })
    },

    // 测试使用，上传本地文件
    triggerVconsole(type = false) {
      const date = new Date()
      if (date.getTime() - this.lastTime > this.interval) {
        this.lastTime = 0
      }
      if (this.count === 0) {
        this.count += 1
        this.lastTime = date.getTime()
        return
      }

      const currentInterval = date.getTime() - this.lastTime
      if (currentInterval < this.interval) {
        if (this.count > 5) {
          this.count = 0
          this.lastTime = 0
          if (type) {
            this.$router.push({ path: '/system/TR069' })
          } else {
            this.showTest = true
          }
          return
        }
        this.count += 1
        this.lastTime = date.getTime()
        return
      }
      this.count = 0
      this.lastTime = 0
    },
    updateOPFA(e) {
      console.log('2222', e)
      this.opfaName = e.target.files[0].name
      this.opfaList = e.target.files[0]
      // this.fileNameFilter = val.split('\\').slice(-1)[0]
      console.log('opfaName', this.$refs['opfaInput'][0])
      console.log('this.opfaList', this.opfaList)
    },
    // 上传配置文件
    restoreOPFAFile() {
      var formdata = new FormData()
      formdata.enctype = 'multipart/form-data'
      formdata.append('file', this.opfaList)
      uploadFile(formdata).then((data) => {
        if (data.retcode == 0) {
          setUpgradeApi({ keepcfg: 1 }).then((data) => {
            if (data.retcode == 0) {
              console.log('restoreDevice:res', data)
            }
          })
          this.showRestartLoading = true
        } else {
          this.$publicFun.showErrMessage(this)
        }
        console.log(data)
      })
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
/deep/ .el-col {
  white-space: nowrap;
}
.white-space {
  white-space: nowrap;
}
.main-content {
  color: $default-font-color;
  padding: 30px;
  .c-row {
    display: flex;
    align-items: center;
    margin: 30px 0;
  }
}
.scri-view {
  line-height: 24px;
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
.input-view {
  position: relative;
  height: 35px;
  margin-right: 30px;
}
.input-item {
  height: 100%;
  width: 100%;
}
.mask {
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding-left: 10px;
  background-color: #353434;
  border: 1px solid $default-font-color;
  align-items: center;
  pointer-events: none;
}
.right-view {
  display: inline-block;
  height: 100%;
}
.text_tip {
  height: 100%;
  line-height: 35px;
  padding: 0 20px;
  // float: right;
  border-left: 1px solid $default-font-color;
}
.line-view {
  height: 100%;
  width: 1px;
  margin-right: 1px;
  background-color: $default-font-color;
}
</style>
