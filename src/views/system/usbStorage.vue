<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{$t('common.unuse')}}</div>
    </div>
  </div>
  <!-- <div class="main-view">
    <div class="scri-view">{{ $t('system.usbStorageScr',{ProductName:GLOBAL.PRODUCT_NAME})+$t('system.usbStorageScr1') }}</div>
    <div class="top-title">{{ $t('system.usbDevice') }}</div>
    <div class="form-item">
      <el-row class="row-item">
        <el-col :span="12">
          <div>{{ $t('common.type')+':' }}</div>
        </el-col>
        <el-col :span="12">
          <div>{{ usbInfo.type }}</div>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="12">
          <div>{{ $t('system.totalSize') +':'}}</div>
        </el-col>
        <el-col :span="12">
          <div>{{ usbInfo.totalSize }}</div>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="12">
          <div>{{ $t('system.spaceFree') +':'}}</div>
        </el-col>
        <el-col :span="12">
          <div>{{ usbInfo.spaceFree }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="line-view"></div>
    <div class="top-title">{{ $t('system.shareSetting')}}</div>
    <el-form ref="shareSettingInfo" :model="shareSettingInfo" :rules="shareSettingInfoRule" key="shareSettingInfo" label-width="40%" :label-position="formLablePos" size="mini">
      <el-form-item class="form-item" :label="$t('system.formServerName')+':'" prop="serveName">
        <mine-input :key="'serveName'" v-model="shareSettingInfo.serveName" :placeholder="''"></mine-input>
      </el-form-item>
      <el-form-item class="form-item" :label="$t('system.formUsername')+':'" prop="userName">
        <mine-input :key="'userName'" v-model="shareSettingInfo.ipv6Address" :placeholder="''"></mine-input>
      </el-form-item>
      <el-form-item class="form-item" :label="$t('common.password')+':'" prop="password">
        <pwd-input :key="'password'" v-model="shareSettingInfo.password" :placeholder="''"></pwd-input>
      </el-form-item>
      <el-form-item class="form-item" :label="$t('system.neighborhoodSwitch')+':'" prop="neighborhoodSwitch">
        <el-switch v-model="shareSettingInfo.neighborhoodSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
      </el-form-item>
    </el-form>
    <div class="bottom-btn">
      <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelSetting"></mine-button>
      <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm"></mine-button>
    </div>
  </div> -->
</template>

<script>
import formVaRule from '@/formValidator/index'
import PwdInput from '@/components/PwdInput'
export default {
  name: 'Ipv6Index',
  components: { PwdInput },
  data() {
    return {
      usbInfo: {
        type: '--',
        totalSize: '--',
        spaceFree: '--'
      },
      connectMode: 0,
      shareSettingInfo: {
        serveName: '',
        userName: '',
        password: '',
        neighborhoodSwitch: false
      },
      shareSettingInfoRule: {
        serveName: [{ required: true, trigger: 'blur' }],
        userName: [{ required: true, trigger: 'blur' }],
        password: [
          { required: true, trigger: 'blur' },
          {
            validator: formVaRule.wifiPasswordRule,
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 修改数据
    applyForm() {},
    cancelSetting() {},
    changeSelectMode() {}
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.main-view {
  color: $login-font-color;
  padding: 30px 0;
}
.scri-view {
  color: $gray-font-color;
}
.top-title {
  text-align: left;
  margin-top: 20px;
  color: $main-style-color;
  font-size: 22px;
}
.form-item {
  width: 90%;
  margin: 15px auto;
  .row-item {
    margin: 30px 0;
  }
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
.bottom-btn {
  display: flex;
  flex-direction: row;
  float: right;
  color: white;
  div {
    margin-right: 20px;
  }
}
.line-view {
  width: 100%;
  height: 1px;
  background: $main-style-color;
  margin: 30px 0 20px 0;
}
/deep/ .el-form-item {
  padding: 20px 30px 0 30px;
}
</style>
