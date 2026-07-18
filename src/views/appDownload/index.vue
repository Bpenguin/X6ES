<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-container">
    <div class="top-view">
      <div>{{ $t('appDownload.scr1')+':' }}<br /></div>
      <div>1. {{ $t('appDownload.scr2') }}</div>
      <div>2. {{ $t('appDownload.scr3') }}</div>
      <div>3. {{ $t('appDownload.scr4')+':' }}</div>
      <div class="sub-top">{{'(1)'+ $t('appDownload.scr5') }}</div>
      <div class="sub-top">{{'(2)' + $t('appDownload.scr6') }}</div>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="link-view">
          <div class="link-item ios-link">
            <svg-icon :icon-class="'apple-store'" class-name="link-svg"></svg-icon>
          </div>
          <div class="link-item google-link">
            <svg-icon :icon-class="'app-google'" class-name="link-svg"></svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="code-view">
          <img src="../../assets/app-code.png" alt="">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AppDownload',
  data() {
    return {}
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.main-container {
  padding: 30px 2.5%;
  color: $login-font-color;
  .top-view div {
    margin-bottom: 10px;
  }
  .sub-top {
    margin-left: 30px;
  }
}

.link-view {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 200px;
  .link-item {
    width: 150px;
  }
  .ios-link {
    margin-bottom: 15px;
    height: 50px;
  }
  .google-link {
    height: 44px;
  }
}
.link-svg {
  width: 100% !important;
  height: 100% !important;
  color: black;
  // fill: black;
}
.link-app-view > div {
  margin-top: 10px;
}
.code-view {
  width: 200px;
  height: 200px;
  // margin-left: 40px;
  padding: 2px;
  background-color: #fff;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
