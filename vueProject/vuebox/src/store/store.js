import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        isLogged: false,
        wallet:'default',
        type:0,
        tipo:''
      },
      mutations:{
          changeLogged(state,isLogged){
              state.isLogged = isLogged
          },
          changeWallet(state,x){
              state.wallet=x
          },
          changeType(state,estado){
              state.type = estado
          },changeTipo(state,estado){
            state.tipo = estado
        }
      }, getters:{
        wallet: state => state.wallet,
        isLogged: state => state.isLogged,
        type: state => state.type,
        tipo: state => state.tipo
 
            
      },
      plugins: [createPersistedState()],
})