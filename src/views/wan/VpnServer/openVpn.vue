<template>
  <div>

    <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="30%" :label-position="formLablePos" size="mini">
      <el-form-item :label="$t('wan.tableName')" prop="name">
        <div class="radio-view">
          <el-radio class="radio-item" v-model="formData.protocolRadio" label="UDP">UDP</el-radio>
          <el-radio class="radio-item" v-model="formData.protocolRadio" label="TCP">TCP</el-radio>
        </div>
      </el-form-item>
      <el-form-item :label="$t('wan.wanIP')" prop="wanIP">
        <mine-input :key="'wanIP'" v-model="formData.wanIP"></mine-input>
      </el-form-item>
      <el-form-item :label="$t('wan.servicePort')" prop="servicePort">
        <mine-input :key="'servicePort'" v-model="formData.servicePort"></mine-input>
      </el-form-item>
      <el-form-item :label="$t('wan.vpnSubnet')" prop="vpnSubnet">
        <mine-input :key="'vpnSubnet'" v-model="formData.vpnSubnet"></mine-input>
      </el-form-item>

      <el-form-item :label="$t('wan.vpnNetmask')" prop="vpnNetmask">
        <mine-input :key="'vpnNetmask'" v-model="formData.vpnNetmask"></mine-input>
      </el-form-item>
      <el-form-item :label="$t('wan.userAccess')" prop="userAccess">
        <div>
          <el-radio class="user-access" v-model="formData.userAccess" label="1">{{ $t('wan.homeNetwork') }}</el-radio>
          <el-radio class="user-access" v-model="formData.userAccess" label="2">{{ $t('wan.internetAndNetwork') }}</el-radio>
        </div>
      </el-form-item>
    </el-form>
    <div class="bottom-view">
      <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelChangeFormdata"></mine-button>
      <mine-button class="right-btn" :btn-title="$t('common.save')" @clickBtn="saveFormdata"></mine-button>
    </div>

    <div class="line"></div>
    <div class="section-view">
      <div>{{ $t('wan.exportConfiguration') }}</div>
      <mine-button :btn-title="$t('common.export')" @clickBtn="exportConfig"></mine-button>
    </div>
    <div class="line"></div>
    <div class="section-view">
      <div>{{ $t('wan.certificate') }}
        <span class="cer-status">{{$t(hasCer?'common.none':'common.existing') }}</span>
      </div>
      <mine-button :btn-title="$t('wan.generateNew')" @clickBtn="generateNewCer"></mine-button>
    </div>
  </div>
</template>
<script>
import theme from '@/styles/theme.module.scss'
export default {
  name: 'OpenVpn',
  components: {},
  computed: {
    theme() {
      return theme
    },
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },

  data() {
    return {
      hasCer: false,
      formData: {
        protocolRadio: 'UDP',
        wanIP: '192.18.1.113',
        servicePort: '1194',
        vpnSubnet: '192.168.8.0',
        vpnNetmask: '255.255.255.0',
        userAccess: '2'
      },
      formDataRules: {
        wanIP: [{ required: true, trigger: 'blur' }],
        servicePort: [{ required: true, trigger: 'blur' }],
        vpnSubnet: [{ required: true, trigger: 'blur' }],
        vpnNetmask: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  methods: {
    // 取消按钮
    cancelChangeFormdata() {},
    // 保存按钮
    saveFormdata() {},
    // 导出配置
    exportConfig() {},

    // 证书申请
    generateNewCer() {},
    // 提交信息
    apply() {}
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
.radio-view {
  display: flex;
  .radio-item {
    flex: 1;
    min-width: 60px;
    overflow-wrap: break-word;
    margin-right: 0;
  }
}
.user-access {
  width: 50%;
  min-width: 200px;
  overflow-wrap: break-word;
  margin-right: 0;
}
.section-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.cer-status {
  margin-left: 30px;
}
.bottom-view {
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 20px auto;
  justify-content: center;
  .right-btn {
    margin-left: 40px;
  }
}
.close-btn {
  position: absolute;
  right: 20px;
  top: 10px;
  height: 30px;
  line-height: 30px;
  color: $gray-font-color;
  font-size: 20px;
  // img {
  //   width: 100%;
  //   height: 100%;
  // }
}
.line {
  width: 100%;
  height: 2px;
  margin: 5px auto;
  background: $light-style-color;
}
</style>