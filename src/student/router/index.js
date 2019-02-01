import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import course from '../components/Course/Index'
import score from '../components/ScoreBoard/Index'
import student from '../components/StudentInfo'
import submission from '../components/Submission/Index'
import wall from '../../public/Wall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/student',
      name: 'student',
      component: student
    },
    {
      path: '/home',
      name: 'Home',
      component: index
    },
    {
      path: '/home/course/:id',
      name: 'course',
      component: course
    },
    {
      path: '/home/course/:id/scoreboard/:id',
      name: 'score',
      component: score
    },
    {
      path: '/home/course/:id/submission/:id',
      name: 'submissionHistory',
      component: submission
    },
    {
      path: '*',
      name: 'notFound',
      component: wall
    }
  ]
})
