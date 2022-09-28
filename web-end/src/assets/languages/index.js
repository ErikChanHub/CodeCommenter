import { createI18n } from 'vue-i18n';
import zh from './zh'
import en from './en'

const DEFAULT_LANG = 'en'

const locales = {
  'zh-cn': zh,
  en: en,
}

const i18n = new createI18n({
  locale: DEFAULT_LANG,
  messages: locales,
})

export const setupLanguage = (lang) => {
  window.$vueApp.config.lang = lang
  i18n.locale = lang
}

export default i18n
