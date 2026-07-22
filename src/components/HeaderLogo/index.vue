<template>
  <!-- <div class="head-view">
    <div class="logo-view">
      <div class="logo-img">
        <svg-icon @click="showMenuMobile" :class-name="'icon-svg pri-sidebar-menu'" icon-class="head-mobile"></svg-icon>
        <div class="logo-title">ACER</div>
      </div>
    </div>
    <div class="title-view">Acer Connect X6E</div>
  </div> -->
  <div class="pri-header-container">
    <div class="pri-header-brand">
      <div class="pri-header-logo">
        <svg-icon @click="showMenuMobile" :class-name="'icon-svg pri-sidebar-menu'" icon-class="head-mobile"></svg-icon>
        <img class="logo_img" src="../../assets/img/acer.png" alt="">
      </div>
      <div class="pri-header-title">Acer Connect X6ES</div>
      <div class="pri-header-placeholder"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HeaderLogo',
  computed: {},
  methods: {
    showMenuMobile() {
      let showNav = this.$store.state.user.showNav
      this.$store.dispatch('user/setShowNav', !showNav)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.module.scss';
.pri-header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 175px;
  border-radius: 0 0 32px 32px;
  border: 1px solid #045037;
  padding-inline: 100px;
  // background: $app-main-bg;
  background-color: rgba(0, 0, 0, 0.4);
  background: top 25px right 16px url('../../assets/img/yezi.svg') no-repeat,
    linear-gradient(#001f15, #003b27);
}
.pri-header-brand {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.pri-header-logo {
  display: flex;
  width: 280px;
  align-items: center;
}
.pri-header-title {
  display: inline-flex;
  font-size: 30px;
  font-family: acer-regular;
  // line-height: 1.2 !important;
  margin: 0;
  color: #fff;
}
.pri-header-placeholder {
  display: inline-flex;
  width: 280px;
}
.pri-sidebar-menu {
  display: none;
}
@media screen and (max-width: 1250px) {
  .pri-header-container {
    position: relative;
  }
  .pri-header-brand {
    text-align: center;
    justify-content: center;
  }
  .pri-header-logo {
    position: absolute;
    left: 20px;
    top: 20px;
    // display: none;
    .logo_img {
      width: 120px;
      height: 35px;
    }
  }
  .pri-header-placeholder {
    display: none;
  }
  .pri-header-container {
    padding-inline: 0;
  }
}
</style>

