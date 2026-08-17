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

<!-- <script>
// import MineDialog from '@/components/MineDialog'
export default {
  name: 'App',
  components: {},
  computed: {}
}
</script> -->
<script>
export default {
  name: 'App',

  data() {
    return {
      timer: null,
      idleTime: 5 * 60 * 1000, // 5分钟

      // mousemove节流
      lastMouseMoveTime: 0,
      mouseMoveInterval: 1000 // 1秒内只处理一次
    }
  },

  mounted() {
    this.initIdleMonitor()
  },

  beforeDestroy() {
    this.removeIdleMonitor()
  },

  methods: {
    /**
     * 初始化监听
     */
    initIdleMonitor() {
      const events = [
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keydown',
        'touchstart'
      ]

      events.forEach((event) => {
        window.addEventListener(event, this.handleUserEvent, true)
      })

      // 初始化计时
      this.resetIdleTimer()
    },

    /**
     * 用户操作事件处理
     */
    handleUserEvent(event) {
      /**
       * mousemove 高频触发优化
       */
      if (event.type === 'mousemove') {
        const now = Date.now()

        if (now - this.lastMouseMoveTime < this.mouseMoveInterval) {
          return
        }

        this.lastMouseMoveTime = now
      }

      this.resetIdleTimer()
    },

    /**
     * 重置无操作计时
     */
    resetIdleTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.logout()
      }, this.idleTime)
    },

    /**
     * 移除监听
     */
    removeIdleMonitor() {
      const events = [
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keydown',
        'touchstart'
      ]

      events.forEach((event) => {
        window.removeEventListener(event, this.handleUserEvent, true)
      })

      if (this.timer) {
        clearTimeout(this.timer)
      }
    },

    /**
     * 自动退出登录
     */
    logout() {
      // 如果有vuex
      this.$router.push({
        path: '/logOut'
      })
    }
  }
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
