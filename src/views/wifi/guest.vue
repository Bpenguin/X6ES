<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wifi.guestScr') }}</div>
    </div>
    <div class="block-body">
      <!-- 2.4G菜单设置 -->
      <div class="block-header">2.4GHz</div>
      <div class="block-body">
        <el-form ref="wifiInfo_4G" key="wifiInfo_4G" :model="wifiInfo_4G" :rules="formRules" label-width="60%" :label-position="formLablePos" size="mini">
          <el-form-item :label="$t('quickSetup.wifi2G')+':'" prop="hzSwitch">
            <el-switch v-model="wifiInfo_4G.hzSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-form-item>
          <el-form-item v-show="wifiInfo_4G.hzSwitch" :label="($t('wifi.guest')+' ')+$t('quickSetup.wifiSSID')+':'" prop="ssid">
            <mine-input :key="'ssid'" v-model="wifiInfo_4G.ssid"></mine-input>
          </el-form-item>
          <el-form-item v-show="wifiInfo_4G.hzSwitch" :label="$t('quickSetup.security')+':'" prop="security">
            <el-select v-model="wifiInfo_4G.securitymode" popper-class="x6-select" :placeholder="''">
              <el-option v-for="item in securitys" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="wifiInfo_4G.hzSwitch && wifiInfo_4G.securitymode != 0 && wifiInfo_4G.securitymode != 5" :label="$t('quickSetup.encryption')+':'" prop="encryption">
            <el-select v-model="wifiInfo_4G.encryption" popper-class="x6-select" :placeholder="''">
              <el-option v-for="item in encryptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="wifiInfo_4G.hzSwitch && wifiInfo_4G.securitymode != 0 && wifiInfo_4G.securitymode != 5" :label="$t('wifi.guest')+' '+$t('quickSetup.wifiPwd')+':'" prop="securitykey">
            <pwd-input :key="'securitykey'" v-model="wifiInfo_4G.securitykey" :maxlength='63'></pwd-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="block-body">
      <div class="block-divide-line"></div>
      <!-- 5G菜单设置 -->
      <div class="block-header">5GHz</div>
      <div class="block-body">
        <el-form ref="wifiInfo_5G" key="wifiInfo_5G" :model="wifiInfo_5G" :rules="formRules" label-width="60%" :label-position="formLablePos" size="mini">
          <el-form-item :label="$t('quickSetup.wifi5G')+':'" prop="hzSwitch">
            <el-switch v-model="wifiInfo_5G.hzSwitch" @change="changeSwitch('5G')" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-form-item>
          <el-form-item v-show="wifiInfo_5G.hzSwitch" :label="$t('wifi.guest')+' '+$t('quickSetup.wifiSSID')+':'" prop="ssid">
            <mine-input :key="'ssid'" v-model="wifiInfo_5G.ssid"></mine-input>
          </el-form-item>
          <el-form-item v-show="wifiInfo_5G.hzSwitch" :label="$t('quickSetup.security') +':'" prop="security">
            <el-select v-model="wifiInfo_5G.securitymode" popper-class="x6-select" :placeholder="''">
              <el-option v-for="item in securitys" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="wifiInfo_5G.hzSwitch && wifiInfo_5G.securitymode != 0 && wifiInfo_5G.securitymode != 5" :label="$t('quickSetup.encryption') +':'" prop="encryption">
            <el-select v-model="wifiInfo_5G.encryption" popper-class="x6-select" :placeholder="''">
              <el-option v-for="item in encryptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="wifiInfo_5G.hzSwitch && wifiInfo_5G.securitymode != 0 && wifiInfo_5G.securitymode != 5" :label="$t('wifi.guest')+' '+$t('quickSetup.wifiPwd') +':'" prop="securitykey">
            <pwd-input :key="'securitykey'" v-model="wifiInfo_5G.securitykey" :maxlength='63'></pwd-input>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="block-body">
      <div class="block-divide-line"></div>
      <!-- 5G菜单设置 -->
      <div class="block-header">6GHz</div>
      <div class="block-body">
        <el-form ref="wifiInfo_6G" key="wifiInfo_6G" :model="wifiInfo_6G" :rules="formRules" label-width="60%" :label-position="formLablePos" size="mini">
          <el-form-item :label="$t('quickSetup.wifi6G')+':'" prop="hzSwitch">
            <el-switch v-model="wifiInfo_6G.hzSwitch" @change="changeSwitch('6G')" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-form-item>
          <el-form-item v-show="wifiInfo_6G.hzSwitch" :label="$t('wifi.guest')+' '+$t('quickSetup.wifiSSID')+':'" prop="ssid">
            <mine-input :key="'ssid'" v-model="wifiInfo_6G.ssid"></mine-input>
          </el-form-item>
          <el-form-item v-show="wifiInfo_6G.hzSwitch" :label="$t('quickSetup.security') +':'" prop="security">
            <el-select v-model="wifiInfo_6G.securitymode" popper-class="x6-select" :placeholder="''">
              <el-option v-for="item in securitys_6G" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="wifiInfo_6G.hzSwitch && wifiInfo_6G.securitymode != 0 && wifiInfo_6G.securitymode != 5" :label="$t('quickSetup.encryption')+':'" prop="encryption">
            <el-select v-model="wifiInfo_6G.encryption" popper-class="x6-select" :placeholder="''">
              <el-option v-for="item in encryptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="wifiInfo_6G.hzSwitch && wifiInfo_6G.securitymode != 0 && wifiInfo_6G.securitymode != 5" :label="$t('wifi.guest')+' '+$t('quickSetup.wifiPwd') +':'" prop="securitykey">
            <pwd-input :key="'securitykey'" v-model="wifiInfo_6G.securitykey" :maxlength='63'></pwd-input>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm"></mine-button>
      </div>
    </div>
  </div>
</template>
<script>
import PwdInput from '@/components/PwdInput'
import { getWlanGuestBasicInfoApi, setWlanGuestBasicInfoApi } from '@/api/wifi'
import { getWifiSettingNotificationApi } from '@/api/doshboard'
import formVaRule from '@/formValidator/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'PageThree',
  components: { PwdInput },
  props: {},
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  data() {
    return {
      // 2.4G数据
      wifiInfo_4G: {
        hzSwitch: false,
        ssid: '',
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
      encryptions: [{ value: 2, label: 'AES' }], // 仅支持AES
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
      wifiInfo_5G: {
        hzSwitch: false,
        ssid: '',
        securitymode: 4,
        encryption: 2,
        securitykey: ''
      },
      wifiInfo_6G: {
        hzSwitch: false,
        ssid: '',
        securitymode: 4,
        encryption: 2,
        securitykey: ''
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getWlanGuestBasicInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.wifiInfo_4G.hzSwitch = data.Guest1Status == 1 ? true : false
          this.wifiInfo_4G.ssid = data.Guest1Ssid
          this.wifiInfo_4G.securitymode = data.Guest1Security
          this.wifiInfo_4G.securitykey = data.Guest1Password

          // 5G信息
          this.wifiInfo_5G.hzSwitch = data.Guest2Status == 1 ? true : false
          this.wifiInfo_5G.ssid = data.Guest2Ssid
          this.wifiInfo_5G.securitymode = data.Guest2Security
          this.wifiInfo_5G.securitykey = data.Guest2Password

          // 6G信息
          this.wifiInfo_6G.hzSwitch = data.Guest3Status == 1 ? true : false
          this.wifiInfo_6G.ssid = data.Guest3Ssid
          this.wifiInfo_6G.securitymode = data.Guest3Security
          this.wifiInfo_6G.securitykey = data.Guest3Password
        }
      })

      // getWifiSettingNotificationApi().then((data) => {
      //   if (data.retcode == 0) {
      //     this.wifiInfo_4G.unSupport = data.Host1Status
      //     this.wifiInfo_5G.unSupport = data.Host2Status
      //     this.wifiInfo_6G.unSupport = data.Host3Status
      //   }
      // })
    },

    applyForm() {
      // 表单校验
      this.validateData()
    },
    cancel() {
      this.initData()
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
        let params = this.initFormParams() // 设置wifi的参数
        setWlanGuestBasicInfoApi(params).then((res) => {
          if (res.retcode == 0) {
            this.$publicFun.showSucMessage(this)
          } else {
            this.$publicFun.showErrMessage(this)
          }
        })
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
    initFormParams() {
      let params = {
        GuestSteering: 0,
        Guest1Status: this.wifiInfo_4G.hzSwitch ? 1 : 0,
        Guest1Ssid: this.wifiInfo_4G.ssid,
        Guest1Security: this.wifiInfo_4G.securitymode,
        Guest1Password: this.wifiInfo_4G.securitykey,

        Guest2Status: this.wifiInfo_5G.hzSwitch ? 1 : 0,
        Guest2Ssid: this.wifiInfo_5G.ssid,
        Guest2Security: this.wifiInfo_5G.securitymode,
        Guest2Password: this.wifiInfo_5G.securitykey,

        Guest3Status: this.wifiInfo_6G.hzSwitch ? 1 : 0,
        Guest3Ssid: this.wifiInfo_6G.ssid,
        Guest3Security: this.wifiInfo_6G.securitymode,
        Guest3Password: this.wifiInfo_6G.securitykey
      }
      return params
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
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
// .page-two {
//   color: $light-style-color;
//   .head-class {
//     text-align: left;
//   }
// }
.main-view {
  color: white;
  padding: 20px 2%;
  .item-view {
    // width: 90%;
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