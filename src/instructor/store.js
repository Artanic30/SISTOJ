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
    isInstructor: true,
    coInfo: {
      uid: '',
      instructor: [''],
      name: '',
      code: '',
      semester: '',
      year: 0,
      homepage: ''
    }
  },
  mutations: {
    updateCoInfo (state, value) {
      state.coInfo = value
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
