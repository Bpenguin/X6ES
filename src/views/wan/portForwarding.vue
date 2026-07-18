<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('wan.wanPortForwardingscri') }}</div>
    </div>
    <div class="block-body">
      <div class="add-btn" @click="addFile">
        <svg-icon icon-class="add" class-name="link-svg"></svg-icon>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <div slot="empty" style="text-align: left;">{{$t('wan.noData')}}</div>
        <el-table-column prop="name" :label="$t('wan.tableName')" min-width="14%"></el-table-column>
        <el-table-column prop="WANPort" :label="$t('wan.tableWANPort')" min-width="14%"></el-table-column>
        <el-table-column prop="LanIPAddress" :label="$t('wan.tableLanIPAddress')" min-width="14%"></el-table-column>
        <el-table-column prop="LanPort" :label="$t('wan.tableLanPort')" min-width="14%"></el-table-column>
        <el-table-column prop="Protocol" :label="$t('wan.tableProtocol')" :formatter="protocolFormatter" min-width="14%"></el-table-column>
        <el-table-column prop="Status" :label="$t('wan.tableStatus')" :formatter="statusFormatter" min-width="14%"></el-table-column>
        <el-table-column prop="Edit" :label="$t('common.edit')" min-width="14%">
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
        </el-table-column>
      </el-table>
    </div>
    <add-file-dialog :show-dialog='showAddDialogInfo.showDialog' :title-bg-img="showAddDialogInfo.titleBgImg" :title="showAddDialogInfo.title" @leftBtnClick="cancelEdit" @closeDialog="cancelEdit" @rightBtnClick="apply">
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('wan.commonServices')" prop="commonServices">
          <el-select v-model="formData.commonServices" popper-class="x6-select" @change="servicesChange" :placeholder="$t('placeHolder.protForwardServicePH')">
            <el-option v-for="item in commonServicesModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('wan.tableName')" prop="name">
          <mine-input :key="'name'" place :placeholder="$t('placeHolder.macFilterNamePH')" v-model="formData.name"></mine-input>
        </el-form-item>
        <!-- 更新设备IP -->
        <div class="device-btn">
          <div @click="openDeviceDialog">{{ $t('wan.getDeviceIP') }}</div>
        </div>
        <el-form-item :label="$t('wan.tableLanIPAddress')" prop="lanIPAddress">
          <mine-input :key="'lanIPAddress'" v-model="formData.lanIPAddress" :placeholder="$t('placeHolder.protForwardIPPH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.tableLanPort')" prop="lanPort">
          <mine-input :key="'lanPort'" v-model="formData.lanPort" :placeholder="$t('placeHolder.protForwardILanPortPH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.tableWANPort')" prop="WANPort">
          <mine-input :key="'WANPort'" v-model="formData.WANPort" :placeholder="$t('placeHolder.protForwardILanPortPH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.tableProtocol')" prop="protocol">
          <el-select v-model="formData.protocol" popper-class="x6-select">
            <el-option v-for="item in protocolModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('wan.tableStatus')" prop="status">
          <el-select v-model="formData.status" popper-class="x6-select">
            <el-option v-for="item in statusModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </add-file-dialog>
    <mine-dialog :show-dialog='showDeviceDialogInfo.showDialog' :title-bg-img="showDeviceDialogInfo.titleBgImg" :title="showDeviceDialogInfo.title" :msg-title="showDeviceDialogInfo.msgTitle" :show-close-btn="showDeviceDialogInfo.showCloseBtn" :left-btn-text="showDeviceDialogInfo.leftBtnText" :right-btn-text="showDeviceDialogInfo.rightBtnText" @closeDialog="showDeviceDialogInfo.showDialog = false" @leftBtnClick="showDeviceDialogInfo.showDialog = false" @rightBtnClick="updateDeviceIp">
      <div class="device-select">
        <el-select v-model="deviceIp" popper-class="x6-select" :placeholder="''">
          <el-option v-for="item in deviceIpLists" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </mine-dialog>
  </div>
</template>

<script>
import {
  getPortForwardingRules,
  addPortForwardingRules,
  delPortForwardingRules,
  editPortForwardingRules
} from '@/api/wan'
import { getConnectedDevicesInfo } from '@/api/doshboard'

import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
import MineDialog from '@/components/MineDialog'
import { commonServicesModes } from '@/utils/selectsList'
import formVaRule from '@/formValidator/index'
export default {
  name: 'PortForwarding',
  components: { AddFileDialog, MineDialog },
  computed: {
    commonServicesModes() {
      return commonServicesModes
    },
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  data() {
    return {
      deviceIp: '',
      deviceIpLists: [],
      tableData: [],
      formData: {
        RuleID: '',
        commonServices: '',
        name: '',
        WANPort: '',
        lanIPAddress: '',
        lanPort: '',
        protocol: 0,
        status: 0
      },
      formDataRules: {
        name: [
          {
            required: true,
            validator: formVaRule.macFilterNameRule,
            trigger: ['blur', 'change']
          }
        ],
        lanIPAddress: [
          {
            required: true,
            validator: formVaRule.portforwardIPRule,
            trigger: ['blur', 'change']
          }
        ],
        lanPort: [
          {
            required: true,
            validator: formVaRule.portforwardPortRule,
            trigger: ['blur', 'change']
          }
        ],
        WANPort: [
          {
            required: true,
            validator: formVaRule.portforwardPortRule,
            trigger: ['blur', 'change']
          }
        ],
        protocol: [{ required: true, trigger: ['blur', 'change'] }],
        status: [{ required: true, trigger: ['blur', 'change'] }]
      },
      protocolModes: [
        { value: 0, label: 'TCP' },
        { value: 1, label: 'UDP' },
        { value: 2, label: 'TCP/UDP' }
      ],
      statusModes: [
        { value: 0, label: 'OFF' },
        { value: 1, label: 'ON' }
      ],
      // 编辑规则的弹框
      showAddDialogInfo: {
        showDialog: false,
        title: 'common.add', // 标题
        titleBgImg: 'add-2',
        leftBtnText: 'common.ok' //右侧按钮的描述
      },
      // 获取设备IP的弹框
      showDeviceDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'wan.getDeviceIP', // 标题
        titleBgImg: 'edit-gray',
        // msgTitle: 'networkSec.toNetWorkSecTip',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'common.apply' //左侧按钮的描述
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // 获取连接的设备信息
      getConnectedDevicesInfo().then((data) => {
        if (data.retcode == 0) {
          let dataArray = data.ConnectedDevicesList
          if (dataArray.length > 0) {
            this.deviceIpLists = []
            dataArray.forEach((item) => {
              this.deviceIpLists.push({
                value: item.Ip,
                label: item.DeviceName
              })
            })
          }
        }
      })
      // 获取已配置的规则
      getPortForwardingRules().then((data) => {
        if (data.retcode == 0) {
          let dataArray = data.port_fwd_rules
          this.tableData = []
          if (dataArray.length > 0) {
            dataArray.forEach((item) => {
              this.tableData.push({
                RuleID: item.RuleID,
                WANPort: item.WANPort,
                LanPort: item.LANPort,
                LanIPAddress: item.LANIPAddress,
                protocol: item.Protocol,
                status: item.Status,
                name: item.Name
              })
            })
          }
        }
      })
    },
    checkRule() {
      // Name: this.formData.name,
      // LANIPAddress: this.formData.lanIPAddress,
      // LANPort: this.formData.lanPort,
      // WANPort: this.formData.WANPort,
      // Protocol: this.formData.protocol,
      // Status: this.formData.status
      console.log('this.formData:', this.formData)
      for (let i = 0; i < this.tableData.length; i++) {
        let tempItem = { ...this.tableData[i] }
        console.log(
          'tempItem',
          tempItem,
          tempItem['WANPort'] === this.formData.WANPort,
          tempItem['LanPort'] === this.formData.lanPort,
          tempItem['LanIPAddress'] === this.formData.lanIPAddress,
          tempItem['protocol'] === this.formData.protocol,
          tempItem['RuleID'] != this.formData.RuleID
        )
        if (
          tempItem['WANPort'] === this.formData.WANPort &&
          tempItem['LanPort'] === this.formData.lanPort &&
          tempItem['LanIPAddress'] === this.formData.lanIPAddress &&
          tempItem['protocol'] === this.formData.protocol &&
          tempItem['RuleID'] !== this.formData.RuleID
        ) {
          this.$publicFun.showErrMessage(this, 'other.portForwardRule')
          return false
        }
      }
      return true
    },
    // 修改规则
    handleEdit(index, row) {
      this.formData = {
        RuleID: row.RuleID,
        name: row.name,
        lanIPAddress: row.LanIPAddress,
        lanPort: row.LanPort,
        WANPort: row.WANPort,
        protocol: row.protocol,
        status: row.status
      }
      this.showAddDialogInfo.showDialog = true
    },
    // 删除规则
    handleDelete(index, row) {
      console.log(index, row)
      let params = {}
      params[row.RuleID] = 1
      delPortForwardingRules(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        }
      })
    },

    // 添加规则信息
    apply() {
      this.$refs.formData.validate((valid, val) => {
        if (valid) {
          let params = {
            Name: this.formData.name,
            LANIPAddress: this.formData.lanIPAddress,
            LANPort: this.formData.lanPort,
            WANPort: this.formData.WANPort,
            Protocol: this.formData.protocol,
            Status: this.formData.status
          }
          if (!this.checkRule()) return
          if (this.formData.RuleID.length > 0) {
            params.RuleID = this.formData.RuleID
            editPortForwardingRules(params).then((data) => {
              if (data.retcode == 0) {
                this.$publicFun.showSucMessage(this)
                setTimeout(() => {
                  this.$refs.formData.resetFields()
                  this.showAddDialogInfo.showDialog = false
                  this.initData()
                }, 2000)
              } else {
                this.$publicFun.showErrMessage(this)
              }
            })
          } else {
            addPortForwardingRules(params).then((data) => {
              if (data.retcode == 0) {
                this.$publicFun.showSucMessage(this)
                setTimeout(() => {
                  this.$refs.formData.resetFields()
                  this.showAddDialogInfo.showDialog = false
                  this.initData()
                }, 2000)
              } else {
                this.$publicFun.showErrMessage(this)
              }
            })
          }
        }
      })
    },
    cancelEdit() {
      this.$refs.formData.resetFields()
      this.showAddDialogInfo.showDialog = false
    },
    // 添加规则
    addFile() {
      this.formData.RuleID = ''
      this.showAddDialogInfo.showDialog = true
    },
    updateDeviceIp() {
      this.formData.lanIPAddress = this.deviceIp
      this.showDeviceDialogInfo.showDialog = false
    },
    servicesChange(val, val2) {
      let selectArr = val.split(' ')
      const nameLenght = selectArr.length
      if (val == 'FTP') {
        this.formData.name = 'FTP'
        this.formData.lanPort = '20-21'
        this.formData.WANPort = '20-21'
        this.formData.protocol = 0
      } else if (val == 'SMTP') {
        this.formData.name = 'SMTP'
        this.formData.lanPort = '25'
        this.formData.WANPort = '25'
        this.formData.protocol = 0
      } else if (val == 'POP3') {
        this.formData.name = 'POP3'
        this.formData.lanPort = '110'
        this.formData.WANPort = '110'
        this.formData.protocol = 0
      } else if (val == 'NNTP') {
        this.formData.name = 'NNTP'
        this.formData.lanPort = '119'
        this.formData.WANPort = '119'
        this.formData.protocol = 0
      } else if (val == 'SNMP') {
        this.formData.name = 'SNMP'
        this.formData.lanPort = '161'
        this.formData.WANPort = '161'
        this.formData.protocol = 1
      }
      if (nameLenght > 3) {
        this.formData.name = val
        this.formData.lanPort = selectArr[nameLenght - 1]
        this.formData.WANPort = selectArr[nameLenght - 1]
        this.formData.protocol = selectArr[nameLenght - 3]
      }
    },
    protocolFormatter(row) {
      console.log(row.protocol)
      return this.formatterSelect(row.protocol, this.protocolModes)
    },
    statusFormatter(row) {
      return this.formatterSelect(row.status, this.statusModes)
    },
    openDeviceDialog() {
      this.showDeviceDialogInfo.showDialog = true
    },
    rowClass() {
      return 'background-color:#434343;'
    },
    // 格式化表格中的状态数据
    formatterSelect(value, arr) {
      for (let i in arr) {
        console.log(i)
        if (arr[i].value === value) return arr[i].label
      }
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.add-btn {
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: $light-style-color;
  text-align: right;
}
.device-btn {
  color: $light-style-color;
  text-align: right;
  font-size: 16px;
  height: 30px;
  div {
    width: auto;
    float: right;
    // width: 100%;
  }
}
.device-select {
  width: 80%;
  margin: 20px auto;
}
.btn-view {
  display: flex;
  flex-direction: row;
  .btn-item {
    margin-left: 6px;
  }
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
// .row-head-class {
//   background-color: $table-head-bag-color;
// }
</style>
