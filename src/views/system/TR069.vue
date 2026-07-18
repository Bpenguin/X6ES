<template>
  <div class="container-main-content-body">
    <!-- <div class="block-body">
      <div class="page-description">{{ $t('other.nfcSrc') }}</div>
    </div> -->
    <div class="block-body">

      <el-row class="c-row">
        <el-col :span="8">
          <div>URL:</div>
        </el-col>
        <el-col :span="16">
          <mine-input :key="'lanPort'" v-model="TR069Info.acsurl" :placeholder="''"></mine-input>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8">
          <div>Host name:</div>
        </el-col>
        <el-col :span="16">
          <mine-input :key="'lanPort'" v-model="TR069Info.username" :placeholder="''"></mine-input>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8">
          <div>Host Password:</div>
        </el-col>
        <el-col :span="16">
          <mine-input :key="'lanPort'" v-model="TR069Info.password" :placeholder="''"></mine-input>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8">
          <div>Connection Request Certification:</div>
        </el-col>
        <el-col :span="16">
          <el-select v-model="TR069Info.connauthType" popper-class="x6-select" @change="changeSelectMode">
            <el-option v-for="item in connauthList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="8">
          <div>Connection Request name:</div>
        </el-col>
        <el-col :span="16">
          <mine-input :key="'lanPort'" v-model="TR069Info.connReqUsername" :placeholder="''"></mine-input>
        </el-col>
      </el-row>
      <el-row class="c-row">
        <el-col :span="8">
          <div>Connection Request Password:</div>
        </el-col>
        <el-col :span="16">
          <mine-input :key="'lanPort'" v-model="TR069Info.connReqPassword" :placeholder="''"></mine-input>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="8">
          <div>Periodic Notification:</div>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="TR069Info.informenable" :label="0">{{ $t('other.Enable') }}</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="TR069Info.informenable" :label="1">{{ $t('other.disable') }}</el-radio>
        </el-col>
      </el-row>

      <el-row class="c-row">
        <el-col :span="8">
          <div>Periodic Notification Interval:</div>
        </el-col>
        <el-col :span="16">
          <mine-input :key="'lanPort'" v-model="TR069Info.interval" :placeholder="''"></mine-input>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="block-body">
      <div class="page-note">{{$t('common.common')+': '+ $t('other.noteNfcSrc') }}</div>
    </div> -->
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
      </div>
    </div>
    <!-- <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>
    <mine-dialog :show-dialog='showSwitchDialogInfo.showDialog' :show-close-btn="showSwitchDialogInfo.showCloseBtn" :title="showSwitchDialogInfo.title" :msg-title="showSwitchDialogInfo.msgTitle" :left-btn-text="showSwitchDialogInfo.leftBtnText" @leftBtnClick="showSwitchDialogInfo.showDialog = false" :right-btn-text="showSwitchDialogInfo.rightBtnText" @rightBtnClick="switchWanToLan" @closeDialog="showSwitchDialogInfo.showDialog = false"></mine-dialog> -->
  </div>
</template>
<script>
import { getRemoteMngInfo, setRemoteMngExe } from '@/api/system'

export default {
  name: 'TR069',
  // eslint-disable-next-line vue/multi-word-component-names
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  // components: { MineDialog },
  data() {
    return {
      TR069Info: {
        tr069enable: 1,
        informenable: 0,
        interval: 100,
        acsurl: 'http://test-gateway.mesh-asia.com:8061/acs',
        username: '',
        password: '',
        connauthType: '',
        connReqUsername: 0,
        connReqPassword: ''
      },
      connauthList: [
        { value: 0, label: 'none' },
        { value: 1, label: 'digest' },
        { value: 2, label: 'basic' }
      ]
    }
  },

  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initData() // 初始化配置信息
  },
  methods: {
    initData() {
      getRemoteMngInfo().then((data) => {
        if (data.retcode == 0) {
          this.TR069Info = { ...data }
          // this.nfcInfo.ssid = data.NfcStatus
        }
      })
    },
    apply() {
      let params = {
        ...this.TR069Info
      }
      setRemoteMngExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    cancel() {
      this.initData()
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.scri-view {
  font-size: 16px;
  padding-right: 20px;
  color: $gray-font-color;
}
.mari-bot {
  margin-bottom: 20px;
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