<template>

  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('system.restartScr') }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('system.restartDevice') + ': '}}</div>
        </el-col>
        <el-col :span="12">
          <mine-button :btn-title="$t('common.restart')" @clickBtn="restart"></mine-button>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('system.factoryReset') + ': '}}</div>
        </el-col>
        <el-col :span="12">
          <mine-button :btn-title="$t('common.reset')" @clickBtn="reset"></mine-button>
        </el-col>
      </el-row>
    </div>
    <mine-dialog :show-dialog='showrRestartDialogInfo.showDialog' :show-close-btn="showrRestartDialogInfo.showCloseBtn" :title="showrRestartDialogInfo.title" :msg-title="showrRestartDialogInfo.msgTitle" :left-btn-text="showrRestartDialogInfo.leftBtnText" @leftBtnClick="restartClick" @closeDialog="showrRestartDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showrResetDialogInfo.showDialog' :show-close-btn="showrResetDialogInfo.showCloseBtn" :title="showrResetDialogInfo.title" :msg-title="showrResetDialogInfo.msgTitle" :left-btn-text="showrResetDialogInfo.leftBtnText" @leftBtnClick="resetClick" @closeDialog="showrResetDialogInfo.showDialog = false"></mine-dialog>
    <restarting-dialog v-if="showRestartLoading" :title="title" :msg-title="msgTitle"></restarting-dialog>
  </div>
</template>

<script>
import { rebootDevice, resetDevice } from '@/api/system'
import MineDialog from '@/components/MineDialog'
import RestartingDialog from '@/components/MineDialog/restartingDialog'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SystemRestart',
  components: { MineDialog, RestartingDialog },
  data() {
    return {
      showRestartLoading: false,
      title: 'system.Restarting',
      msgTitle: 'system.restartingTip',
      // 4Ghz关闭提示语
      showrResetDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'system.factoryResetTitle', // 标题
        msgTitle: 'system.resetDiaMsg',
        leftBtnText: 'system.factoryResetTitle' //右侧按钮的描述
      },
      // 4Ghz关闭提示语
      showrRestartDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.restart', // 标题
        msgTitle: 'system.restartDiaMsg',
        leftBtnText: 'common.restart' //右侧按钮的描述
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    restartClick() {
      this.showrRestartDialogInfo.showDialog = false
      rebootDevice({ hiddenLoading: true }).then((data) => {
        if (data.retcode == 0) {
          console.log('rebootDevice', data)
        }
      })
      this.title = 'system.Restarting'
      this.msgTitle = 'system.restartingTip'
      this.showRestartLoading = true
    },
    resetClick() {
      this.showrResetDialogInfo.showDialog = false
      resetDevice({ hiddenLoading: true }).then((data) => {
        if (data.retcode == 0) {
          console.log('resetDevice', data)
        }
      })
      this.title = 'other.Resetting'
      this.msgTitle = 'other.resetingMsg'
      this.showRestartLoading = true
    },
    reset() {
      this.showrResetDialogInfo.showDialog = true
    },
    restart() {
      this.showrRestartDialogInfo.showDialog = true
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
</style>
