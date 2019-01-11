// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import '../theme/index.css'
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
    semester: '',
    authorized: true,
    root: false,
    uid: 'b3b17c00f16511e8b3dfdca9047a0f14',
    email: '',
    name: '',
    student_id: '2018533110',
    instructor: 'true'
  },
  mutations: {
    changeSemester (state, value) {
      state.semester = value
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
