import Vue from 'vue'
import Router from 'vue-router'
import Init from '@/components/Init'
import AddTransfer from '@/components/AddTransfer'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'init',
      component: Init
    },
    {
      path: '/addTransfer',
      name: 'addTransfer',
      component: AddTransfer
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
