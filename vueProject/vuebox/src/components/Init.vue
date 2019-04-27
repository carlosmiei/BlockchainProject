
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
    <v-btn color="success" @click="adicionarFatura">Success</v-btn>
    <v-btn color="error">Error</v-btn>
    <v-btn color="warning">Warning</v-btn>
    <v-btn color="info">Info</v-btn>
  </div>
  </div>
</template>

<script>
import Users from '@/js/users'
import Transferencias from '@/js/transferencias'
import BlockTransfer from  '@/js/BlockTransfer'
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
    Transferencias.init()
    Users.init()
    BlockTransfer.init()
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
    //var res = await this.getOwner()
   // this.owner=res;
   
    let hashF='212e69f1138c6664a662b65d471acf509c1cdf31'

    BlockTransfer.init().then(()=>{
        BlockTransfer.adicionarFatura("ola",1).then(tx=>{
      console.log('dentro de BlockTransfer')
      console.dir(tx)
    }).catch(e=>{console.log('erroT' + e)})})

  /*
    Users.init().then(()=>{
        Users.create("ola2").then(tx=>{
      console.log('dentro de Users')
      console.dir(tx)
    }).catch(e=>{console.log('erroT' + e)})})*/
   //this.adicionarFatura();


    },
  methods: {
    
    getOwner: async function (){
      let self = this
      var res = await Transferencias.owner()
      return res
    },
    adicionarFatura: async function(){
      let self=this

    Users.init().then(()=>{
        Users.create("ola",1).then(tx=>{
      console.log('dentro de Users')
      console.dir(tx)
    }).catch(e=>{console.log('erroT' + e)})})

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
