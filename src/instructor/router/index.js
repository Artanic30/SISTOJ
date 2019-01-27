import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import instructor from '../components/AddAssignment/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'index',
      component: index
    },
    {
      path: '/add',
      name: 'instructorAddHomework',
      component: instructor
    }
  ]
})
