<template>
  <div>

<!-- Inicio Loading -->
<!-- v-if="show != true" -->
    <div v-if="loading == true"  class="loader">

<v-layout row justify-center>
    <v-dialog v-model="value" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <v-progress-circular indeterminate :size="90" :width="7" color="blue"></v-progress-circular>
          <h1>Confirme a transação no metamask!</h1>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
    </div>
<!-- Fim do loading -->

<!-- Inicio do form -->
  <form-wizard v-if="show" color="#327CCB" shape="square" title="Adicionar uma Transferencia" @on-complete="adicionarTransacao">
  <tab-content title="Hash da transação">
    <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12  
        >
          <v-text-field
            v-model="hashT"
            :counter="256"
            label="Hash da transação"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  </tab-content>
  <tab-content title="Valor da transação">
        <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12  
        >
          <v-text-field
            v-model="ValorT"
            :counter="256"
            label="Valor da transação (euros)"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
   </tab-content>
     <tab-content title="Confirmação">
        
        <v-form v-model="valid">
            <v-text-field
            v-model="hashT"
            :counter="256"
            label="Hash da transação"
            readonly="ola"
          ></v-text-field>
         
            <v-text-field
            v-model="hashT"
            :counter="256"
            label="Valor da transação"
            readonly="ola"
          ></v-text-field>
    
    <v-container>
      <v-layout>
        <v-flex
          xs12  
        >
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
   </tab-content>   
</form-wizard>
   <!-- Fim do form -->
<!-- Inicio do recibo -->
   <div v-if="showRecibo" class="fatura">
     <v-spacer></v-spacer>
     <v-layout row>
    <v-flex xs6 >
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">Transação adicionada com sucesso! <v-icon color="green" x-large>check</v-icon> </div>
            <span class="grey--text">Clique na seta para ver os detalhes</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn icon @click="showR = !showR">
            <v-icon>{{ showR ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="showR">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
   </div>
<!-- fim do recibo -->
<!-- Recibo da fatura: {{recibo}} -->
  </div>
</template>

<script>
import Transferencias from '../js/transferencias.js'
export default {
    name: 'TransferForm',
      data () {
            return {
            msg: 'Bem vindo!',
            hashT: '',
            ValorT:'' ,
            show:true,
            value:'ol',
            loading:false,
            recibo:'',
            showR:true,
            showRecibo:false
    }
  },created (){
    Transferencias.init()
  }
  ,methods:{
    async adicionarTransacao(){
      this.loading=true
      var res = await Transferencias.adicionarFatura(this.hashT,this.ValorT)
      this.loading=false
      this.show=false
      this.recibo=res
      this.showRecibo=true

    }
  }
}
</script>

<style>

.dialog.centered-dialog,
  .v-dialog.centered-dialog
 {
    background: #282c2dad;
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: whitesmoke;
  }
    
</style>