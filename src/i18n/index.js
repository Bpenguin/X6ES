import Vue from "vue"
import VueI18n from "vue-i18n"
import enLocal from './lang/en'
import zhLocal from './lang/zh'
import deLocal from './lang/de' // Deutsch
import frLocal from './lang/fr' // Français
import itLocal from './lang/it' //Italiano
import esLocal from './lang/es' // Español
import poLocal from './lang/po' // Polski
import portbLocal from './lang/portb' // Português (Brasil)
import portLocal from './lang/port' // Português
import norLocal from './lang/nor' // Norsk
import daLocal from './lang/da' // Norsk

import spLocal from './lang/sp'  //Spanish (US)
import czLocal from './lang/cz'  //Czech
import swLocal from './lang/sw'  //. Swedish
import fiLocal from './lang/fi'  // Finnish
import neLocal from './lang/ne'  // Arabic
import { getBrowserLanguage } from '@/utils/until'

Vue.use(VueI18n) // 全局挂载i18n
export const i18n = new VueI18n({
  locale: localStorage.getItem("locale") || getBrowserLanguage(), // 从localStorage中获取 默认英文
  fallbackLocale: 'en',
  messages: {
    zh: { ...zhLocal }, // 中文语言包
    en: { ...enLocal },// 英文语言包
    de: { ...deLocal }, // 中文语言包
    fr: { ...frLocal }, // 中文语言包
    it: { ...itLocal }, // 中文语言包
    es: { ...esLocal }, // 中文语言包
    po: { ...poLocal }, // 中文语言包
    portb: { ...portbLocal }, // 中文语言包
    port: { ...portLocal }, // 中文语言包
    nor: { ...norLocal }, // 中文语言包
    da: { ...daLocal }, // 中文语言包
    sp: { ...spLocal }, // 中文语言包
    cz: { ...czLocal }, // 中文语言包
    sw: { ...swLocal }, // 中文语言包
    // ar: { ...arLocal }, // 中文语言包
    ne: { ...neLocal }, // 中文语言包
    fi: { ...fiLocal }, // 中文语言包

  },
  silentTranslationWarn: true
})

export default i18n