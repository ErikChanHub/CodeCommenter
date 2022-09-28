import * as Vue from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import router from './router'
import 'element-plus/dist/index.css';
import i18n from '@/assets/languages/index'

// import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
VMdPreview.use(vuepressTheme);

var app = Vue.createApp(App);
app.use(ElementPlus);
app.use(i18n);
app.use(router);
app.use(VMdPreview);
app.config.globalProperties.routerAppend = (path, pathToAppend) => {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}
app.mount('#app')
