<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <div class="container-main-content-body">

    <div class="block-header">{{ $t('system.usbDevice') }}</div>
    <div class="block-body">
      <div class="form-item">
        <el-row>
          <el-col :lg="8" :sm="12">
            <div class="col-item">
              <div class="section-item">
                <div>
                  <img class="left-img" src="../../assets/img/blue-flash.png" alt="">
                </div>
                <div>
                  <div class="color-scr">{{$t('system.blue')+$t('system.flash')}}</div>
                  <div>{{$t('system.duringPowerOn')}}</div>
                </div>
              </div>
              <div class="section-item">
                <div>
                  <img class="left-img" src="../../assets/img/orange-flash.png" alt="">
                </div>
                <div>
                  <div class="color-scr">{{$t('system.orange')+$t('system.flash')}}</div>
                  <div>{{$t('system.duringImage')}}</div>
                </div>
              </div>
              <div class="section-item">
                <div>
                  <img class="left-img" src="../../assets/img/white-flash.png" alt="">
                </div>
                <div>
                  <div class="color-scr">{{$t('system.white')+$t('system.flash')}}</div>
                  <div>{{$t('system.duringfactory')}}</div>
                </div>
              </div>
              <div class="section-item">
                <div>
                  <img class="left-img" src="../../assets/img/green-flash.png" alt="">
                </div>
                <div>
                  <div class="color-scr">{{$t('system.green')+$t('system.flash')}}</div>
                  <div>{{$t('system.wpsActive')}}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="16" :sm="12">
            <div class="right-col">
              <div class="right-col-item">
                <div class="section-item">
                  <div>
                    <img class="left-img" src="../../assets/img/blue-breath.png" alt="">
                  </div>
                  <div>
                    <div class="color-scr">{{$t('system.blue')+$t('system.breath')}}</div>
                    <div>{{$t('nav.wanStatus')+':'+$t('system.good')}}</div>
                  </div>
                </div>
                <div class="section-item">
                  <div>
                    <img class="left-img" src="../../assets/img/green-breath.png" alt="">
                  </div>
                  <div>
                    <div class="color-scr">{{$t('system.orange')+$t('system.breath')}}</div>
                    <div>{{$t('nav.wanStatus')+':'+$t('system.Normal')}}</div>
                  </div>
                </div>
                <div class="section-item">
                  <div>
                    <img class="left-img" src="../../assets/img/orange-breath.png" alt="">
                  </div>
                  <div>
                    <div class="color-scr">{{$t('system.orange')+$t('system.breath')}}</div>
                    <div>{{$t('nav.wanStatus')+':'+$t('system.Poor')}}</div>
                  </div>
                </div>
              </div>

              <div class="right-col-item">
                <div class="section-item">
                  <div>
                    <img class="left-img" src="../../assets/img/red-solid.png" alt="">
                  </div>
                  <div>
                    <div class="color-scr">{{$t('system.solid')+$t('system.red')}}</div>
                    <div>{{$t('nav.wanStatus')+':'+$t('system.Disconnected')}}</div>
                  </div>
                </div>
                <div class="section-item">
                  <div>
                    <img class="left-img" src="../../assets/img/blue-solid.png" alt="">
                  </div>
                  <div>
                    <div class="color-scr">{{$t('system.solid')+$t('system.blue')}}</div>
                    <div>{{$t('system.deviceBoot')}}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="block-divide-line"></div>
    <!-- <div class="block-header">{{ $t('system.congestion')}}</div>
    <div class="block-body">
      <div class="page-description block-marb">{{ $t ('system.ledscr1') }}</div>
      <el-form ref="congestionInfo" :model="congestionInfo" :rules="congestionInfoRule" key="congestionInfo" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item class="form-item" :label="$t('system.congestionDetection')+':'" prop="congestionDetection">
          <el-switch v-model="congestionInfo.congestionDetection" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-form-item>
        <el-form-item class="form-item" :label="$t('system.hostDetection')+':'" prop="hostDetection">
          <div class="dfs-view">
            <el-tooltip class="item" effect="light" placement="bottom">
              <div class="pop-view" slot="content">{{$t('system.detectionScr')}}</div>
              <div class="right-tip">
                <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
              </div>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item class="form-item sub-form" :label="$t('system.host')+' 1 '+$t('system.ip')" prop="hostIp1">
          <mine-input :key="'hostIp1'" v-model="congestionInfo.hostIp1" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item class="form-item sub-form" :label="$t('system.host')+' 2 '+$t('system.ip')" prop="hostIp2">
          <mine-input :key="'hostIp2'" v-model="congestionInfo.hostIp2" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item class="form-item sub-form" :label="$t('system.host')+' 3 '+$t('system.ip')" prop="hostIp3">
          <mine-input :key="'hostIp3'" v-model="congestionInfo.hostIp3" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item class="form-item sub-form" :label="$t('system.host')+' 4 '+$t('system.ip')" prop="hostIp4">
          <mine-input :key="'hostIp4'" v-model="congestionInfo.hostIp4" :placeholder="''"></mine-input>
        </el-form-item>
        <el-form-item class="form-item sub-form" :label="$t('system.host')+' 5 '+$t('system.ip')" prop="hostIp5">
          <mine-input :key="'hostIp5'" v-model="congestionInfo.hostIp5" :placeholder="''"></mine-input>
        </el-form-item>
      </el-form>

    </div> -->
    <div class="block-divide-line"></div>
    <div class="block-header">{{ $t('system.ledNight')}}</div>
    <div class="block-body">
      <div class="page-description block-marb">{{ $t('system.ledNightScr') }}</div>
      <el-form ref="nightModeInfo" :model="nightModeInfo" :rules="nightModeInfoRule" key="nightModeInfo" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item class="form-item" :label="$t('system.nightMode')+':'" prop="nightMode">
          <el-switch v-model="nightModeInfo.nightMode" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-form-item>
        <el-form-item class="form-item" :label="$t('system.nightModeFrom')+':'" prop="nightFrom">
          <div class="right-view">
            <el-row>
              <el-col :span="10">
                <el-select v-model="nightModeInfo.nightFrom" popper-class="x6-select">
                  <el-option v-for="item in timeModes" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <div class="moddel-view">~</div>
              </el-col>
              <el-col :span="10">
                <el-select v-model="nightModeInfo.nightFromEnd" popper-class="x6-select">
                  <el-option v-for="item in timeModes" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item class="form-item" :label="$t('system.Repeat')" prop="Repeat">
          <el-checkbox-group v-model="nightModeInfo.Repeat">
            <el-checkbox :true-label="1" :label="$t('system.Mon')"></el-checkbox>
            <el-checkbox :true-label="2" :label="$t('system.Tue')"></el-checkbox>
            <el-checkbox :true-label="3" :label="$t('system.Wed')"></el-checkbox>
            <el-checkbox :true-label="4" :label="$t('system.Thu')"></el-checkbox>
            <el-checkbox :true-label="5" :label="$t('system.Fri')"></el-checkbox>
            <el-checkbox :true-label="6" :label="$t('system.Sat')"></el-checkbox>
            <el-checkbox :true-label="7" :label="$t('system.Sun')"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelSetting"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm"></mine-button>
      </div>
    </div>
  </div>
</template>

<script>
import formVaRule from '@/formValidator/index'
import { getLedSleepTimePlanExe, setLedSleepTimePlanExe } from '@/api/system'
export default {
  name: 'Ipv6Index',
  components: {},
  data() {
    return {
      usbInfo: {
        type: '--',
        totalSize: '--',
        spaceFree: '--'
      },
      connectMode: 0,
      congestionInfo: {
        congestionDetection: false,
        hostIp1: '',
        hostIp2: '',
        hostIp3: '',
        hostIp4: '',
        hostIp5: ''
      },
      congestionInfoRule: {
        serveName: [{ required: true, trigger: 'blur' }],
        userName: [{ required: true, trigger: 'blur' }],
        hostIp1: [{ required: true, trigger: 'blur' }],
        hostIp2: [{ required: true, trigger: 'blur' }],
        hostIp3: [{ required: true, trigger: 'blur' }],
        hostIp4: [{ required: true, trigger: 'blur' }],
        hostIp5: [{ required: true, trigger: 'blur' }]
      },
      nightModeInfo: {
        nightMode: false,
        nightFrom: '00:00',
        nightFromEnd: '23:59',
        Repeat: []
      },
      nightModeInfoRule: {
        nightFrom: [{ required: true, trigger: 'blur' }],
        Repeat: [{ required: true, trigger: 'blur' }]
      },
      timeModes: []
    }
  },
  created() {},
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  mounted() {
    this.initTimeModes()
    this.initData()
  },
  methods: {
    initData() {
      getLedSleepTimePlanExe().then((data) => {
        if (data.retcode == 0) {
          this.nightModeInfo.nightMode = data.status == 1 ? true : false
          this.nightModeInfo.nightFrom = this.formTime(data.wakeup_time)
          this.nightModeInfo.nightFromEnd = this.formTime(
            data.sleep_time,
            false
          )
        }
      })
    },

    // 格式化时间
    formTime(timeStr, startType = true) {
      if (!timeStr || timeStr.length != 4) return startType ? '00:00' : '23:59'
      return timeStr.substr(0, 2) + ':' + timeStr.substr(2, 2)
    },
    // 修改数据
    applyForm() {
      let params = {}
      params.status = this.nightModeInfo.nightMode == true ? 1 : 0
      let reg = new RegExp(':', 'g')
      params.wakeup_time = this.nightModeInfo.nightFrom.replace(reg, '')
      params.sleep_time = this.nightModeInfo.nightFromEnd.replace(reg, '')
      setLedSleepTimePlanExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    cancelSetting() {},
    changeSelectMode() {},
    initTimeModes() {
      let i = 0
      this.timeModes = []
      while (i < 24) {
        let hourTemp = i
        if (i < 10) {
          hourTemp = `0${i}`
        }
        let hourTemp1 = `${hourTemp}:00`
        let hourTemp2 = `${hourTemp}:30`
        this.timeModes.push({ value: hourTemp1, label: hourTemp1 })
        this.timeModes.push({ value: hourTemp2, label: hourTemp2 })
        i++
      }
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1600px) {
  .right-col-item {
    flex: 1;
  }
}
.block-marb {
  margin-bottom: 30px;
}

.section-item {
  display: flex;
  margin-bottom: 20px;
  .left-img {
    width: 40px;
    margin-right: 6px;
  }
}
.right-col {
  display: flex;
}
.right-col-item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
}

.color-scr {
  color: $gray-font-color;
}
.radio-item {
  margin-bottom: 20px;
}
.scri-view {
  font-size: 16px;
  padding-left: 26px;
  color: $gray-font-color;
  line-height: 16px;
}
.moddel-view {
  text-align: center;
  font-size: 24px;
}
.dfs-view {
  position: relative;
  .right-tip {
    position: absolute;
    right: 0;
    top: 0;
    // color: $default-font-color;
    width: 24px;
    height: 24px;
  }
}

.line-view {
  width: 100%;
  height: 1px;
  background: $main-style-color;
  margin: 30px 0 20px 0;
}
// /deep/ .el-form-item {
//   padding: 20px 30px 0 30px;
// }

/deep/ .sub-form {
  .el-form-item__label {
    padding-left: 30px;
  }
}

// checkBox的样式
/deep/ .el-checkbox {
  color: $login-font-color;
  min-width: 62px;
  margin-right: 20px !important;
}
/deep/ .el-checkbox:last-of-type {
  margin-right: 30px;
}

// check样式
.el-checkbox__inner {
  width: 30px !important;
  height: 30px !important;
}
.el-checkbox__inner::after {
  height: 20px;
  width: 8px;
  left: 11px;
}
.el-checkbox__label {
  font-size: 20px;
}
</style>
