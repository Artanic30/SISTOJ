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
import unAuth from '../../public/Unauthorized'
import store from '../../student/store'
import forbidden from '../../public/Forbidden'
import addcourse from '../components/AddCourse/Index'
import changePro from '../../public/ChangeProfile'
import unInit from '../../public/NoRole'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'indexInstructor',
      component: index
    },
    {
      path: '/home',
      name: 'homeInstructor',
      component: index
    },
    {
      path: '/home/course/:id',
      name: 'courses',
      component: courses,
      meta: { requiresAuth: true }
    },
    {
      path: '/home/course/:id/assignment',
      name: 'instructorAddHomework',
      component: addAssignment,
      meta: { requiresAuth: true }
    },
    {
      path: '/uninitialized',
      name: 'uninitialized',
      component: unInit
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/changeProfile',
      name: 'changeProfile',
      component: changePro,
      meta: { requiresAuth: true }
    },
    {
      path: '/instrProfile',
      name: 'instrProfile',
      component: instructorProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/judge',
      name: 'judge',
      component: judge,
      meta: { requiresAuth: true }
    },
    {
      path: '/course',
      name: 'addCourse',
      component: addcourse,
      meta: { requiresAuth: true }
    },
    {
      path: '/home/course/:id/instructor',
      name: 'instructor',
      component: instructors,
      meta: { requiresAuth: true }
    },
    {
      path: '/home/course/:id/judge',
      name: 'courseJudge',
      component: judges,
      meta: { requiresAuth: true }
    },
    {
      path: '/error',
      name: 'forbidden',
      component: forbidden
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: unAuth
    },
    {
      path: '*',
      name: 'NotFound',
      component: pageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = store.state.isAuthorized
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
