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
          <v-select
            v-model="equipa"
            :counter="256"
            label="Equipa destinatária"
            required
             :items="nomes"
          ></v-select>
        </v-flex>

        <v-flex
          xs4  
        >
          <v-text-field
            v-model="transacao.contribuinteD"
            :counter="9"
            label="Contribuinte Destinário"
            required
          ></v-text-field>
        </v-flex>
        <v-flex
          xs4  
        >
          <v-text-field
            v-model="transacao.numFatura"
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
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
      </v-menu>
</v-flex>
        <v-flex
          xs6  
        >
          <v-select
            v-model="transacao.nomeJogador"
            :counter="256"
            label="Nome do Jogador"
            required
            :items="jogadores"
          ></v-select>
        </v-flex>
        </v-layout>
        <v-layout>
          
          <v-text-field
            v-model="transacao.valorT"
            :counter="256"
            label="Valor Total"
            required
          ></v-text-field>

          <v-text-field
            v-model="transacao.valorI"
            :counter="256"
            label="Valor Iva"
            required
            readonly
          ></v-text-field>

          <v-select
            v-model="nomeB"
            :counter="256"
            label="Banco"
            required
            :items="nomesBancos"
          ></v-select>
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
            :value="transacao._id"
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
            :value="transacao._id"
            :counter="256"
            label="Hash da transação"
            readonly
          ></v-text-field>
         
            <v-text-field
            :value="transacao.valorT"
            :counter="256"
            label="Valor Total da transação"
            readonly
          ></v-text-field>

            <v-text-field
            :value="transacao.estado"
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
import axios from 'axios';
var sha256 = require('js-sha256');
export default {
    name: 'TransferForm',
      data () {
            return {
           msg: 'Bem vindo!',
           //para já fica assim mas devia-se usar o estado
           account: window.web3.eth.accounts[0],
           transacao:{
              contribuinteD:'',
              to: '',
              numFatura: '',
              dataE:'',
              nomeJogador: '',
              valorT: '' ,
              valorI: '' , 
              _id:'',
              estado:'',
              banco: ''
           },
           show:true,
           value:'ol',
           loading:false,
           recibo:'',
           showR:true,
           showRecibo:false,


           dialog:false,
           trHash:'',
           gas:'',
           block:'',
           event:'',
           menu: false,
           modal: false,
           menu2: false,
           date: new Date().toISOString().substr(0, 10),
           valid: true,
           equipas:'',
           nomes:[],
           equipa:[],
           jogadores:[],
           bancos:[],
           nomesBancos:[],
           nomeB:''
    }
  },async created (){

    Transferencias.init()
    var res = await axios.get('http://localhost:4000/users?tipo=Equipa')
    var resB = await axios.get('http://localhost:4000/users?tipo=Banco')
    this.bancos = resB.data
    this.equipas =  res.data
    var names = []
    var myId = this.account

    //meus jogadores
    var nomesJogadores = []
    var eq = this.equipas.find(x => x._id == window.web3.eth.accounts[0])
    eq.jogadores.filter(x => x.emTransferencia == false).forEach(function(element) {
        nomesJogadores.push(element.nome)
    }); 
    this.jogadores = nomesJogadores

    //tirar a minha equipa
    this.equipas = this.equipas.filter(function(el) { return el._id != myId; }); 

    //filtrar so os nomes    
    this.equipas.forEach(function(element) {
       names.push(element.nome)
    }); 
    this.nomes = names
  },
  
  watch: {
    nomeB: function(newQ,old) {
      
      var banco = this.bancos.find(x => x.nome === newQ)
      this.transacao.banco = banco._id
    },
    'transacao.valorT': function (newQuestion, oldQuestion) {
          var int =  parseInt(this.transacao.valorT)
          var imposto = int * 0.21
          this.transacao.valorI = imposto.toString()
    },
    equipa: function (newQuestion, oldQuestion) {
      
      var namesB = []

      var eq = this.equipas.find(x => x.nome === newQuestion)
      this.transacao.to = eq._id
      this.transacao.contribuinteD = eq.contribuinte

      this.bancos.forEach(function(elem) {

         if (eq.bancos.includes(elem._id)) {
           namesB.push(elem.nome)
         }
      }); 

      this.nomesBancos = namesB

     

    }
  }
  ,methods:{
    async adicionarTransacao(){
      var res
      this.loading=true
      var enviar = this.transacao
      var res = await Transferencias.adicionaFatura(this.transacao.valorT,this.date,this.transacao._id)

      var data = {
        Emitida: this.date
      }
      //preprar enviar
      enviar['from'] = this.account
      enviar['data'] = data

      enviar['hashTrans'] = res["receipt"].transactionHash
      enviar['numBloco'] = (res["receipt"].blockNumber).toString()
      enviar['gas'] = (res["receipt"].gasUsed).toString()
      // quick fix lower case problem
      enviar['to'] = enviar['to'].toLowerCase()
      axios.post('http://localhost:4000/transacoes/',enviar)
          .then(response => {
              console.log('Correu tudo bem' + response)    
              this.resetForm()
              this.fillPopup(res)
          
          }).catch(e => {
              console.log('ERRO: ' + e)
          })

      var obj = {}
      obj['equipa'] = this.account
      obj['jogador'] = enviar.nomeJogador
      console.log(obj)
      axios.post('http://localhost:4000/users/bloqueiaJogador/', obj)
          .then(response => {
              console.log('Correu tudo bem' + response) 
              this.jogadores = this.jogadores.filter(x => x != obj.jogador)      
          }).catch(e => {
              console.log('ERRO: ' + e)
          })

      this.loading=false
      this.show=false
      this.recibo=res
      this.showRecibo=true

    }, calcularHash(){
      var res = sha256(this.transacao.contribuinteD + this.transacao.to + this.transacao.numFatura + this.transacao.valorT + this.transacao.nomeJogador + this.transacao.dataE)
      this.transacao._id = '0x' + res;
      this.transacao.estado='Emitida'
      return true
    }, resetForm(){
        // reset Form
        this.equipa=''
        this.nomeB=''
        this.transacao.contribuinteD=''
        this.transacao.to= ''
        this.transacao.numFatura= ''
        this.transacao.dataE=''
        this.transacao.nomeJogador= ''
        this.transacao.valorT= '' 
        this.transacao.valorI= '' 
        this.$refs.wizard.navigateToTab(0)
      
    }, fillPopup(res){
          this.trHash= res["receipt"].transactionHash
          this.gas= res["receipt"].gasUsed
          this.block = res["receipt"].blockNumber
          var array = res["logs"]
          this.event = array[0].event
          this.dialog=true
    },

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