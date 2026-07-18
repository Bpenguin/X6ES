<template>
  <div class="password">
    <el-input v-bind="$attrs" v-on="$listeners" :placeholder="placeholder" :value="value" :validate-event="true" :maxlength='maxlength' />
  </div>
</template>
<script>
import theme from '@/styles/theme.module.scss'
export default {
  name: 'MineInput',
  components: {},
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    value: '',
    placeholder: '',
    maxlength: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {}
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
    this.passwordValue = this.defaultValue
  },
  methods: {
    inputClick(val) {
      // this.errPwd = false
      this.$emit('input', val)
    }
    // changePwdValue(val) {
    //   this.$emit('changePwdValue', val)
    // },
  }
}
</script>
