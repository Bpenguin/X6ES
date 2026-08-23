<template>
  <div v-if="!item.hidden">
    <!-- <div>这是单个菜单</div> -->
    <template>
      <app-link :to="item.topath">
        <el-menu-item class="sidebar-item" :class="defaultLogPwd?'diable-item':''" :index="indexNum">
          <div v-if="!item.childMenu" class="icon">
            <svg-icon :icon-class="item.icon" class-name="''"></svg-icon>
            <!-- <img :src="require('@/styles/gaming/'+item.icon + '.png')" alt=""> -->
          </div>
          <!-- {{$t('nav.' + item.title)}} -->
          <!-- <div class="test"> -->
          <span class="sider-title">{{$t('nav.' + item.title)}}</span>
          <!-- </div> -->
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import AppLink from './Link'
import theme from '@/styles/theme.module.scss'
import bus from '@/utils/bus'

export default {
  name: 'SidebarItem',
  components: { AppLink },
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
    },
    basePath: {
      type: String,
      default: ''
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
      onlyOneChild: null,
      defaultLogPwd: false
    }
  },
  mounted() {
    this.defaultLogPwd =
      sessionStorage.getItem('login_flag') == 1 ? true : false
    bus.$on('updatePwd', (data) => {
      this.defaultLogPwd = data
    })
    // console.log('', this.item)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.test {
  height: 30px;
}
// .icon {
//   height: 20px;
//   width: 20px;
//   img {
//     width: 100%;
//     height: 100%;
//   }
// }
.icon {
  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    fill: #b2b2b2;
  }
}
// .sidebar-item {
//   display: flex;
//   flex-direction: row;
//   font-size: 20px;
//   height: 70px !important;
//   line-height: 70PX !important;
//   border-bottom: 1px solid $black-bg;
// }

.sider-title {
  margin-left: 5px;
  font-weight: 600;
  line-height: 1;
  vertical-align: middle;
}

/deep/.el-menu-item.is-active {
  background-color: transparent;
  color: $light-style-color !important;
  svg {
    fill: $light-style-color !important;
  }
}
/deep/.el-menu-item.diable-item {
  background-color: transparent;
  color: $tip-bg-color !important;
  svg {
    fill: $tip-bg-color !important;
  }
}
/deep/.el-menu-item:hover {
  background-color: grey !important;
}
</style>
