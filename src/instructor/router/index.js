import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import addAssignment from '../components/AddAssignment/Index'
import courses from '../components/CourseList/Index'
import wall from '../../public/Wall'
import profile from '../../public/Profile'
import instructorProfile from '../../public/InstructorProfile'
import judge from '../components/Judges/Index'

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
      name: 'Home',
      component: index
    },
    {
      path: '/home/course/:id',
      name: 'courses',
      component: courses
    },
    {
      path: '/home/course/:id/assignment',
      name: 'instructorAddHomework',
      component: addAssignment
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
      path: '/judge',
      name: 'judge',
      component: judge
    },
    {
      path: '*',
      name: 'NotFound',
      component: wall
    }
  ]
})
