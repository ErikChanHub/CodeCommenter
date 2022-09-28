
import { createRouter,createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

// 路由推送当前的地址
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch((error) => error)
// }


const routes = [
  {
    path: '/',
    redirect: '/templates',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/templates',
        name: 'Templates',
        component: () => import('@/views/templates.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
