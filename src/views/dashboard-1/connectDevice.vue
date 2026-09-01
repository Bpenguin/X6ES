<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-martop" v-for="(item,index) in [tableData,guestWifiData,blockData]" :key="index">
      <div class="block-body">
        <el-row>
          <el-col :span="12">
            <div>
              {{ index == 0? 'Connected devices - Host WiFi and others':index == 1?'Connected devices - Guest WiFi':'Blocked devices'}}({{ item.length }})
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="block-body table-block">
        <el-table v-if="index != 2" :data="item" style="width: 150%">
          <div slot="empty" style="text-align: left;display: none;">{{$t('wan.NoData')}}</div>
          <el-table-column prop="hostname" :label="$t('homeNet.deviceName')" min-width="20%"></el-table-column>
          <el-table-column prop="ip" :label="$t('quickSetup.ipAddress')" min-width="20%"></el-table-column>
          <el-table-column prop="mac" :label="$t('wan.macAddress')" min-width="20%"></el-table-column>
          <el-table-column prop="Connection" :label="$t('dashboard.Connection')" :formatter="ConnectionFormatter" min-width="20%"></el-table-column>
          <el-table-column prop="duration" :label="$t('wan.duration')" min-width="20%"></el-table-column>
          <!-- <el-table-column prop="Status" :label="$t('wan.tableStatus')" min-width="20%">
          <template slot-scope="scope1">
            <el-switch v-model="scope1.row.status" @change="webChange" active-color="#00752b" inactive-color="#8d9092"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="Edit" :label="$t('common.edit')" min-width="20%">
          <template slot-scope="scope">
            <div class="btn-view">
              <div class="btn-item" @click="handleEdit(scope.$index, scope.row)">
                <svg-icon icon-class="edit"></svg-icon>
              </div>
              <div class="btn-item" @click="handleDelete(scope.$index, scope.row)">
                <svg-icon icon-class="delete"></svg-icon>
              </div>
            </div>
          </template>
        </el-table-column> -->
        </el-table>
        <el-table v-else :data="item" style="width: 150%">
          <div slot="empty" style="text-align: left;display: none;">{{$t('wan.NoData')}}</div>
          <el-table-column prop="hostname" :label="$t('homeNet.deviceName')" min-width="30%"></el-table-column>
          <el-table-column prop="mac" :label="$t('wan.macAddress')" min-width="40%"></el-table-column>
          <el-table-column prop="Edit" :label="$t('common.edit')" min-width="30%"></el-table-column>
        </el-table>
      </div>
    </div>
    <add-file-dialog :show-dialog='showAddDialogInfo.showDialog' :title-bg-img="showAddDialogInfo.titleBgImg" :title="showAddDialogInfo.title" @leftBtnClick="showAddDialogInfo.showDialog = false" @closeDialog="showAddDialogInfo.showDialog = false" @rightBtnClick="apply">
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="60%" label-position="top" size="mini">
        <el-form-item :label="$t('homeNet.deviceName') +':'" prop="hostname">
          <mine-input :key="'hostname'" v-model="formData.hostname"></mine-input>
        </el-form-item>
      </el-form>
    </add-file-dialog>
  </div>
</template>

<script>
import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
import { getLanAssociatedClientInfo } from '@/api/doshboard'
import { getLanMacFilterInfoApi } from '@/api/wifi'
export default {
  name: 'Ipv6Index',
  components: { AddFileDialog },
  data() {
    return {
      hostWifiData: [],
      webAppControllerSwitch: false,
      urlControllerSwitch: true,
      tableData: [
        // {
        //   hostname: 'GeFore Now UDP Port 49003-49006',
        //   mac: '10.10.10.1',
        //   ip: '',
        //   method: 0,
        //   Connection: '',
        //   Duration: ''
        // }
      ],
      guestWifiData: [], // 游客WIFI设备
      blockData: [], // 黑名单设备
      formData: {
        hostname: '',
        ip: '',
        mac: '',
        method: '',
        Connection: '',
        Duration: ''
      },
      formDataRules: {
        hostname: [{ required: true, trigger: 'blur' }]
      },
      statusModes: [
        { value: 0, label: 'ON' },
        { value: 1, label: 'OFF' }
      ],
      // 编辑规则的弹框
      showAddDialogInfo: {
        showDialog: false,
        title: 'common.add', // 标题
        titleBgImg: 'add-2',
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
      // 接入的设备信息
      getLanAssociatedClientInfo().then((data) => {
        /* 
        clientList 网口接入的设备
        clientList1 Wlan接入的设备
        */
        if (data.retcode == 0) {
          // this.tableData = []
          if (data.clientList.length > 0) {
            this.tableData.push(...data.clientList)
          }
          if (data.clientList1.length > 0) {
            data.clientList1.forEach((item) => {
              switch (item.method) {
                case 0:
                case 1:
                case 3:
                  this.tableData.push(item)
                  return
                case 2:
                case 4:
                  this.guestWifiData.push(item)
                  return
              }
            })
          }
        }
      })
      /* 黑名单信息 */
      getLanMacFilterInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.blockData = []
          this.blockData.push(...data.black_mac_list)
          console.log('this.blockData:', this.blockData)
        }
      })
    },
    // 提交规则信息
    apply() {
      this.showAddDialogInfo.showDialog = false
    },
    // 添加规则
    addFile() {
      this.showAddDialogInfo.showDialog = true
    },
    handleEdit(index, row) {
      console.log(index, row)
      // this.formData.commonServices = 'GeFore Now UDP Port 49003-49006'
      // this.servicesChange(this.formData.commonServices)
      // this.showAddDialogInfo.showDialog = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      // this.tableData.splice(index, 1)
    },
    ConnectionFormatter(row) {
      console.log('ConnectionFormatter', row)
      if (!row.method) return ''
      switch (row.method) {
        case 0:
          return 'ethernet'
        case 1:
          return 'Host WiFi-2.4GHz'
        case 2:
          return 'Guest WiFi-2.4GHz'
        case 3:
          return 'Host WiFi-5GHz-6GHz'
        case 4:
          return 'Guest WiFi-5GHz-6GHz'
        default:
          return ''
      }
    },
    webChange() {},
    urlChange() {}
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.block-martop {
  margin-top: 30px;
  margin-bottom: 30px;
}
.main-view {
  padding: 40px;
  color: $default-font-color;
}
.sec-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  .label-left {
    width: 280px;
  }
}

.mian-content {
  position: relative;
  width: 100%;
  .add-btn {
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: $main-style-color;
    text-align: right;
  }
}
.btn-view {
  display: flex;
  flex-direction: row;
  .btn-item {
    margin-left: 6px;
  }
}
.scri-view {
  font-size: 16px;
  margin-bottom: 40px;
  color: $gray-font-color;
  line-height: 16px;
}
.botttom-scr {
  margin-top: 10px;
}
.scri-view-bottom {
  margin-bottom: 0;
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

//替换左边默认图标
/deep/.time-select .el-icon-arrow-up::before {
  content: '';
  background: url('../../assets/img/time.png') center center no-repeat;
  background-size: cover;
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
//替换左边默认图标
/deep/.time-select .is-reverse {
  clear: both !important;
}
//
/deep/.time-select .el-select__caret {
  transform: none !important;
}
/deep/ .cell {
  word-break: break-word;
}
/deep/ .svg-icon {
  width: 30px;
  height: 30px;
}
</style>
