<template>
  <div v-if="!item.hidden">
    <!-- <div>这是单个菜单</div> -->
    <template v-if="!item.children">
      <app-link :to="item.topath">
        <el-menu-item class="nav-link" :index="indexNum">
          <svg-icon :icon-class="item.icon" class-name="''"></svg-icon>
          <span class="sider-title">{{$t('nav.' + item.title)}}</span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="indexNum" popper-append-to-body>
      <!-- <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="generateTitle(item.meta.title)" />
      </template> -->
      <template slot="title">
        <div class="nav-link" :index="indexNum">
          <svg-icon :icon-class="item.icon" class-name=""></svg-icon>
          <span class="sider-title">{{$t('nav.' + item.title)}}</span>
        </div>
      </template>
      <sidebar-item v-for="child in item.children" :index-num="child.name" :key="child.topath" :item="child" />
    </el-submenu>
  </div>
</template>

<script>
import AppLink from './Link'
import theme from '@/styles/theme.module.scss'
import SidebarItem from './SidebarItem.vue'
export default {
  name: 'SidebarItemMobile',
  components: { AppLink, SidebarItem },
  // mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    indexNum: {
      type: String,
      default: '0'
    }
  },
  computed: {
    showChildMenu() {
      return this.item.children
    },
    theme() {
      return theme
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  mounted() {
    // console.log('', this.item)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
// .icon {
//   height: 20px;
//   width: 20px;
//   img {
//     width: 100%;
//     height: 100%;
//   }
// }
svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  fill: #b2b2b2;
}
.nav-link {
  align-items: center;
  display: flex;
  padding: 0 20px;
  white-space: nowrap;
  height: 52px;
  color: $login-font-color;
  height: 55px;
}

.sider-title {
  margin-left: 5px;
  font-weight: 600;
}

/deep/.el-menu-item.is-active {
  color: $light-style-color !important;
  svg {
    fill: $light-style-color !important;
  }
}
/deep/.el-menu-item:hover {
  background-color: grey !important;
}
</style>
