<template>
  <div class="block-body">
    <div class="c-row">
      <div data-v-0e4af2ee="" id="QuickSetupProgressBar" class="pri-container-progressbar c-col-lg-12">
        <div data-v-0e4af2ee="" class="pri-progressbar">
          <li data-v-0e4af2ee="" class="first" :class="[currentProgress==1?'active':'',currentProgress>1?'complete':'']">{{ $t('quickSetup.installation') }}</li>
          <!-- <li data-v-0e4af2ee="" :class="currentProgress==2?'active':''">{{ $t('nav.wan') }}</li> -->
          <li data-v-0e4af2ee="" :class="[currentProgress==2?'active':'',currentProgress>2?'complete':'']">{{wanType == 'WAN'? $t('nav.wan') :$t('wan.WAN5G')}}</li>
          <li data-v-0e4af2ee="" :class="[currentProgress==3?'active':'',currentProgress>3?'complete':'']">{{ $t('nav.wifi') }}</li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ProgressHead',
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
    classObject: function (val) {
      let className = ''
      if (this.currentProgress == val) {
        className += 'active'
      } else if (this.currentProgress > val) {
        className += 'complete'
      }
      console.log(className, 'clasName')
      return className
    }
  },
  data() {
    return {}
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  methods: {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.pri-container-progressbar {
  width: 100%;
  position: relative;
  z-index: 1;
}
.pri-progressbar {
  counter-reset: step;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pri-progressbar li.active {
  color: $light-style-color;
}

.pri-progressbar li {
  list-style-type: none;
  width: 33%;
  display: inline-flex;
  flex-direction: column;
  font-size: 15px;
  position: relative;
  text-align: center;
  color: #626262;
}

.pri-progressbar li.active:before {
  border-color: $light-style-color;
  background: $light-style-color;
  color: #fff;
}

.pri-progressbar li:before {
  width: 30px;
  height: 30px;
  content: counter(step);
  counter-increment: step;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  background-color: #fff;
  line-height: 30px;
  color: #626262;
}
.pri-progressbar li:after {
  width: 100%;
  height: 3px;
  content: '';
  position: absolute;
  background-color: #626262;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.pri-progressbar li.complete {
  color: $light-style-color;
}
.pri-progressbar li.complete + li:after {
  background-color: $light-style-color;
}
// .pri-progressbar li.complete + li[data-v-0e4af2ee]:after {
//   background-color: #00aec7;
// }
.pri-progressbar li.complete:before {
  border-color: $light-style-color;
  background: $light-style-color;
  content: 'V';
  color: #fff;
}

.first::after {
  display: none;
}

.page-progress {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  height: 20px;
  margin: 40px auto;
  .progress-item {
    width: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .default-page {
    height: 100%;
    line-height: 20px;
    width: 20px;
    text-align: center;
    clip-path: circle(50%);
    color: gray;
    background: white;
    z-index: 101;
  }
  .progress-scr {
    font-size: 16px;
    margin-top: 8px;
  }
  .select-page {
    color: $light-style-color;
  }
  .select-bg {
    color: white;
    background: $light-style-color;
  }
  .line-view {
    position: absolute;
    // width: 100%;
    height: 1px;
    left: 20px;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    background: white;
    .blue-view {
      height: 100%;
      width: 0;
      background: $light-style-color;
    }
  }
}
.progess-with2 {
  width: 50% !important;
}
.progess-with3 {
  width: 100% !important;
}
</style>