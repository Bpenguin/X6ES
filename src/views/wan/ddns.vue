<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div v-if="true" class="block-body">
      <!-- <div class="page-description">{{ $t('wan.vpnServerScri') }}</div> -->
      <div class="page-description">{{$t('common.unuse')}}</div>
    </div>
    <div v-else class="block-body">
    </div>
  </div>
  <!-- <div class="status-content">
    <div class="scri-view">{{ $t('wan.wanDdnsScri') }}</div>
    <div class="content-view">
      <section class="item-view">
        <div class="left-title">{{ $t('wan.wanPortPing') }}:</div>
        <el-switch v-model="ddnsSwitch" active-color="#00dc50" inactive-color="#8d9092" @change="changeSwitchDDNS"></el-switch>
      </section>
      <div v-if="showForm">
        <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="40%" :label-position="formLablePos" size="mini">

          <el-form-item :label="$t('wan.ddnsService')+':'" prop="ddnsService">
            <el-select v-model="formData.ddnsService" popper-class="x6-select">
              <el-option v-for="item in serviceModes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('wan.hostName')+':'" prop="hostName">
            <mine-input :key="'hostName'" v-model="formData.hostName"></mine-input>
          </el-form-item>
          <el-form-item :label="$t('common.username')+':'" prop="username">
            <mine-input :key="'username'" v-model="formData.username"></mine-input>
          </el-form-item>
          <el-form-item :label="$t('common.password')+':'" prop="password">
            <pwd-input :key="'password'" v-model="formData.password"></pwd-input>
          </el-form-item>
          <el-form-item :label="$t('quickSetup.useExtIPCheck')+':'" prop="useExtIPCheck">
            <el-switch v-model="formData.useExtIPCheck" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('quickSetup.useHttpSecure')+':'" prop="useHttpSecure">
            <el-switch v-model="formData.useHttpSecure" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
          </el-form-item>
        </el-form>
        <div class="bottom-btn">
          <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelChangeFormdata"></mine-button>
          <mine-button class="right-btn" :btn-title="$t('common.apply')" @clickBtn="saveFormdata"></mine-button>
        </div>
        <div class="line"></div>
        <el-row class="bottom-view">
          <el-col :span="8">
            <div style="min-width:200px">{{ $t('nav.wanStatus') }}</div>
          </el-col>
          <el-col :span="16">
            <el-col :span="12">IP:--.--.--.--</el-col>
            <el-col :span="12">{{$t('wan.unChecked')}}</el-col>
          </el-col>
        </el-row>
        <el-row class="bottom-view">
          <el-col :span="8">
            <div style="min-width:200px">{{ $t('nav.wanStatus') }}</div>
          </el-col>
          <el-col :span="16">
            <el-col :span="12">{{$t('wan.unChecked')}}</el-col>
            <el-col :span="12">
              <mine-button :btn-title="$t('wan.checkStatus')"></mine-button></el-col>
          </el-col>
        </el-row>
      </div>
    </div>
  </div> -->
</template>

<script>
import { getWanDMZInfo, setWanDMZInfo } from '@/api/wan'
import PwdInput from '@/components/PwdInput'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WANPing',
  components: { PwdInput },
  data() {
    return {
      ddnsSwitch: false, // 已设置的信息
      showForm: false,
      formData: {
        ddnsSwitch: false, // 已设置的信息
        ddnsService: 0,
        hostName: 'yourhost.example.com',
        username: 'your_username',
        password: 'your_password',
        useExtIPCheck: true,
        useHttpSecure: false
      },
      formDataRules: {
        hostName: [{ required: true, trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      serviceModes: [
        { value: 0, label: 'Dyn.com' },
        { value: 1, label: 'NO IP' },
        { value: 2, label: 'Google' },
        { value: 3, label: 'Cloudflare' }
      ]
    }
  },
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    getWanDMZInfo().then((data) => {
      if (data.retcode == 0) {
        this.defaultDmzSwitch = data.dmz_status == 0 ? false : true
        this.defaultDmzHostIP = data.dmz_ipaddr
      }
      this.dmzSwitch = this.defaultDmzSwitch
      this.dmzHostIP = this.defaultDmzHostIP
    })
  },
  methods: {
    changeSwitchDDNS(val) {
      this.showForm = val
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.status-content {
  color: $default-font-color;
  padding: 40px;
  .scri-view {
    font-size: 16px;
    padding-right: 20px;
    color: $gray-font-color;
  }
}
.content-view {
  width: 100%;
  margin: 40px 0;
}
.item-view {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  margin-bottom: 18px;
  .left-title {
    width: 40%;
    // margin-right: 40px;
  }
}
.line {
  width: 100%;
  height: 2px;
  margin: 5px auto;
  background: $light-style-color;
}
.bottom-btn {
  display: block;
  width: 100%;
  color: white;
  text-align: right;
  margin-top: 30px;
  margin-bottom: 20px;
  div {
    margin-right: 20px;
  }
}
.bottom-view {
  margin: 20px;
}
// .el-row {
//   display: flex;
//   flex-wrap: wrap;
// }
</style>
