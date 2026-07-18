<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div v-show="SimStatus" class="block-body">
      <el-row class="c-row">
        <svg-icon :icon-class="'noSim'" class-name="''"></svg-icon>
        <div>{{ $t('other.noSimText') }}</div>
      </el-row>
    </div>
  </div>
</template>
<script>
import networkIndex from '@/layout'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'NoSim',
  data() {
    return {}
  },
  computed: {
    SimStatus() {
      return this.$store.state.device.deviceInfo
    }
  },
  created() {},
  mounted() {},
  methods: {},
  destroyed() {}
}
</script>

