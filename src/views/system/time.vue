<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('system.timeScr') }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>{{ $t('system.automaticallySetTime') + ': '}}</div>
        </el-col>
        <el-col :span="12" :xs="10">
          <el-switch v-model="setTimeSwitch" @change="changeTimeSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>{{ $t('system.automaticallySaveTime') + ': '}}</div>
        </el-col>
        <el-col :span="12" :xs="10">
          <el-switch v-model="saveTimeSwitch" :disabled="setTimeSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>{{ $t('system.tmieZone')+ ': ' }}</div>
        </el-col>
        <el-col :span="12" :xs="18">
          <el-select v-model="zoneIndex" :disabled="setTimeSwitch" popper-class="x6-select" :placeholder="''">
            <el-option v-for="item in timeZoneModels" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>{{ $t('system.currentDateTime') + ': '}}</div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div>{{ time }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelForm"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm"></mine-button>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import { Message } from 'element-ui'
import { setSysNtpTime, getSysNtpTime } from '@/api/system'
import { timeZoneList } from '@/utils/selectsList'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Time',
  data() {
    return {
      ntpData: {},
      setTimeSwitch: true,
      saveTimeSwitch: true,
      zoneIndex: 0,
      timeZoneModels: [],
      time: '',
      timer: '',
      NTPServer1: '',
      NTPServer2: '',
      NTPServer3: ''
    }
  },
  created() {
    this.timeZoneModels = timeZoneList
    // for (let i = 0; i < 94; i++) {
    //   this.timeZoneModels.push({ value: i, label: 'time' + i })
    // }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getSysNtpTime().then((data) => {
        if (data.retcode == 0) {
          this.zoneIndex = data.zoneIndex
          this.setTimeSwitch = data.timezoneSyncSwitch == 1 ? true : false
          this.saveTimeSwitch = data.dstSyncSwitch == 1 ? true : false
          this.time = data.currentLocalTime
          // this.time = '2024-04-29 01:59:50'
          this.time = Moment(
            data.currentLocalTime,
            'YYYY-MM-DD HH:mm:ss'
          ).format('MM-DD-YYYY HH:mm:ss')
          clearInterval(this.timer)
          this.timer = null
          this.timer = setInterval(() => {
            this.time = Moment(this.time, 'MM-DD-YYYY HH:mm:ss')
              .add(1, 's')
              .format('MM-DD-YYYY HH:mm:ss')
          }, 1000)
        }
      })
    },

    // 恢复修改
    cancelForm() {
      this.initData()
    },
    changeTimeSwitch(val) {
      if (val) {
        this.applyForm()
      }
    },
    // 修改时间
    applyForm() {
      let params = {}
      params.timezoneSyncSwitch = this.setTimeSwitch ? 1 : 0
      params.dstSyncSwitch = this.saveTimeSwitch ? 1 : 0
      if (!this.setTimeSwitch) {
        params.zoneIndex = this.zoneIndex
      }
      setSysNtpTime(params).then((data) => {
        if (data.retcode == 0) {
          this.initData()
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    // 手动设置时间时，计算时间
    formatDate() {
      return ''
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
</style>
