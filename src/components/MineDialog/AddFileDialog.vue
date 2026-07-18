<!-- <mine-dialog :show-dialog='showSwitchDialogInfo.showDialog' :show-close-btn="showSwitchDialogInfo.showCloseBtn" :title="showSwitchDialogInfo.title" :msg-title="showSwitchDialogInfo.msgTitle" :left-btn-text="showSwitchDialogInfo.leftBtnText" @leftBtnClick="showSwitchDialogInfo.showDialog = false" @closeDialog="showSwitchDialogInfo.showDialog = false"></mine-dialog> -->

<template>
  <div v-show="showDialog">
    <div class="mine-dialog">
      <div class="dialog-mian">
        <div class="close-btn" @click="closeDialog">X</div>
        <div class="head-view">
          <!-- <div>这是头部图片</div> -->
          <div class="title-view">
            <svg-icon class-name="svg-body" :icon-class="titleBgImg"></svg-icon>
            <span class="top-title">{{ $t(title) }}</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="slot-view">
          <slot></slot>
        </div>
        <div class="bottom-view" v-show="showBottomBtn">
          <mine-button :btn-title="$t(leftBtnText)" @clickBtn="leftBtnClick"></mine-button>
          <mine-button :btn-title="$t(rightBtnText)" @clickBtn="rightBtnClick"></mine-button>
        </div>
      </div>
      <div class="mask"></div>
    </div>
  </div>

</template>
<script>
import MineButton from '@/components/MineButton'
export default {
  name: 'MineDialog',
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
    showBottomBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'common.add'
    },
    titleBgImg: {
      type: String,
      default: 'add-2'
    },
    leftBtnText: {
      type: String,
      default: 'common.cancel' //common.cancel
    },
    rightBtnText: {
      type: String,
      default: 'common.apply' //common.confirm
    }
  },
  data() {
    return {
      showDialogView: true
    }
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
  // display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 40px;
  z-index: 999;
  overflow: auto;
  .dialog-mian {
    position: relative;
    width: 80%;
    // max-width: 500px;
    border-radius: 5px;
    margin: auto;
    margin-top: 15vh;
    padding: 24px;
    color: white;
    // background: $black-bg;
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
          margin-left: 10px;
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
      // width: 75%;
      margin: 10px auto;
      text-align: left;
      font-size: 18px;
    }
    .slot-view {
      width: 90%;
      margin: 20px auto;
    }
    .bottom-view {
      display: flex;
      flex-direction: row;
      width: 80%;
      margin: 40px auto;
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
}
.top-title {
  margin-left: 5px;
  font-size: 22px;
}
.svg-body {
  width: 40px !important;
  height: 40px !important;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 998;
}
.showDialog {
  display: block;
}
@media screen and (min-width: 990px) {
  .dialog-mian {
    max-width: 800px;
  }
}
@media screen and (max-width: 980px) {
  .mine-dialog {
    padding: 40px 20px;
  }
  .dialog-mian {
    // max-width: 80%;
    width: 98% !important;
    padding: 20px;
  }
}
</style>