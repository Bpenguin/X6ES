<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wifi.basicSettingsScri') }}</div>
    </div>
    <div class="block-body">
      <el-form ref="wifiInfo_4G" key="wifiInfo_4G" :model="advancedSettingsInfo" label-width="40%" :label-position="formLablePos" size="mini">
        <!-- 2.4G菜单设置 -->
        <div>
          <div class="block-header">2.4GHz</div>
          <div v-if="advancedSettingsInfo.status" class="block-body">
            <el-form-item :label="$t('wifi.channel') +':'" prop="channel">
              <el-select v-model="advancedSettingsInfo.channel" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in channels_4G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('wifi.modeWifi')+':'" prop="mode">
              <el-select v-model="advancedSettingsInfo.mode" @change="modeChange4G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in modes_4G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('wifi.isolation')+':'" prop="isolation">
              <el-switch v-model="advancedSettingsInfo.isolation" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('wifi.bandwidth')+':'" prop="bandwidth">
              <el-select v-model="advancedSettingsInfo.bandwidth" @change="bandChange4G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in bandwidth_4G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-else class="block-body">{{$t('common.disabled')}}</div>
          <div class="block-divide-line"></div>
        </div>
        <!-- 5G菜单设置 -->
        <div>
          <div class="block-header">5GHz</div>
          <div v-if="advancedSettingsInfo.status5G" class="block-body">
            <el-form-item :label="$t('wifi.channel')+':'" prop="channel">
              <el-select v-model="advancedSettingsInfo.channel5G" @change="channelChange5G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in channels_5G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('wifi.modeWifi')+':'" prop="mode">
              <el-select v-model="advancedSettingsInfo.mode5G" @change="modeChange5G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in modes_5G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('wifi.isolation')+':'" prop="isolation">
              <el-switch v-model="advancedSettingsInfo.isolation5G" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('wifi.bandwidth')+':'" prop="bandwidth">
              <el-select v-model="advancedSettingsInfo.bandwidth5G" @change="bandChange5G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in bandwidth_5G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('wifi.dfs')+':'" prop="dfs5G">
              <div class="dfs-view">
                <el-tooltip class="item" effect="light" placement="bottom">
                  <div class="pop-view" slot="content">{{$t('wifi.dfsTip1')}}<br /><br />{{$t('wifi.dfsTip2')}}<br /><br />{{$t('wifi.dfsTip3')}}</div>
                  <div class="right-tip">
                    <svg-icon icon-class="question" class-name="fill-light-color"></svg-icon>
                  </div>
                </el-tooltip>
                <div class="dfs-item">
                  <el-radio v-model="advancedSettingsInfo.dfs5G" :label="0">{{$t('wifi.dfsOff')}}</el-radio>
                  <div class="dfs-scr">{{ $t('wifi.dfsOffScr')}}</div>
                </div>
                <!-- <div class="dfs-item">
                  <el-radio v-model="advancedSettingsInfo.dfs5G" :label="1">{{$t('wifi.dfsOn')}}</el-radio>
                  <div class="dfs-scr">{{ $t('wifi.dfsOnScr')}}</div>
                </div> -->
                <div class="dfs-item">
                  <el-radio v-model="advancedSettingsInfo.dfs5G" :label="2">{{$t('wifi.dfsWeatherRaderOn')}}</el-radio>
                  <div class="dfs-scr">{{ $t('wifi.dfsweatherScr')}}</div>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-else class="block-body">{{$t('common.disabled')}}</div>
          <div class="block-divide-line"></div>
        </div>
        <!-- 6G菜单设置 -->
        <div>
          <div class="block-header">6GHz</div>
          <div v-if="advancedSettingsInfo.status6G" class="block-body">
            <el-form-item :label="$t('other.psc')+':'" prop="psc6G">
              <el-switch v-model="advancedSettingsInfo.psc6G" @change="pscChange" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-show="!advancedSettingsInfo.psc6G" :label="$t('wifi.channel')+':'" prop="channel6G">
              <el-select v-model="advancedSettingsInfo.channel6G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in channels_6G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="advancedSettingsInfo.psc6G" :label="$t('other.psc')+ ' ('+$t('other.ChannelPsc')+') '+':'" prop="channel6G">
              <el-select v-model="advancedSettingsInfo.channel6G" @change="modeChange6G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in channels_6G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('wifi.modeWifi')+':'" prop="mode6G">
              <el-select v-model="advancedSettingsInfo.mode6G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in modes_6G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('wifi.isolation')+':'" prop="isolation6G">
              <el-switch v-model="advancedSettingsInfo.isolation6G" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('wifi.bandwidth')+':'" prop="bandwidth6G">
              <el-select v-model="advancedSettingsInfo.bandwidth6G" @change="bandChange6G" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in bandwidth_6G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-else class="block-body">{{$t('common.disabled')}}</div>
        </div>
      </el-form>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelSetting"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="showApplySetting"></mine-button>
      </div>
    </div>
    <mine-dialog :show-dialog='showSetDialogInfo.showDialog' :show-close-btn="showSetDialogInfo.showCloseBtn" :title="showSetDialogInfo.title" :msg-title="showSetDialogInfo.msgTitle" :left-btn-text="showSetDialogInfo.leftBtnText" @leftBtnClick="showSetDialogInfo.showDialog = false" :right-btn-text="showSetDialogInfo.rightBtnText" @rightBtnClick="applySetting" @closeDialog="showSetDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showSwitchDialogInfo.showDialog' :show-close-btn="showSwitchDialogInfo.showCloseBtn" :title="showSwitchDialogInfo.title" :msg-title="showSwitchDialogInfo.msgTitle" :left-btn-text="showSwitchDialogInfo.leftBtnText" @leftBtnClick="showSwitchDialogInfo.showDialog = false" @closeDialog="showSwitchDialogInfo.showDialog = false"></mine-dialog>
    <!-- 天气雷达1分钟 -->
    <mine-dialog :show-dialog='showDfsOneDialogInfo.showDialog' :show-close-btn="showDfsOneDialogInfo.showCloseBtn" :title="showDfsOneDialogInfo.title" :msg-title="showDfsOneDialogInfo.msgTitle" :left-btn-text="showDfsOneDialogInfo.leftBtnText" @leftBtnClick="cancelChangeDfs" :right-btn-text="showDfsOneDialogInfo.rightBtnText" @rightBtnClick="confirmChangeDfs" @closeDialog="cancelChangeDfs"></mine-dialog>

  </div>
</template>
<script>
import MineDialog from '@/components/MineDialog'
import {
  getAdvancedSettingInfoApi,
  setAdvancedSettingInfoApi,
  getWlanCountryCodeInfo
} from '@/api/wifi'
import channelList from './advance'
import { getCountryNum } from '@/utils/until'
export default {
  name: 'AdvanceSettings',
  components: { MineDialog },
  props: {},
  data() {
    return {
      channelListAll: {},
      isInitDfsStatus: true,
      previousChannel5G: '', // 5G Channel的旧值
      previousBand: '', // 5G band的旧值

      tempConfirmFunc: () => {
        console.log('tempConfirmFunc')
      },
      tempCancelFunc: () => {
        console.log('tempCancelFunc')
      },
      countryCode: 0, // 国家码
      channel6GTotal: {},
      channels_4G: [{ value: 0, label: 'Auto' }],
      channels_5G: [{ value: 0, label: 'Auto' }],
      channels_6G: [{ value: 0, label: 'Auto' }],
      // 2.4G数据
      advancedSettingsInfo: {
        status: true, // 开关
        mode: 0, // 模式
        channel: 0, // 信道
        bandwidth: 1, // 带宽
        isolation: false,
        status5G: true, // 开关
        show5G: 1,
        mode5G: 5, // 模式
        channel5G: 0, // 信道
        bandwidth5G: 1, // 带宽
        isolation5G: false,
        dfs5G: 1,
        status6G: false, // 开关
        psc6G: false, // PSC 开关
        mode6G: 7, // 模式
        channel6G: 1, // 信道
        bandwidth6G: 1, // 带宽
        isolation6G: false
      },
      modes_4G: [
        { value: 0, label: 'legacy b/g mixed' },
        { value: 1, label: 'b/g/n mixed' },
        { value: 2, label: 'b/g/n/ax mixed' }
      ],
      bandwidth_4G: [
        { value: 1, label: '20MHz' },
        { value: 2, label: '40MHz' }
      ],
      modes_5G: [
        { value: 4, label: 'legacy a only' },
        { value: 5, label: 'n only' },
        { value: 6, label: 'a/n/ac mixed' },
        { value: 7, label: 'a/n/ac/ax mixed' }
      ],
      bandwidth_5G: [
        { value: 1, label: '20MHz' },
        { value: 2, label: '40MHz' },
        { value: 3, label: '80MHz' },
        { value: 4, label: '160MHz' }
      ],
      modes_6G: [{ value: 7, label: 'a/n/ac/ax mixed' }],
      bandwidth_6G: [
        { value: 1, label: '20MHz' },
        { value: 2, label: '40MHz' },
        { value: 3, label: '80MHz' },
        { value: 4, label: '160MHz' }
      ],
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'wifi.advancedSetting', // 标题
        msgTitle: 'wifi.advancedSettingScr',
        leftBtnText: 'common.ok' //右侧按钮的描述
      },
      // 4Ghz关闭提示语
      showSwitchDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'wifi.disableWifi', // 标题
        msgTitle: 'wifi.wifiSettingTip',
        leftBtnText: 'common.ok' //右侧按钮的描述
      },
      // 设置advande确认提示
      showSetDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.confirm', // 标题
        msgTitle: 'wifi.changeWpsTip',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'common.confirm' //右侧按钮的描述
      },
      showDfsOneDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.confirm', // 标题
        msgTitle: 'other.dfsOn1',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'common.confirm' //右侧按钮的描述
      }
    }
  },
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  watch: {
    'advancedSettingsInfo.dfs5G': function (newValue, oldValue) {
      console.log('newValue:', newValue, oldValue)
      if (newValue === 0) {
        // let channel_dfs = channelList.channels_5G_DFS_US_ARR
        // if (this.countryCode === 1) {
        //   channel_dfs = channelList.channels_5G_DFS_ZH_ARR
        // }
        // if (channel_dfs.includes(this.advancedSettingsInfo.channel5G)) {
        //   this.advancedSettingsInfo.channel5G = 0
        // }

        this.isInitDfsStatus = false
        this.channels_5G = this.initChannelFormate(
          this.channelListAll[
            'channel_5g_' +
              this.informtBandWith(this.advancedSettingsInfo.bandwidth5G) +
              '_DFS' +
              (newValue == 0 ? '_OFF' : '')
          ]
        )
        this.setDefaultChannel('5G')
      } else {
        this.tempConfirmFunc = () => {
          this.channels_5G = this.initChannelFormate(
            this.channelListAll[
              'channel_5g_' +
                this.informtBandWith(this.advancedSettingsInfo.bandwidth5G) +
                '_DFS' +
                (this.advancedSettingsInfo.dfs5G == 0 ? '_OFF' : '')
            ]
          )
          this.changeChannelValue()
        }
        if (this.isInitDfsStatus || !this.checkDfsTipStatus()) {
          this.isInitDfsStatus = false
          this.tempConfirmFunc()
          this.changeChannelValue()
        } else {
          this.tempCancelFunc = () => {
            this.advancedSettingsInfo.dfs5G = oldValue
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
    this.showDialogInfo.showDialog = true
  },
  methods: {
    async initData() {
      await this.initCountryCode()
      // 获取2.4GHz的配置信息
      getAdvancedSettingInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.advancedSettingsInfo.status =
            data.Host1Status == 1 ? true : false
          this.advancedSettingsInfo.channel = data.Host1Channel
          this.advancedSettingsInfo.mode = data.Host1WifiStandard
          this.advancedSettingsInfo.bandwidth = data.Host1Bandwidth
          this.advancedSettingsInfo.isolation =
            data.Host1ApIsolation == 1 ? true : false
          this.channels_4G = this.initChannelFormate(
            this.channelListAll[
              'channel_2g_' + this.informtBandWith(data.Host1Bandwidth)
            ]
          )

          this.advancedSettingsInfo.status5G =
            data.Host2Status == 1 ? true : false
          this.advancedSettingsInfo.channel5G = data.Host2Channel
          this.previousChannel5G = data.Host2Channel
          this.advancedSettingsInfo.mode5G = data.Host2WifiStandard
          this.advancedSettingsInfo.bandwidth5G = data.Host2Bandwidth
          this.advancedSettingsInfo.isolation5G =
            data.Host2ApIsolation == 1 ? true : false
          this.advancedSettingsInfo.dfs5G =
            data.Host2Dfs === 1 ? 2 : data.Host2Dfs
          console.log(
            '222:',

            this.informtBandWith(data.Host2Bandwidth) +
              '_DFS' +
              (this.advancedSettingsInfo.dfs5G == 0 ? '_OFF' : '')
          )
          this.channels_5G = this.initChannelFormate(
            this.channelListAll[
              'channel_5g_' +
                this.informtBandWith(data.Host2Bandwidth) +
                '_DFS' +
                (this.advancedSettingsInfo.dfs5G == 0 ? '_OFF' : '')
            ]
          )
          this.advancedSettingsInfo.status6G =
            data.Host3Status == 1 ? true : false
          this.advancedSettingsInfo.psc6G = data.Host3Psc == 1 ? true : false
          this.advancedSettingsInfo.channel6G = data.Host3Channel
          this.advancedSettingsInfo.mode6G = data.Host3WifiStandard
          this.advancedSettingsInfo.bandwidth6G = data.Host3Bandwidth
          this.advancedSettingsInfo.isolation6G =
            data.Host3ApIsolation == 1 ? true : false
          console.log(
            '333:',
            'channel_6g_' +
              this.informtBandWith(data.Host3Bandwidth) +
              '_PSC' +
              (data.Host3Psc === 1 ? '' : '_OFF')
          )
          this.channels_6G = this.initChannelFormate(
            this.channelListAll[
              'channel_6g_' +
                this.informtBandWith(data.Host3Bandwidth) +
                '_PSC' +
                (data.Host3Psc === 1 ? '' : '_OFF')
            ]
          )
          this.modeChange4G(data.Host1WifiStandard)
          this.modeChange5G(data.Host2WifiStandard)

          this.bandChange5G(this.advancedSettingsInfo.bandwidth5G, true)
        }
      })
    },
    initCountryCode() {
      getWlanCountryCodeInfo().then((data) => {
        if (data.retcode == 0) {
          this.countryCode = data.HostCountry
          this.channelListAll =
            channelList['chennel_' + getCountryNum(data.HostCountry)]
          console.log('this.channelListAll:', this.channelListAll)
        }
      })
    },
    informtBandWith(val) {
      switch (val) {
        case 1:
          return '20M'
        case 2:
          return '40M'
        case 3:
          return '80M'
        case 4:
          return '160M'
      }
      return
    },
    modeChange4G(val) {
      if (val == 0) {
        this.bandwidth_4G = [{ value: 1, label: '20MHz' }]
        this.advancedSettingsInfo.bandwidth = 1
      } else {
        this.bandwidth_4G = [
          { value: 1, label: '20MHz' },
          { value: 2, label: '40MHz' }
        ]
      }
      this.channels_4G = this.initChannelFormate(
        this.channelListAll[
          'channel_2g_' +
            this.informtBandWith(this.advancedSettingsInfo.bandwidth)
        ]
      )
    },
    bandChange5G(val, type = false) {
      if (this.advancedSettingsInfo.dfs5G == 2 && !type) {
        this.tempConfirmFunc = () => {
          this.channels_5G = this.initChannelFormate(
            this.channelListAll[
              'channel_5g_' +
                this.informtBandWith(this.advancedSettingsInfo.bandwidth5G) +
                '_DFS' +
                (this.advancedSettingsInfo.dfs5G == 0 ? '_OFF' : '')
            ]
          )
          this.previousBand = this.advancedSettingsInfo.bandwidth5G
          this.changeChannelValue()
        }
        if (!this.checkDfsTipStatus()) {
          this.tempConfirmFunc()
          this.changeChannelValue()
        } else {
          this.tempCancelFunc = () => {
            this.advancedSettingsInfo.bandwidth5G = this.previousBand
          }
        }
      } else {
        this.previousBand = val
        let temoDfs = '_OFF'
        if (this.advancedSettingsInfo.dfs5G == 2) temoDfs = ''
        // this.channels_5G =
        //   this.channelList['CHANNEL_5G_' + val + temoDfs + '_DFS']
        this.channels_5G = this.initChannelFormate(
          this.channelListAll[
            'channel_5g_' +
              this.informtBandWith(this.advancedSettingsInfo.bandwidth5G) +
              '_DFS' +
              temoDfs
          ]
        )
        this.changeChannelValue()
      }
    },
    modeChange5G(val) {
      if (val == 4) {
        this.bandwidth_5G = [{ value: 1, label: '20MHz' }]
        this.advancedSettingsInfo.bandwidth5G = 1
      } else if (val == 5) {
        this.bandwidth_5G = [
          { value: 1, label: '20MHz' },
          { value: 2, label: '40MHz' }
        ]
        if (
          this.advancedSettingsInfo.bandwidth5G == 3 ||
          this.advancedSettingsInfo.bandwidth5G == 4
        ) {
          this.advancedSettingsInfo.bandwidth5G = 2
        }
      } else {
        this.bandwidth_5G = [
          { value: 1, label: '20MHz' },
          { value: 2, label: '40MHz' },
          { value: 3, label: '80MHz' },
          { value: 4, label: '160MHz' }
        ]
      }
      this.channels_5G = this.initChannelFormate(
        this.channelListAll[
          'channel_5g_' +
            this.informtBandWith(this.advancedSettingsInfo.bandwidth5G) +
            '_DFS' +
            (this.advancedSettingsInfo.dfs5G == 0 ? '_OFF' : '')
        ]
      )
      this.setDefaultChannel('5G')
    },
    bandChange4G(val) {
      this.channels_4G = this.initChannelFormate(
        this.channelListAll['channel_2g_' + this.informtBandWith(val)]
      )
    },
    //修改PSC开关
    pscChange(val) {
      this.channels_6G = this.initChannelFormate(
        this.channelListAll[
          'channel_6g_' +
            this.informtBandWith(this.advancedSettingsInfo.bandwidth6G) +
            '_PSC' +
            (val ? '' : '_OFF')
        ]
      )
      this.setDefaultChannel('6G')
    },
    // 修改频段
    bandChange6G(val) {
      this.channels_6G = this.initChannelFormate(
        this.channelListAll[
          'channel_6g_' +
            this.informtBandWith(val) +
            '_PSC' +
            (this.advancedSettingsInfo.psc6G ? '' : '_OFF')
        ]
      )
      this.setDefaultChannel('6G')
      // console.log(this.channels_6G, 'this.channels_6G:banChange')
    },
    // 动态设置channel的值
    setDefaultChannel(type = '5G') {
      let exitValue = false
      let tempChannel = this.advancedSettingsInfo.channel5G
      let tempChannelList = this.channels_5G
      if (type == '5G') {
        tempChannel = this.advancedSettingsInfo.channel5G
        tempChannelList = this.channels_5G
      } else {
        tempChannel = this.advancedSettingsInfo.channel6G
        tempChannelList = this.channels_6G
      }
      console.log('tempChannel:', tempChannel)
      console.log('tempChannelList:', tempChannelList)
      for (let i = 0; i < tempChannelList.length; i++) {
        if (tempChannel == tempChannelList[i]['value']) {
          exitValue = true
        }
      }
      if (!exitValue) {
        if (type == '5G') {
          this.advancedSettingsInfo.channel5G = tempChannelList[0]['value']
          this.previousChannel5G = this.advancedSettingsInfo.channel5G
        } else {
          this.advancedSettingsInfo.channel6G = tempChannelList[0]['value']
        }
      }
    },
    // 恢复设置
    cancelSetting() {
      this.initData()
    },
    // 修改设置
    showApplySetting() {
      this.showSetDialogInfo.showDialog = true
    },
    applySetting() {
      this.showSetDialogInfo.showDialog = false
      this.setAdvanceInfo()
    },
    setAdvanceInfo() {
      let params = {
        Host1Bandwidth: this.advancedSettingsInfo.bandwidth,
        Host1WifiStandard: this.advancedSettingsInfo.mode,
        Host1Channel: this.advancedSettingsInfo.channel,
        Host1ApIsolation: this.advancedSettingsInfo.isolation ? 1 : 0,
        Host1Psc: 0,
        Host1Dfs: 0,

        Host2Bandwidth: this.advancedSettingsInfo.bandwidth5G,
        Host2WifiStandard: this.advancedSettingsInfo.mode5G,
        Host2Channel: this.advancedSettingsInfo.channel5G,
        Host2ApIsolation: this.advancedSettingsInfo.isolation5G ? 1 : 0,
        Host2Psc: 0,
        Host2Dfs: this.advancedSettingsInfo.dfs5G,

        Host3Bandwidth: this.advancedSettingsInfo.bandwidth6G,
        Host3WifiStandard: this.advancedSettingsInfo.mode6G,
        Host3Channel: this.advancedSettingsInfo.channel6G,
        Host3ApIsolation: this.advancedSettingsInfo.isolation6G ? 1 : 0,
        Host3Psc: this.advancedSettingsInfo.psc6G ? 1 : 0,
        Host3Dfs: 0
      }
      setAdvancedSettingInfoApi(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    // 判断是否需要弹框提示
    checkDfsTipStatus() {
      let channel_dfs =
        this.channelListAll[
          'channel_5g_' +
            this.informtBandWith(this.advancedSettingsInfo.bandwidth5G) +
            '_DFS_OFF'
        ].split(',')
      channel_dfs.unshift(0)
      console.log('channel_dfs:', channel_dfs)
      console.log(
        'this.advancedSettingsInfo.channel5G:',
        this.advancedSettingsInfo.channel5G
      )
      if (
        this.advancedSettingsInfo.dfs5G !== 0 &&
        !channel_dfs.includes(this.advancedSettingsInfo.channel5G)
      ) {
        console.log(
          'this.advancedSettingsInfo.dfs5G:',
          this.advancedSettingsInfo.dfs5G
        )
        console.log(
          '444:',
          [116, 120, 124, 128, 132].includes(
            this.advancedSettingsInfo.channel5G
          )
        )
        if (
          this.advancedSettingsInfo.dfs5G == 2 &&
          [116, 120, 124, 128, 132].includes(
            this.advancedSettingsInfo.channel5G
          )
        ) {
          // 符合ESTI标准国家或地区，天气雷达等待600秒，其它DFS等待60秒
          // 等待10分钟
          this.showDfsOneDialogInfo.msgTitle = 'other.dfsOn10'
          this.showDfsOneDialogInfo.showDialog = true
        } else {
          // 等待1分钟
          this.showDfsOneDialogInfo.msgTitle = 'other.dfsOn1'
          this.showDfsOneDialogInfo.showDialog = true
        }
        return true
      } else {
        return false
      }
    },
    channelChange5G(val) {
      if (
        this.advancedSettingsInfo.dfs5G === 2 ||
        this.advancedSettingsInfo.dfs5G === 1
      ) {
        this.tempConfirmFunc = () => {
          this.previousChannel5G = this.advancedSettingsInfo.channel5G
        }
        if (!this.checkDfsTipStatus()) {
          this.tempConfirmFunc()
        } else {
          this.tempCancelFunc = () => {
            this.advancedSettingsInfo.channel5G = this.previousChannel5G
          }
        }
      } else {
        this.previousChannel5G = val
      }
    },
    initChannelFormate(channelStr) {
      console.log('channelStr:', channelStr)
      if (channelStr == '') {
        this.advancedSettingsInfo.channel5G = 0
        return [{ value: 0, label: 'Auto' }]
      }
      let arr = channelStr.split(',')
      let tempDic = [{ value: 0, label: 'Auto' }]
      arr.forEach((item) => {
        item
        tempDic.push({ value: Number(item), label: Number(item) })
      })
      return tempDic
    },
    changeChannelValue() {
      if (
        !this.isValueInChannels(
          this.advancedSettingsInfo.channel5G,
          this.channels_5G
        )
      ) {
        this.advancedSettingsInfo.channel5G = 0
        this.previousChannel5G = this.advancedSettingsInfo.channel5G
      }
    },
    isValueInChannels(value, channels) {
      for (let i = 0; i < channels.length; i++) {
        if (channels[i].value === value) {
          return true
        }
      }
      return false
    },
    confirmChangeDfs() {
      this.showDfsOneDialogInfo.showDialog = false
      this.tempConfirmFunc()
    },
    cancelChangeDfs() {
      this.showDfsOneDialogInfo.showDialog = false
      this.tempCancelFunc()
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.page-item {
}
/deep/ .el-radio__label {
  color: $default-font-color;
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
  .dfs-item {
    margin-bottom: 20px;
  }
  .dfs-scr {
    padding-left: 20px;
    line-height: 20px;
    color: $gray-font-color;
  }
}
.pop-view {
  width: 200px;
  line-height: 18px;
  padding: 4px;
}
.scri-view {
  margin-left: 20px;
  margin-top: 20px;
  color: $gray-font-color;
}
.main-view {
  color: white;
  padding: 20px 2%;
  .item-view {
    // width: 90%;
  }
}
.row-view {
  width: 50%;
  margin: 30px auto;
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
.bottom-btn {
  display: flex;
  flex-direction: row;
  float: right;
  color: white;
  div {
    margin-right: 20px;
  }
}
.top-title {
  text-align: left;
  color: $light-style-color;
  font-size: 14px;
}
</style>