import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import course from '../components/Course/Index'
import score from '../components/ScoreBoard/Index'
import submission from '../components/Submission/Index'
import wall from '../../public/Wall'
import profile from '../../public/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
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
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '*',
      name: 'notFound',
      component: wall
    }
  ]
})
