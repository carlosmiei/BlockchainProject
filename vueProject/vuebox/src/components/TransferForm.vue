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
  
  <!-- primeiro form -->
  <tab-content title="Informações Transação"  :before-change="teste" >
    <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs4  
        >
          <v-text-field
            v-model="contribuinteO"
            :counter="9"
            label="Contribuinte Originante"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs4  
        >
          <v-text-field
            v-model="contribuinteD"
            :counter="9"
            label="Contribuinte Destinário"
            required
          ></v-text-field>
        </v-flex>
        <v-flex
          xs4  
        >
          <v-text-field
            v-model="numFatura"
            :counter="256"
            label="Número da Fatura"
            required
          ></v-text-field>
        </v-flex>
        </v-layout>
        <v-layout>
        <v-flex
          xs6  
        >
          <v-text-field
            v-model="dataE"
            :counter="256"
            label="Data Emissão"
            required
          ></v-text-field>
        </v-flex>
        <v-flex
          xs6  
        >
          <v-text-field
            v-model="nomeJogador"
            :counter="256"
            label="Nome do Jogador"
            required
          ></v-text-field>
        </v-flex>
        </v-layout>
        <v-layout>
          
          <v-text-field
            v-model="valorT"
            :counter="256"
            label="Valor Total"
            required
          ></v-text-field>

                    <v-text-field
            v-model="valorI"
            :counter="256"
            label="Valor Iva"
            required
          ></v-text-field>

        </v-layout>
    </v-container> 
      </v-form>

  </tab-content>
  <!-- segundo form -->
  <tab-content title="Hash da transação">
        <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12  
        >
          <v-text-field
            :value="hashT"
            :counter="256"
            label="Hash da transação"
            readonly="ola"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
   </tab-content>

   <!-- terceiro form -->
     <tab-content title="Informação a registar">
        
        <v-form v-model="valid">
            <v-text-field
            :value="hashT"
            :counter="256"
            label="Hash da transação"
            readonly="ola"
          ></v-text-field>
         
            <v-text-field
            :value="valorT"
            :counter="256"
            label="Valor Total da transação"
            readonly="ola"
          ></v-text-field>

            <v-text-field
            :value="estado"
            :counter="256"
            label="Estado da Transação"
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
var sha256 = require('js-sha256');
export default {
    name: 'TransferForm',
      data () {
            return {
           msg: 'Bem vindo!',
           contribuinteD:'',
           contribuinteO: '',
           numFatura: '',
           dataE:'',
           nomeJogador: '',
           valorT: '' ,
           valorI: '' , 
           show:true,
           value:'ol',
           loading:false,
           recibo:'',
           showR:true,
           showRecibo:false,
           estado:'',
           hashT:''
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

    }, teste(){
      //alert('top')
      var res = sha256(this.contribuinteD + this.contribuinteO + this.numFatura + this.valorT + this.nomeJogador + this.dataE)
      this.hashT = res;
      this.estado='Emitida'
      return true
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