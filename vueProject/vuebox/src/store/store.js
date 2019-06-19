import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        isLogged: false,
        wallet:'default',
        type:0,
        tipo:'',
        name:''
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
        },changeName(state,estado){
          state.name = estado
      }
      }, getters:{
        wallet: state => state.wallet,
        isLogged: state => state.isLogged,
        type: state => state.type,
        tipo: state => state.tipo,
        name: state => state.name
 
            
      },
      plugins: [createPersistedState()],
})