import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/home',
      name: 'index',
      component: index
    }
  ]
})
