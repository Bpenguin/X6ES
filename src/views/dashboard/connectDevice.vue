<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-martop" v-for="(item,index) in [tableData,guestWifiData,blockData]" :key="index">
      <div class="block-body">
        <el-row>
          <el-col :span="12">
            <div>
              {{ index == 0?$t('nav.connectedDevices')+ ' - ' + $t('other.ConnectedDevicesDetail'):index == 1?$t('nav.connectedDevices')+ ' - ' + $t('other.GuestWiFi'):$t('other.BlockedDevices')}}({{ item.length }})
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="block-body table-block">
        <el-table v-if="index != 2" :data="item" style="width: 150%">
          <div slot="empty" style="text-align: left;display: none;">{{$t('wan.noData')}}</div>
          <el-table-column prop="DeviceName" :label="$t('homeNet.deviceName')" min-width="20%"></el-table-column>
          <el-table-column prop="Ip" :label="$t('quickSetup.ipAddress')" min-width="20%"></el-table-column>
          <el-table-column prop="Mac" :label="$t('wan.macAddress')" min-width="20%"></el-table-column>
          <el-table-column prop="Bridge" :label="$t('dashboard.Connection')" :formatter="ConnectionFormatter" min-width="20%"></el-table-column>
          <el-table-column prop="Duration_fill" :label="$t('wan.duration')" min-width="20%"></el-table-column>
          <el-table-column prop="Edit" :label="$t('common.edit')" min-width="20%">
            <template slot-scope="scope">
              <div class="btn-row" v-if="scope.row.Bridge != 0">
                <mine-button :btn-title="$t('other.Block')" @clickBtn="addBlockDevice(scope.$index, scope.row)"></mine-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-else :data="item" style="width: 150%">
          <div slot="empty" style="text-align: left;display: none;">{{$t('wan.noData')}}</div>
          <el-table-column prop="DeviceName" :label="$t('homeNet.deviceName')" min-width="30%"></el-table-column>
          <el-table-column prop="Mac" :label="$t('wan.macAddress')" min-width="40%"></el-table-column>
          <el-table-column prop="Edit" :label="$t('common.edit')" min-width="30%">
            <template slot-scope="scope">
              <div class="btn-row">
                <mine-button :btn-title="$t('other.Unblock')" @clickBtn="addUnblockDevice(scope.$index, scope.row)"></mine-button>
                <!-- <div class="btn-item" @click="addUnblockDevice(scope.$index, scope.row)">
                  {{ $t('other.Unblock') }}
                </div> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <add-file-dialog :show-dialog='showAddDialogInfo.showDialog' :title-bg-img="showAddDialogInfo.titleBgImg" :title="showAddDialogInfo.title" @leftBtnClick="showAddDialogInfo.showDialog = false" @closeDialog="showAddDialogInfo.showDialog = false" @rightBtnClick="apply">
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="60%" label-position="top" size="mini">
        <el-form-item :label="$t('homeNet.deviceName')" prop="DeviceName">
          <mine-input :key="'DeviceName'" v-model="formData.DeviceName"></mine-input>
        </el-form-item>
      </el-form>
    </add-file-dialog>
  </div>
</template>

<script>
import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
import { getConnectedDevicesInfo } from '@/api/doshboard'
import {
  getBlockedDeviceInfo,
  setBlockedDeviceExe,
  delBlockedDeviceExe
} from '@/api/wifi'
export default {
  name: 'ConectDevice',
  components: { AddFileDialog },
  data() {
    return {
      hostWifiData: [],
      tableData: [],
      guestWifiData: [], // 游客WIFI设备
      blockData: [], // 黑名单设备
      formData: {
        DeviceName: '',
        Ip: '',
        Mac: '',
        Bridge: '',
        Connection: '',
        Duration: '',
        Duration_fill: ''
      },
      formDataRules: {
        DeviceName: [{ required: true, trigger: 'blur' }]
      },
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
    // 添加黑名单
    addBlockDevice(index, row) {
      let params = {
        Enable: 1,
        DeviceName: row.DeviceName,
        Mac: row.Mac
      }
      setBlockedDeviceExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    addUnblockDevice(index, row) {
      let params = { Mac: row.Mac }
      delBlockedDeviceExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    initData() {
      // 获取连接设备数量
      getConnectedDevicesInfo().then((data) => {
        this.connectDevicNum = 0
        if (data.retcode == 0) {
          this.tableData = []
          this.guestWifiData = []
          this.blockData = []
          if (data.ConnectedDevicesList.length > 0) {
            data.ConnectedDevicesList.forEach((item) => {
              item.Duration_fill = this.formateSeconds(item.Duration)
              switch (item.Bridge) {
                case 0:
                case 1:
                case 3:
                case 5:
                  this.tableData.push(item)
                  return
                case 2:
                case 4:
                case 6:
                  this.guestWifiData.push(item)
                  return
              }
            })
          }
          if (data.BlockedDevicesList.length > 0) {
            data.BlockedDevicesList.forEach((item) => {
              this.blockData.push(item)
            })
          }
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
    },
    handleDelete(index, row) {
      console.log(index, row)
      // this.tableData.splice(index, 1)
    },
    ConnectionFormatter(row) {
      console.log('ConnectionFormatter', row)
      switch (row.Bridge) {
        case 0:
          return 'Ethernet'
        case 1:
          return 'WiFi-2.4GHz'
        case 2:
          return 'Guest WiFi-2.4GHz'
        case 3:
          return 'WiFi-5GHz'
        case 4:
          return 'Guest WiFi-5GHz'
        case 5:
          return 'WiFi-6GHz'
        case 6:
          return 'Guest WiFi-6GHz'
        default:
          return ''
      }
    },
    //将秒转化为时分秒
    formateSeconds(endTime) {
      let secondTime = parseInt(endTime) //将传入的秒的值转化为Number
      console.log('secondTime', secondTime)
      let min = 0 // 初始化分
      let h = 0 // 初始化小时
      let result = ''
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        min = parseInt(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
        if (min > 60) {
          //如果分钟大于60，将分钟转换成小时
          h = parseInt(min / 60) //获取小时，获取分钟除以60，得到整数小时
          min = parseInt(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
        }
      }
      result = `${h.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
      return result
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
    color: $light-style-color;
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
  background: $light-style-color;
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
