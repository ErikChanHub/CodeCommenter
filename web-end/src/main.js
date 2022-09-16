// import './themes/element-#F48055/index.css'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import i18n from '@/assets/languages/index'

Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
    el: '#app',
    i18n,
    router,
    render: h => h(App),
}).$mount('#app')
