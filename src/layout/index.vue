<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="classObj" class="mainPageContainer">
    <header-view></header-view>
    <div class="main-panel">
      <!-- <div>这是页面的主要内容</div> -->
      <side-bar class="sider-wrapper"></side-bar>
      <!-- <sub-menu-bar></sub-menu-bar> -->
      <app-main></app-main>
    </div>
    <mine-dialog :show-dialog='showErrNetworkDialogInfo.showDialog' :title="showErrNetworkDialogInfo.title" :msg-title="showErrNetworkDialogInfo.msgTitle"></mine-dialog>
    <mine-dialog :show-dialog='showWarningDialogInfo.showDialog' :title="showWarningDialogInfo.title" :msg-title="showWarningDialogInfo.msgTitle" :left-btn-text="showWarningDialogInfo.leftBtnText" @leftBtnClick="showWarningDialogInfo.showDialog = false"></mine-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MineDialog from '@/components/MineDialog'
import HeaderView from '../components/HeaderLogo'
// import SidebarItem from './components-admin/Sidebar/SidebarItem.vue'
import SideBar from './components/Sidebar/index.vue'
// import SubMenuBar from './components/Sidebar/SubMenuSidebar.vue'
import AppMain from './components/AppMain.vue'
import { getWanConnectStatusApi } from '@/api/status'
import { getUsageInfoApi } from '@/api/network5G'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  components: { HeaderView, SideBar, AppMain, MineDialog },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      showErrNetworkDialogInfo: {
        showDialog: false,
        title: 'system.Disconnected',
        msgTitle: 'common.errNetwork'
      },
      showWarningDialogInfo: {
        showDialog: false,
        title: 'nav.dataUsage',
        msgTitle: 'other.dataUsageWarn',
        leftBtnText: 'common.ok'
      },
      timer: ''
    }
  },
  mounted() {
    this.checkStatus()
  },
  methods: {
    checkStatus() {
      this.timer = setInterval(() => {
        // this.getWANStatusNetwork()
        this.getUsageInfo()
      }, 5000)
    },
    clearInter() {
      clearInterval(this.timer)
      this.timer = null
    },
    getWANStatusNetwork() {
      getWanConnectStatusApi({ hiddenLoading: true }).then((data) => {
        if (data.retcode == 0) {
          if (
            data.cellular_wan_status === 0 &&
            data.ethernet_wan_status === 0
          ) {
            this.showErrNetworkDialogInfo.showDialog = true
          } else {
            this.showErrNetworkDialogInfo.showDialog = false
          }
        } else {
          this.showErrNetworkDialogInfo.showDialog = true
        }
      })
    },
    // 监控流量是否超过警告线
    getUsageInfo() {
      let warningDataTip = sessionStorage.getItem('warningDataKey')
      if (warningDataTip == 1) return
      getUsageInfoApi({ hiddenLoading: true }).then((data) => {
        if (data.retcode == 0) {
          if (data.statistics_month.used_overtake_flag == 1) {
            sessionStorage.setItem('warningDataKey', 1)
            this.showWarningDialogInfo.showDialog = true
          }
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  destroyed() {
    this.timer = null
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
// @import '~@/styles/variables.scss';
@import '@/styles/theme.module.scss';

.mainPageContainer {
  margin: 0 auto;
  width: 100%;
  margin-bottom: unset;
}
.main-panel {
  display: flex;
  width: 100%;
  height: auto;
  min-height: calc(100vh - 211px);
}
.sider-wrapper {
  // all: initial;
  background: transparent;
  width: auto;
  height: auto;
  // position: relative;
  // display: flex;
  // flex-direction: row;
  // background: transparent;
  // width: auto;
  // height: auto;
}

.app-wrapper {
  // @include clearfix;
  position: relative;
  // min-height: calc(100vh - 100px);
  width: auto;
  // background-color: $light-blue;
  display: flex;
  flex-direction: row;
  // margin: 0 40px;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .sidebar-container {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-left: 0;
    margin-top: 0;
    background-color: black;
    // position: absolute;
    // width: $sideBarWidth !important;
    // height: 100%;
    // left: 0;
    // top: 0;
    // bottom: 0;
    // overflow: auto;
    // z-index: 1001;
    // background-color: $nav-bg-color;
  }
}
</style>