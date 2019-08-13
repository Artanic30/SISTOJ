import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import course from '../components/Course/Index'
import score from '../components/ScoreBoard/Index'
import submission from '../components/Submission/Index'
import pageNotFound from '../../public/PageNotFound'
import profile from '../../public/Profile'
import instructorProfile from '../../public/InstructorProfile'
import unAuth from '../../public/Unauthorized'
import store from '../store'
import forbidden from '../../public/Forbidden'
import changePro from '../../public/ChangeProfile'
import unInit from '../../public/NoRole'
import addAssignment from '../../instructor/components/AddAssignment/Index'
import courses from '../../instructor/components/CourseList/Index'
import judge from '../../instructor/components/Judges/Index'
import instructors from '../../instructor/components/Instructors/Index'
import judges from '../../instructor/components/CourseJudges/Index'
import addcourse from '../../instructor/components/AddCourse/Index'
import instrIndex from '../../instructor/components/Home/Index'
import instrScoreBoard from '../../instructor/components/ScoreBoard/Index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/instr',
      name: 'indexInstructor',
      component: instrIndex,
      meta: { requiresInstr: true }
    },
    {
      path: '/instr/home/course/:id',
      name: 'instrCourses',
      component: courses,
      meta: { requiresInstr: true, requiresAuth: true }
    },
    {
      path: '/instr/home/course/:id/assignment',
      name: 'instructorAddHomework',
      component: addAssignment,
      meta: { requiresInstr: true, requiresAuth: true }
    },
    {
      path: '/instr/judge',
      name: 'judge',
      component: judge,
      meta: { requiresInstr: true, requiresAuth: true }
    },
    {
      path: '/instr/scoreBoard',
      name: 'instrScoreBoard',
      component: instrScoreBoard,
      meta: { requiresInstr: true, requiresAuth: true }
    },
    {
      path: '/instr/course',
      name: 'addCourse',
      component: addcourse,
      meta: { requiresInstr: true, requiresAuth: true }
    },
    {
      path: '/instr/home/course/:id/judge',
      name: 'courseJudge',
      component: judges,
      meta: { requiresInstr: true, requiresAuth: true }
    },
    {
      path: '/instr/home/course/:id/instructor',
      name: 'instructor',
      component: instructors,
      meta: { requiresInstr: true, requiresAuth: true }
    },
    {
      path: '/',
      name: 'indexStudent',
      component: index,
      meta: { requiresStu: true }
    },
    {
      path: '/home/course/:id/scoreboard/:ids',
      name: 'score',
      component: score,
      meta: { requiresAuth: true }
    },
    {
      path: '/home/course/:course_code/submission/:ass_name',
      name: 'submissionHistory',
      component: submission,
      meta: { requiresStu: true, requiresAuth: true }
    },
    {
      path: '/home',
      name: 'homeStudent',
      component: index,
      meta: { requiresStu: true }
    },
    {
      path: '/home/course/:course_code',
      name: 'course',
      component: course,
      meta: { requiresStu: true, requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/instrProfile',
      name: 'instrProfile',
      component: instructorProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/changeProfile',
      name: 'changeProfile',
      component: changePro,
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
      path: '/uninitialized',
      name: 'uninitialized',
      component: unInit
    },
    {
      path: '*',
      name: 'notFound',
      component: pageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = store.state.isAuthorized
  const info = store.state.baseInfo
  if (to.matched.some(record => record.meta.requiresInstr)) {
    if (!info.isInstructor && info.isStudent) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.matched.some(record => record.meta.requiresStu)) {
    if (!info.isStudent && info.isInstructor) {
      next({
        path: '/instr'
      })
    } else {
      next()
    }
  } else {
    next()
  }
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
