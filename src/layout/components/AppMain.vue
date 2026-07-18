<template>
  <div class="contentWrapperMainPage" :class="showNav?'sidebarIsOpen':''">
    <div class="container-main-content content-full-page">
      <div v-show="headTitle != 'dashboard'" class="head-view">
        <div>{{ $t('nav.' + headTitle) }}</div>
        <div class="line-view"></div>
      </div>
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <router-view :key="headTitle" />
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  props: {},
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.path
    },
    headTitle() {
      // console.log('next router', this.$route)
      return this.$route.meta.title
    },
    showNav() {
      return this.$store.state.user.showNav
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      // 往历史记录里面添加一条新的当前页面的url
      window.history.pushState({}, '', window.location.href)

      // 监听 popstate 事件，阻止默认行为
      window.addEventListener('popstate', this.preventBack)
    }
  },
  methods: {
    preventBack(event) {
      // 阻止默认返回行为
      event.preventDefault()
      event.stopPropagation()
    }
  },
  beforeDestroy() {
    // 组件销毁前移除监听事件
    window.removeEventListener('popstate', this.preventBack)
  }
}
</script>
<style lang="scss">
div.container-main-content-body {
  padding: 20px 0px;
  .block-body {
    font-size: 18px;
    width: 90%;
    margin: 15px auto;
    .page-description {
      color: $gray-font-color;
      font-size: 18px;
    }
    .page-note {
      color: $gray-font-color;
      font-size: 18px;
    }
    div.c-row {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      line-height: 22px;
      min-height: 45px;
      align-items: center;
      margin: 30px 0;
    }
    // div.c-row > * {
    //   width: 100%;
    //   margin: auto 0;
    // }
    div.c-row.btn-row {
      margin-top: 55px;
      justify-content: flex-end;
    }
  }
  .table-body {
    overflow-x: auto;
    display: block;
  }
  .block-header {
    font-size: 22px;
    color: $light-style-color;
  }
  .block-divide-line {
    margin: 40px 0;
    border-bottom: 2px solid $light-style-color;
  }
  .fill-light-color {
    fill: $light-style-color;
  }
  .light-color {
    color: $light-style-color;
  }
}
</style>

<style lang="scss" scoped>
.contentWrapperMainPage {
  display: inline-block;
  background: transparent;
  padding: 0 40px;
  width: auto;
  overflow: visible;
  position: static;
  background-color: $black-bg;
  color: $default-font-color;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}
div.container-main-content {
  padding: 40px 20px;
}
.content-full-page {
  width: 100%;
}
.head-view {
  width: 100%;
  text-align: left;
  color: $light-style-color;
  font-size: 26px;
  .line-view {
    margin-top: 10px;
    border-bottom: 4px solid $light-style-color;
  }
}
.app-main {
  // min-height: calc(100vh - 211px);
  // width: 100%;
  // position: relative;
  // overflow: hidden;
  // padding: 20px;
  // background-color: $black-bg;
  display: inline-block;
  background: transparent;
  padding: 0 40px;
  width: auto;
  overflow: visible;
  position: static;
  background-color: #091d23;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}
@media screen and (max-width: 1250px) {
  // div.container-main-content {
  //   padding: 20px 0px;
  // }
}

@media screen and (max-width: 650px) {
  // div.container-main-content {
  //   padding: 0;
  // }
  .head-view {
    font-size: 20px;
    margin: 20px 0;
  }
}
</style>

