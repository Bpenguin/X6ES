<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('wan.dmzScri') }}</div>
    </div>
    <div class="block-body mar-top">
      <!-- <el-row class="c-row">
        <el-col :span="8">
          <div>{{ $t('nav.wanDmz') }}:</div>
        </el-col>
        <el-col :span="16">
          <el-switch v-model="dmzFormData.dmzSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-col>
      </el-row> -->
      <el-form :model="dmzFormData" :rules="dmzFormDataRule" ref="dmzFormData" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('nav.wanDmz')" prop="dmzSwitch">
          <el-switch v-model="dmzFormData.dmzSwitch" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('wan.dmzHostIP')" prop="dmzHostIP">
          <mine-input :key="'dmzHostIP'" v-model="dmzFormData.dmzHostIP" :disabled="!dmzFormData.dmzSwitch" :placeholder="$t('placeHolder.ipAddressPH')"></mine-input>
        </el-form-item>
      </el-form>
      <!-- <el-row class="c-row">
        <el-col :span="12" :xs="16">
          <div>{{ $t('wan.dmzHostIP') }}:</div>
        </el-col>
        <el-col :span="12" :xs="18">
          <mine-input :key="'dmzHostIP'" v-model="dmzFormData.dmzHostIP" :disabled="!dmzFormData.dmzSwitch" :placeholder="'e.g., 192.168.0.100'"></mine-input>
        </el-col>
      </el-row> -->
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancel"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="apply"></mine-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getWanDMZInfo, setWanDMZInfo } from '@/api/wan'
import { getLanDhcpInfoApi } from '@/api/system'

import formVaRule from '@/formValidator/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'DMZ',
  data() {
    var IpAddressRule = (rule, value, callback) => {
      if (this.lanIp != value.split('.').slice(0, 3).join('.')) {
        callback(new Error(this.$t('other.DMZUnsameIP')))
        return
      }
      callback()
    }
    return {
      defaultDmzSwitch: false, // 已设置的信息
      defaultDmzHostIP: '', // 已设置的信息
      dmzSwitch: true,
      dmzHostIP: '',
      dmzFormData: {
        dmzSwitch: true,
        dmzHostIP: ''
      },
      dmzFormDataRule: {
        dmzHostIP: [
          {
            required: true,
            message: this.$t('ruleTip.DMZIPAddrRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: formVaRule.DMZIPAddrRule,
            trigger: ['blur', 'change']
          },
          {
            validator: IpAddressRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      lanIp: ''
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
      this.dmzFormData.dmzSwitch = this.defaultDmzSwitch
      this.dmzFormData.dmzHostIP = this.defaultDmzHostIP
    })
    getLanDhcpInfoApi().then((data) => {
      if (data.retcode == 0) {
        this.lanIp = data.ipaddr.split('.').slice(0, 3).join('.')
      }
    })
  },
  methods: {
    apply() {
      this.$refs.dmzFormData.validate((valid, val) => {
        if (valid) {
          let parma = {
            dmz_status: this.dmzFormData.dmzSwitch ? 1 : 0,
            dmz_ipaddr: this.dmzFormData.dmzHostIP
          }
          setWanDMZInfo(parma).then((data) => {
            if (data.retcode == 0) {
              this.defaultDmzSwitch = this.dmzFormData.dmzSwitch
              this.defaultDmzHostIP = this.dmzFormData.dmzHostIP
              this.$publicFun.showSucMessage(this)
            } else {
              this.$publicFun.showErrMessage(this)
            }
          })
        }
      })
    },
    cancel() {
      this.dmzFormData.dmzSwitch = this.defaultDmzSwitch
      this.dmzFormData.dmzHostIP = this.defaultDmzHostIP
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.mar-top {
  margin-top: 50px !important;
}
</style>
