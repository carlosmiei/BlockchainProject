import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        isLogged: false,
        waller:'',
        type:0
      },
      mutations:{
          changeLogged(state,isLogged){
              state.isLogged = isLogged
          },
          changeWallet(state,wallet){
              state.wallet=wallet
          },
          changeType(state,estado){
              state.type = estado
          }
      }, getters:{
        wallet: state => state.wallet,
        isLogged: state => state.isLogged,
        type: state => state.type
 
            
      }
})