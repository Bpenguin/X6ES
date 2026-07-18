<template>
  <div class="container-main-content-body">
    <!-- <div class="scri-view">{{ $t('wifi.basicSettingsScri') }}</div> -->
    <page-three :from-type="'wifiBasic'"></page-three>
  </div>
</template>
<script>
import PageThree from '../quickSetup/pageThree.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WifiBasicSetting',
  components: { PageThree },
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
.scri-view {
  font-size: 16px;
  padding-right: 20px;
  color: $gray-font-color;
}
</style>