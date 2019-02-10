import VuexPersistence from 'vuex-persist'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    isAuthorized: true,
    root: false,
    courseId: 'CS110',
    student_id: '2018533110',
    isInstructor: false,
    coInfo: {
      uid: '',
      instructor: [''],
      name: '',
      code: '',
      semester: '',
      year: 0,
      homepage: ''
    },
    assignments: {
      name: '',
      uid: '',
      deadline: 0,
      release_date: 0,
      descr_link: ''
    }
  },
  mutations: {
    updateCoInfo (state, value) {
      state.coInfo = value
    },
    updateAss (state, value) {
      state.assignments = value
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
