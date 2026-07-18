<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="rwd-desktop">
      <div id="Sidebar">
        <nav class="sidebar pri-main-sidebar">
          <el-menu @select="showSubMenu" :default-active="activeMenu" :text-color="theme.menuText" :background-color="theme.menuBg" mode="vertical">
            <sidebar-item v-for="(menu,index) in navMenus" :index-num="index.toString()" :key="menu.name" :item="menu" />
          </el-menu>
        </nav>
        <div v-if="isShowSubMenu" class="pri-rwd-switch">
          <nav class="sidebar pri-sub-sidebar">
            <!-- sidebar sub-menu -->
            <el-menu class="nav" :default-active="subActiveMenu" :text-color="theme.menuText" :background-color="theme.menuBg" mode="vertical">
              <sidebar-item v-for="(item,subIndex) in subMenus" :index-num="activeMenu + '-' + subIndex.toString()" :key="activeMenu + '-' + subIndex.toString()" :item="item" />
            </el-menu>
          </nav>
        </div>
      </div>
    </div>
    <div class="rwd-mobile">
      <div id="SidebarMobile">
        <nav class="sidebar pri-sidebar-mobile" :class="showNav?'show':''">
          <el-menu @select="closeMenu" class="nav" :text-color="theme.menuText" :background-color="theme.menuBg" mode="vertical">
            <sidebar-item-mobile v-for="(menu) in navMenus" :index-num="menu.name" :key="menu.name" :item="menu" />
          </el-menu>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import SidebarItemMobile from './SidebarItemMobile.vue'
import theme from '@/styles/theme.module.scss'
// eslint-disable-next-line no-unused-vars
import { navMenus } from './slidebar.js'

export default {
  name: 'SideBar',
  components: { SidebarItem, SidebarItemMobile },
  data() {
    return {
      navMenus: navMenus,
      subMenus: [],
      isShowSubMenu: false,
      // activeMenu: '0',
      subActiveMenu: '0'
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    theme() {
      return theme
    },
    showNav() {
      return this.$store.state.user.showNav
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      console.log('0000000000000000', route, meta, path)
      let tempActiveMenu = this.activeIndex(path).toString()
      return tempActiveMenu
    }
  },
  mounted() {
    const route = this.$route
    const { meta, path } = route
    console.log('1111111', route, meta, path)
    this.showSubMenu(this.activeIndex(path))
  },
  methods: {
    activeIndex(name) {
      console.log('=========', name, this.navMenus)
      if (name == '/dashboard/index' || name == '/quickSetup/index') {
        this.isShowSubMenu = false
        this.subMenus = []
      }
      for (let i = 0; i < this.navMenus.length; i++) {
        let subMenu = this.navMenus[i]
        if (name == subMenu.name) {
          this.subMenus = []
          this.isShowSubMenu = false
          return i
        }

        if (subMenu.children && subMenu.children.length > 0) {
          for (let j = 0; j < subMenu.children.length; j++) {
            if (name == subMenu.children[j].name) {
              this.subMenus = subMenu.children
              this.subActiveMenu = i + '-' + j
              this.isShowSubMenu = true
              console.log('9999,', this.subActiveMenu)
              // console.log('999999999', i)
              return i
            }
          }
        }
      }
      return 0
    },
    showSubMenu(index) {
      this.subMenus = []
      this.isShowSubMenu = false
      let beforeActiveMenu = this.activeMenu
      if (navMenus[index].children) {
        this.subMenus = navMenus[index].children
        if (beforeActiveMenu != index) {
          this.subActiveMenu = index + '-' + '0'
        }
        this.isShowSubMenu = true
      }
    },

    closeMenu(index, indexPath) {
      console.log(index, indexPath)
      this.$store.dispatch('user/setShowNav', false)
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.module.scss';
#Sidebar {
  display: flex;
  z-index: 1;
  width: 100%;
}
#SidebarMobile {
  display: flex;
  ul {
    height: 100%;
    overflow-y: auto;
  }
}
.bg-color {
  background-color: $menuActiveText;
}

.pri-sub-sidebar {
  margin-left: 0;
  width: 300px !important;
  height: 100% !important;
  min-height: 600px !important;
  padding-top: 30px !important;
  border-right: 1px solid $app-main-bg;
  background-color: #001e14;
}
.sidebar {
  width: 100%;
  padding: 0;
  z-index: 11;
  // transition: width 0.25s ease, background 0.25s ease;
  .nav {
    overflow: hidden;
    flex-wrap: nowrap;
    flex-direction: column;
  }
}
.pri-main-sidebar {
  font-size: 22px;
  width: $sideBarWidth !important;
  min-height: 600px !important;
  height: 100% !important;
  padding: 30px 10px !important;
  background-color: #001e14;
}
.pri-sidebar-mobile {
  width: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
}

.pri-sidebar-mobile.show[data-v-22073412] {
  width: calc(100vw - 3px);
  height: calc(100vh - 171px) !important;
  background-color: #000;
}

#Sidebar:hover .pri-rwd-switch .sidebar {
  width: 300px !important;
}
#Sidebar:hover .el-menu {
  position: relative !important;
}
#Sidebar:hover .el-menu-item {
  position: relative !important;
}

.pri-sidebar-mobile.show {
  width: calc(100vw - 3px);
  height: calc(100vh - 171px) !important;
  // background-color: #000;
}
</style>
