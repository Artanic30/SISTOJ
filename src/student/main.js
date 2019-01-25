// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import '../../theme/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
// axios.defaults.baseURL = ''
Vue.prototype.axios = axios
Vue.component(CollapseTransition.name, CollapseTransition)
require('./mock.js')
/* eslint-disable no-new */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    authorized: true,
    root: false,
    courseId: 'CS110',
    student_id: '2018533110',
    instructor: false,
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

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
