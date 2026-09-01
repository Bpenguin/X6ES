<template>
  <div>
    <div v-if="fromType != 'wifiBasic' " class="block-header">{{ $t('nav.wifi') }}</div>
    <div v-if="modeType == 1">
      <!-- mesh菜单设置 -->
      <div class="block-body">
        <!-- block-body -->
        <div class="block-body">
          <el-form ref="wifiInfo_4G" key="wifiInfo_4G" :model="wifiInfo_4G" :rules="formRules" label-width="60%" :label-position="formLablePos" size="mini">
            <el-form-item :label="$t('quickSetup.wifi2G') +':'" prop="hzSwitch">
              <el-switch v-model="wifiInfo_4G.hzSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch" :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiSSID')+':'" prop="ssid">
              <mine-input :key="'ssid'" v-model="wifiInfo_4G.ssid"></mine-input>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch && fromType!= 'guest'" :label="$t('quickSetup.SSIDBroadcast')+':'" prop="broadcastSwitch">
              <el-switch v-model="wifiInfo_4G.broadcastSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch" :label="$t('quickSetup.security')+':'" prop="security">
              <el-select v-model="wifiInfo_4G.securitymode" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in securitys" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch && wifiInfo_4G.securitymode != 0 && wifiInfo_4G.securitymode != 5" :label="$t('quickSetup.encryption')+':'" prop="encryption">
              <el-select v-model="wifiInfo_4G.encryption" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in encryptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch && wifiInfo_4G.securitymode != 0 && wifiInfo_4G.securitymode != 5" :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiPwd')" prop="securitykey">
              <pwd-input :key="'securitykey'" v-model="wifiInfo_4G.securitykey" :maxlength='63'></pwd-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-else>

      <!-- 2.4G菜单设置 -->
      <div class="block-body">
        <div class="block-header">2.4GHz</div>
        <!-- block-body -->
        <div class="block-body">
          <el-form ref="wifiInfo_4G" key="wifiInfo_4G" :model="wifiInfo_4G" :rules="formRules" label-width="60%" :label-position="formLablePos" size="mini">
            <el-form-item :label="$t('quickSetup.wifi2G')+':'" prop="hzSwitch">
              <el-switch v-model="wifiInfo_4G.hzSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch" :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiSSID')+':'" prop="ssid">
              <mine-input :key="'ssid'" v-model="wifiInfo_4G.ssid"></mine-input>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch && fromType!= 'guest'" :label="$t('quickSetup.SSIDBroadcast')+':'" prop="broadcastSwitch">
              <el-switch v-model="wifiInfo_4G.broadcastSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch" :label="$t('quickSetup.security')+':'" prop="security">
              <el-select v-model="wifiInfo_4G.securitymode" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in securitys" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch && wifiInfo_4G.securitymode != 0 && wifiInfo_4G.securitymode != 5" :label="$t('quickSetup.encryption')+':'" prop="encryption">
              <el-select v-model="wifiInfo_4G.encryption" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in encryptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_4G.hzSwitch && wifiInfo_4G.securitymode != 0 && wifiInfo_4G.securitymode != 5" :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiPwd') +':'" prop="securitykey">
              <pwd-input :key="'securitykey'" v-model="wifiInfo_4G.securitykey" :maxlength='63'></pwd-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 5G菜单设置 -->
      <div class="block-body">
        <div class="block-divide-line"></div>
        <div class="block-header">5GHz</div>
        <div class="block-body">
          <el-form ref="wifiInfo_5G" key="wifiInfo_5G" :model="wifiInfo_5G" :rules="formRules" label-width="60%" :label-position="formLablePos" size="mini">
            <el-form-item :label="$t('quickSetup.wifi5G')+':'" prop="hzSwitch">
              <el-switch v-model="wifiInfo_5G.hzSwitch" active-color="#00dc50" @change="changeSwitch('5G')" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_5G.hzSwitch" :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiSSID')+':'" prop="ssid">
              <mine-input :key="'ssid'" v-model="wifiInfo_5G.ssid"></mine-input>
            </el-form-item>
            <el-form-item v-if="wifiInfo_5G.hzSwitch && fromType!= 'guest'" :label="$t('quickSetup.SSIDBroadcast')+':'" prop="broadcastSwitch">
              <el-switch v-model="wifiInfo_5G.broadcastSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_5G.hzSwitch" :label="$t('quickSetup.security')+':'" prop="security">
              <el-select v-model="wifiInfo_5G.securitymode" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in securitys" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_5G.hzSwitch && wifiInfo_5G.securitymode != 0 && wifiInfo_5G.securitymode != 5" :label="$t('quickSetup.encryption')+':'" prop="encryption">
              <el-select v-model="wifiInfo_5G.encryption" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in encryptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_5G.hzSwitch && wifiInfo_5G.securitymode != 0 && wifiInfo_5G.securitymode != 5" :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiPwd') +':'" prop="securitykey">
              <pwd-input :key="'securitykey'" v-model="wifiInfo_5G.securitykey" :maxlength='63'></pwd-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 6G菜单设置 -->
      <div class="block-body">
        <div class="block-divide-line"></div>
        <div class="block-header">6GHz</div>
        <div class="block-body">
          <el-form ref="wifiInfo_6G" key="wifiInfo_6G" :model="wifiInfo_6G" :rules="formRules" label-width="60%" :label-position="formLablePos" size="mini">
            <el-form-item :label="$t('quickSetup.wifi6G')+':'" prop="hzSwitch">
              <el-switch v-model="wifiInfo_6G.hzSwitch" :disabled='wifiInfo_6G.Support6G == 0' @change="changeSwitch('6G')" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_6G.hzSwitch " :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiSSID') +':'" prop="ssid">
              <mine-input :key="'ssid'" v-model="wifiInfo_6G.ssid"></mine-input>
            </el-form-item>
            <el-form-item v-if="wifiInfo_6G.hzSwitch && fromType!= 'guest'" :label="$t('quickSetup.SSIDBroadcast')+':'" prop="broadcastSwitch">
              <el-switch v-model="wifiInfo_6G.broadcastSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
            </el-form-item>
            <el-form-item v-if="wifiInfo_6G.hzSwitch" :label="$t('quickSetup.security')+':'" prop="security">
              <el-select v-model="wifiInfo_6G.securitymode" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in securitys_6G" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_6G.hzSwitch && wifiInfo_6G.securitymode != 0 && wifiInfo_6G.securitymode != 5" :label="$t('quickSetup.encryption')+':'" prop="encryption">
              <el-select v-model="wifiInfo_6G.encryption" popper-class="x6-select" :placeholder="''">
                <el-option v-for="item in encryptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="wifiInfo_6G.hzSwitch && wifiInfo_6G.securitymode != 0 && wifiInfo_6G.securitymode != 5" :label="(fromType == 'guest'?$t('wifi.guest')+' ':'')+$t('quickSetup.wifiPwd') +':'" prop="securitykey">
              <pwd-input :key="'securitykey'" v-model="wifiInfo_6G.securitykey" :maxlength='63'></pwd-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button v-if="fromType != 'wifiBasic' " :btn-title="$t('common.back')" @clickBtn="toPage('before')"></mine-button>
        <mine-button v-else :btn-title="$t('common.cancel')" @clickBtn="cancelForm"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm"></mine-button>
      </div>
    </div>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showSwitchDialogInfo.showDialog' :show-close-btn="showSwitchDialogInfo.showCloseBtn" :title="showSwitchDialogInfo.title" :msg-title="showSwitchDialogInfo.msgTitle" :left-btn-text="showSwitchDialogInfo.leftBtnText" @leftBtnClick="showSwitchDialogInfo.showDialog = false" @closeDialog="showSwitchDialogInfo.showDialog = false"></mine-dialog>
  </div>
</template>
<script>
import PwdInput from '@/components/PwdInput'
import MineDialog from '@/components/MineDialog'
import {
  getWlanBasicInfo,
  setWlanBasicInfo,
  getWlanGuestBasicInfoApi,
  setWlanGuestBasicInfoApi
} from '@/api/wifi'

import formVaRule from '@/formValidator/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'PageThree',
  components: { PwdInput, MineDialog },
  props: {
    fromType: {
      type: String,
      default: ''
    },
    modeType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  data() {
    return {
      HostStatus: false, // wifi总开关
      HostSteering: false, // 双频合一
      guestData: {}, // guest wifi数据
      // 2.4G数据
      wifiInfo_4G: {
        hzSwitch: false,
        ssid: '',
        broadcastSwitch: true,
        securitymode: 4,
        encryption: 2,
        securitykey: ''
      },
      formRules: {
        ssid: [
          {
            required: true,
            message: this.$t('ruleTip.wifiSSIDRqRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: formVaRule.wifiSSIDRule,
            trigger: ['blur', 'change']
          }
        ],
        securitykey: [
          {
            required: true,
            message: this.$t('ruleTip.WIFIPassworkRqRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: formVaRule.WIFIPassworkRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      securitys: [
        { value: 0, label: 'OPEN' },
        { value: 1, label: 'WPA2' },
        { value: 2, label: 'WPA/WPA2' },
        { value: 3, label: 'WPA3' },
        { value: 4, label: 'WPA2/WPA3' },
        { value: 5, label: 'ENHANCED OPEN' }
      ],
      securitys_6G: [
        { value: 3, label: 'WPA3' }
        // { value: 4, label: 'WPA2/WPA3' },
        // { value: 5, label: 'ENHANCED OPEN' }
      ],
      encryptions: [{ value: 2, label: 'AES' }], // 仅支持AES
      wifiInfo_5G: {
        hzSwitch: false,
        ssid: '',
        broadcastSwitch: true,
        securitymode: 4,
        encryption: 2,
        securitykey: ''
      },
      wifiInfo_6G: {
        hzSwitch: false,
        ssid: '',
        broadcastSwitch: true,
        securitymode: 3,
        encryption: 2,
        securitykey: '',
        Support6G: 1
      },
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.quickSetup', // 标题
        msgTitle: 'quickSetup.setingComplete',
        leftBtnText: 'common.ok' //右侧按钮的描述
      },
      // 4Ghz关闭提示语
      showSwitchDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'wifi.disableWifi', // 标题
        msgTitle: 'wifi.wifiSettingTip',
        leftBtnText: 'common.ok' //右侧按钮的描述
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getWlanBasicInfo().then((data) => {
        if (data.retcode == 0) {
          this.wifiInfo_4G.hzSwitch = data.Host1Status == 1 ? true : false
          this.wifiInfo_4G.ssid = data.Host1Ssid
          this.wifiInfo_4G.broadcastSwitch =
            data.Host1Broadcast == 1 ? true : false
          this.wifiInfo_4G.securitymode = data.Host1Security
          this.wifiInfo_4G.securitykey = data.Host1Password
          // 5G信息
          this.wifiInfo_5G.hzSwitch = data.Host2Status == 1 ? true : false
          this.wifiInfo_5G.ssid = data.Host2Ssid
          this.wifiInfo_5G.broadcastSwitch =
            data.Host2Broadcast == 1 ? true : false
          this.wifiInfo_5G.securitymode = data.Host2Security
          this.wifiInfo_5G.securitykey = data.Host2Password

          // 6G信息
          this.wifiInfo_6G.hzSwitch = data.Host3Status == 1 ? true : false
          this.wifiInfo_6G.ssid = data.Host3Ssid
          this.wifiInfo_6G.broadcastSwitch =
            data.Host3Broadcast == 1 ? true : false
          this.wifiInfo_6G.securitymode = data.Host3Security
          this.wifiInfo_6G.securitykey = data.Host3Password
          this.wifiInfo_6G.Support6G = data.Support6G
          if (data.Support6G == 0) {
            this.wifiInfo_6G.hzSwitch = false
          }
        }
      })
      getWlanGuestBasicInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.guestData = data
        }
      })
    },
    applyForm() {
      this.validateData()
      // if (this.fromType == 'wifiBasic') {
      //   let params = this.initFormParams()
      //   setWlanBasicInfo(params).then((data) => {
      //     if (data.retcode == 0) {
      //       this.$publicFun.showSucMessage(this)
      //     } else {
      //       this.$publicFun.showErrMessage(this)
      //     }
      //   })
      // } else {
      //   console.log('from Apply')
      //   let params = this.initFormParams()
      //   this.$emit('goToPageIndex', { index: 4, params })
      // }
    },
    cancelForm() {
      this.initData()
    },
    // 格式化设置接口入参
    initFormParams() {
      let params = { Steering: 0 }
      params.Host1Status = this.wifiInfo_4G.hzSwitch ? 1 : 0
      params.Host1Ssid = this.wifiInfo_4G.ssid
      params.Host1Security = this.wifiInfo_4G.securitymode
      params.Host1Password = this.wifiInfo_4G.securitykey
      params.Host1Broadcast = this.wifiInfo_4G.broadcastSwitch ? 1 : 0

      params.Host2Status = this.wifiInfo_5G.hzSwitch ? 1 : 0
      params.Host2Ssid = this.wifiInfo_5G.ssid
      params.Host2Security = this.wifiInfo_5G.securitymode
      params.Host2Password = this.wifiInfo_5G.securitykey
      params.Host2Broadcast = this.wifiInfo_5G.broadcastSwitch ? 1 : 0

      params.Host3Status = this.wifiInfo_6G.hzSwitch ? 1 : 0
      params.Host3Ssid = this.wifiInfo_6G.ssid
      params.Host3Security = this.wifiInfo_6G.securitymode
      params.Host3Password = this.wifiInfo_6G.securitykey
      params.Host3Broadcast = this.wifiInfo_6G.broadcastSwitch ? 1 : 0
      return params
    },
    toPage(val) {
      if (val == 'before') {
        this.$emit('goToPageIndex', { index: 2 })
        return
      }
      this.validateData()
    },

    // 进行异步表单验证
    async validateData() {
      this.formValidatePromiseArr = []
      let formList = []
      if (this.wifiInfo_4G.hzSwitch) {
        formList.push('wifiInfo_4G')
      }
      if (this.wifiInfo_5G.hzSwitch) {
        formList.push('wifiInfo_5G')
      }
      if (this.wifiInfo_6G.hzSwitch) {
        formList.push('wifiInfo_6G')
      }
      formList.map((form) => {
        this.validateEachForm(form)
      })
      // 如果没有全部验证成功，则进入捕获的错误处理
      try {
        await Promise.all(this.formValidatePromiseArr)
        console.log('finish')
        let params = this.initFormParams()
        if (this.fromType == 'wifiBasic') {
          // // 关闭guest相关开关
          this.getGuestWifiParams(params)
          await setWlanGuestBasicInfoApi(this.guestData).then((data) => {})
          setWlanBasicInfo(params).then((data) => {
            if (data.retcode == 0) {
              this.$publicFun.showSucMessage(this)
            } else {
              this.$publicFun.showErrMessage(this)
            }
          })
        } else {
          this.$emit('goToPageIndex', { index: 4, params })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 校验每个独立表单数据
    validateEachForm(formName) {
      let formResult = new Promise((resolve, reject) => {
        // 利用ref取到要验证的表单
        console.log(this.$refs, formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            console.log(`${formName} error`)
            reject()
          }
        })
      })
      this.formValidatePromiseArr.push(formResult)
    },
    // 5G和6G不能同时开启
    changeSwitch(type) {
      if (type == '5G') {
        if (this.wifiInfo_5G.hzSwitch && this.wifiInfo_6G.hzSwitch) {
          this.wifiInfo_6G.hzSwitch = false
        }
      } else {
        if (this.wifiInfo_5G.hzSwitch && this.wifiInfo_6G.hzSwitch) {
          this.wifiInfo_5G.hzSwitch = false
        }
      }
    },
    getGuestWifiParams(wifiParams) {
      // 主wifi6G关闭时，关闭guest 的5G和6G
      if (wifiParams.Host3Status == 1 && this.guestData.Guest2Status == 1) {
        this.guestData.Guest2Status = 0
      }
      if (wifiParams.Host3Status == 0 && this.guestData.Guest3Status == 1) {
        this.guestData.Guest3Status = 0
      }
      if (wifiParams.Host2Status == 1 && this.guestData.Guest3Status == 1) {
        this.guestData.Guest3Status = 0
      }
      if (wifiParams.Host2Status == 0 && this.guestData.Guest2Status == 1) {
        this.guestData.Guest2Status = 0
      }
    }
  },

  destroyed() {}
}
</script>

<style lang="scss" scoped>
</style>