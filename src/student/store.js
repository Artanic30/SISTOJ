import VuexPersistence from 'vuex-persist'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    isRequest: false,
    isAuthorized: false,
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
      descr_link: '',
      short_name: '',
      score: 0,
      overall_socre: 0
    },
    baseInfo: {
      uid: '',
      isInstructor: false,
      isStudent: false
    },
    api: '',
    logout_url: ''
  },
  mutations: {
    updateCoInfo (state, value) {
      state.coInfo = value
    },
    updateAss (state, value) {
      state.assignments = value
    },
    login (state, url) {
      state.isAuthorized = true
      state.logout_url = url
    },
    logOut (state) {
      state.isAuthorized = false
      state.baseInfo.isInstructor = false
      state.baseInfo.isStudent = false
    },
    updateState (state, value) {
      state.baseInfo.uid = value.uid
      if (value.role === 1) {
        state.baseInfo.isStudent = true
      } else if (value.role === 2) {
        state.baseInfo.isInstructor = true
      } else if (value.role === 3) {
        state.baseInfo.isStudent = true
        state.baseInfo.isInstructor = true
      } else {
        state.baseInfo.isStudent = false
        state.baseInfo.isInstructor = false
      }
    },
    requested (state) {
      state.isRequest = true
    },
    refreshReq (state) {
      state.isRequest = false
    },
    updateApi (state, value) {
      state.api = value
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
