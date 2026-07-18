<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <no-sim v-if="!(SIMStatus == 1 || SIMStatus == 2)" :sim-status='SIMStatus'></no-sim>
    <div v-else class="block-body">
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.SIMStatus') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ $t('network5G.SIMNormal') }}</div>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="12" :xs="12">
          <div>{{ $t('network5G.ConnectionStatus') }}:</div>
        </el-col>
        <el-col :span="6" :xs="12">
          <div v-if="showConnectBtn">{{ $t(ConnectionStatusFillter) }}</div>
          <div v-else>{{$t('other.disable')}}</div>
        </el-col>
        <el-col :span="6" :xs="16">
          <div v-show="showConnectBtn">
            <mine-button v-if="ConnectionStatus == 2 || ConnectionStatus==1" :un-click="ConnectionStatus==1 || cancelClick?true:false" :btn-title="$t('network5G.Disconnect')" @clickBtn="applyForm"></mine-button>
            <mine-button v-else :btn-title="$t('common.connect')" :un-click="ConnectionStatus==3 || cancelClick?true:false" @clickBtn="applyForm"></mine-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('other.myNumber') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ myNumber | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.NetworkName') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ NetworkName | empStr}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.NetworkType') }}:</div>
        </el-col>
        <el-col :span="12">
          <div v-if="NetworkType==''">{{ $t('other.NoService') }}</div>
          <div v-else>{{ NetworkType}}</div>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.RSRP') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ RSRP | empStr}}</div>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.RSSI') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ RSSI | empStr}}</div>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.Band') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ Band | empStr}}</div>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.CellID') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ CellID | empStr}}</div>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.ConfigurationName') }}:</div>
        </el-col>
        <el-col :span="12">
          <el-select v-model="currentIndex" :disabled='ConnectionStatus == 2 || ConnectionStatus==1?true:false || !showConnectBtn' @change="changeProfile" popper-class="x6-select" :placeholder="''">
            <el-option v-for="item in nameList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <!-- <div>{{ ConfigurationName | empStr}}</div> -->
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.IPv4Address') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ IPv4Address | empStr}}</div>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="12">
          <div>{{ $t('network5G.IPv6Address') }}:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ IPv6Address | empStr}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import NoSim from './noSim.vue'
import {
  getNetworkCellInfoApi,
  getProfileInfoApi,
  setProfileApi,
  deactiveDataCallApi,
  connectDataApi,
  getSimInfoApi,
  getWanNetworkConnectionApi
} from '@/api/network5G'
import { getDeviceInfoStatusApi } from '@/api/status'
import { mobileStatusFilter } from '@/utils/until'
import {
  getMobileInfoStatusApi,
  getNetworkStatusBarInfoApi
} from '@/api/status'
import { getDualWanConfigurationApi } from '@/api/wan'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'NetworkStatus',
  components: { NoSim },
  computed: {
    SIMStatus() {
      this.initData(true)
      return this.$store.state.status.simStatus
    },
    ConnectionStatusFillter() {
      return mobileStatusFilter(this.ConnectionStatus)
    }
  },
  data() {
    return {
      simStatusTimer: '', // 实时刷新卡状态
      timer: '',
      time: 0,
      showConnectBtn: true,
      ConnectionStatus: '',
      NetworkName: '',
      NetworkType: '',
      myNumber: '',
      RSRP: '',
      RSSI: '',
      Band: ':',
      CellID: '',
      ConfigurationName: '',
      currentIndex: '',
      defaultIndex: 0,
      currentData: {},
      nameList: [],
      dataList: [],
      IPv4Address: '',
      IPv6Address: '',
      cancelClick: true
    }
  },
  created() {
    this.$store.dispatch('status/setSimInfo')
  },
  mounted() {
    this.initData()
    this.initSimStatus() // 循环获取SIM卡状态
  },
  methods: {
    async initData(type) {
      this.getProfieInfo()
      this.getDeviceInfo()
      this.getMobileInfo()
      getDualWanConfigurationApi().then((data) => {
        if (data.retcode == 0) {
          if (data.DualWanStatus == 0 && data.PrimaryWanType == 1) {
            this.showConnectBtn = false
          }
        }
      })
      // 获取运营处名称
      getSimInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.NetworkName = data.carrier_name
        }
      })
      getNetworkCellInfoApi().then((data) => {
        if (data.retcode == 0) {
          if (data.cellList.length > 0) {
            this.Band = data.bandlist
            data.cellList.forEach((item) => {
              console.log('item', item)
              if (item.type == 1) {
                this.RSRP = item.rsrp
                this.RSSI = item.rssi
                // this.Band = item.band
                this.CellID = item.cell_id
              }
            })
          }
        }
      })
      getWanNetworkConnectionApi().then((data) => {
        if (data.retcode == 0) {
          this.cancelClick = data.connection_mode == 1 ? false : true
        }
      })
      if (type) {
        setTimeout(() => {
          this.initData()
        }, 5000)
      }
    },
    // 获取APN信息
    getProfieInfo() {
      getProfileInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.currentIndex = data.curid != 0 ? data.curid : ''
          this.defaultIndex = data.curid
          if (data.profileList.length > 0) {
            this.dataList = [...data.profileList]
            this.initNameLists()
            this.getCurrentData(this.currentIndex)
          }
        }
      })
    },
    getMobileInfo() {
      getMobileInfoStatusApi().then((data) => {
        if (data.retcode == 0) {
          this.ConnectionStatus = data.mobile_status
          // this.ConnectionStatusFillter = mobileStatusFilter(data.mobile_status)
          // this.NetworkType = data.net_type
          this.IPv4Address = data.mobile_ip_address
          this.IPv6Address = data.mobile_ip6_address
        }
      })
      // 5G的信号强度和网络模式
      getNetworkStatusBarInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.NetworkType = data.net_type
          // this.NetworkType = data.net_type == '' ? 'No Service' : data.net_type // 待API添加该字段
        }
      })
    },
    getMobileInfoOnline() {
      this.timer = setInterval(() => {
        // 5G的信号强度和网络模式
        this.time++
        getMobileInfoStatusApi({ keepLoading: true }).then((data) => {
          if (data.retcode == 0) {
            this.ConnectionStatus = data.mobile_status
            // this.NetworkType = data.net_type
            this.IPv4Address = data.mobile_ip_address
            this.IPv6Address = data.mobile_ip6_address
            this.cancelTimer()
          } else {
            if (this.time > 5 && this.timer) {
              this.ConnectionStatus = 0
              this.cancelTimer()
            }
          }
        })
      }, 2000)
    },
    getDeviceInfo() {
      getDeviceInfoStatusApi().then((data) => {
        if (data.retcode == 0) {
          this.myNumber = data.device_mdn
        } else {
          this.myNumber = ''
        }
      })
    },
    applyForm() {
      if (this.ConnectionStatus == 2) {
        this.ConnectionStatus = 3
        deactiveDataCallApi().then((data) => {
          if (data.retcode == 0) {
            this.getMobileInfoOnline()
          }
        })
      } else {
        this.setDefault()
        // this.ConnectionStatus = 1
        // connectDataApi().then((data) => {
        //   this.setDefault()
        //   if (data.retcode == 0) {
        //     this.getMobileInfoOnline()
        //   }
        // })
      }
    },
    setDefault() {
      let parama = {
        iptype: this.currentData.iptype,
        profilename: this.currentData.profilename,
        apn: this.currentData.apn,
        authmode: this.currentData.authmode,
        username: this.currentData.username,
        password: this.currentData.password,
        index: this.currentData.index,
        apnmode: 1,
        preferred: 1 // 设为默认
      }
      if (this.currentData.readonly == 1) {
        parama.apnmode = 0
      }
      setProfileApi(parama).then((data) => {
        if (data.retcode == 0) {
          this.getProfieInfo()
          this.ConnectionStatus = 1
          connectDataApi().then((data) => {
            if (data.retcode == 0) {
              this.getMobileInfoOnline()
            }
          })
        }
      })
    },
    changeProfile(val) {
      console.log('2222222', val)
      this.getCurrentData(val)
    },
    initNameLists() {
      if (!this.dataList || this.dataList.length < 1) return
      let defStr = '(' + this.$t('common.default') + ')'
      this.nameList = this.dataList.map((item) => {
        let labelName = item.profilename
        if (this.defaultIndex == item.index) {
          labelName += defStr
        }
        return { value: item.index, label: labelName }
      })
      console.log('this.nameList', this.nameList)
    },
    getCurrentData(index) {
      let hasDefaultIndex = false
      this.dataList.map((item) => {
        if (item.index == index) {
          this.currentData = item
          hasDefaultIndex = true
        }
      })
      if (!hasDefaultIndex) {
        this.currentData = this.dataList[0]
        this.currentIndex = this.dataList[0].index
      }
    },
    cancelTimer() {
      getMobileInfoStatusApi({ cancelLoading: true }).then((data) => {})
      clearInterval(this.timer)
      this.timer = null
      this.time = 0
    },
    initSimStatus() {
      this.simStatusTimer = setInterval(() => {
        this.$store.dispatch('status/setSimInfo')
      }, 3000)
    }
  },
  beforeDestroy() {
    this.cancelTimer()
    clearInterval(this.simStatusTimer)
    this.simStatusTimer = null
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
</style>
