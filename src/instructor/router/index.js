import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import addAssignment from '../components/AddAssignment/Index'
import courses from '../components/CourseList/Index'
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
      path: '/home/course/:id/assignment',
      name: 'instructorAddHomework',
      component: addAssignment
    },
    {
      path: '/home/course/:id',
      name: 'courses',
      component: courses
    },
    {
      path: '/404',
      name: 'NotFound',
      component: wall
    }
  ]
})
