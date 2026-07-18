<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wifi.wpsScri') }}</div>
    </div>
    <div class="block-header">2.4GHz</div>
    <div class="block-body" v-if="wpsInfo_4G.SupportShow">
      <!-- WPS开关 -->
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{$t('nav.wifiWps')}}:</div>
        </el-col>
        <el-col :span="14">
          <el-switch v-model="wpsInfo_4G.wpsSwicth" @change="changeWPSSwitch('4G')" :disabled="wpsInfo_4G.unsupportWpsSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <div v-show='wpsInfo_4G.wpsSwicth'>
        <!-- ping输入 -->
        <el-row class="c-row">
          <el-col :span="10">
            <div>{{$t('wifi.method')}} 1:</div>
          </el-col>
          <el-col :span="14">
            <div>{{$t('wifi.methonScri')}}</div>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10"></el-col>
          <el-col :span="14">
            <div class="radio-view">
              <el-radio v-model="wpsInfo_4G.methodRadio" :label="2">{{ $t('wifi.clientPin') }}</el-radio>
              <el-radio v-model="wpsInfo_4G.methodRadio" :label="3">{{ $t('wifi.routerPin') }}</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row class="c-row" v-show="wpsInfo_4G.methodRadio == 2 || wpsInfo_4G.methodRadio == 1">
          <el-col :span="10"></el-col>
          <el-col :span="14">
            <div>
              <div>{{ $t('wifi.clinetPinScr') }}</div>
              <mine-input v-model="wpsInfo_4G.methodClientPin" class="pin-input" :placeholder="''"></mine-input>
              <mine-button :btn-title="$t('common.connect')" @clickBtn="(val)=>{connectClientPin('4G')}"></mine-button>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="wpsInfo_4G.methodRadio == 3">
          <el-col :span="10">
            <div>{{$t('wifi.routerPin')}}:</div>
          </el-col>
          <el-col :span="14">
            <div class="method-view">
              <el-switch v-model="wpsInfo_4G.routerPinSwitch" @change="(val)=>{connectRouterPin('4G')}" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
              <div>
                <div>{{ $t('wifi.routerPinScr') }}<br />
                  {{ $t('wifi.routerPin') }}:{{ wpsInfo_4G.methodRouterPin }}
                </div>
                <div class="pin-btn">
                  <mine-button :btn-title="$t('wifi.getNewPIN')" @clickBtn="(val)=>getNewPin('4G')"></mine-button>
                  <mine-button class="right-btn" :btn-title="$t('common.default')" @clickBtn="(val)=>{setDefaultPin('4G')}"></mine-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div>{{$t('wifi.method')}} 2:</div>
          </el-col>
          <el-col :span="14">
            <div class="method-view">
              <div>{{ $t('wifi.method2Scr') }}</div>
              <div>{{ $t('wifi.method2Scr1') }}</div>
              <div>
                <mine-button :btn-title="$t('wifi.startWps')" @clickBtn="()=>{startWps('4G')}"></mine-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else class="c-row">
      <div>{{$t('common.disabled')}}</div>
    </div>
    <div class="block-divide-line"></div>
    <div class="block-header">5GHz</div>
    <div class="block-body" v-if="wpsInfo_5G.SupportShow">
      <!-- WPS开关 -->
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{$t('nav.wifiWps')}}:</div>
        </el-col>
        <el-col :span="14">
          <el-switch v-model="wpsInfo_5G.wpsSwicth" @change="changeWPSSwitch('5G')" :disabled="wpsInfo_5G.unsupportWpsSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <div v-show='wpsInfo_5G.wpsSwicth'>
        <!-- ping输入 -->
        <el-row class="c-row">
          <el-col :span="10">
            <div>{{$t('wifi.method')}} 1:</div>
          </el-col>
          <el-col :span="14">
            <div>{{$t('wifi.methonScri')}}</div>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10"></el-col>
          <el-col :span="14">
            <div class="radio-view">
              <el-radio v-model="wpsInfo_5G.methodRadio" :label="2">{{ $t('wifi.clientPin') }}</el-radio>
              <el-radio v-model="wpsInfo_5G.methodRadio" :label="3">{{ $t('wifi.routerPin') }}</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row class="c-row" v-show="wpsInfo_5G.methodRadio == 2 || wpsInfo_5G.methodRadio == 1">
          <el-col :span="10"></el-col>
          <el-col :span="14">
            <div>
              <div>{{ $t('wifi.clinetPinScr') }}</div>
              <mine-input v-model="wpsInfo_5G.methodClientPin" class="pin-input" :placeholder="''"></mine-input>
              <mine-button :btn-title="$t('common.connect')" @clickBtn="(val)=>{connectClientPin('5G')}"></mine-button>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="wpsInfo_5G.methodRadio == 3">
          <el-col :span="10">
            <div>{{$t('wifi.routerPin')}}:</div>
          </el-col>
          <el-col :span="14">
            <div class="method-view">
              <el-switch v-model="wpsInfo_5G.routerPinSwitch" @change="(val)=>{connectRouterPin('5G')}" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
              <div>
                <div>{{ $t('wifi.routerPinScr') }}<br />
                  {{ $t('wifi.routerPin') }}:{{ wpsInfo_5G.methodRouterPin }}
                </div>
                <div class="pin-btn">
                  <mine-button :btn-title="$t('wifi.getNewPIN')" @clickBtn="(val)=>getNewPin('5G')"></mine-button>
                  <mine-button class="right-btn" :btn-title="$t('common.default')" @clickBtn="(val)=>{setDefaultPin('5G')}"></mine-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div>{{$t('wifi.method')}} 2:</div>
          </el-col>
          <el-col :span="14">
            <div class="method-view">
              <div>{{ $t('wifi.method2Scr') }}</div>
              <div>{{ $t('wifi.method2Scr1') }}</div>
              <div>
                <mine-button :btn-title="$t('wifi.startWps')" @clickBtn="()=>{startWps('5G')}"></mine-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else class="c-row">
      <div>{{$t('common.disabled')}}</div>
    </div>

    <div class="block-divide-line"></div>
    <div class="block-header">6GHz</div>
    <div class="block-body" v-if="wpsInfo_6G.SupportShow">
      <!-- WPS开关 -->
      <el-row class="c-row">
        <el-col :span="10">
          <div>{{$t('nav.wifiWps')}}:</div>
        </el-col>
        <el-col :span="14">
          <el-switch v-model="wpsInfo_6G.wpsSwicth" @change="changeWPSSwitch('6G')" :disabled="wpsInfo_6G.unsupportWpsSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row>
      <div v-show='wpsInfo_6G.wpsSwicth'>
        <!-- ping输入 -->
        <el-row class="c-row">
          <el-col :span="10">
            <div>{{$t('wifi.method')}} 1:</div>
          </el-col>
          <el-col :span="14">
            <div>{{$t('wifi.methonScri')}}</div>
          </el-col>
        </el-row>
        <el-row class="c-row">
          <el-col :span="10"></el-col>
          <el-col :span="14">
            <div class="radio-view">
              <el-radio v-model="wpsInfo_6G.methodRadio" :label="2">{{ $t('wifi.clientPin') }}</el-radio>
              <el-radio v-model="wpsInfo_6G.methodRadio" :label="3">{{ $t('wifi.routerPin') }}</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row class="c-row" v-show="wpsInfo_6G.methodRadio == 2 || wpsInfo_6G.methodRadio == 1">
          <el-col :span="10"></el-col>
          <el-col :span="14">
            <div>
              <div>{{ $t('wifi.clinetPinScr') }}</div>
              <mine-input v-model="wpsInfo_6G.methodClientPin" class="pin-input" :placeholder="''"></mine-input>
              <mine-button :btn-title="$t('common.connect')" @clickBtn="(val)=>{connectClientPin('6G')}"></mine-button>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="wpsInfo_6G.methodRadio == 3">
          <el-col :span="10">
            <div>{{$t('wifi.routerPin')}}:</div>
          </el-col>
          <el-col :span="14">
            <div class="method-view">
              <el-switch v-model="wpsInfo_6G.routerPinSwitch" @change="(val)=>{connectRouterPin('6G')}" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
              <div>
                <div>{{ $t('wifi.routerPinScr') }}<br />
                  {{ $t('wifi.routerPin') }}:{{ wpsInfo_6G.methodRouterPin }}
                </div>
                <div class="pin-btn">
                  <mine-button :btn-title="$t('wifi.getNewPIN')" @clickBtn="(val)=>getNewPin('6G')"></mine-button>
                  <mine-button class="right-btn" :btn-title="$t('common.default')" @clickBtn="(val)=>{setDefaultPin('6G')}"></mine-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div>{{$t('wifi.method')}} 2:</div>
          </el-col>
          <el-col :span="14">
            <div class="method-view">
              <div>{{ $t('wifi.method2Scr') }}</div>
              <div>{{ $t('wifi.method2Scr1') }}</div>
              <div>
                <mine-button :btn-title="$t('wifi.startWps')" @clickBtn="()=>{startWps('6G')}"></mine-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else class="c-row">
      <div>{{$t('common.disabled')}}</div>
    </div>
    <div class="block-body">
      <div class="page-note">{{ $t('common.note') }}:<br />{{ $t('wifi.wpsBottomScr2',{ProductName:GLOBAL.PRODUCT_NAME})  }}<br />{{ $t('wifi.wpsBottomScr3')  }}</div>
    </div>
    <mine-dialog :show-dialog='showWpsSwitchDialogInfo.showDialog' :show-close-btn="showWpsSwitchDialogInfo.showCloseBtn" :title="showWpsSwitchDialogInfo.title" :msg-title="showWpsSwitchDialogInfo.msgTitle" :left-btn-text="showWpsSwitchDialogInfo.leftBtnText" :right-btn-text="showWpsSwitchDialogInfo.rightBtnText" @leftBtnClick="cancelChangeWpsSwitch" @rightBtnClick="showWpsSwitchDialogInfo.showDialog = false" @closeDialog="cancelChangeWpsSwitch"></mine-dialog>
    <mine-dialog :show-dialog='showSwitchDialogInfo.showDialog' :show-close-btn="showSwitchDialogInfo.showCloseBtn" :title="showSwitchDialogInfo.title" :msg-title="showSwitchDialogInfo.msgTitle" :left-btn-text="showSwitchDialogInfo.leftBtnText" @leftBtnClick="showSwitchDialogInfo.showDialog = false" @closeDialog="showSwitchDialogInfo.showDialog = false">
    </mine-dialog>
    <mine-dialog :show-dialog='showWpsResultDialogInfo.showDialog' :show-close-btn="showWpsResultDialogInfo.showCloseBtn" :title="showWpsResultDialogInfo.title" :msg-title="showWpsResultDialogInfo.msgTitle" :left-btn-text="showWpsResultDialogInfo.leftBtnText" @leftBtnClick="showWpsResultDialogInfo" @closeDialog="showWpsResultDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showWpsCancelDialogInfo.showDialog' :show-close-btn="showWpsCancelDialogInfo.showCloseBtn" :title="showWpsCancelDialogInfo.title" :msg-title="showWpsCancelDialogInfo.msgTitle" :left-btn-text="showWpsCancelDialogInfo.leftBtnText" @leftBtnClick="cancelChangeWpsSwitch" @closeDialog="cancelChangeWpsSwitch">
      <template>
        <div>
          {{ $t('system.Countingdown') }}:{{ time }}
        </div>
      </template>
    </mine-dialog>

  </div>
</template>
<script>
import MineDialog from '@/components/MineDialog'
import {
  getWpsStateApi,
  setWpsConnectApi,
  getWpsApDefaultPinCodeApi,
  getWpsApRandomPinCodeApi,
  cancelWpsConnectCancelApi,
  getWpsConnectStateApi,
  setWpsSwitchStateExe
} from '@/api/wifi'
import { Message } from 'element-ui'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AdvanceSettings',
  components: { MineDialog },
  props: {},
  computed: {},
  data() {
    return {
      timer: null,
      time: 120,
      cancelTimer: null,
      wpsInfo_router_pin_def_4G: '',
      currentWPSType: '4G',
      currentRouterType: false,
      wpsInfo_4G: {
        SupportShow: false,
        wpsSwicth: false,
        unsupportWpsSwitch: true, // 是否不支持编辑开关
        methodRadio: 2,
        methodClientPin: '',
        routerPinSwitch: false,
        methodRouterPin: ''
      },
      wpsInfo_5G: {
        SupportShow: false,
        wpsSwicth: false,
        unsupportWpsSwitch: true, // 是否不支持编辑开关
        methodRadio: 2,
        methodClientPin: '',
        routerPinSwitch: false,
        methodRouterPin: ''
      },
      wpsInfo_6G: {
        SupportShow: false,
        wpsSwicth: false,
        unsupportWpsSwitch: true, // 是否不支持编辑开关
        methodRadio: 2,
        methodClientPin: '',
        routerPinSwitch: false,
        methodRouterPin: ''
      },
      wpsInfoRouterPin_def: '',
      // WPS关闭提示语
      showWpsSwitchDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.confirm', // 标题
        msgTitle: 'wifi.changeWpsTip',
        leftBtnText: 'common.cancel', //左侧按钮的描述
        rightBtnText: 'common.ok' //右侧按钮的描述
      },

      showSwitchDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'wifi.disableWifi', // 标题
        msgTitle: 'wifi.wifiSettingTip',
        leftBtnText: 'common.ok' //右侧按钮的描述
      },
      showWpsCancelDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.wifiWps', // 标题
        msgTitle: 'wifi.cancelWps',
        leftBtnText: 'common.cancel' //右侧按钮的描述
      },
      showWpsResultDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.wifiWps', // 标题
        msgTitle: 'wifi.wpsEnd',
        leftBtnText: 'common.close' //右侧按钮的描述
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
    cancelWpsConnectCancelApi({ hiddenLoading: true }).then(() => {})
  },
  methods: {
    initData() {
      // 获取WPS的4G信息
      getWpsStateApi().then((data) => {
        if (data.retcode == 0) {
          this.wpsInfo_4G.wpsSwicth = data.Host1WpsState == 1 ? true : false
          this.wpsInfo_4G.unsupportWpsSwitch =
            data.Host1SupportWps == 0 ? true : false
          this.wpsInfo_4G.methodRadio =
            data.Host1WpsMode == 1 ? 2 : data.Host1WpsMode
          this.wpsInfo_4G.SupportShow = data.Support2G == 1 ? true : false

          this.wpsInfo_5G.wpsSwicth = data.Host2WpsState == 1 ? true : false
          this.wpsInfo_5G.unsupportWpsSwitch =
            data.Host2SupportWps == 0 ? true : false
          this.wpsInfo_5G.methodRadio =
            data.Host2WpsMode == 1 ? 2 : data.Host2WpsMode
          this.wpsInfo_5G.SupportShow = data.Support5G == 1 ? true : false

          this.wpsInfo_6G.wpsSwicth = data.Host3WpsState == 1 ? true : false
          this.wpsInfo_6G.enditWpsSwitch =
            data.Host3SupportWps == 0 ? true : false
          this.wpsInfo_6G.methodRadio =
            data.Host3WpsMode == 1 ? 2 : data.Host3WpsMode
          this.wpsInfo_6G.SupportShow = data.Support6G == 1 ? true : false
        }
      })
      // 获取默认router PIN值
      getWpsApDefaultPinCodeApi().then((data) => {
        if (data.retcode == 0) {
          this.wpsInfoRouterPin_def = data.HostWpsDefaultApPinCode
          this.wpsInfo_4G.methodRouterPin = data.HostWpsDefaultApPinCode
          this.wpsInfo_5G.methodRouterPin = data.HostWpsDefaultApPinCode
          this.wpsInfo_6G.methodRouterPin = data.HostWpsDefaultApPinCode
        }
      })
    },
    changeWPSSwitch(type) {
      console.log('type', type)
      this.currentWPSType = type
      let params = {}
      if (type == '4G') {
        params.HostWpsIndex = 0
        params.HostWpsState = this.wpsInfo_4G.wpsSwicth ? 1 : 0
      } else if (type == '5G') {
        params.HostWpsIndex = 1
        params.HostWpsState = this.wpsInfo_5G.wpsSwicth ? 1 : 0
      } else if (type == '6G') {
        params.HostWpsIndex = 2
        params.HostWpsState = this.wpsInfo_6G.wpsSwicth ? 1 : 0
      }
      console.log(this.wpsInfo_4G)
      setWpsSwitchStateExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
          if (type == '4G') {
            this.wpsInfo_4G.wpsSwicth = !this.wpsInfo_4G.wpsSwicth
          } else if (type == '5G') {
            this.wpsInfo_5G.wpsSwicth = !this.wpsInfo_5G.wpsSwicth
          } else if (type == '6G') {
            this.wpsInfo_6G.wpsSwicth = !this.wpsInfo_6G.wpsSwicth
          }
        }
      })
    },
    cancelChangeWpsSwitch() {
      this.cancelWpsConnectSwitch(true)
      if (this.currentRouterType) {
        if (this.currentWPSType == '4G') {
          this.wpsInfo_4G.routerPinSwitch = false
        } else if (this.currentWPSType == '5G') {
          this.wpsInfo_5G.routerPinSwitch = false
        } else if (this.currentWPSType == '6G') {
          this.wpsInfo_6G.routerPinSwitch = false
        }
      }
    },
    changeWpsSwicth(val, index) {
      console.log('changeWpsSwicth:', index)
      this.currentHz = index
      this.showWpsSwitchDialogInfo.showDialog = true
    },
    // 获取随机PIN
    getNewPin(type) {
      getWpsApRandomPinCodeApi().then((data) => {
        if (data.retcode == 0) {
          if (type == '4G') {
            this.wpsInfo_4G.methodRouterPin = data.HostWpsRandomApPinCode
          } else {
            this.wpsInfo_5G.methodRouterPin = data.HostWpsRandomApPinCode
          }
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    // 设置默认PIN
    setDefaultPin(type) {
      if (type == '4G') {
        this.wpsInfo_4G.methodRouterPin = this.wpsInfoRouterPin_def
      } else if (type == '5G') {
        this.wpsInfo_5G.methodRouterPin = this.wpsInfoRouterPin_def
      } else if (type == '6G') {
        this.wpsInfo_6G.methodRouterPin = this.wpsInfoRouterPin_def
      }
    },
    // clientPin连接
    connectClientPin(val) {
      this.currentWPSType = val
      this.currentRouterType = false
      let params = {}
      if (val == '4G') {
        params.HostWpsIndex = 0
        params.HostWpsMethod = 1
        params.PinCode = this.wpsInfo_4G.methodClientPin
      } else if (val == '5G') {
        params.HostWpsIndex = 1
        params.HostWpsMethod = 1
        params.PinCode = this.wpsInfo_5G.methodClientPin
      } else if (val == '6G') {
        params.HostWpsIndex = 2
        params.HostWpsMethod = 1
        params.PinCode = this.wpsInfo_6G.methodClientPin
      }
      this.setWpsConnect(params)
    },
    connectRouterPin(val) {
      this.currentWPSType = val
      this.currentRouterType = true
      console.log(val, 'val')
      let params = {}
      if (val == '4G') {
        params.HostWpsIndex = 0
        params.HostWpsMethod = 2
        params.PinCode = this.wpsInfo_4G.methodRouterPin
      } else if (val == '5G') {
        params.HostWpsIndex = 1
        params.HostWpsMethod = 2
        params.PinCode = this.wpsInfo_5G.methodRouterPin
      } else if (val == '6G') {
        params.HostWpsIndex = 2
        params.HostWpsMethod = 2
        params.PinCode = this.wpsInfo_6G.methodRouterPin
      }
      this.setWpsConnect(params)
    },
    // PBC模式
    startWps(val) {
      let params = {}
      if (val == '4G') {
        params.HostWpsIndex = 0
        params.HostWpsMethod = 0
        // params.HostWpsSsid = this.wpsInfo_4G.wifissid
      } else if (val == '5G') {
        params.HostWpsIndex = 1
        params.HostWpsMethod = 0
        // params.HostWpsSsid = this.wpsInfo_5G.wifissid
      } else if (val == '6G') {
        params.HostWpsIndex = 2
        params.HostWpsMethod = 0
      }
      this.setWpsConnect(params)
    },
    // 开启WPS
    setWpsConnect(params) {
      this.showWpsCancelDialogInfo.showDialog = true
      this.cancelTimer = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.cancelWpsConnectSwitch(true)
        }
      }, 1000)
      setWpsConnectApi(params).then((data) => {
        if (data.retcode == 0) {
          this.getWpsConnectState()
        } else {
          this.showWpsCancelDialogInfo.showDialog = false
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    // 取消WPS连接
    cancelWpsConnectSwitch(type = false) {
      clearInterval(this.cancelTimer)
      clearInterval(this.timer)
      this.cancelTimer = null
      this.timer = null
      this.time = 120
      this.showWpsCancelDialogInfo.showDialog = false
      if (type) {
        cancelWpsConnectCancelApi().then(() => {})
      }
    },
    // 连接WPS
    getWpsConnectState() {
      this.timer = setInterval(() => {
        getWpsConnectStateApi({ hiddenLoading: true }).then((data) => {
          if (data.retcode == 0) {
            let currentWpsState = 3
            if (this.currentWPSType == '4G') {
              currentWpsState = data.Host1WpsStatus
            } else if (this.currentWPSType == '5G') {
              currentWpsState = data.Host2WpsStatus
            } else if (this.currentWPSType == '6G') {
              currentWpsState = data.Host3WpsStatus
            }
            if (currentWpsState == 4 || currentWpsState == 0) {
              this.cancelWpsConnectSwitch()
            } else if (currentWpsState == 2) {
              this.cancelWpsConnectSwitch(true)
              if (this.currentRouterType) {
                if (this.currentWPSType == '4G') {
                  this.wpsInfo_4G.routerPinSwitch =
                    !this.wpsInfo_4G.routerPinSwitch
                } else if (this.currentWPSType == '5G') {
                  this.wpsInfo_5G.routerPinSwitch =
                    !this.wpsInfo_5G.routerPinSwitch
                } else if (this.currentWPSType == '6G') {
                  this.wpsInfo_6G.routerPinSwitch =
                    !this.wpsInfo_6G.routerPinSwitch
                }
              }
            }
          }
        })
      }, 2000)
    }
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.method-view {
  display: flex;
  flex-direction: column;
}
.method-view > div {
  margin-bottom: 30px;
}
.radio-view {
  justify-content: space-between;
}
.pin-input {
  margin: 30px 0;
}
.pin-btn {
  margin: 30px 0;
  .right-btn {
    margin-left: 10px;
  }
}
/deep/ .el-radio__label {
  color: $default-font-color;
}
.top-title {
  text-align: left;
  color: $light-style-color;
  font-size: 14px;
  margin: 20px 0;
}
.scri-view {
  margin-left: 20px;
  margin-top: 20px;
  color: $gray-font-color;
}
.main-view {
  color: white;
  .item-view {
    // width: 90%;
  }
}
.section-view {
  width: 96%;
  margin: 0 auto;
  .row-view {
    margin: 30px 0;
  }
}
.padding-view {
  padding: 20px 5%;
  font-size: 16px;
  text-align: left;
}
.line-view {
  width: 100%;
  height: 1px;
  background: $light-style-color;
  margin: 0 0 20px 0;
}
</style>