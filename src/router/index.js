import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Home/Index'
import course from '@/components/Course/Index'
import score from '@/components/ScoreBoard/Index'
import student from '@/components/StudentInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'HelloWorld',
      component: index
    },
    {
      path: '/student/:id',
      name: 'index',
      component: student,
      children: [{
        path: '/course',
        name: 'Home',
        component: index
      }]
    },
    {
      path: '/student/:id/course/:id',
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
