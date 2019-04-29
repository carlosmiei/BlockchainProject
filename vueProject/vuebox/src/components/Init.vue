
<template>

  <div>    
    <!-- teste -->
            <v-container  >
              <img src="../assets/log4.png" >
                <h1>{{ msg }}</h1>
                <div>
                  Welcome conta: <b>{{ account }} </b> <br>
                  Saldo da conta: <b>{{saldo}}</b> eth <br>
                  Owner: <b>{{owner}}</b>
                </div>
                <div> Hash da transação: {{this.recibo}}</div>
                 <div>
                   <v-btn color="success">Success</v-btn>
                   <v-btn color="error">Error</v-btn>
                   <v-btn color="warning">Warning</v-btn>
                  <v-btn color="info">Info</v-btn>
                   </div>
             </v-container>
<!--- PopUp --->

<!--- Footer --->

  </div>
</template>

<script>
import Transferencias from '@/js/transferencias'
import BlockTransfer from  '@/js/BlockTransfer'
import { sep } from 'path';
import SideBar from './SideBar.vue'
import Bread from './Bread.vue'
/* eslint-disable indent */
export default {
  name: 'dashboard',
  components:{
    SideBar,
    Bread
  },
  data () {
    return {
      msg: 'Bem vindo!',
      pseudo: undefined,
      account: window.web3.eth.accounts[0],
      saldo:0,
      owner:'',
      recibo:''

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
    //var res = await this.getOwner()
   // this.owner=res;
   
    let hashF='212e69f1138c6664a662b65d471acf509c1cdf31'

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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
