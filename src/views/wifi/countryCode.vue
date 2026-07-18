<template>

  <div class="container-main-content-body">
    <div class="block-body">
      <el-row class="c-row">
        <el-col :span="8" :xs="24">
          {{$t('nav.countryCode')}}:
        </el-col>
        <el-col :span="12" :xs="24">
          <el-select v-model="countryCode" popper-class="x6-select" :placeholder="''">
            <el-option v-for="item in countryList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
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
import {
  getWlanCountryCodeInfo,
  setWlanCountryCodeApi,
  getWlanBasicInfo,
  setWlanBasicInfo,
  getWlanGuestBasicInfoApi,
  setWlanGuestBasicInfoApi
} from '@/api/wifi'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CountryCode',
  components: {},
  data() {
    return {
      countryCode: 0,
      // 0-US   1-CN   2-ES   3-JP 4-OM 5-KW 6-SA   7-DE 8-GB 9-IN
      countryList: [
        { value: 0, label: 'US' },
        { value: 1, label: 'CN' },
        { value: 2, label: 'ES' },
        { value: 3, label: 'JP' },
        { value: 4, label: 'OM' },
        { value: 5, label: 'KW' },
        { value: 6, label: 'SA' },
        { value: 7, label: 'DE' },
        { value: 8, label: 'GB' },
        { value: 9, label: 'IN' }
      ]
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getWlanCountryCodeInfo({ cancelLoading: true }).then((data) => {
        if (data.retcode == 0) {
          this.countryCode = data.HostCountry
        }
      })
    },
    cancelSetting() {
      this.initData()
    },
    applyForm() {
      setWlanCountryCodeApi({ HostCountry: this.countryCode }).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else if (data.retcode == 102) {
          this.resetCountryCode()
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    async resetCountryCode() {
      let priWifiData = {}
      let guestWifiData = {}
      await getWlanBasicInfo().then((data) => {
        if (data.retcode == 0) {
          data.Host3Status = 0
          priWifiData = data
        }
      })
      await getWlanGuestBasicInfoApi().then((data) => {
        if (data.retcode == 0) {
          data.Guest3Status = 0
          guestWifiData = data
        }
      })
      await setWlanBasicInfo(priWifiData)
      await setWlanGuestBasicInfoApi(guestWifiData)
      setWlanCountryCodeApi({ HostCountry: this.countryCode }).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    }
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0 3%;
}
.scri-view {
  font-size: 16px;
  line-height: 18px;
  padding: 20px 0;
  color: $gray-font-color;
}
.light-title {
  color: $light-style-color;
  padding: 30px 0;
}
.apply-btn {
  width: 184px;
  height: 184px;
  text-align: center;
  line-height: 184px;
  color: $light-style-color;
  margin: 20px auto !important;
  border-radius: 50%;
  border: 1px solid $light-style-color;
  background: transparent;
  box-shadow: 0 0 11px -1px $light-style-color;
}
.apply-btn:hover {
  transform: scale(1.01);
}
.channel-view {
  color: $default-font-color;
  display: flex;
  // justify-content: space-between;
}
</style>