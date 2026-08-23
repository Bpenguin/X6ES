<template>
  <div>
    <div v-if="wanType == '5G' && (!(SIMStatus == 1 || SIMStatus == 2))">
      <no-sim :sim-status='SIMStatus' :page-type='true' @toPage='toPage'></no-sim>
    </div>
    <div v-else>
      <div class="block-header">{{$t('quickSetup.installation')}}</div>
      <div v-show="wanType == 'WAN'" class="block-body">
        <section class="content-item">
          <div class="left-num">1</div>
          <div class="detail-text page-note">{{ $t('quickSetup.pageOneText1',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
        </section>
        <section class="content-item">
          <div class="left-num">2</div>
          <div class="detail-text page-note">{{ $t('quickSetup.pageOneText2',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
        </section>
        <section class="content-item">
          <div class="left-num">3</div>
          <div class="detail-text page-note">{{ $t('quickSetup.pageOneText3',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
        </section>
      </div>
      <div v-show="wanType == '5G'" class="block-body">
        <section class="content-item">
          <div class="left-num">1</div>
          <div class="detail-text page-note">{{ $t('quickSetup.pageOneText1',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
        </section>
        <section class="content-item">
          <div class="left-num">2</div>
          <div class="detail-text page-note">{{ $t('quickSetup.pageOneText25G',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
        </section>
      </div>
      <div class="block-body pri-img-disc-container">
        <el-row>
          <div class="pri-img-disc">
            <img v-show="wanType == 'WAN'" src="../../assets/img/img_ethernet_wan.png" alt="">
            <img v-show="wanType == '5G'" src="../../assets/img/img_5g_wan.png" alt="">
          </div>
        </el-row>
      </div>
    </div>
    <div class="block-body mar-top">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.back')" @clickBtn="toPage"></mine-button>
        <mine-button v-show="!(wanType == '5G' && (!(SIMStatus == 1 || SIMStatus == 2)))" :btn-title="$t('common.next')" @clickBtn="goToPageIndex"></mine-button>
      </div>
    </div>
  </div>
</template>
<script>
import NoSim from '../network5G/noSim.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'PageOne',
  components: { NoSim },
  props: {
    currentProgress: {
      type: Number,
      default: 1
    },
    wanType: {
      type: String,
      default: 'WAN'
    }
  },
  computed: {
    SIMStatus() {
      return this.$store.state.status.simStatus
    }
  },
  data() {
    return {
      simStatusTimer: '' // 实时刷新卡状态
    }
  },
  created() {
    this.$store.dispatch('status/setSimInfo')
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.initSimStatus() // 循环获取SIM卡状态
  },
  methods: {
    goToPageIndex() {
      this.$emit('goToPageIndex', { index: 2 })
    },
    toPage() {
      this.$emit('goToPageIndex', { index: 0 })
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
// .page-one {
//   color: $light-style-color;
//   font-size: 14px;
//   margin: 30px 0;
//   .top-title {
//     text-align: left;
//   }
// }
.content-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 70%;
  margin-left: 20%;
  margin-top: 20px;
  text-align: left;
  .left-num {
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    line-height: 30px;
    text-align: center;
    color: $light-style-color;
    font-weight: 700;
    font-size: 20px;
    border: 3px solid $light-style-color;
    border-radius: 17px;
  }
  .detail-text {
    line-height: 22px;
    margin-left: 10px;
  }
  .img-view {
    width: 100%;
    height: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.pri-img-disc-container {
  display: flex;
  justify-content: center;
}
.pri-img-disc {
  width: 953px;
  height: 332px;
  padding: 40px 20px;
}
img {
  width: 100%;
}

.mar-top {
  margin-top: 90px !important;
}
@media screen and (max-width: 650px) {
  .content-item {
    width: 100%;
    margin-left: 0;
  }
}
</style>