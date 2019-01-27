// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Test.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import '../../theme/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
// axios.defaults.baseURL = ''
Vue.prototype.axios = axios
Vue.component(CollapseTransition.name, CollapseTransition)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
