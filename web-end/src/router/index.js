import Router from 'vue-router'
import Vue from 'vue'
import Layout from '@/layout'

Vue.use(Router);

// 路由推送当前的地址
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

export default new Router({
    routes: [{
        path: '/',
        redirect: '/templates',
        name: 'Layout',
        component: Layout,
        children: [{
            path: '/templates',
            name: 'Templates',
            component: resolve => require(['@/views/templates.vue'], resolve)
        }]
    }]
});