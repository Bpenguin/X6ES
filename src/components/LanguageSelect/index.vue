<template>
  <el-select class="test-class" v-model="value" @change="selectValue" popper-class="x6-select" :placeholder="$t('login.languagetip')">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import i18n from '@/i18n'
import { languageData } from '@/utils/selectsList'
import { getBrowserLanguage } from '@/utils/until'
// import i18n from '@/i18n'
export default {
  name: 'LanguageSelect',
  computed: {
    options() {
      return languageData
    }
  },
  data() {
    return {
      value: getBrowserLanguage()
    }
  },
  mounted() {
    console.log('222222222222')
    this.value = localStorage.getItem('locale')
    console.log('this.value', this.value)
  },
  methods: {
    selectValue(item) {
      console.log('item', item)
      localStorage.setItem('locale', item)
      i18n.locale = item
      this.$router.go(0)
    }
  }
}
</script>

