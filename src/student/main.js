// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import '../../theme/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import axios from 'axios'
import store from './store'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(ElementUI)
require('./mock.js') // todo:warning
Vue.use(Vuex)
Vue.prototype.axios = axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  /*
  if (error.response.status === 403) {
    if (error.response.headers.refresh_url === undefined) {
      router.push('/error')
    } else {
      window.location.href = error.response.headers.refresh_url
    }
  }
  */
  return Promise.reject(error)
})
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
