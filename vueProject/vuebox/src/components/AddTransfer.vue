
<template>

  <div>    
    <!-- teste -->
            <v-container>
              <v-flex xs12>
                 <v-card dark color="primary">
                    <v-card-text class="px-0">Utilizador: <b>{{ account }} </b> </v-card-text>
                  </v-card>
              </v-flex>

                <TransferForm/>
                <div> <p> Hash da transação: {{this.recibo}} </p>

                </div>
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
import TransferForm from './TransferForm.vue'
/* eslint-disable indent */
export default {
  name: 'dashboard',
  components:{
      TransferForm
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
    Transferencias.init()
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

    },
  methods: {
    
    getOwner: async function (){
      let self = this
      var res = await Transferencias.owner()
      return res
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
