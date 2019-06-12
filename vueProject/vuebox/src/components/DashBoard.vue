<template>
    <div>
        
    <v-container grid-list-md text-xs-center >
        <v-flex xs12>
                 <v-card dark color="primary">
                    <v-card-text class="px-0">Utilizador:  <b> [{{tipo}}] {{account}} </b> </v-card-text>
                  </v-card>
        </v-flex>
        <v-layout row wrap justify-space-around>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
          <v-card-text class="px-0">
              <!-- <b><animated :number="90"></animated> ETH </b><br> Saldo <br> -->
              
              </v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-2">
          <v-card-text class="px-0"><b>12 </b><br>Operações</v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
          <v-card-text class="px-0"> <b>12 </b> <br> Movimentos</v-card-text>
        </v-card>
            </v-flex>

        </v-layout>
        </v-container>    
        
    </div>
</template>

<script>
export default {
    name: 'DashBoard',
      data () {
            return {
                account:'ola',
                type:-1,
                tipo:'',
                msg: 'Bem vindo!',
                saldo:100,
                names: [ 'MS', 'Apple', 'Google' ],

    }
  }, mounted() { 
      /** Nota agora vai ler da wallet mas deveria ler do estado mas para nao termos de ir sempre ao login fica assim : this.$store.getters.wallet  */
        this.account = window.web3.eth.accounts[0]
        this.type = this.$store.getters.type
        this.tipo ='Equipa' // Default

        if (this.type == 3)
            this.tipo = 'Federação'
        if(this.type == 2)
            this.tipo = 'Banco'

      
  }
}
</script>