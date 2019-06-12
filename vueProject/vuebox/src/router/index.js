import Vue from 'vue'
import Router from 'vue-router'
import Init from '@/components/Init'
import AddTransfer from '@/components/AddTransfer'
import Login from '@/components/Login'
import DashBoard from '@/components/DashBoard'
import { store } from '@/store/store'
import ConsultTrans from '@/components/Vendas'
import Compras from '@/components/Compras'
import Confpagamento from '@/components/confirmarPagamento'

Vue.use(Router)

let router =  new Router({
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
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path:'/vendas',
      name:'Vendas',
      component: ConsultTrans
    },
    {
      path:'/compras',
      name:'Compras',
      component: Compras
    },
    {
      path:'/banco',
      name:'Confpagamento',
      component: Confpagamento
    }
  ]
})


router.beforeEach((to, from, next) => {
  /*
  if (to.fullPath != '/login' && !store.getters.isLogged) {
    console.log("nao estou logado")
    next('/login') 
    return
  }
  if (to.fullPath == '/login' && store.getters.isLogged ) {
    console.log('!!!!1estou logafo!!')
    next('/') 
    return

  }
  */
  next()
  return
})




export default router
