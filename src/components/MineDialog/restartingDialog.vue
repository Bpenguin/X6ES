<template>
  <div>
    <div class="mine-dialog">
      <div class="dialog-mian">
        <!-- <div class="close-btn" @click="closeDialog">X
        </div> -->
        <div class="head-view">
          <div class="title-view">
            <svg-icon class-name="svg-body" :icon-class="titleBgImg"></svg-icon>
            <!-- <img :src="require('@/assets/img/'+titleBgImg+'.png')" alt=""> -->
            <span class="top-title">{{ $t(title) }}</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="main-title">
          {{ $t(msgTitle,{ProductName:GLOBAL.PRODUCT_NAME}) }}<br />
          {{ $t('system.Countingdown') }}:{{ time }}
        </div>
        <div class=""></div>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RestartingDialog',
  components: {},
  props: {
    title: {
      type: String,
      default: 'system.Restarting'
    },
    titleBgImg: {
      type: String,
      default: 'warning'
    },
    msgTitle: {
      type: String,
      default: 'system.restartingTip'
    }
  },
  data() {
    return {
      time: 120,
      timer: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      sessionStorage.setItem('login-token', '')
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          clearInterval(this.timer)
          this.timer = null
          window.location.href = '/'
        }
      }, 1000)
    },
    closeDialog() {
      sessionStorage.setItem('login-token', '')
      window.location.href = '/'
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang="scss" scoped>
.mine-dialog {
  // display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .dialog-mian {
    position: absolute;
    display: inline-block;
    width: 80%;
    // max-width: 500px;
    border-radius: 5px;
    // border: 2px solid $main-style-color;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    padding: 24px;
    // background: url('../../assets/img/dialog-bg.svg') left 8px top 8px no-repeat,
    //   linear-gradient(rgb(0, 36, 43), rgb(0, 22, 26));
    background: #001e16;
    border: 2px solid $main-style-color;
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
        width: 100%;
        height: 2px;
        margin: 5px auto;
        background: $main-style-color;
      }
    }
    .main-title {
      width: 90%;
      margin: 20px auto;
      text-align: left;
      font-size: 18px;
    }
    .bottom-view {
      display: flex;
      flex-direction: row;
      width: 80%;
      margin: 40px auto;
      height: 40px;
      justify-content: space-around;
    }
    .close-btn {
      position: absolute;
      right: 20px;
      top: 10px;
      height: 30px;
      line-height: 30px;
      color: $gray-font-color;
      font-size: 20px;
      // img {
      //   width: 100%;
      //   height: 100%;
      // }
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
.top-title {
  margin-left: 5px;
  font-size: 22px;
}
.svg-body {
  width: 40px !important;
  height: 40px !important;
}
.slot-view {
  width: 75%;
  margin: 10px auto;
  text-align: left;
}
.showDialog {
  display: block;
}
@media screen and (min-width: 990px) {
  .dialog-mian {
    max-width: 500px;
  }
}
@media screen and (max-width: 980px) {
  .dialog-mian {
    // max-width: 80%;
    width: 90% !important;
    padding: 20px;
  }
}
</style>