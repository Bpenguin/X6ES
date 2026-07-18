<template>
  <div id="app" class="general-font-size">
    <div class="app-content">
      <!-- <header-view></header-view> -->
      <div class="container-scroller sidebarIsOpen" style="position: relative;">
        <transition name="router-fade" mode="out-in">
          <!-- <keep-alive> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import MineDialog from '@/components/MineDialog'
export default {
  name: 'App',
  components: {},
  computed: {}
}
</script>

<style lang="scss">
@import '@/styles/theme.module.scss';
.general-font-size {
  color: $default-font-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.container-scroller {
  margin: auto;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  // font-size: 22px;
  overflow: auto;
  background: $app-main-bg;
  background-size: 100% 100%;
}
// .app-content {
//   min-height: 100%;
//   background-color: $app-main-bg;
//   padding: 0 60px 40px 60px;
//   // background-color: $red;
// }
@media screen and (min-width: 1599px) {
  .container-scroller {
    font-size: 18px;
  }
}
</style>
