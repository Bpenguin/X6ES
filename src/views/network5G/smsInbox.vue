<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <no-sim v-if="!(SIMStatus == 1 || SIMStatus == 2)" :sim-status='SIMStatus'></no-sim>
    <div v-show="!smsDetailStatus" v-else>
      <div class="block-body">
        <div class="page-description">{{ $t('network5G.SMSInboxScr') }}</div>
      </div>
      <div class="block-body">
        <div class="c-row btn-row title-row">
          <div>{{ $t('network5G.SMSInboxTitle')+' ('+$t('network5G.usedCapacity')+'/'+$t('network5G.Total')+'):' }}{{ smsInfo.inBoxTotalCount }}/{{ smsInfo.localMax }}</div>
          <mine-button :btn-title="$t('common.delete')" @clickBtn="deleteSms(2)"></mine-button>
        </div>
      </div>
      <div class="block-body">
        <el-table :data="tableData" @row-click="rowContentClick" @selection-change="handleSelectionChange">
          <div slot="empty" style="text-align: left;">{{$t('wan.noData')}}</div>
          <el-table-column :label="$t('network5G.state')" min-width="15%">
            <template slot-scope="scope">
              <div v-if="scope.row.read == 1">
                <svg-icon icon-class="email" class-name="emial-svg"></svg-icon>
              </div>
              <div v-else>
                <svg-icon icon-class="unReadEmail" class-name="emial-svg"></svg-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mobileNumber" :label="$t('network5G.PhoneNumber')" min-width="25%"></el-table-column>
          <el-table-column :label="$t('network5G.Content')" min-width="40%">
            <template slot-scope="scopeContent">
              <span class="content_msg">
                {{ scopeContent.row.content_filter }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="datetime" :label="$t('network5G.DateAndTime')" min-width="25%"></el-table-column>
          <el-table-column type="selection" width="80"></el-table-column>
        </el-table>
        <div class="page-view">
          <div></div>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" background layout="prev, pager, next" :total="smsInfo.inBoxTotalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-show="smsDetailStatus" :key="currentSmsData.messageId" class="block-body">
      <div class="block-body">
        <div class="c-row">{{$t('other.From')+':'+ currentSmsData.mobileNumber}}</div>
        <textarea v-model="currentSmsData.content_filter" class="c-row textarea-view" disabled></textarea>
      </div>
      <!-- <div class="block-body">
        <div class="c-row jc-bt">
          <div>Reply to: {{currentSmsData.mobileNumber  }}</div>
          <div>{{replyContent.length}}/1530</div>
        </div>
        <textarea v-model="replyContent" :placeholder="$t('network5G.EnterReplyHere')" class="c-row textarea-view"></textarea>
      </div> -->
      <div class="block-body">
        <div class="c-row btn-row">
          <mine-button :btn-title="$t('common.back')" @clickBtn="cancelReply"></mine-button>
          <mine-button :btn-title="$t('common.delete')" @clickBtn="deleteSms"></mine-button>
          <!-- <mine-button :btn-title="$t('common.send')" @clickBtn="sendSms" :un-click="replyContent.length==0"></mine-button> -->
        </div>
      </div>
    </div>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :title="showDialogInfo.title" :show-close-btn="true" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @closeDialog="showDialogInfo.showDialog = false">
    </mine-dialog>
  </div>
</template>

<script>
import NoSim from './noSim.vue'
import MineDialog from '@/components/MineDialog'
import {
  getSmsboxInfoApi,
  getMessagesByTypeApi,
  sendMessageApi,
  delMessagesApi,
  setMessagesStatusApi
} from '@/api/network5G'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SIMInbox',
  components: { NoSim, MineDialog },

  data() {
    return {
      simStatusTimer: '', // 实时刷新卡状态
      smsInfo: {
        localMax: 100,
        localUsed: 0,
        inBoxTotalCount: 0
      },
      smsDetailStatus: false,
      tableData: [],
      currentSmsData: {},
      replyContent: '',
      replySizeNum: 0,
      currentPage: 1, // 当前页码
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.systemFirmware', // 标题
        msgTitle: 'system.updateVersionMsg',
        leftBtnText: 'common.cancel', //左侧按钮的描述
        rightBtnText: 'common.download'
      }
    }
  },
  computed: {
    SIMStatus() {
      this.initData()
      return this.$store.state.status.simStatus
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
    initSimStatus() {
      this.simStatusTimer = setInterval(() => {
        this.$store.dispatch('status/setSimInfo')
      }, 3000)
    },
    handleSelectionChange(val) {
      this.selectedData = val
    },
    handleCurrentChange() {
      this.initData()
    },
    // 取消回复
    cancelReply() {
      this.smsDetailStatus = false
      this.currentSmsData = {}
      this.replyContent = ''
      this.initData()
    },
    // 删除短信
    deleteSms(type = 1) {
      let params = {
        type: 1
      }
      let messageIdTemp = ''
      if (type == 2) {
        if (!this.selectedData) return
        this.selectedData.forEach((item) => {
          messageIdTemp += ' ' + item.messageId
        })
        messageIdTemp = messageIdTemp.trim()
      } else {
        messageIdTemp = this.currentSmsData.messageId
      }
      params['messageId'] = messageIdTemp
      delMessagesApi(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          setTimeout(() => {
            this.currentSmsData = {}
            this.replyContent = ''
            this.smsDetailStatus = false
            this.currentPage = 1
            this.initData()
          }, 2000)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    sendSms() {
      let params = {
        messageId: this.currentSmsData.messageId,
        recipients: this.currentSmsData.mobileNumber,
        content: this.stringToUnicode(this.replyContent),
        codetype: 1
      }
      sendMessageApi(params).then((data) => {
        if (data.retcode == 0) {
          this.$publicFun.showSucMessage(this)
          setTimeout(() => {
            this.currentSmsData = {}
            this.replyContent = ''
            this.smsDetailStatus = false
            this.initData()
          }, 2000)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },
    initData() {
      getSmsboxInfoApi().then((data) => {
        if (data.retcode == 0) {
          this.smsInfo.localMax = data.localMax
          this.smsInfo.localUsed = data.localUsed
          this.smsInfo.inBoxTotalCount = data.inBoxTotalCount
        }
      })
      let currentIndex = (this.currentPage - 1) * 10 + 1
      getMessagesByTypeApi({ startNum: currentIndex, type: 1 }).then((data) => {
        this.tableData = []
        if (data.retcode == 0 && data.totalCount > 0) {
          data.smsList.forEach((item, index) => {
            item.content_filter = this.decodeMsg(item.content)
          })
          this.tableData = [...data.smsList]
        }
      })
    },
    // 短信解码
    decodeMsg(str) {
      let that = this
      return str.replace(/([A-Fa-f0-9]{1,4})/g, function (matchStr, parens) {
        //console.log(matchStr);
        //console.log(parens);
        return that.UnicodeTostring(parens)
      })
    },
    UnicodeTostring(hex) {
      var n = parseInt(hex, 16)
      var result = ''
      result += String.fromCharCode(n)
      return result
    },
    // 短信内容编码
    stringToUnicode(str) {
      let unicodeStr = ''
      for (let i = 0; i < str.length; i++) {
        const unicode = str.charCodeAt(i).toString(16).padStart(4, '0')
        //unicodeStr += '\\u' + unicode;
        unicodeStr += unicode.toUpperCase()
      }
      return unicodeStr
    },

    rowContentClick(row) {
      setMessagesStatusApi({
        type: 1,
        messageId: row.messageId,
        read: 1
      }).then()
      this.currentSmsData = {}
      this.replyContent = ''
      this.currentSmsData = { ...row }
      this.smsDetailStatus = true
    },
    apply() {},
    cancel() {
      this.dmzSwitch = this.defaultDmzSwitch
      this.dmzHostIP = this.defaultDmzHostIP
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
.emial-svg {
  width: 40px;
  height: 40px;
}
.jc-bt {
  justify-content: space-between !important;
}
.textarea-view {
  width: 100%;
  height: 100px;
  resize: none;
  color: white;
  font-size: 18px;
  background-color: $table-content-bag-color;
}
textarea:disabled {
  background-color: $table-content-bag-color !important;
}
.page-view {
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
}
.title-row {
  justify-content: space-between !important;
}
.content_msg {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .cell {
  word-break: break-word;
}

/deep/ th {
  background-color: $table-head-bag-color !important;
}

/deep/ td {
  background-color: $table-content-bag-color !important;
}

/deep/ .btn-next {
  border-radius: 15px !important;
  background-color: #4c4c4c !important;
}
/deep/ .btn-prev {
  border-radius: 15px !important;
  background-color: #4c4c4c !important;
}
/deep/ .btn-next:hover {
  background-color: $main-style-color !important;
}
/deep/ .btn-prev:hover {
  background-color: $main-style-color !important;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: $main-style-color;
  color: #fff;
}
</style>
