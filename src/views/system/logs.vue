<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('system.logScr') }}</div>
    </div>
    <div class="block-body">
      <el-table :data="tableData">
        <div slot="empty" style="text-align: left;">{{$t('wan.noData')}}</div>
        <el-table-column prop="dateTime" :label="$t('homeNet.deviceName')" min-width="33%"></el-table-column>
        <el-table-column prop="event" :label="$t('wan.macAddress')" min-width="67%"></el-table-column>
      </el-table>
      <div class="page-view">
        <div></div>
        <el-pagination background layout="prev, pager, next" :total="tableData.length">
        </el-pagination>
        <div class="save-log">
          <mine-button :btn-title="$t('system.saveLog')" @clickBtn="saveLogs"></mine-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDeviceInfo } from '@/api/system'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SystemLogs',
  data() {
    return {
      tableData: [
        // {
        //   dateTime: '15.08.2023 16:26:45',
        //   event: 'Acer Connect X6ES started'
        // }
      ]
    }
  },
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    }
  },
  created() {},
  mounted() {
    console.log('this.$store', this.$store)
    getDeviceInfo().then((data) => {
      if (data.retcode == 0) {
        console.log('getDeviceInfo: data', data)
        this.$store.dispatch('device/setDeviceInfo', data)
        console.log('deviceInfo:', this.deviceInfo)
      }
    })
  },
  methods: {
    saveLogs() {}
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.main-content {
  color: $default-font-color;
  padding: 30px;
  .row-view {
    margin: 30px 0;
  }
}
.scri-view {
  color: $gray-font-color;
}
.table-view {
  margin: 30px 0;
}
.page-view {
  position: relative;
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin-top: 30px;
}
.page-back-view {
  background-color: $main-style-color;
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
