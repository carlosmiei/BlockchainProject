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
  <form-wizard  color="#327CCB" shape="square" title="Adicionar uma Transferencia" @on-complete="adicionarTransacao" ref="wizard">
  
  <!-- primeiro form -->
  <tab-content title="Informações Transação"  :before-change="calcularHash" >
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
          <!-- <v-text-field
            v-model="dataE"
            :counter="256"
            label="Data Emissão"
            required
          ></v-text-field>
        > -->
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Data da compra"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dataE" @input="menu2 = false"></v-date-picker>
      </v-menu>
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
            readonly
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
            readonly
          ></v-text-field>
         
            <v-text-field
            :value="valorT"
            :counter="256"
            label="Valor Total da transação"
            readonly
          ></v-text-field>

            <v-text-field
            :value="estado"
            :counter="256"
            label="Estado da Transação"
            readonly
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
<!-- inicio popup -->
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Transação Adicionada!   &nbsp;  <v-icon color="green" x-large >check</v-icon>

        </v-card-title>

        <v-card-text>
        <b>Hash Transação: </b> {{this.trHash}} <br>
        <b>Gas utilizado: </b> {{this.gas}} <br>
        <b>Número do bloco: </b> {{this.block}} <br>
        <b>Evento acionado: </b> {{this.event}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- fim do popup -->
<!-- Recibo da fatura: {{recibo}} -->
  <!-- {{recibo}} -->
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
           hashT:'',
           dialog:false,
           trHash:'',
           gas:'',
           block:'',
           event:'',
           menu: false,
          modal: false,
          menu2: false
    }
  },created (){
    Transferencias.init()
  }
  ,methods:{
    async adicionarTransacao(){
      this.loading=true
      var res = await Transferencias.adicionaFatura(20,"27/04/2019",this.hashT)
      //alert((JSON.stringify(res)))
      //var res =  await Transferencias.testeS(20,"27/04/2019",this.hashT)
      //alert(res2)
      this.loading=false
      this.show=false
      this.recibo=res
      this.showRecibo=true

      //campos do popup
      this.trHash= res["receipt"].transactionHash
      this.gas= res["receipt"].gasUsed
      this.block = res["receipt"].blockNumber
      var array = res["logs"]
      //console.log("ARRAYYYYYYYYYYY")
      //console.dir(array)
      this.event = array[0].event
      this.dialog=true
      // reset Form
      this.contribuinteD=''
      this.contribuinteO= ''
      this.numFatura= ''
      this.dataE=''
      this.nomeJogador= ''
      this.valorT= '' 
      this.valorI= '' 
      this.$refs.wizard.navigateToTab(0)

    }, calcularHash(){
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