import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Home/Index'
import course from '@/components/Course/Index'
import score from '@/components/ScoreBoard/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/course',
      name: 'course',
      component: course
    },
    {
      path: '/score',
      name: 'score',
      component: score
    }
  ]
})
