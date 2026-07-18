<template>
  <div class="password">
    <!-- @input="inputClick" -->
    <el-input :style="{'--defaultStyle': pwdStyle}" @keyup.enter.native="enterComplete" :key="passwordType" ref="password" :value="value" :maxlength='maxlength' :type="passwordType" :placeholder="$t(placeholder)" name="password" tabindex="2" v-bind="$attrs" v-on="$listeners" :validate-event="validateEvent" />
    <span class="show-pwd" @click="showPwd">
      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" class-name="eye-class"></svg-icon>
    </span>
  </div>
</template>
<script>
import theme from '@/styles/theme.module.scss'
export default {
  name: 'PwdInput',
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    showErrorStyle: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: Number,
      default: 32
    },
    isLoginStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // passwordValue: '',
      // errPwd: false, // 密码输入错误标示
      passwordType: 'password' // 显示密码明文
    }
  },
  computed: {
    errPwd() {
      return this.showErrorStyle
    },
    theme() {
      return theme
    },
    pwdStyle() {
      return this.showErrorStyle ? theme.redBg : theme.menuActiveText
    }
  },
  watch: {},
  mounted() {
    // this.passwordValue = this.defaultValue
  },
  methods: {
    inputClick(val) {
      // this.errPwd = false
      this.$emit('input', val)
    },
    // changePwdValue(val) {
    //   this.$emit('changePwdValue', val)
    // },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    leftBtnClick() {
      this.$emit('leftBtnClick')
    },
    rightBtnClick() {
      this.$emit('rightBtnClick')
    },
    enterComplete() {
      console.log('....')
      if (this.isLoginStatus) {
        this.$emit('enterComplete')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.password {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  .show-pwd {
    position: absolute;
    display: flex;
    right: 10px;
    top: 0px;
    width: 30px;
    height: 40px;
    color: $login-font-color;
    .svg-icon {
      margin: auto;
    }
  }
}
// /deep/.el-input__inner {
//   background-color: $black-bg;
//   border: 1px;
//   // border: 1px solid var(--defaultStyle);
//   // height: 30px;
//   // line-height: 30PX;
// }
.eye-class {
  fill: $light-style-color !important;
}
</style>