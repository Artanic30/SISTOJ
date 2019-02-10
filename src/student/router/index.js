import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import course from '../components/Course/Index'
import score from '../components/ScoreBoard/Index'
import submission from '../components/Submission/Index'
import wall from '../../public/Wall'
import profile from '../../public/Profile'
import instructorProfile from '../../public/InstructorProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/home/course/:id/scoreboard/:ids',
      name: 'score',
      component: score
    },
    {
      path: '/home/course/:id/submission/:ids',
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
      path: '/instrProfile',
      name: 'instrProfile',
      component: instructorProfile
    },
    {
      path: '*',
      name: 'notFound',
      component: wall
    }
  ]
})
