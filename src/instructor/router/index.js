import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import addAssignment from '../components/AddAssignment/Index'
import courses from '../components/CourseList/Index'
import pageNotFound from '../../public/PageNotFound'
import profile from '../../public/Profile'
import instructorProfile from '../../public/InstructorProfile'
import judge from '../components/Judges/Index'
import instructors from '../components/Instructors/Index'
import judges from '../components/CourseJudges/Index'

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
      path: '/home/course/:id/instructor',
      name: 'instructor',
      component: instructors
    },
    {
      path: '/home/course/:id/judge',
      name: 'courseJudge',
      component: judges
    },
    {
      path: '*',
      name: 'NotFound',
      component: pageNotFound
    }
  ]
})
