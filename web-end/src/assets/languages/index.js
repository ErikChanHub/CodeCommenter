import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'

Vue.use(VueI18n)

const DEFAULT_LANG = 'en'

const locales = {
  'zh-cn': zh,
  'en': en,
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales,
})

export const setupLanguage = lang => {
  Vue.config.lang = lang
  i18n.locale = lang
}

export default i18n
