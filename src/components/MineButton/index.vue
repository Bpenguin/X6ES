<template>
  <button :disabled="unClick" type="button" class="btn btn-secondary" :class="unClick?className:''" @click="clickBtn">{{btnTitle}}
  </button>
</template>
<script>
export default {
  name: 'MineButton',
  props: {
    btnTitle: {
      type: String,
      default: ''
    },
    unClick: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'unClick'
    }
  },
  computed: {},
  methods: {
    clickBtn() {
      this.$emit('clickBtn')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: 18px;
  padding-inline: 21px;
  padding-block: 8px;
  // clip-path: polygon(
  //   13px 0,
  //   calc(100% - 13px) 0,
  //   100% 50%,
  //   calc(100% - 13px) 100%,
  //   13px 100%,
  //   0 50%
  // );
  background: $main-style-color;
  border: none !important;
  border-radius: 16px !important;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-weight: 400;
  min-width: 105px;
  line-height: 1;
}
.btn-secondary {
  color: #fff;
  border-color: $main-style-color;
}
.btn:hover {
  transform: scale(1.05);
}
.unClick {
  background: $table-head-bag-color;
  border-color: black;
}
.btn.unClick:hover {
  transform: scale(1);
}
</style>