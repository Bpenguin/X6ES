<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-menu class="el-menu-active" :default-active="activeMenu" :text-color="theme.menuText" :background-color="theme.menuBg" mode="vertical">
      <sidebar-item v-for="menu in navMenus" :key="menu.name" :item="menu" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import theme from '@/styles/theme.module.scss'
// eslint-disable-next-line no-unused-vars
import { navMenus } from './slidebar.js'

export default {
  name: 'SubMenuSideBar',
  components: { SidebarItem },
  data() {
    return {
      navMenus: navMenus
    }
  },
  computed: {
    ...mapGetters(['routers', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // console.log('22222222')
      console.log('route info', route, meta, path)
      return meta.title
    },
    theme() {
      return theme
    }
  },
  mounted() {
    console.log(this.routers)
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.module.scss';
.bg-color {
  background-color: $menuActiveText;
}
.el-menu-active {
  border: 0;
  margin: auto 0;
}
</style>