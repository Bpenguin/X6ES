```vue
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

      <!-- Backup -->
      <el-row class="c-row">
        <el-col :span="6" :xs="24">
          <div class="white-space" @click="triggerVconsole(true)">
            {{$t('system.backup')+':'}}
          </div>
        </el-col>

        <el-col :span="12" :xs="24">
          <div>
            {{$t('system.backupDetil')}}
          </div>
        </el-col>

        <el-col :span="6" :xs="24">
          <mine-button :btn-title="$t('system.backup')" @clickBtn="backupSetting"></mine-button>
        </el-col>
      </el-row>

      <!-- Restore -->
      <el-row class="c-row">
        <el-col :span="6" :xs="24">
          <div @click="triggerVconsole()">
            {{$t('system.restore')+':'}}
          </div>
        </el-col>

        <el-col :span="12" :xs="24">
          <div class="input-view">

            <!-- 原始文件选择框 -->
            <input class="input-item" key="fileInput" ref="fileInput" type="file" @change="fileChange($event)">

            <!-- 自定义文件名称显示 -->
            <div class="mask">

              <div ref="fileTextView" class="text-view" :class="{ 'is-scroll': fileNameOverflow }">
                <div ref="fileTextContent" class="text-content" :style="{
                    '--scroll-distance': fileScrollDistance + 'px'
                  }">
                  {{fileName}}
                </div>
              </div>

              <div class="right-view">
                <div class="text_tip">
                  {{$t('system.browse')}}
                </div>
              </div>

            </div>
          </div>
        </el-col>

        <el-col :span="6" :xs="24">
          <mine-button :btn-title="$t('system.restore')" :un-click="fileName.length==0?true:false" @clickBtn="applySetting"></mine-button>
        </el-col>
      </el-row>

      <!-- OPFA 本地升级测试入口 -->
      <el-row v-show="showTest" class="c-row">
        <el-col :span="6" :xs="24">
          <div>
            {{$t('common.update')+':'}}
          </div>
        </el-col>

        <el-col :span="12" :xs="24">
          <div class="input-view">

            <input class="input-item" key="opfaInput" ref="opfaInput" type="file" @change="updateOPFA($event)">

            <div class="mask">

              <div ref="opfaTextView" class="text-view" :class="{ 'is-scroll': opfaNameOverflow }">
                <div ref="opfaTextContent" class="text-content" :style="{
                    '--scroll-distance': opfaScrollDistance + 'px'
                  }">
                  {{opfaName}}
                </div>
              </div>

              <div class="right-view">
                <div class="text_tip">
                  {{$t('system.browse')}}
                </div>
              </div>

            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <mine-button :btn-title="'localUpdate'" @clickBtn="restoreOPFAFile"></mine-button>
        </el-col>
      </el-row>

    </div>

    <!-- Restore 确认弹窗 -->
    <mine-dialog :show-dialog="showDialogInfo.showDialog" :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" :right-btn-text="showDialogInfo.rightBtnText" @rightBtnClick="restoreConfigFile" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>

    <!-- 文件类型错误弹窗 -->
    <mine-dialog :show-dialog="showFileDialogInfo.showDialog" :show-close-btn="showFileDialogInfo.showCloseBtn" :title="showFileDialogInfo.title" :msg-title="showFileDialogInfo.msgTitle" :left-btn-text="showFileDialogInfo.leftBtnText" @leftBtnClick="showFileDialogInfo.showDialog = false" @closeDialog="showFileDialogInfo.showDialog = false"></mine-dialog>

    <!-- Restart -->
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

  components: {
    RestartingDialog,
    MineDialog
  },

  data() {
    return {
      showRestartLoading: false,
      setTimeSwitch: true,
      saveTimeSwitch: true,
      time: '',

      // 上传的文件名称
      fileName: '',
      fileList: [],

      // 文件名是否超出显示区域
      fileNameOverflow: false,

      // 文件名需要滚动的距离
      fileScrollDistance: 0,

      // 测试入口
      showTest: false,
      count: 0,
      lastTime: 0,
      interval: 300,

      // OPFA
      opfaName: '',
      opfaList: [],

      // OPFA 文件名滚动
      opfaNameOverflow: false,
      opfaScrollDistance: 0,

      // 设置 restore 确认提示
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'system.restore',
        msgTitle: 'other.restoreMsg',
        leftBtnText: 'common.cancel',
        rightBtnText: 'system.restore'
      },

      // 设置错误文件类型提示
      showFileDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'other.IncorrectFile',
        msgTitle: 'other.IncorrectFileSrc',
        leftBtnText: 'common.close'
      }
    }
  },

  created() {},

  mounted() {
    // 页面加载后检查一次
    this.checkFileNameOverflow()

    // 浏览器窗口尺寸变化时重新计算
    window.addEventListener('resize', this.checkFileNameOverflow)
  },

  beforeDestroy() {
    // 移除 resize 监听，避免组件销毁后继续执行
    window.removeEventListener('resize', this.checkFileNameOverflow)
  },

  methods: {
    /**
     * 选择 Restore 文件
     */
    fileChange(e) {
      if (!e.target.files || !e.target.files.length) {
        this.fileName = ''
        this.fileList = []
        this.fileNameOverflow = false
        this.fileScrollDistance = 0
        return
      }

      this.fileName = e.target.files[0].name
      this.fileList = e.target.files[0]

      console.log('tempName', this.fileName)

      // 等 DOM 更新完成后重新计算文字宽度
      this.$nextTick(() => {
        this.checkFileNameOverflow()
      })
    },

    /**
     * 检查文件名是否超出显示区域
     *
     * textContent.scrollWidth > textView.clientWidth
     * 表示文字实际宽度超过可视区域，需要启动滚动
     */
    checkFileNameOverflow() {
      this.$nextTick(() => {
        // Restore 文件名
        const fileTextView = this.$refs.fileTextView
        const fileTextContent = this.$refs.fileTextContent

        if (fileTextView && fileTextContent) {
          const viewWidth = fileTextView.clientWidth
          const contentWidth = fileTextContent.scrollWidth

          if (contentWidth > viewWidth) {
            this.fileNameOverflow = true

            // 需要向左移动的距离
            this.fileScrollDistance = viewWidth - contentWidth
          } else {
            this.fileNameOverflow = false
            this.fileScrollDistance = 0
          }
        }

        // OPFA 文件名
        const opfaTextView = this.$refs.opfaTextView
        const opfaTextContent = this.$refs.opfaTextContent

        if (opfaTextView && opfaTextContent) {
          const viewWidth = opfaTextView.clientWidth
          const contentWidth = opfaTextContent.scrollWidth

          if (contentWidth > viewWidth) {
            this.opfaNameOverflow = true
            this.opfaScrollDistance = viewWidth - contentWidth
          } else {
            this.opfaNameOverflow = false
            this.opfaScrollDistance = 0
          }
        }
      })
    },

    /**
     * 备份配置信息
     */
    backupSetting() {
      exportFileApi().then((data) => {
        if (data.retcode == 0) {
          window.open(data.url)
        }
      })
    },

    /**
     * 点击 Restore
     */
    applySetting() {
      this.showDialogInfo.showDialog = true
    },

    /**
     * 上传配置文件
     */
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
              this.$publicFun.showErrMessage(this)
              // Message({
              //   message: 'Network error',
              //   type: 'error',
              //   duration: 2 * 1000
              // })
            }
          })
          this.showRestartLoading = true
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },

    /**
     * 测试使用
     * 连续点击触发隐藏功能
     */
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
            this.$router.push({
              path: '/system/TR069'
            })
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

    /**
     * OPFA 文件选择
     */
    updateOPFA(e) {
      console.log('2222', e)

      if (!e.target.files || !e.target.files.length) {
        this.opfaName = ''
        this.opfaList = []
        this.opfaNameOverflow = false
        this.opfaScrollDistance = 0
        return
      }

      this.opfaName = e.target.files[0].name
      this.opfaList = e.target.files[0]

      console.log('opfaName', this.$refs['opfaInput'])

      console.log('this.opfaList', this.opfaList)

      this.$nextTick(() => {
        this.checkFileNameOverflow()
      })
    },

    /**
     * 上传 OPFA 文件
     */
    restoreOPFAFile() {
      var formdata = new FormData()

      formdata.enctype = 'multipart/form-data'
      formdata.append('file', this.opfaList)

      uploadFile(formdata).then((data) => {
        if (data.retcode == 0) {
          setUpgradeApi({
            keepcfg: 1
          }).then((data) => {
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

/* 文件选择框 */
.input-view {
  position: relative;
  height: 35px;
  margin-right: 30px;
}

/* 原生 input */
.input-item {
  height: 100%;
  width: 100%;
}

/*
 * 文件名称显示区域
 *
 * 这里最重要的是：
 *
 * flex: 1;
 * min-width: 0;
 *
 * 不再使用 width: 100%;
 *
 * 因为右侧 Browse 固定占 100px，
 * text-view 必须自动占据剩余空间。
 */
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

  box-sizing: border-box;

  /*
   * 文件名区域
   */
  .text-view {
    flex: 1;
    min-width: 0;

    overflow: hidden;

    white-space: nowrap;

    /*
     * 文件名文字
     */
    .text-content {
      display: inline-block;

      white-space: nowrap;

      /*
       * 防止动画过程中出现换行
       */
      max-width: none;
    }

    /*
     * 只有文字超出的时候才增加动画
     */
    &.is-scroll {
      .text-content {
        animation: fileNameScroll 7s linear infinite;
      }
    }
  }
}

/*
 * Browse 区域固定在右侧
 */
.right-view {
  flex: 0 0 100px;

  width: 100px;
  height: 100%;

  box-sizing: border-box;
}

.text_tip {
  height: 100%;

  line-height: 35px;

  padding: 0 20px;

  border-left: 1px solid $default-font-color;

  box-sizing: border-box;

  white-space: nowrap;
}

.line-view {
  height: 100%;
  width: 1px;

  margin-right: 1px;

  background-color: $default-font-color;
}

/*
 * 文件名滚动动画
 *
 * 0% - 10%
 * 从头开始显示，并停留
 *
 * 10% - 55%
 * 向左滚动到文字尾部
 *
 * 55% - 70%
 * 到达尾部后停留
 *
 * 70% - 100%
 * 回到开头
 */
@keyframes fileNameScroll {
  0% {
    transform: translateX(0);
  }

  10% {
    transform: translateX(0);
  }

  55% {
    transform: translateX(var(--scroll-distance));
  }

  70% {
    transform: translateX(var(--scroll-distance));
  }

  100% {
    transform: translateX(0);
  }
}
</style>
```
