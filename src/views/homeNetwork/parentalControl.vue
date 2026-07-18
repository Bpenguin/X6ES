<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('homeNet.homeNetScr') }}</div>
    </div>
    <!-- <section  class="sec-item">
      <div class="label-left">{{ $t('homeNet.webAPPController')+':' }}</div>
      <el-switch v-model="webAppControllerSwitch" @change="webChange" active-color="#00752b" inactive-color="#8d9092"></el-switch>
    </section> -->

    <div class="block-body">
      <div class="c-row">
        <el-col :span="10">
          <div class="label-left">{{ $t('homeNet.urlController')+':' }}</div>
        </el-col>
        <el-col :span="14">
          <el-switch v-model="urlControllerSwitch" @change="webURLChange" active-color="#00752b" inactive-color="#8d9092"></el-switch>
        </el-col>
      </div>
    </div>
    <div class="block-body">
      <div class="add-btn" @click="addFile">
        <svg-icon v-show="urlControllerSwitch" icon-class="add" class-name="link-svg"></svg-icon>
        <svg-icon v-show="!urlControllerSwitch" icon-class="add-2" class-name="link-svg"></svg-icon>
      </div>
      <el-table :data="tableData">
        <div slot="empty" style="text-align: left;">{{$t('wan.noData')}}</div>
        <el-table-column prop="device_name" :label="$t('homeNet.deviceName')" min-width="20%">
        </el-table-column>
        <el-table-column prop="mac" :label="$t('wan.macAddress')" min-width="25%"></el-table-column>
        <el-table-column :label="$t('homeNet.detail')" min-width="30%">
          <template slot-scope="scope2">
            <div>
              <div>{{scope2.row.url}}</div>
              <div>{{scope2.row.start_time_filter}} - {{scope2.row.end_time_filter}}</div>
              <div>{{scope2.row.weekdays_filter}}
              </div>
              <!-- <div>{{scope.row.url}}</div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Status" :label="$t('wan.tableStatus')" min-width="10%">
          <template slot-scope="scope1">
            <el-switch v-model="scope1.row.status" @change="changeRuleSwitch(scope1.$index, scope1.row)" active-color="#00752b" inactive-color="#8d9092"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="Edit" :label="$t('common.edit')" min-width="15%">
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
    <div class="block-body">
      <div class="page-note">
        {{ $t('common.note')+':' }}<br />{{ $t('homeNet.homeNetScr1')}}<br />{{ $t('homeNet.homeNetScr2')}}<br />
      </div>
    </div>
    <add-file-dialog :show-dialog='showAddDialogInfo.showDialog' :title-bg-img="showAddDialogInfo.titleBgImg" :title="showAddDialogInfo.title" @leftBtnClick="cancel" @closeDialog="cancel" @rightBtnClick="apply">
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="60%" label-position="top" size="mini">
        <el-form-item v-if="!formData.rule_key" :label="$t('homeNet.deviceList')" prop="deviceList">
          <template>
            <el-select v-model="deviceSelect" @change="chooseDeviceList" popper-class="x6-select" :placeholder="$t('placeHolder.parentalDevicePH')">
              <el-option v-for="item in deviceIpLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item :label="$t('homeNet.deviceName')" prop="deviceName">
          <mine-input :key="'deviceName'" v-model="formData.deviceName" :placeholder="$t('placeHolder.macFilterNamePH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.macAddress')" prop="macAddress">
          <mine-input :key="'macAddress'" v-model="formData.macAddress" :placeholder="$t('placeHolder.macFilterAddrPH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('homeNet.url')" prop="url">
          <mine-input :key="'url'" v-model="formData.url" :placeholder="$t('placeHolder.URLPH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.tableStatus')" prop="protocol">
          <el-select v-model="formData.status" popper-class="x6-select">
            <el-option v-for="item in statusModes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('homeNet.limitTime')" prop="time">
          <el-select class="time-select" v-model="formData.start_time" @change="startTimechoose" popper-class="x6-select" :placeholder="$t('placeHolder.startTime')">
            <el-option v-for="item in timeAreas" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="text-error" v-if="this.start_time_visible">{{ $t('ruleTip.warningRule') }}</span>
          <el-select class="time-select" v-model="formData.stop_time" @change="stopTimechoose" popper-class="x6-select" :placeholder="$t('placeHolder.endTime')">
            <el-option v-for="item in timeAreas" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="text-error" v-if="this.stop_time_visible">{{ $t('ruleTip.warningRule') }}</span>
        </el-form-item>
        <el-form-item class="form-item" :label="$t('system.Repeat')" prop="Repeat">
          <el-checkbox-group v-model="formData.Repeat">
            <el-checkbox :label="'1'">{{ $t('system.Mon') }}</el-checkbox>
            <el-checkbox :label="'2'">{{ $t('system.Tue') }}</el-checkbox>
            <el-checkbox :label="'3'">{{ $t('system.Wed') }}</el-checkbox>
            <el-checkbox :label="'4'">{{ $t('system.Thu') }}</el-checkbox>
            <el-checkbox :label="'5'">{{ $t('system.Fri') }}</el-checkbox>
            <el-checkbox :label="'6'">{{ $t('system.Sat') }}</el-checkbox>
            <el-checkbox :label="'7'">{{ $t('system.Sun') }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </add-file-dialog>
  </div>
</template>

<script>
import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
// import MineDialog from '@/components/MineDialog'
import {
  getParentalControlSwitch,
  setParentalControlSwitch,
  getParentalControlFilterRules,
  setParentalControlFilterRules,
  delParentalControlFilterRules
} from '@/api/system'
import { getConnectedDevicesInfo } from '@/api/doshboard'
import formVaRule from '@/formValidator/index'
import { weekDayFilter } from '@/utils/until'
export default {
  name: 'ParentalControl',
  components: { AddFileDialog },
  data() {
    return {
      deviceSelect: '',
      deviceIpLists: [], // 设备列表
      webAppControllerSwitch: false,
      urlControllerSwitch: true,
      tableData: [],
      formData: {
        rule_key: '',
        deviceList: '',
        deviceName: '',
        macAddress: '',
        url: '',
        status: 1,
        // start_time: '0000',
        // stop_time: '0000',
        start_time: '',
        stop_time: '',
        Repeat: []
      },
      formDataRules: {
        deviceName: [
          {
            required: true,
            validator: formVaRule.deviceNameRule,
            trigger: ['blur', 'change']
          }
        ],
        macAddress: [
          {
            required: true,
            validator: formVaRule.macFilterAddrRule,
            trigger: ['blur', 'change']
          }
        ],
        url: [
          {
            required: true,
            validator: formVaRule.urlRule,
            trigger: ['blur', 'change']
          }
        ],
        // time: [
        //   {
        //     required: true,
        //     validator: formVaRule.urlRule,
        //     trigger: ['blur', 'change']
        //   }
        // ],
        Repeat: [
          {
            required: true,
            validator: formVaRule.dayRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      start_time_visible: false,
      stop_time_visible: false,
      statusModes: [
        { value: 1, label: 'ON' },
        { value: 0, label: 'Off' }
      ],
      timeAreas: [
        { value: '0000', label: '00:00' },
        { value: '0030', label: '00:30' },
        { value: '0100', label: '01:00' },
        { value: '0130', label: '01:30' },
        { value: '0200', label: '02:00' },
        { value: '0230', label: '02:30' },
        { value: '0300', label: '03:00' },
        { value: '0330', label: '03:30' },
        { value: '0400', label: '04:00' },
        { value: '0430', label: '04:30' },
        { value: '0500', label: '05:00' },
        { value: '0530', label: '05:30' },
        { value: '0600', label: '06:00' },
        { value: '0630', label: '06:30' },
        { value: '0700', label: '07:00' },
        { value: '0730', label: '07:30' },
        { value: '0800', label: '08:00' },
        { value: '0830', label: '08:30' },
        { value: '0900', label: '09:00' },
        { value: '0930', label: '09:30' },
        { value: '1000', label: '10:00' },
        { value: '1030', label: '10:30' },
        { value: '1100', label: '11:00' },
        { value: '1130', label: '11:30' },
        { value: '1200', label: '12:00' },
        { value: '1230', label: '12:30' },
        { value: '1300', label: '13:00' },
        { value: '1330', label: '13:30' },
        { value: '1400', label: '14:00' },
        { value: '1430', label: '14:30' },
        { value: '1500', label: '15:00' },
        { value: '1530', label: '15:30' },
        { value: '1600', label: '16:00' },
        { value: '1630', label: '16:30' },
        { value: '1700', label: '17:00' },
        { value: '1730', label: '17:30' },
        { value: '1800', label: '18:00' },
        { value: '1830', label: '18:30' },
        { value: '1900', label: '19:00' },
        { value: '1930', label: '19:30' },
        { value: '2000', label: '20:00' },
        { value: '2030', label: '20:30' },
        { value: '2100', label: '21:00' },
        { value: '2130', label: '21:30' },
        { value: '2200', label: '22:00' },
        { value: '2230', label: '22:30' },
        { value: '2300', label: '23:00' },
        { value: '2330', label: '23:30' }
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
  computed: {
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // 获取开关
      getParentalControlSwitch().then((data) => {
        if (data.retcode == 0) {
          this.urlControllerSwitch = data.switch == 1 ? true : false
          if (this.urlControllerSwitch) {
            this.getParentalControlFilterRulesInfo()
          } else {
            this.tableData = []
          }
        }
      })
      // 获取连接设备的信息
      getConnectedDevicesInfo().then((data) => {
        if (data.retcode == 0) {
          let dataArray = data.ConnectedDevicesList
          this.deviceIpLists = []
          if (dataArray.length > 0) {
            dataArray.forEach((item, index) => {
              this.deviceIpLists.push({
                value: index,
                label: item.DeviceName,
                DeviceName: item.DeviceName,
                macAdd: item.Mac
              })
            })
          }
          this.deviceIpLists.push({
            value: 999,
            label: 'other',
            DeviceName: '',
            macAdd: ''
          })
        }
      })
    },

    getParentalControlFilterRulesInfo() {
      getParentalControlFilterRules().then((data) => {
        if (data.retcode == 0) {
          this.tableData = []
          if (data.parentalControlFilterList.length > 0) {
            data.parentalControlFilterList.forEach((element) => {
              element.start_time_filter =
                element.start_time.substr(0, 2) +
                ':' +
                element.start_time.substr(2, 2)

              element.end_time_filter =
                element.stop_time.substr(0, 2) +
                ':' +
                element.stop_time.substr(2, 2)

              element.status = element.enabled == 1 ? true : false

              element.weekdays_filter = ''
              let tempWeek = [...element.weekdays]
              if (tempWeek.length > 0) {
                tempWeek.forEach((item) => {
                  element.weekdays_filter += weekDayFilter(item) + ', '
                })
                element.weekdays_filter = element.weekdays_filter.substr(
                  0,
                  element.weekdays_filter.length - 2
                )
              }
              this.tableData.push(element)
            })
          }
        }
      })
    },
    chooseDeviceList(val) {
      let obj = {}
      obj = this.deviceIpLists.find((item) => {
        return item.value == val
      })
      this.formData.deviceName = obj.DeviceName
      this.formData.macAddress = obj.macAdd
    },
    // 提交规则信息
    apply() {
      this.$refs.formData.validate((valid) => {
        if (this.formData.start_time == '') {
          this.start_time_visible = true
        } else {
          this.start_time_visible = false
        }
        if (this.formData.stop_time == '') {
          this.stop_time_visible = true
        } else {
          this.stop_time_visible = false
        }
        if (this.start_time_visible || this.stop_time_visible) return
        if (valid) {
          let weekDays = ''
          this.formData.Repeat.sort((a, b) => {
            return a - b
          }).forEach((item) => {
            weekDays += item
          })
          let params = {
            device_name: this.formData.deviceName,
            mac: this.formData.macAddress,
            url: this.formData.url,
            enabled: this.formData.status,
            start_time: this.formData.start_time,
            stop_time: this.formData.stop_time,
            weekdays: weekDays
          }
          if (this.formData.rule_key) {
            params.new_edit = 1
            params.rule_key = this.formData.rule_key
          } else {
            params.new_edit = 0
          }
          setParentalControlFilterRules(params).then((data) => {
            if (data.retcode == 0) {
              this.$publicFun.showSucMessage(this)
              this.cancel() // 重置数据
              this.initData()
            } else {
              this.$publicFun.showErrMessage(this)
            }
          })
        }
      })
    },
    // 添加规则
    addFile() {
      if (this.urlControllerSwitch) {
        this.showAddDialogInfo.showDialog = true
      }
    },
    handleEdit(index, row) {
      this.formData.rule_key = row.rule_key
      this.formData.deviceName = row.device_name
      this.formData.macAddress = row.mac
      this.formData.url = row.url
      this.formData.start_time = row.start_time
      this.formData.stop_time = row.stop_time
      this.formData.status = row.enabled
      this.formData.Repeat = [...row.weekdays]
      this.showAddDialogInfo.showDialog = true
    },
    handleDelete(index, row) {
      let params = {
        rule_key: row.rule_key
      }
      delParentalControlFilterRules(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    cancel() {
      this.deviceSelect = ''
      this.showAddDialogInfo.showDialog = false
      this.$refs.formData.resetFields()
      this.formData.start_time = ''
      this.formData.stop_time = ''
      this.formData.status = 1
      this.start_time_visible = false
      this.stop_time_visible = false
      this.formData.rule_key = ''
      this.formData.Repeat = []
    },
    startTimechoose(val) {
      if (val == '') {
        this.start_time_visible = true
      } else {
        this.start_time_visible = false
      }
    },
    stopTimechoose(val) {
      if (val == '') {
        this.stop_time_visible = true
      } else {
        this.stop_time_visible = false
      }
    },
    webURLChange() {
      setParentalControlSwitch({
        switch: this.urlControllerSwitch ? 1 : 0
      }).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          if (!this.urlControllerSwitch) {
            this.tableData = []
          } else {
            this.initData()
          }
        } else {
          this.urlControllerSwitch = !this.urlControllerSwitch
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    changeRuleSwitch(index, row) {
      let params = { ...row }
      params.enabled = row.status ? 1 : 0
      params.new_edit = 1
      console.log('params:', params)
      setParentalControlFilterRules(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.tableData[index].enabled = params.enabled
          // this.initData()
        } else {
          this.$publicFun.showErrMessage(this)
          this.tableData[index].status = !this.tableData[index].status
        }
      })
    },
    urlChange() {}
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.text-error {
  color: #f56c6c;
}
.add-btn {
  // width: 100%;
  height: 40px;
  font-size: 20px;
  color: $main-style-color;
  float: right;
  text-align: right;
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
  width: 100%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
//替换左边默认图标
/deep/.time-select .is-reverse {
  clear: both !important;
}
/deep/ .el-checkbox__label {
  color: $login-font-color;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: $light-style-color;
}
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
