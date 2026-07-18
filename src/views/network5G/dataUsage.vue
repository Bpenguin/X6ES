<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <no-sim v-if="!(SIMStatus == 1 || SIMStatus == 2)" :sim-status='SIMStatus'></no-sim>
    <div v-else>
      <div class="block-body">
        <div class="page-description">
          <label>{{ $t('network5G.dataUsageScr1') }}</label>
          <br />
          <label>{{ $t('other.dataUsageDes') }}</label>
        </div>
      </div>
      <div class="block-body">
        <el-row class="c-row">
          <el-col :span="10" :xs="18">
            <div>{{ $t('network5G.startDate') }}:</div>
          </el-col>
          <el-col :span="4" :xs="2">
            <div></div>
          </el-col>
          <el-col :span="10" :xs="18">
            <el-select class="time-select" v-model="startTime" popper-class="x6-select">
              <el-option v-for="item in timeAreas" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10" :xs="18">
            <div>{{ $t('network5G.DataLimitation') }}:</div>
          </el-col>
          <el-col :span="4" :xs="4">
            <el-switch v-model="DataLimitationSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-col>
          <el-col :span="9" :xs="18">
            <mine-input :key="'deviceList'" v-model="DataLimitationData" :maxlength="8" @blur="validateInput" :disabled="!DataLimitationSwitch"></mine-input>
            <span class="text-error" v-if="LimitationDataVisible">{{ $t('ruleTip.limitationRule') }}</span>
          </el-col>
          <el-col :span="1">GB</el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10" :xs="18">
            <div>{{ $t('network5G.DataWarning') }}:</div>
          </el-col>
          <el-col :span="4" :xs="4">
            <el-switch v-model="DataWarningSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-col>
          <el-col :span="9" :xs="18">
            <mine-input :key="'deviceList'" v-model="DataWarningData" :maxlength="8" @blur="validateWarnInput" :disabled="!DataWarningSwitch"></mine-input>
            <span class="text-error" v-if="WarningDataVisible">{{ $t('ruleTip.warningRule') }}</span>
          </el-col>
          <el-col :span="1">GB</el-col>
        </el-row>
        <div class="c-row btn-row">
          <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
          <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
        </div>
      </div>
      <div class="block-divide-line"></div>
      <div class="block-body">
        <el-row class="c-row">
          <el-col :span='10' :xs="18">
            <el-row>
              <el-col :span='10' :xs="18">
                <div>{{$t('other.dataUsageQuery')}}:</div>
              </el-col>
              <el-col :span='10' :xs="2">
                <el-tooltip class="item" effect="light" placement="bottom">
                  <div class="pop-view" slot="content">
                    {{$t('other.dataUsageQueryToolTip')}}
                  </div>
                  <div class="right-tip">
                    <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
                  </div>
                </el-tooltip>
              </el-col>
            </el-row>
            <!-- <div>
              <div>{{$t('other.dataUsageQuery')}}:</div>
              <el-tooltip class="item" effect="light" placement="bottom">
                <div class="pop-view" slot="content">
                  {{$t('other.dataUsageQueryToolTip')}}
                </div>
                <div class="right-tip">
                  <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
                </div>
              </el-tooltip>
            </div> -->
          </el-col>
          <el-col :span='14' :xs="24">
            <el-row>
              <el-col :span="10" :xs="18">
                <el-date-picker v-model="searchParmas.startDate" @change="changeDate" format="dd-MM-yyyy" value-format="dd-MM-yyyy" :picker-options='pickerOptions' type="date" :clearable='false'></el-date-picker>
              </el-col>
              <el-col :span="2" :xs="8">
                <div>~</div>
              </el-col>
              <el-col :span="10" :xs="18">
                <el-date-picker v-model="searchParmas.endDate" @change="changeDate" type="date" format="dd-MM-yyyy" value-format="dd-MM-yyyy" :clearable='false' :picker-options='pickerOptions'></el-date-picker>
              </el-col>
            </el-row>
            <!-- <div class="pri-data-usage-inline">
              <div>
                <el-date-picker v-model="searchParmas.startDate" @change="changeDate" format="dd-MM-yyyy" value-format="dd-MM-yyyy" :picker-options='pickerOptions' type="date" :clearable='false'></el-date-picker>
              </div>
              <span>~</span>
              <div>
                <el-date-picker v-model="searchParmas.endDate" @change="changeDate" type="date" format="dd-MM-yyyy" value-format="dd-MM-yyyy" :clearable='false' :picker-options='pickerOptions'></el-date-picker>
              </div>
            </div> -->
            <span v-show="showError" class="text-error">{{$t('other.endError')}}</span>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10" :xs="18">
            <div>{{ $t('network5G.downloadDataUsage') }}:</div>
          </el-col>
          <el-col :span="10" :xs="18">
            {{ CumulativeData.downloadDataUsage }}
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10" :xs="18">
            <div>{{ $t('network5G.uploadDataUsage') }}:</div>
          </el-col>
          <el-col :span="10" :xs="18">
            {{ CumulativeData.uploadDataUsage }}
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10" :xs="18">
            <div>{{ $t('network5G.TotalDataUsage') }}:</div>
          </el-col>
          <el-col :span="10" :xs="18">
            {{ CumulativeData.TotalDataUsage }}
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10" :xs="18">
            <div>{{ $t('other.DataUsageStatistics') }}:</div>
          </el-col>
          <el-col :span="10" :xs="18">
            <el-select v-model="Statistics" popper-class="x6-select">
              <el-option v-for="item in StatisticsModes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div>
          <data-usage-echartVue :data-type='Statistics'></data-usage-echartVue>
        </div>
      </div>
    </div>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" :right-btn-text="showDialogInfo.rightBtnText" @rightBtnClick="setUsageCfgInfo" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>

  </div>
</template>

<script>
import MineDialog from '@/components/MineDialog'
import NoSim from './noSim.vue'
import moment from 'moment'
import {
  getOrgUsageInfoApi,
  getUsageCfgInfoApi,
  setUsageCfgInfoApi,
  getUsageBetweenTwoDate
} from '@/api/network5G'
import { getSysNtpTime } from '@/api/system'

import DataUsageEchartVue from './dataUsageEchart.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'DataUsage',
  components: { NoSim, DataUsageEchartVue, MineDialog },
  data() {
    return {
      LimitationDataVisible: false,
      WarningDataVisible: false,
      simStatusTimer: '', // 实时刷新卡状态
      timeAreas: [],
      startTime: 1,
      DataLimitationSwitch: false,
      DataLimitationData: 0,
      DataWarningSwitch: false,
      DataWarningData: 0,
      currentParams: {}, // 当前设置的月套餐和告警
      showError: false,
      searchParmas: {
        startDate: moment()
          .subtract(2, 'month')
          .startOf('month')
          .format('DD-MM-YYYY'),
        endDate: moment().format('DD-MM-YYYY')
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < moment().subtract(2, 'month').startOf('month')
          )
        }
      },
      CumulativeData: {
        downloadDataUsage: '',
        uploadDataUsage: '',
        TotalDataUsage: ''
      },
      Statistics: 0,
      StatisticsModes: [
        { value: 0, label: 'Every Month' },
        { value: 1, label: 'Everyday' }
      ],
      // 设置月套餐确认提示
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.confirm', // 标题
        msgTitle: 'other.dataUsageApplySrc',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'common.confirm' //右侧按钮的描述
      },

      timeStart: '',
      timeEnd: ''
    }
  },
  computed: {
    SIMStatus() {
      this.initData()
      return this.$store.state.status.simStatus
    },
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {
    console.log('Date.now:', Date.now())
    console.log('moment.now:', moment().valueOf())
    this.initTimeArea()
    this.$store.dispatch('status/setSimInfo')
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData()
    this.initSimStatus() // 循环获取SIM卡状态
  },
  methods: {
    changeDate() {
      let startDatestamp = moment(this.searchParmas.startDate, 'DD-MM-YYYY')
      let endDatestamp = moment(this.searchParmas.endDate, 'DD-MM-YYYY')
      if (startDatestamp.valueOf() <= endDatestamp.valueOf()) {
        this.showError = false
        this.secrchData(startDatestamp, endDatestamp)
      } else {
        this.showError = true
      }
    },
    secrchData(start_date, end_date) {
      let start_year = start_date.format('YYYY')
      let start_month = start_date.format('M')
      let start_day = start_date.format('D')
      let end_year = end_date.format('YYYY')
      let end_month = end_date.format('M')
      let end_day = end_date.format('D')
      getUsageBetweenTwoDate({
        start_year,
        start_month,
        start_day,
        end_year,
        end_month,
        end_day
      }).then((data) => {
        if (data.retcode == 0) {
          this.CumulativeData.downloadDataUsage = this.formatUnit(data.rx_bytes)
          this.CumulativeData.uploadDataUsage = this.formatUnit(data.tx_bytes)
          this.CumulativeData.TotalDataUsage = this.formatUnit(data.total_bytes)
        }
      })
    },

    async initData() {
      // this.getNtpTimeData()
      await getSysNtpTime().then((data) => {
        if (data.retcode == 0) {
          // this.time = data.currentLocalTime
          // // this.time = Moment(this.time, 'YYYY-MM-DD HH:mm:ss').format(
          // //   'MM-DD-YYYY HH:mm:ss'
          // // )
          this.timeEnd = moment(data.currentLocalTime)
          this.timeStart = moment(data.currentLocalTime)
        }
      })
      getUsageCfgInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.startTime = data.statistics_start_date
          if (data.monthly_data_plan == 0) {
            this.DataLimitationSwitch = false
            this.DataLimitationData = 0
          } else {
            this.DataLimitationSwitch = true
            // this.DataLimitationData = data.monthly_data_plan
            this.DataLimitationData = parseFloat(
              ((data.monthly_data_plan - 0) / 1024 / 1024 / 1024).toFixed(6)
            )
          }
          if (data.traffic_threshold == 0) {
            this.DataWarningSwitch = false
            this.DataWarningData = 0
          } else {
            this.DataWarningSwitch = true
            this.DataWarningData = parseFloat(
              ((data.traffic_threshold - 0) / 1024 / 1024 / 1024).toFixed(6)
            )
          }
        }
      })
      console.log('====:', this.time)
      let time = moment()
      console.log('----:', time)
      // let startDate = moment().subtract(2, 'month').startOf('month')
      // let endDate = moment()
      let startDate = this.timeStart.subtract(2, 'month').startOf('month')
      let endDate = this.timeEnd
      console.log('startDate:', startDate)
      console.log('endDate:', endDate)
      this.secrchData(startDate, endDate)
    },
    initTimeArea() {
      this.timeAreas = []
      for (let i = 1; i < 32; i++) {
        this.timeAreas.push({ value: i, label: i })
      }
    },
    apply() {
      let limeDataRule = this.validateInput()
      let WarnDataRule = this.validateWarnInput()
      if (limeDataRule || WarnDataRule) return
      let parma = {
        statistics_start_date: this.startTime
      }
      if (this.DataLimitationSwitch) {
        // parma.monthly_data_plan = this.DataLimitationData
        parma.monthly_data_plan =
          (this.DataLimitationData - 0) * 1024 * 1024 * 1024
      } else {
        parma.monthly_data_plan = 0
      }
      if (this.DataWarningSwitch) {
        parma.traffic_threshold = this.DataWarningData
        parma.traffic_threshold =
          (this.DataWarningData - 0) * 1024 * 1024 * 1024
      } else {
        parma.traffic_threshold = 0
      }
      this.currentParams = parma
      if (parma.monthly_data_plan !== 0) {
        this.showDialogInfo.showDialog = true
        return
      }
      this.setUsageCfgInfo(this.currentParams)
      // setUsageCfgInfoApi(parma).then((data) => {
      //   if (data.retcode == 0) {
      //     sessionStorage.setItem('warningDataKey', 0)
      //     this.$publicFun.showSucMessage(this)
      //   } else {
      //     this.$publicFun.showErrMessage(this)
      //   }
      // })
    },
    setUsageCfgInfo() {
      setUsageCfgInfoApi(this.currentParams).then((data) => {
        if (data.retcode == 0) {
          this.showDialogInfo.showDialog = false
          sessionStorage.setItem('warningDataKey', 0)
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    cancel() {
      this.LimitationDataVisible = false
      this.WarningDataVisible = false
      this.initData()
    },
    initSimStatus() {
      this.simStatusTimer = setInterval(() => {
        this.$store.dispatch('status/setSimInfo')
      }, 3000)
    },
    validateInput(val) {
      if (this.DataLimitationSwitch) {
        const regex = /^\d+(\.\d{1,8})?$/
        if (this.DataLimitationData == '' || this.DataLimitationData - 0 == 0) {
          this.LimitationDataVisible = true
          return true
        } else if (!regex.test(this.DataLimitationData)) {
          this.LimitationDataVisible = true
          return true
        } else {
          this.LimitationDataVisible = false
          return false
        }
      } else {
        this.LimitationDataVisible = false
        return false
      }
    },
    validateWarnInput(val) {
      console.log('this.DataWarningData:', this.DataWarningData)
      // rule规则对象
      if (this.DataWarningSwitch) {
        const regex = /^\d+(\.\d{1,8})?$/
        if (this.DataWarningData == '' || this.DataWarningData - 0 == 0) {
          this.WarningDataVisible = true
          return true
        } else if (!regex.test(this.DataWarningData)) {
          this.WarningDataVisible = true
          return true
        } else {
          this.WarningDataVisible = false
          return false
        }
      } else {
        this.WarningDataVisible = false
        return false
      }
    },
    // 格式化流量数据
    formatUnit(unitData) {
      unitData -= 0
      let unitTotal = 'KB'
      let tempTotal = (unitData / 1024).toFixed(3)
      if (tempTotal / 1024 < 1) {
        unitTotal = 'KB'
      } else if (tempTotal / 1024 / 1024 < 1) {
        unitTotal = 'MB'
        tempTotal = (tempTotal / 1024).toFixed(3)
      } else {
        unitTotal = 'GB'
        tempTotal = (tempTotal / 1024 / 1024).toFixed(3)
      }
      return parseFloat(tempTotal) + unitTotal
    }
  },
  beforeDestroy() {
    clearInterval(this.simStatusTimer)
    this.simStatusTimer = null
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.pri-data-usage-inline {
  display: flex;
  justify-content: space-between;
}
.text-error {
  color: #f56c6c;
}
.item {
  margin-left: 10px;
}
.pop-view {
  width: 200px;
  line-height: 18px;
  padding: 4px;
}

.status-content {
  color: $default-font-color;
  padding: 40px;
  .scri-view {
    font-size: 16px;
    padding-right: 20px;
    color: $gray-font-color;
  }
  .item-view {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 40px 0;
    height: 40px;
    line-height: 40px;
    align-items: center;
    div {
      width: 50%;
    }
  }
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
