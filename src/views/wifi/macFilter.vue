<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t('other.newMacFilterScr') }}</div>
    </div>
    <!-- <div class="block-body">
      <el-row class="c-row">
        <el-col :span="10">
          {{$t('nav.wifiMacFilter')+':'}}
        </el-col>
        <el-col :span="12">
          <el-switch v-model="macFilterStatus" @change="changeFilterStatus" class="drawer-switch" active-color="#00dc50" inactive-color="#8d9092" />
        </el-col>
      </el-row>
    </div> -->
    <div class="block-body">
      <div v-if="tableData.length<32" class="add-btn" @click="addFile">
        <svg-icon icon-class="add" class-name="link-svg"></svg-icon>
      </div>
      <div v-else class="add-btn">
        <svg-icon icon-class="add" class-name="link-svg un-click"></svg-icon>
      </div>
      <el-table :data="tableData" style="width: 100%;">
        <div slot="empty" style="text-align: left;">{{$t('wan.noData')}}</div>
        <el-table-column prop="status" :label="$t('wan.tableStatus')" min-width="20%">
          <template slot-scope="scope1">
            <!-- <el-switch v-model="macFilterStatus" class="drawer-switch" active-color="#00dc50" inactive-color="#8d9092" /> -->
            <el-switch v-model="scope1.row.status" class="drawer-switch" @change="changeFilterStatus(scope1.$index, scope1.row)" active-color="#00dc50" inactive-color="#8d9092" />
          </template>
        </el-table-column>
        <el-table-column prop="hostname" :label="$t('wan.tableName')" min-width="30%"></el-table-column>
        <el-table-column prop="mac" :label="$t('wan.macAddress')" min-width="30%"></el-table-column>
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
        </el-table-column>
      </el-table>
    </div>
    <add-file-dialog :show-dialog='showAddDialogInfo.showDialog' :title-bg-img="showAddDialogInfo.titleBgImg" :title="showAddDialogInfo.title" @leftBtnClick="cancelEdlt" @closeDialog="cancelEdlt" @rightBtnClick="apply">
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="60%" :label-position="formLablePos" size="mini">
        <el-form-item :label="$t('wan.tableName')" prop="hostname">
          <mine-input :key="'name'" v-model="formData.hostname" :placeholder="$t('placeHolder.macFilterNamePH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.macAddress')" prop="mac">
          <mine-input :key="'mac'" v-model="formData.mac" :placeholder="$t('placeHolder.macFilterAddrPH')"></mine-input>
        </el-form-item>
        <el-form-item :label="$t('wan.tableStatus')" prop="status">
          <el-switch v-model="formData.status" class="drawer-switch" active-color="#00dc50" inactive-color="#8d9092" />
        </el-form-item>
      </el-form>
    </add-file-dialog>

  </div>
</template>

<script>
import {
  getBlockedDeviceInfo,
  setBlockedDeviceExe,
  delBlockedDeviceExe,
  editBlockedDeviceExe
} from '@/api/wifi'
import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
import formVaRule from '@/formValidator/index'
import theme from '@/styles/theme.module.scss'
export default {
  name: 'MacFilter',
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
    return {
      macFilterStatus: true,
      tableData: [
        // {
        //   hostname: '000',
        //   status: 0,
        //   mac: '20:12:34:32:55'
        // }
      ],
      formData: {
        ID: '',
        hostname: '',
        status: '',
        mac: ''
      },
      formDataRules: {
        hostname: [
          {
            required: true,
            validator: formVaRule.macFilterNameRule,
            trigger: ['blur', 'change']
          }
        ],
        mac: [
          {
            required: true,
            validator: formVaRule.macFilterAddrRule,
            trigger: ['blur', 'change']
          }
        ]
      },
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
      getBlockedDeviceInfo().then((data) => {
        if (data.retcode == 0) {
          this.tableData = []
          if (data.BlockedDevicesList.length > 0) {
            data.BlockedDevicesList.forEach((item) => {
              this.tableData.push({
                ID: item.ID,
                hostname: item.DeviceName,
                mac: item.Mac,
                status: item.Enable == 1 ? true : false
              })
            })
          }
        }
      })
    },
    // 修改设备的状态
    changeFilterStatus(index, row) {
      let params = {
        ID: row.ID,
        Mac: row.mac,
        Enable: row.status ? 1 : 0,
        DeviceName: row.hostname
      }
      editBlockedDeviceExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        } else {
          this.tableData[index].status = !this.tableData[index].status
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
      // this.$refs['formData'].resetFields()
      this.formData = { ...row }
      this.showAddDialogInfo.showDialog = true
    },

    handleDelete(index, row) {
      console.log(index, row)
      let params = { Mac: row.mac }
      delBlockedDeviceExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },

    // 提交信息
    apply() {
      this.$refs.formData.validate((valid, val) => {
        if (valid) {
          let params = {}
          params.DeviceName = this.formData.hostname
          params.Mac = this.formData.mac
          params.Enable = this.formData.status ? 1 : 0
          if (this.formData.ID) {
            params.ID = this.formData.ID
            editBlockedDeviceExe(params).then((data) => {
              if (data.retcode == 0) {
                this.$publicFun.showSucMessage(this)
                setTimeout(() => {
                  this.cancelEdlt()
                  this.initData()
                }, 2000)
              } else {
                this.$publicFun.showErrMessage(this)
              }
            })
          } else {
            this.setBlockedDeviceExeInfo(params)
          }
        }
      })
    },
    cancelEdlt() {
      this.showAddDialogInfo.showDialog = false
      this.$refs.formData.resetFields()
    },
    setBlockedDeviceExeInfo(params) {
      setBlockedDeviceExe(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          setTimeout(() => {
            this.cancelEdlt()
            this.initData()
          }, 2000)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    // 添加配置
    addFile() {
      this.formData = { hostname: '', status: 0, mac: '' }
      this.showAddDialogInfo.showDialog = true
    }
  }
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
.un-click {
  fill: $gray-svg-color;
}
.el-row {
  width: 100%;
  // overflow: scroll;
  text-align: left;
  // margin-bottom: 40px;
}
/deep/ .cell {
  word-break: break-word;
}
/deep/ .svg-icon {
  width: 30px;
  height: 30px;
}

.btn-view {
  display: flex;
  flex-direction: row;
  .btn-item {
    margin-left: 6px;
  }
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
