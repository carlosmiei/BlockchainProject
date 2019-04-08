
<template>

  <div class="dashboard">
    <img src="../assets/log4.png" >
    <h1>{{ msg }}</h1>
    <div>
      Welcome conta: <b>{{ account }} </b> <br>
      Saldo da conta: <b>{{saldo}}</b> eth <br>
      Owner: <b>{{owner}}</b>
    </div>
     <div>
    <v-btn color="success">Success</v-btn>
    <v-btn color="error">Error</v-btn>
    <v-btn color="warning">Warning</v-btn>
    <v-btn color="info">Info</v-btn>
  </div>
  </div>
</template>

<script>
import Users from '@/js/users'
import Transferencias from '@/js/transferencias'
import { sep } from 'path';
/* eslint-disable indent */
export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Bem vindo!',
      pseudo: undefined,
      account: window.web3.eth.accounts[0],
      saldo:0,
      owner:''

    }
  },
  beforeCreate(){


     

  },
   created () {
    this.account = window.web3.eth.accounts[0]
    web3.eth.getBalance(this.account, (error, result)=>{
        if(!error){
          
           this.saldo=result.c[0]/10000;
           
        }else{
            console.error(error)
        }
    })

      Transferencias.init().then(() => {
        Transferencias.owner(window.web3.eth.accounts[0]).then((exists) => {
          this.owner=exists;
       console.log('ownert')
       console.log(exists)
      })
    }).catch(err => {
      console.log(err)
    })

    },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
