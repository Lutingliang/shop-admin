// eslint-disable-next-line
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入路由
import router from './router'
// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

import './assets/common.css'

import less from 'less'

// 基路径 :
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 每次都要引入 axios
Vue.prototype.$axios = axios
// axios 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

Vue.use(ElementUI)
Vue.use(less)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
