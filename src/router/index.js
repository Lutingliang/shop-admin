// eslint-disable-next-line
import Vue from 'vue'
// 导入路由模块
import Router from 'vue-router'

// 引入子组件
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Roles from '@/components/roles/roles.vue'
import Rigths from '@/components/rights/rights.vue'

// 安装
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rigths }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
export default router
