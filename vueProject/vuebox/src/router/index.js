import Vue from 'vue'
import Router from 'vue-router'
import Init from '@/components/Init'
import AddTransfer from '@/components/AddTransfer'

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
    }
  ]
})
