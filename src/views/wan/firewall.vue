<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('wan.wanFirewallscri') }}</div>
    </div>
    <div class="block-body">
      <div class="add-btn">
        <div class="add-view" v-if="tableData.length<20" @click="addFile">
          <svg-icon icon-class="add" class-name="link-svg"></svg-icon>
        </div>
        <div class="add-view" v-else>
          <svg-icon icon-class="add" class-name="link-svg  un-click"></svg-icon>
        </div>
      </div>
      <div class="block-body" style="overflow: auto;">
        <el-table :data="tableData" style="width: 100%;">
          <div slot="empty" style="text-align: left;">{{$t('wan.NoData')}}</div>
          <el-table-column prop="Name" :label="$t('wan.tableName')" min-width="10%"></el-table-column>
          <el-table-column prop="SourceIPAddr" :label="$t('wan.tableSourceIPAddress')" min-width="12%"></el-table-column>
          <el-table-column prop="SourcePort" :label="$t('wan.tableSourcePort')" min-width="12%"></el-table-column>
          <el-table-column prop="DestinationIPAddr" :label="$t('wan.tableDestinationIPAddress')" min-width="12%"></el-table-column>
          <el-table-column prop="DestinationPort" :label="$t('wan.tableDestinationPort')" min-width="12%"></el-table-column>
          <el-table-column prop="Protocol" :label="$t('wan.tableProtocol')" min-width="10%" :formatter="protocolFormatter"></el-table-column>
          <el-table-column prop="Status" :label="$t('wan.tableStatus')" min-width="10%" :formatter="statusFormatter"></el-table-column>
          <el-table-column prop="Target" :label="$t('wan.tableTarget')" min-width="10%" :formatter="tagetFormatter"></el-table-column>
          <el-table-column prop="Edit" :label="$t('common.edit')" min-width="12%">
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
    </div>
    <add-file-dialog :show-dialog='showAddDialogInfo.showDialog' :title-bg-img="showAddDialogInfo.titleBgImg" :title="showAddDialogInfo.title" @leftBtnClick="cancelAdd" @closeDialog="cancelAdd" @rightBtnClick="apply">
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="40%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('wan.tableName')+':'" prop="Name">
          <mine-input :key="'name'" v-model="formData.Name"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.IPSetting')+':'" prop="IPType">
          <el-select v-model="formData.IPType" popper-class="x6-select">
            <el-option v-for="item in IPSettingModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('wan.tableSourceIPAddress')+':'" prop="SourceIPAddr">
          <mine-input :key="'tableSourceIPAddress'" v-model="formData.SourceIPAddr" :maxlength='63'></mine-input>
        </el-form-item>
        <el-form-item v-if="formData.Protocol == 0 || formData.Protocol == 1 || formData.Protocol == 2" :label="$t('wan.tableSourcePort')+':'" prop="SourcePort">
          <mine-input :key="'sourcePort'" v-model="formData.SourcePort"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.tableDestinationIPAddress')+':'" prop="DestinationIPAddr">
          <mine-input :key="'destIpaddr'" v-model="formData.DestinationIPAddr" :maxlength='63'></mine-input>
        </el-form-item>
        <el-form-item v-if="formData.Protocol == 0 || formData.Protocol == 1 || formData.Protocol == 2" :label="$t('wan.tableDestinationPort')+':'" prop="DestinationPort">
          <mine-input :key="'destinationPort'" v-model="formData.DestinationPort"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.tableProtocol')+':'" prop="Protocol">
          <el-select v-model="formData.Protocol" popper-class="x6-select">
            <el-option v-for="item in protocolModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('wan.tableTarget')+':'" prop="Target">
          <el-select v-model="formData.Target" popper-class="x6-select">
            <el-option v-for="item in targetModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('wan.tableStatus')+':'" prop="Status">
          <el-select v-model="formData.Status" popper-class="x6-select">
            <el-option v-for="item in statusModes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </add-file-dialog>

  </div>
</template>

<script>
import {
  addPortFilterRulesApi,
  delPortFilterRulesApi,
  getPortFilterRulesApi,
  editPortFilterRulesApi
} from '@/api/wan'
import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
import formVaRule from '@/formValidator/index'
import theme from '@/styles/theme.module.scss'
export default {
  name: 'PortForwarding',
  components: { AddFileDialog },
  computed: {
    theme() {
      return theme
    },
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },

  data() {
    let fillWallIPRule = (rule, value, callback) => {
      var ipReg =
        this.formData.IPType == 1
          ? /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
          : /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

      // /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
      if (!ipReg.test(value)) {
        if (this.formData.IPType == 1) {
          callback(this.$t('ruleTip.fillWallIPV6Rule'))
        } else {
          callback(this.$t('ruleTip.fillWallIPRule'))
        }
      } else {
        console.log('fillWallIPRule')
        callback()
      }
    }
    return {
      changeFilType: 1, // 1: add 2:edite
      tableData: [
        // {
        //   Name: '111',
        //   IPType:'IPV6'
        //   ipSetting: 0,
        //   SourceIPAddr: '10.10.10.1',
        //   SourcePort: '80',
        //   DestinationIPAddr: '20.20.20.2',
        //   DestinationPort: '90',
        //   Protocol: 1,
        //   Target: 2,  operation
        //   Status: 1
        // }
      ],
      showAddDialogInfo: {
        showDialog: false,
        title: 'common.add', // 标题
        titleBgImg: 'add-2',
        leftBtnText: 'common.ok' //右侧按钮的描述
      },
      defaultFormData: {},
      formData: {
        Name: '',
        IPType: 0,
        SourceIPAddr: '',
        SourcePort: '',
        DestinationIPAddr: '',
        DestinationPort: '',
        Protocol: 0,
        Target: 0,
        Status: 1,
        RuleID: ''
      },
      formDataRules: {
        Name: [
          {
            required: true,
            validator: formVaRule.fillWallNameRule,
            trigger: ['blur', 'change']
          }
        ],
        SourceIPAddr: [
          {
            required: true,
            validator: fillWallIPRule,
            trigger: ['blur', 'change']
          }
        ],
        SourcePort: [
          {
            required: true,
            validator: formVaRule.fillWallPortRule,
            trigger: ['blur', 'change']
          }
        ],
        DestinationIPAddr: [
          {
            required: true,
            validator: fillWallIPRule,
            trigger: ['blur', 'change']
          }
        ],
        DestinationPort: [
          {
            required: true,
            validator: formVaRule.fillWallPortRule,
            trigger: ['blur', 'change']
          }
        ],
        Protocol: [{ required: true, trigger: ['blur', 'change'] }],
        Target: [{ required: true, trigger: ['blur', 'change'] }],
        Status: [{ required: true, trigger: ['blur', 'change'] }]
      },
      IPSettingModes: [
        { value: 0, label: 'IPv4' },
        { value: 1, label: 'IPv6' }
      ],
      protocolModes: [
        { value: 0, label: 'TCP' },
        { value: 1, label: 'UDP' },
        { value: 2, label: 'TCP/UDP' },
        { value: 3, label: 'ICMP' },
        { value: 4, label: 'ESP' },
        { value: 5, label: 'ALL' }
      ],
      targetModes: [
        { value: 0, label: 'Drop' },
        { value: 1, label: 'Accept' },
        { value: 2, label: 'Reject' }
      ],
      statusModes: [
        { value: 1, label: 'ON' },
        { value: 0, label: 'OFF' }
      ]
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.defaultFormData = this.formData
    this.initData()
  },
  methods: {
    initData() {
      this.formData = {
        Name: '',
        IPType: 0,
        SourceIPAddr: '',
        SourcePort: '',
        DestinationIPAddr: '',
        DestinationPort: '',
        Protocol: 0,
        Target: 0,
        Status: 1,
        RuleID: ''
      }
      // 获取规则
      getPortFilterRulesApi().then((data) => {
        if (data.retcode == 0) {
          this.tableData = []
          if (data.port_filter_ipv4.num > 0) {
            data.port_filter_ipv4.rules.forEach((item) => {
              item.name = item.comment
              this.tableData.push(this.formRuleData(item))
            })
          }
          if (data.port_filter_ipv6.num > 0) {
            data.port_filter_ipv6.rules.forEach((item) => {
              item.name = item.comment
              this.tableData.push(this.formRuleData(item))
            })
          }
        }
      })
    },
    // 加工端口数据
    formRuleData(item) {
      let newItem = item
      if (item.srcStartPort == 0 && item.srcEndPort == 0) {
        newItem.sourcePort = ''
      } else {
        newItem.sourcePort = item.srcStartPort + '-' + item.srcEndPort
      }
      if (item.destStartPort == 0 && item.destEndPort == 0) {
        newItem.destinationPort = ''
      } else {
        newItem.destinationPort = item.destStartPort + '-' + item.destEndPort
      }
      return newItem
    },
    handleEdit(index, row) {
      console.log(index, row)
      // this.$refs['formData'].resetFields()
      this.formData = { ...row }
      this.changeFilType = 2
      this.showAddDialogInfo.showDialog = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      let params = {}
      params[row.RuleID] = 1
      delPortFilterRulesApi(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },

    apply() {
      console.log(this.formData)
      this.$refs.formData.validate((valid, val) => {
        console.log('valid:', valid)
        if (valid) {
          let params = { ...this.formData }
          if (this.changeFilType == 2) {
            params.RuleID = this.formData.RuleID
            editPortFilterRulesApi(params).then((data) => {
              if (data.retcode == 0) {
                this.$refs.formData.resetFields()
                this.showAddDialogInfo.showDialog = false
                this.$publicFun.showSucMessage(this)
                this.initData()
              } else {
                this.$publicFun.showErrMessage(this)
              }
            })
          } else {
            addPortFilterRulesApi(params).then((data) => {
              if (data.retcode == 0) {
                this.$refs.formData.resetFields()
                this.showAddDialogInfo.showDialog = false
                this.$publicFun.showSucMessage(this)
                this.initData()
              } else {
                this.$publicFun.showErrMessage(this)
              }
            })
          }
        }
      })
    },
    cancelAdd() {
      this.$refs.formData.resetFields()
      this.showAddDialogInfo.showDialog = false
    },
    // 格式化端口格式
    formPorts(port) {
      if (!port || port.length == 0) return ['', '']
      if (port.indexOf('-') != -1) {
        return port.split('-')
      } else {
        return [port, port]
      }
    },
    // 添加配置
    addFile() {
      this.changeFilType = 1
      this.showAddDialogInfo.showDialog = true
    },
    protocolFormatter(row) {
      console.log(row.proto)
      return this.formatterSelect(row.Protocol, this.protocolModes)
    },
    statusFormatter(row) {
      return this.formatterSelect(row.Status, this.statusModes)
    },
    tagetFormatter(row) {
      return this.formatterSelect(row.Target, this.targetModes)
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
  height: 40px;
  font-size: 20px;
  color: $light-style-color;
  text-align: right;
  .add-view {
    width: 40px;
    height: 100%;
    float: right;
  }
}
.table-bg {
  overflow-x: auto;
  display: block;
}
.el-row {
  width: 100%;
  text-align: left;
}
/deep/ .cell {
  word-break: break-word;
}
/deep/ .svg-icon {
  width: 30px;
  height: 30px;
}

/deep/ .is-scrolling-left {
  overflow: auto;
}
.btn-view {
  display: flex;
  flex-direction: row;
  .btn-item {
    margin-left: 6px;
  }
}
.un-click {
  fill: $gray-svg-color;
}
// .row-head-class {
</style>
