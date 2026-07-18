<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div v-if="true" class="block-body">
      <!-- <div class="page-description">{{ $t('wan.vpnServerScri') }}</div> -->
      <div class="page-description">{{$t('common.unuse')}}</div>
    </div>
    <div v-else class="block-body">

      <section class="item-view">
        <div class="left-title">{{ $t('wan.openVPN') }}:</div>
        <el-switch style="flex:1;" v-model="openVPN" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        <div class="edit-btn" @click="editVpn('openVPN')">
          <svg-icon icon-class="edit"></svg-icon>
        </div>
      </section>
      <section class="item-view">
        <div class="left-title">{{ $t('wan.IPsecVPN') }}:</div>
        <el-switch style="flex:1;" v-model="ipsecVPN" active-color="#00dc50" inactive-color="#8d9092"></el-switch>
        <div class="edit-btn" @click="editVpn('IPsecVPN')">
          <svg-icon icon-class="edit"></svg-icon>
        </div>
      </section>
      <section class="item-view radio-view">
        <el-radio :label="'PSK'" v-model="securityRadio">PSK</el-radio>
        <el-radio :label="'RSA'" v-model="securityRadio">RSA</el-radio>
      </section>
      <el-table :data="tableData" style="width: 85%">
        <div slot="empty" style="text-align: left;">{{$t('wan.noData')}}</div>
        <!-- <el-table-column prop="connectionType" :label="$t('wan.tableConnectionType')" width="120"></el-table-column>
      <el-table-column prop="remoteIP" :label="$t('wan.tableRemoteIP')" width="120"></el-table-column>
      <el-table-column prop="localIP" :label="$t('wan.tableLocalIP')" width="120"></el-table-column>
      <el-table-column prop="duration" :label="$t('wan.duration')" width="110"></el-table-column>
      <el-table-column prop="Edit" :label="$t('common.edit')" width="100"></el-table-column> -->
        <el-table-column prop="connectionType" :label="$t('wan.tableConnectionType')" min-width="20%"></el-table-column>
        <el-table-column prop="remoteIP" :label="$t('wan.tableRemoteIP')" min-width="20%"></el-table-column>
        <el-table-column prop="localIP" :label="$t('wan.tableLocalIP')" min-width="20%"></el-table-column>
        <el-table-column prop="duration" :label="$t('wan.duration')" min-width="20%"></el-table-column>
        <el-table-column prop="Edit" :label="$t('common.edit')" min-width="20%"></el-table-column>
      </el-table>
    </div>
    <add-file-dialog :show-dialog='showOpenVpnDialogInfo.showDialog' :show-bottom-btn="false" :title-bg-img="showOpenVpnDialogInfo.titleBgImg" :title="showOpenVpnDialogInfo.title" @leftBtnClick="showOpenVpnDialogInfo.showDialog = false" @closeDialog="showOpenVpnDialogInfo.showDialog = false" @rightBtnClick="apply">
      <open-vpn></open-vpn>
    </add-file-dialog>
    <add-file-dialog :show-dialog='showIKEServerdialogInfo.showDialog' :title-bg-img="showIKEServerdialogInfo.titleBgImg" :title="showIKEServerdialogInfo.title" :msg-title="showIKEServerdialogInfo.msgTitle" :show-close-btn="showIKEServerdialogInfo.showCloseBtn" :left-btn-text="showIKEServerdialogInfo.leftBtnText" :right-btn-text="showIKEServerdialogInfo.rightBtnText" @leftBtnClick="showIKEServerdialogInfo.showDialog = false" @rightBtnClick="IKEConfigSave" @closeDialog="showIKEServerdialogInfo.showDialog = false">
      <el-form ref="formData" :model="IKEformData" :rules="IKEformDataRules" label-width="60%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('wan.wanIP')" prop="wanIP">
          <mine-input :key="'wanIP'" v-model="IKEformData.wanIP"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.clientIPAddress')" prop="clientIPAddress">
          <div class="client-view">
            <mine-input :key="'clientIPAddress'" v-model="IKEformData.clientIPAddress"></mine-input>
            <div>~192.168.7.18</div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.primaryDNSServer')" prop="primaryDNSServer">
          <mine-input :key="'primaryDNSServer'" v-model="IKEformData.primaryDNSServer"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('quickSetup.secondaryDNSServer')" prop="secondaryDNSServer">
          <mine-input :key="'secondaryDNSServer'" v-model="IKEformData.secondaryDNSServer"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.preSharedKey')" prop="preSharedKey">
          <mine-input :key="'preSharedKey'" v-model="IKEformData.preSharedKey"></mine-input>
        </el-form-item>
      </el-form>
    </add-file-dialog>
  </div>
</template>

<script>
import { getWanDMZInfo, setWanDMZInfo } from '@/api/wan'
import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
// import MineDialog from '@/components/MineDialog'
import OpenVpn from '@/views/wan/VpnServer/openVpn.vue'
export default {
  name: 'VpnServer',
  components: { AddFileDialog, OpenVpn },
  data() {
    return {
      openVPN: true,
      ipsecVPN: true,
      securityRadio: 'PSK',
      tableData: [
        { connectionType: '11', remoteIP: '11', localIP: '11', duration: '11' }
      ],

      IKEformData: {
        wanIP: '192.168.1.113',
        clientIPAddress: '192.168.7.11',
        primaryDNSServer: '8.8.8.8',
        secondaryDNSServer: '8.8.4.4',
        preSharedKey: 'SsEsCcRrEeTt'
      },
      IKEformDataRules: {
        wanIP: [{ required: true, trigger: 'blur' }],
        clientIPAddress: [{ required: true, trigger: 'blur' }],
        primaryDNSServer: [{ required: true, trigger: 'blur' }],
        preSharedKey: [{ required: true, trigger: 'blur' }]
      },
      showIKEServerdialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        titleBgImg: 'add-2',
        title: 'wan.ikeVPNServrConfig', // 标题
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'common.save' //左侧按钮的描述
      },
      showOpenVpnDialogInfo: {
        showDialog: false,
        showBottomBtn: false,
        titleBgImg: 'edit-gray',
        title: 'wan.ikeVPNServrConfig' // 标题
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
    IKEConfigSave() {
      this.showIKEServerdialogInfo.showDialog = false
    },
    // 编辑VPN信息
    editVpn(val) {
      if (val == 'IPsecVPN') {
        this.showIKEServerdialogInfo.showDialog = true
      } else if (val == 'openVPN') {
        this.showOpenVpnDialogInfo.showDialog = true
      }
    },
    apply() {},
    cancel() {
      this.dmzSwitch = this.defaultDmzSwitch
      this.dmzHostIP = this.defaultDmzHostIP
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
  .item-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: space-between;
    width: 100%;
    margin: 20px 0;
    height: 40px;
    line-height: 40px;
    .left-title {
      // width: 20%;
      margin-right: 40px;
      flex: 1;
    }
  }
}
.client-view {
  display: flex;
  flex-direction: row;
}
.edit-btn {
  flex: 1;
  margin-left: 50px;
}
.radio-view {
  margin: 20px auto;
  padding: 0 25%;
  text-align: center;
  justify-content: space-around;
}
/deep/ .cell {
  word-break: break-word;
}
/deep/ .svg-icon {
  width: 30px;
  height: 30px;
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
