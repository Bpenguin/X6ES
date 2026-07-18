<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">{{ $t ('system.languagesScr',{ProductName:GLOBAL.PRODUCT_NAME}) }}</div>
    </div>
    <div class="block-body">
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'en'">English</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'port'">Português</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'zh'">繁體中文</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'nor'">Norsk</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'de'">Deutsch</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'da'">Dansk</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'fr'">Français</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'sp'">Spanish (US)</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'it'">Italiano</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'cz'">Czech</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'es'">Español</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'sw'">Swedish</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'po'">Polski</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'ne'">Netherlands</el-radio>
        </el-col>
      </el-row>
      <el-row class="c-row" :gutter="40">
        <el-col :span="10" :xs="12">
          <el-radio v-model="langueModel" :label="'portb'">Português (Brasil)</el-radio>
        </el-col>
        <el-col :span="14" :xs="12">
          <el-radio v-model="langueModel" :label="'fi'">Finnish</el-radio>
        </el-col>
      </el-row>
    </div>
    <div class="block-body">
      <div class="c-row btn-row">
        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelForm"></mine-button>
        <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm"></mine-button>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@/i18n'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      langueModel: 'en'
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.langueModel = localStorage.getItem('locale')
    console.log('this.langueModel', this.langueModel)
  },
  methods: {
    // 恢复修改
    cancelForm() {
      this.langueModel = i18n.locale
    },
    // 修改时间
    applyForm() {
      i18n.locale = this.langueModel
      localStorage.setItem('locale', this.langueModel)
      this.$router.go(0)
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.main-content {
  color: $default-font-color;
  padding: 30px;
  .c-row {
    margin: 30px 0;
  }
}
.scri-view {
  color: $gray-font-color;
}
.bottom-view {
  display: block;
  width: 100%;
  color: white;
  text-align: right;
  margin-top: 30px;
  margin-bottom: 20px;
  div {
    margin-right: 20px;
  }
}
</style>
