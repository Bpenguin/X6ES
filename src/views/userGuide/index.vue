<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-container">
    <div class="btn-mian" @click="clickBtn">{{btnTitle}}
      <svg-icon :icon-class="'guide'" class-name="link-svg"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManual',
  data() {
    return {}
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  methods: {
    clickBtn() {
      window.open(
        'https://w6-usermanual.s3.eu-central-1.amazonaws.com/acer_connect_X6e_Manual.pdf'
      )
    }
  },
  destroyed() {}
}
</script>


<style lang="scss" scoped>
.main-container {
}
.btn-mian {
  position: relative;
  // display: inline-block;
  padding: 5px 20px;
  text-align: center;
  align-items: center;
  width: 150px;
  height: 100px;
  line-height: 100px;
  clip-path: polygon(
    13px 0,
    calc(100% - 13px) 0,
    100% 50%,
    calc(100% - 13px) 100%,
    13px 100%,
    0 50%
  );
  background: linear-gradient(0deg, $main-style-color, $main-style-color);
  margin: 60px auto;
}

.btn-mian:hover {
  transform: scale(1.05);
}
.link-svg {
  width: 100% !important;
  height: 100% !important;
  color: black;
}
</style>
