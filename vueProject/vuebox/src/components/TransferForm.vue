<template>
  <div>
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

  <form-wizard v-if="show" color="#5DBCD2" shape="square" title="Adicionar uma Transferencia" @on-complete="adicionarTransacao">
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
Recibo da fatura: {{recibo}}
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
            recibo:''
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