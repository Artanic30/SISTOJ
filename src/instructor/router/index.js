import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import instructor from '../components/AddAssignment/Index'
import courses from '../components/CourseList/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/add',
      name: 'instructorAddHomework',
      component: instructor
    },
    {
      path: '/home/course/:id',
      name: 'courses',
      component: courses
    },
    {
      path: '*',
      name: 'index',
      component: index
    },
  ]
})
