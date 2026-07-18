<!-- <template>
  <div v-show="showDialog" class="mine-dialog">
    <div class="dialog-mian">
      <div v-if='showCloseBtn' class="close-btn" @click="closeDialog">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <div class="head-view">
        <div class="title-view">
          <div class="title-bg-img">
            <img :src="require('@/assets/img/'+titleBgImg+'.png')" alt="">
          </div>
          <span>{{ $t(title) }}</span>
        </div>
        <div class="line"></div>
      </div>
      <div class="iframe-view">
        <iframe src="./static/test.pdf" frameborder="0"></iframe>
      </div>
      <div class="bottom-view">
        <mine-button v-if="leftBtnText.length > 0" :btn-title="$t(leftBtnText)" @clickBtn="leftBtnClick"></mine-button>
        <mine-button v-if="rightBtnText.length > 0" :btn-title="$t(rightBtnText)" @clickBtn="rightBtnClick"></mine-button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script>
import MineButton from '@/components/MineButton'
export default {
  name: 'IframeAgreement',
  components: { MineButton },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    showCloseBtn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'nav.quickSetup'
    },
    titleBgImg: {
      type: String,
      default: 'logo'
    },
    leftBtnText: {
      type: String,
      default: '' //common.cancel
    },
    rightBtnText: {
      type: String,
      default: '' //common.confirm
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    leftBtnClick() {
      this.$emit('leftBtnClick')
    },
    rightBtnClick() {
      this.$emit('rightBtnClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.mine-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .dialog-mian {
    position: absolute;
    display: inline-block;
    width: 90%;
    height: 90%;
    border-radius: 5px;
    border: 2px solid $main-style-color;
    left: 5%;
    top: 5%;
    // transform: translate(-50%, -50%);
    color: white;
    background: $app-main-bg;
    z-index: 999;
    .head-view {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 5px 10px;
      .title-view {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        .title-bg-img {
          width: 20px;
          height: 20px;
          margin: auto 5px;

          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          line-height: 40px;
          height: 100%;
        }
      }
      .line {
        width: 90%;
        height: 2px;
        margin: 5px auto;
        background: $light-style-color;
      }
    }
    .main-title {
      width: 90%;
      margin: 10px auto;
      text-align: left;
      font-size: 18px;
    }
    .bottom-view {
      display: flex;
      flex-direction: row;
      width: 80%;
      margin: 20px auto;
      justify-content: space-around;
    }
    .close-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 998;
  }
}
.iframe-view {
  width: 90%;
  height: 70%;
  margin: auto;
  iframe {
    width: 100%;
    height: 100%;
  }
}
.showDialog {
  display: block;
}
</style> -->