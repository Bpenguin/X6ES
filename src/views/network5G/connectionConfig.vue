<!-- eslint-:disabled="true" vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <no-sim v-if="!(SIMStatus == 1 || SIMStatus == 2)" :sim-status='SIMStatus'></no-sim>
    <div v-else>

      <div class="block-body">
        <div class="page-description">{{ $t('network5G.configurationManagementScr') }}</div>
      </div>
      <div class="block-body">
        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('network5G.ConfigurationName') }}:</div>
          </el-col>
          <el-col :span="16" :xs="18">
            <el-select v-model="currentIndex" popper-class="x6-select" @change="changeProfile" :placeholder="''">
              <el-option v-for="item in nameList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('network5G.DialNumber') }}:</div>
          </el-col>
          <el-col :span="16" :xs="18">
            <mine-input :key="'dialNum'" v-model="currentData.dialNum" :disabled="true"></mine-input>
          </el-col>
        </el-row> -->
        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('network5G.APN') }}:</div>
          </el-col>
          <el-col :span="16" :xs="18">
            <mine-input :key="'apn'" v-model="currentData.apn" :disabled="true"></mine-input>
          </el-col>
        </el-row>

        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('network5G.IPType') }}:</div>
          </el-col>
          <el-col :span="16" :xs="18">
            <mine-input :key="'IPType'" v-model="currentData.iptype_filter" :disabled="true"></mine-input>
          </el-col>
        </el-row>

        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('common.username') }}:</div>
          </el-col>
          <el-col :span="16" :xs="18">
            <mine-input :key="'username'" v-model="currentData.username" :disabled="true"></mine-input>
          </el-col>
        </el-row>

        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('common.password') }}:</div>
          </el-col>
          <el-col :span="16" :xs="18">
            <mine-input :key="'password'" v-model="currentData.password" :disabled="true"></mine-input>
          </el-col>
        </el-row>

        <el-row class="c-row">
          <el-col :span="8" :xs="18">
            <div>{{ $t('wan.tableProtocol') }}:</div>
          </el-col>
          <el-col :span="16" :xs="18">
            <mine-input :key="'tableProtocol'" v-model="currentData.authmode_filter" :disabled="true"></mine-input>
          </el-col>
        </el-row>
      </div>
      <div class="block-body">
        <div class="c-row btn-row">
          <!-- <mine-button :btn-title="$t('network5G.New')" @clickBtn="newProfile"></mine-button> -->
          <mine-button :btn-title="$t('network5G.New')" :un-click="dataList.length >= 20" @clickBtn="newProfile"></mine-button>
          <mine-button :btn-title="$t('common.edit')" :un-click="this.currentData.readonly == 1" @clickBtn="edit"></mine-button>
          <mine-button :btn-title="$t('common.delete')" :un-click="unsuportEdit || dataList.length <= 1" @clickBtn="deleteProfile"></mine-button>
          <mine-button :btn-title="$t('network5G.setDefault')" :un-click="this.currentIndex == this.defaultIndex" @clickBtn="setDefault"></mine-button>
          <!-- <mine-button :btn-title="'clearProfile'" @clickBtn="clearFile"></mine-button> -->
        </div>
      </div>
      <div class="block-body">
        <div class="page-note">{{$t('common.note')+':' + $t('network5G.configurationManagementNote') }}</div>
      </div>
      <mine-dialog :show-dialog='showDelDialogInfo.showDialog' :title="showDelDialogInfo.title" :msg-title="showDelDialogInfo.msgTitle" :left-btn-text="showDelDialogInfo.leftBtnText" @leftBtnClick="showDelDialogInfo.showDialog = false" :right-btn-text="showDelDialogInfo.rightBtnText" @rightBtnClick="deleteApnProfile" @closeDialog="showDelDialogInfo.showDialog = false">
        <template>
          <span>
            {{ $t('other.deleAPNTip') }} "{{ currentData.apn }}".{{$t('network5G.continue')}}?
          </span>
        </template>
      </mine-dialog>

      <add-file-dialog :show-dialog='showAddDialogInfo.showDialog' :title-bg-img="showAddDialogInfo.titleBgImg" :title="showAddDialogInfo.title" :left-btn-text="showAddDialogInfo.leftBtnText" :right-btn-text="showAddDialogInfo.rightBtnText" @leftBtnClick="cancelEdit" @closeDialog="cancelEdit" @rightBtnClick="apply">
        <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="60%" :label-position="formLablePos" size="mini">
          <el-form-item :label="$t('network5G.ConfigurationName')" prop="profilename">
            <mine-input :key="'profilename'" v-model="formData.profilename" :maxlength='15' :placeholder="'e.g, ABC'"></mine-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('network5G.DialNumber')" prop="dialNum">
            <mine-input :key="'dialNum'" v-model="formData.dialNum" :placeholder="''"></mine-input>
          </el-form-item> -->
          <el-form-item :label="$t('network5G.APN')" prop="apn">
            <mine-input :key="'apn'" v-model="formData.apn" :placeholder="'e.g, A123'"></mine-input>
          </el-form-item>
          <el-form-item :label="$t('network5G.IPType')" prop="iptype">
            <el-select v-model="formData.iptype" popper-class="x6-select">
              <el-option v-for="item in iptypeModels" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('common.username')" prop="username">
            <mine-input :key="'username'" v-model="formData.username" :maxlength='32'></mine-input>
          </el-form-item>
          <el-form-item :label="$t('common.password')" prop="password">
            <mine-input :key="'password'" :maxlength='15' v-model="formData.password"></mine-input>
          </el-form-item>
          <el-form-item :label="$t('wan.tableProtocol')" prop="authmode">
            <el-select v-model="formData.authmode" popper-class="x6-select">
              <el-option v-for="item in protoModels" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </add-file-dialog>
    </div>
  </div>
</template>

<script>
import NoSim from './noSim.vue'
import MineDialog from '@/components/MineDialog'
import {
  getProfileInfoApi,
  addProfileApi,
  delProfileApi,
  setProfileApi
} from '@/api/network5G'
import { protoTypeFilter, dualIpTypeFilter } from '@/utils/until'
import AddFileDialog from '@/components/MineDialog/AddFileDialog.vue'
import { editPortFilterRulesApi } from '@/api/wan'
import formVaRule from '@/formValidator/index'
export default {
  // eslint-:disabled="true"-next-line vue/multi-word-component-names
  name: 'ConnectionConfig',
  components: { AddFileDialog, NoSim, MineDialog },
  data() {
    return {
      simStatusTimer: '', // 实时刷新卡状态
      defaultIndex: 0,
      currentIndex: '',
      currentData: {},
      defaultData: {},
      dataList: [],
      nameList: [],
      iptypeModels: [
        { value: 0, label: 'IPV4' },
        { value: 1, label: 'IPV6' },
        { value: 2, label: 'IPV4V6' }
      ],
      protoModels: [
        { value: 0, label: 'None' },
        { value: 1, label: 'PAP' },
        { value: 2, label: 'CHAP' },
        { value: 3, label: 'PAP-CHAP' }
      ],
      formData: {
        profilename: '',
        // dialNum: '',
        apn: '',
        iptype: 0,
        username: '',
        password: '',
        authmode: 0
      },
      formDataRules: {
        profilename: [
          {
            required: true,
            message: this.$t('ruleTip.APNNameRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: formVaRule.APNNameRule,
            trigger: ['blur', 'change']
          }
        ],
        apn: [
          {
            required: true,
            message: this.$t('ruleTip.APNRule'),
            trigger: ['blur', 'change']
          },
          {
            validator: formVaRule.APNRule,
            trigger: ['blur', 'change']
          }
        ]
      },
      showAddDialogInfo: {
        showDialog: false,
        title: 'common.add', // 标题
        titleBgImg: 'add-2',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'common.save' //右侧按钮的描述
      },
      showDelDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'common.confirm', // 标题
        msgTitle: '',
        leftBtnText: 'common.cancel', //右侧按钮的描述
        rightBtnText: 'common.ok'
      }
    }
  },
  computed: {
    SIMStatus() {
      this.initData()
      return this.$store.state.status.simStatus
    },
    formLablePos() {
      return this.$store.getters.phoneDevice ? 'top' : 'left'
    },
    unsuportEdit() {
      console.log('this.currentIndex', this.currentIndex)
      return this.currentData.readonly == 1 ||
        this.currentIndex == this.defaultIndex
        ? true
        : false
    }
  },
  created() {
    this.$store.dispatch('status/setSimInfo')
  },
  mounted() {
    this.initData()
    this.initSimStatus() // 循环获取SIM卡状态
  },
  methods: {
    async initData() {
      this.dataList = []
      await getProfileInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.defaultIndex = data.curid
          this.currentIndex = data.curid != 0 ? data.curid : ''
          if (data.profileList.length > 0) {
            this.dataList = [...data.profileList]
            this.dataList.forEach((item) => {
              // item.dialNum = ''
              item.iptype_filter = dualIpTypeFilter(item.iptype)
              item.authmode_filter = protoTypeFilter(item.authmode)
            })
          }
        }
      })
      this.initNameLists()
      this.getCurrentData(this.currentIndex)
      // 初始化prifile name 列表下拉框数据
    },
    initNameLists() {
      if (!this.dataList || this.dataList.length < 1) return
      let defStr = '(' + this.$t('common.default') + ')'
      this.nameList = this.dataList.map((item) => {
        let labelName = item.profilename
        if (this.defaultIndex == item.index) {
          labelName += defStr
        }
        return { value: item.index, label: labelName }
      })
    },

    getCurrentData(index) {
      let hasDefaultIndex = false
      this.dataList.map((item) => {
        if (item.index == index) {
          this.currentData = item
          hasDefaultIndex = true
        }
      })
      if (!hasDefaultIndex && this.dataList.length > 0) {
        this.currentData = this.dataList[0]
        this.currentIndex = this.dataList[0].index
      }
    },
    changeProfile(val) {
      this.getCurrentData(val)
    },
    newProfile() {
      this.formData = {
        profilename: '',
        iptype: 0,
        // dialNum: '*99#',
        apn: '',
        authmode: 0,
        username: '',
        password: ''
      }
      this.showAddDialogInfo.showDialog = true
    },
    edit() {
      this.formData = { ...this.currentData }
      this.showAddDialogInfo.showDialog = true
    },
    cancelEdit() {
      this.showAddDialogInfo.showDialog = false
      this.$refs.formData.resetFields()
    },
    setDefault() {
      let parama = {
        iptype: this.currentData.iptype,
        profilename: this.currentData.profilename,
        apn: this.currentData.apn,
        authmode: this.currentData.authmode,
        username: this.currentData.username,
        password: this.currentData.password,
        index: this.currentData.index,
        apnmode: 1,
        preferred: 1 // 设为默认
      }
      if (this.currentData.readonly == 1) {
        parama.apnmode = 0
      }
      setProfileApi(parama).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          this.initData()
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    deleteApnProfile() {
      let index = this.currentData.index
      this.showDelDialogInfo.showDialog = false
      delProfileApi({ index }).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
        this.initData()
      })
    },
    deleteProfile() {
      this.showDelDialogInfo.showDialog = true
    },
    async apply() {
      this.$refs.formData.validate((valid, val) => {
        if (valid) {
          let parama = {
            iptype: this.formData.iptype,
            profilename: this.formData.profilename,
            apn: this.formData.apn,
            authmode: this.formData.authmode,
            username: this.formData.username,
            password: this.formData.password,
            apnmode: 1
          }
          if (this.formData.index) {
            parama.index = this.formData.index
            parama.preferred = 0
            parama.onlymodify = 1
            setProfileApi(parama).then((data) => {
              if (data.retcode == 0) {
                this.showAddDialogInfo.showDialog = false
                this.$refs.formData.resetFields()
                this.$publicFun.showSucMessage(this)
                this.initData()
              } else {
                this.$publicFun.showErrMessage(this)
              }
            })
          } else {
            addProfileApi(parama).then((data) => {
              if (data.retcode == 0) {
                this.showAddDialogInfo.showDialog = false
                this.$refs.formData.resetFields()
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
    clearFile() {
      let parama = {
        apnmode: 0
      }
      setProfileApi(parama).then((data) => {
        if (data.retcode == 0) {
          this.initData()
          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    initSimStatus() {
      this.simStatusTimer = setInterval(() => {
        this.$store.dispatch('status/setSimInfo')
      }, 3000)
    }
  },
  beforeDestroy() {
    clearInterval(this.simStatusTimer)
    this.simStatusTimer = null
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
    width: 100%;
    margin: 40px 0;
    height: 40px;
    line-height: 40px;
    align-items: center;
    div {
      width: 50%;
    }
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
</style>
