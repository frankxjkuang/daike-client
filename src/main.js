// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './../vuex/index'

import '../static/clear-default.css'

Vue.config.productionTip = false

import api from './../axios/index'
Vue.use(api)

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
