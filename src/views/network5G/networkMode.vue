<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <no-sim v-if="!(SIMStatus == 1 || SIMStatus == 2)" :sim-status='SIMStatus'></no-sim>
    <div v-else>
      <div class="block-body">
        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('network5G.NetworkSearchMode') }}:</div>
          </el-col>
          <el-col :span="8" :xs="12">
            <el-radio v-model="networkModelInfo.searchMode" :label="0">{{ $t('network5G.Auto') }}</el-radio>
          </el-col>
          <el-col :span="8" :xs="12">
            <el-radio v-model="networkModelInfo.searchMode" :label="1">{{ $t('network5G.Manual') }}</el-radio>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="8" :xs="16">
            <div>{{ $t('nav.networkMode') }}:</div>
          </el-col>
          <el-col :span="12" :xs="18">
            <el-row>
              <el-col :span="20">
                <el-select v-model="networkModelInfo.networkModel" popper-class="x6-select" :placeholder="''">
                  <el-option v-for="item in networkModes" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-tooltip class="item" effect="light" placement="bottom">
                  <div class="pop-view" slot="content">
                    {{$t('other.mode5GToolTipScr1')}}<br />
                    - {{$t('other.mode5GToolTipScr2')}}<br />
                    - {{$t('other.mode5GToolTipScr3')}}<br />
                    - {{$t('other.mode5GToolTipScr4')}}<br />
                    - {{$t('other.mode5GToolTipScr5')}}<br />
                  </div>
                  <div class="right-tip">
                    <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
                  </div>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="block-body">
        <div class="c-row btn-row">
          <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
          <mine-button :btn-title="$t('network5G.search')" :un-click="networkModelInfo.searchMode == 0?true:false" @clickBtn="searchNetwork"></mine-button>
          <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
        </div>
      </div>
      <div class="block-body" v-show="tableData.length > 0">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="oper_name" :label="$t('network5G.NetworkName')" min-width="30%"></el-table-column>
          <el-table-column prop="net_status" :label="$t('network5G.state')" :formatter="netStatusFormatter" min-width="30%"></el-table-column>
          <el-table-column min-width="20%">
            <template slot-scope="scope">
              <div class="btn-view" v-show="scope.row.net_status == 2">
                <mine-button :btn-title="$t('network5G.Register')" @clickBtn="RegisterNetwork(scope.$index, scope.row)"></mine-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" :right-btn-text="showDialogInfo.rightBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @rightBtnClick="continueApply" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>
    </div>
  </div>
</template>

<script>
import NoSim from './noSim.vue'
import { Message } from 'element-ui'
import {
  getWanNr5gModeInfoApi,
  setWanNr5gModeInfoApi,
  getNetworkModeApi,
  setNetworkModeApi,
  getNetworkSelectmodeInfoApi,
  setNetworkSelectmodeInfoApi,
  getScanNetworkResultsApi,
  scanNetworklistApi,
  setNetworkRatRegisterApi
} from '@/api/network5G'
import { getMobileInfoStatusApi } from '@/api/status'
import MineDialog from '@/components/MineDialog'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'NetworkMode',
  components: { MineDialog, NoSim },
  data() {
    return {
      simStatusTimer: '', // 实时刷新卡状态
      searchTimer: '',
      type: 'apply',
      tableData: [],
      defaultModelInfo: {},
      networkModelInfo: {
        searchMode: 0,
        networkModel: '0-1'
      },
      networdModeltotal: {
        NR5G: 1,
        networkModel: 0
      },
      networkModes: [
        { value: '0-1', label: 'Auto (5G NSA/4G)' },
        { value: '0-0', label: 'Auto (5G SA/NSA/4G)' },
        { value: '2-2', label: '5G SA only' },
        { value: '3', label: '4G only' }
      ],
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'network5G.Disconnect', // 标题
        msgTitle: 'network5G.DisconnectedMsg',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'network5G.continue' //右侧按钮的描述
      }
    }
  },
  computed: {
    SIMStatus() {
      this.initData()
      return this.$store.state.status.simStatus
    }
  },
  created() {
    this.$store.dispatch('status/setSimInfo')
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData()
    this.initSimStatus() // 循环获取SIM卡状态
  },
  methods: {
    initData() {
      this.initNetworkModels()
      this.initSearchMode()
    },

    // 获取network model信息
    async initNetworkModels() {
      await getNetworkModeApi().then((data) => {
        if (data.retcode == 0) {
          this.networdModeltotal.networkModel = data.mode
          getWanNr5gModeInfoApi().then((data) => {
            if (data.retcode == 0) {
              this.networdModeltotal.NR5G = data.mode
              // 拼接网络模式
              if (this.networdModeltotal.networkModel == 3) {
                this.networkModelInfo.networkModel = '3'
              } else if (this.networdModeltotal.networkModel == 2) {
                this.networkModelInfo.networkModel = '2-2'
              } else {
                this.networkModelInfo.networkModel =
                  this.networdModeltotal.networkModel +
                  '-' +
                  this.networdModeltotal.NR5G
              }
            }
          })
        }
      })
    },

    // 获取网络搜索配置信息
    initSearchMode() {
      getNetworkSelectmodeInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.networkModelInfo.searchMode = data.select_mode
        }
      })
    },
    searchNetwork() {
      this.type = 'search'
      this.showDialogInfo.showDialog = true
    },
    continueSearchNetwork() {
      scanNetworklistApi().then((data) => {
        if (data.retcode == 0) {
          getMobileInfoStatusApi({ keepLoading: true }).then()
          this.searchTimer = setInterval(() => {
            getScanNetworkResultsApi().then((data) => {
              if (data.retcode == 0) {
                clearInterval(this.searchTimer)
                this.searchTimer = null
                getMobileInfoStatusApi({ cancelLoading: true }).then()
                if (data.networkList.length > 0) {
                  this.tableData = []
                  let tableList = data.networkList.filter((item) => {
                    return item.net_status != 0
                  })
                  this.tableData = [...tableList]
                  console.log('this.tableData:', this.tableData)
                } else {
                  this.$publicFun.showSucMessage(this, 'other.noNetworkSearch')
                }
              }
            })
          }, 5000)
        }
      })
    },
    continueApply() {
      this.showDialogInfo.showDialog = false
      if (this.type == 'search') {
        this.continueSearchNetwork()
        return
      }
      let networkModelNums = this.networkModelInfo.networkModel.split('-')
      let p1 = setNetworkModeApi({ mode: networkModelNums[0] }).then((data) => {
        return new Promise((resolve, reject) => {
          if (data.retcode == 0) {
            resolve()
          } else {
            reject()
          }
        })
      })
      let p2 = ''
      if (networkModelNums[0] == '3') {
        p2 = new Promise((resolve) => {
          resolve()
        })
      } else {
        p2 = setWanNr5gModeInfoApi({ mode: networkModelNums[1] }).then(
          (data) => {
            return new Promise((resolve, reject) => {
              if (data.retcode == 0) {
                resolve()
              } else {
                reject()
              }
            })
          }
        )
      }
      let p3 = setNetworkSelectmodeInfoApi({
        select_mode: this.networkModelInfo.searchMode
      }).then((data) => {
        return new Promise((resolve, reject) => {
          if (data.retcode == 0) {
            resolve()
          } else {
            reject()
          }
        })
      })
      Promise.all([p1, p2, p3])
        .then((res) => {
          if (this.networkModelInfo.searchMode == 1) {
            this.continueSearchNetwork()
          } else {
            this.$publicFun.showSucMessage(this)
          }
        })
        .catch((error) => {
          this.$publicFun.showErrMessage(this)
        })
    },
    apply() {
      this.showDialogInfo.showDialog = true
    },
    RegisterNetwork(index, row) {
      let parama = { ...row }
      setNetworkRatRegisterApi(parama).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    cancel() {
      this.tableData = []
      this.initData()
    },
    netStatusFormatter(row) {
      if (!row.net_status) return ''
      switch (row.net_status) {
        case 0:
          return 'Unknown'
        case 1:
          return this.$t('other.Forbidden')
        case 2:
          return this.$t('other.Available')
      }
    },
    initSimStatus() {
      this.simStatusTimer = setInterval(() => {
        this.$store.dispatch('status/setSimInfo')
      }, 3000)
    }
  },
  beforeDestroy() {
    clearInterval(this.simStatusTimer)
    this.simStatusTimer = null
    clearInterval(this.searchTimer)
    this.searchTimer = null
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.item {
  margin-left: 20px;
}
.pop-view {
  width: 200px;
  line-height: 18px;
  padding: 4px;
}
</style>
