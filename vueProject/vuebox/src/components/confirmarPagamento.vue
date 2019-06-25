<template>
  <div>
    <!-- inicio tabela pendentes -->
    <!-- Tabela do Histórico  -->
    <v-card color="">
      <v-card-title color="white">
        Consultar Pagamentos Pendentes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transacoesPendentes"
        :search="search"
        :loading="false"
      
      >
        <template v-slot:items="props">
          <td @click="clickTable(props.item)">
            <v-layout justify-center>
                {{ props.item._id2 }}
            </v-layout>
          </td>
          <td class="text-xs-right">
            <v-layout justify-center>
            
            {{ props.item.from2 }}
          </v-layout>
          </td>
          <td class="text-xs-right">
            <v-layout justify-center>
                {{ props.item.nomeJogador }}
            </v-layout>
          <td class="text-xs-right">
            <v-layout justify-center>
                {{ props.item.valorT }}
            </v-layout>

          </td>
          <td class="text-xs-right"> 
            
            <!-- Parte editável da Coluna    @close="" estado @cancel=""  -->
            <v-edit-dialog
              large
              lazy
              persistent
              @save="save(props.item._id, props.item.from, props.item.to, props.item.nomeJogador)"
              @open="open(props.item.estado)"
            >
              <div>{{ props.item.estado }}</div>
              <template v-slot:input>
                <div class="mt-3 title">Atualizar Estado</div>
              </template>
              <template v-slot:input>
                <v-select
                  :items="op"
                  label="Estado"
                  v-model="input" 
                ></v-select>  
              </template>
            </v-edit-dialog>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <!-- fim tabela pendentes -->


    <!-- Tabela do Histórico  -->
    <v-card color="">
      <v-card-title color="white">
        Consultar Pagamentos Confirmados
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search2"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transacoesCompletas"
        :search="search2"
        :loading="false"
      >
        <template v-slot:items="props">
          <td @click="clickTable(props.item)">
            <v-layout justify-center>
                {{ props.item._id2 }}
            </v-layout>
          </td>
          <td class="text-xs-right">
            <v-layout justify-center>
            
            {{ props.item.from2}}
          </v-layout>
          </td>
                    <td class="text-xs-right">
            <v-layout justify-center>
                {{ props.item.nomeJogador }}
            </v-layout>
          </td> 
          <td class="text-xs-right">
            <v-layout justify-center>
                {{ props.item.valorT }}
            </v-layout>
          </td>         
          <td class="text-xs-right" >
            <v-layout justify-center>
              <b> {{ props.item.estado}}</b>
            </v-layout>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <!-- fim da tabela do histório -->
    <!-- Inicio do PopUp -->
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <PopUp v-if="dialog" :transacao="varPassar" v-on:childToParent="onChildClick" ></PopUp>
    </v-dialog>
    <!-- Fim do popup -->

    <!-- Snackbar -->
    <Snackbar v-if="snackbarUpd" :msg="msg" v-on:childToParentSnackbar="onChildClickSnackbar"></Snackbar>

  </div>
</template>

<script>
import Transferencias from '../js/transferencias.js'
import PopUp from './PopUp.vue'
import Snackbar from './Snackbar.vue'
import Vue from "vue";
import axios from 'axios';
export default {
  name: 'ConsultTrans',
  components:{
    PopUp,
    Snackbar
  },
  data () {
    return {
      varPassar: '',
      dialog:false,
      account: window.web3.eth.accounts[0],
      op:[],
      bloco:'',
      search:'',
      search2:'',
      headers: [
      {text: 'Id da Venda ',value: '_id', align: 'center'},
      {text: 'Comprador', value: 'to' },
      {text: 'Jogador', value: 'nomeJogador' },
      {text: 'Valor', value: 'valorT' },
      {text: 'Estado', value: 'estado' }],
      transacoes: [ ],
      input:'',
      snackbarUpd: false,
      msg: ''
    }

  },  
  async created(){
    Transferencias.init()
    var lista=[]
    console.dir('FUI A BD')
    this.transacoes = await this.getTransacoes()
    //Preencher a primeira
    //console.dir(transacoes)
    this.transacoes.forEach(this.cutS);
    console.log(this.transacoes)
  },
  methods:{
    
    async getTransacoes(){      

      var lista = await axios.get('http://localhost:4000/transacoes?banco=' + this.account)
      console.log(lista)
      return lista.data

    },
  
    async alteraEstado(id,estado){
      //alterar estado para emPagamento
      console.log("Entrei altera estado")
      var obj = {}
      obj['_id'] = id
      obj['estado'] = estado
      console.log("pasei obj")
      axios.post('http://localhost:4000/transacoes/setEstado',obj)
        .then(response => {
            console.log('Correu tudo bem' + response)    
      
        }).catch(e => {
            console.log('ERRO: ' + e)
        })
      return true
    },

    async alteraDataPagamento(id){
      var obj = {}
      obj['_id'] = id
      obj['data'] = (new Date()).toISOString().slice(0,10)
      axios.post('http://localhost:4000/transacoes/setDataPagamento', obj)
        .then(response => {
            console.log('Correu tudo bem' + response)   

            var alterar = this.transacoes.find(x => x._id === id)
            var index = this.transacoes.indexOf(alterar)
            alterar['data']['Pago'] = obj['data']
            this.transacoes[index] = alterar
      
        }).catch(e => {
            console.log('ERRO: ' + e)
        })
      return true
    },

    async efetuaTransferencia(origem, destino, jogador){
      var obj = {}
      obj['origem'] = origem
      obj['destino'] = destino
      obj['jogador'] = jogador
      console.log(obj)
      axios.post('http://localhost:4000/users/transfereJogador', obj)
        .then(response => {
            console.log('Correu tudo bem' + response)    

      
        }).catch(e => {
            console.log('ERRO: ' + e)
        })
      return true
    },
    
    cutS(elem){
      elem['_id2'] = /*'0x' +*/ elem._id.substr(0, 20) + '...'
      elem['_id'] = /*'0x' +*/ elem._id //.substr(0, 20) + '...'
      elem['to'] =  elem.to
      elem['to2'] =  elem.to.substr(0, 20) + '...'
      elem['from2'] =  elem.from.substr(0, 20) + '...'
      return elem
    },

    open(id){
      (id == 'Em pagamento') ? this.op=['Pago'] : this.op=[]
    },
    
    async save(idVenda, from, to, jogador){
      console.log(idVenda)

      switch (this.input) {
        case 'Pago':
          console.log("entrei pago")

          var fatura = await Transferencias.validaPagamento(idVenda)
          this.alteraEstado(idVenda,"Pago")
          this.alteraDataPagamento(idVenda)
          this.efetuaTransferencia(from, to, jogador)
          this.msg = "Estado atualizado"
          this.snackbarUpd = true

          for (var t in this.transacoesPendentes) {
            if (this.transacoesPendentes[t]._id == idVenda){
              this.transacoesPendentes[t].estado = this.input
                break;
            }
          }
          console.log("passei do metamask")
          break; 
        default: 
          console.log('Erro a processar alteração de estado')
          break
      }

      return true;
    
    }, 
    
    clickTable(elem){
      this.dialog = true
      console.dir(elem)
      this.varPassar = elem


    },onChildClick(elem){
      this.dialog = elem

    }, onChildClickSnackbar(elem){
      this.snackbarUpd = elem
    }

  },
  computed: {
    transacoesPendentes(){
      return this.transacoes.filter(elem => elem.estado === 'Em pagamento')
    },

    transacoesCompletas(){
      return this.transacoes.filter(elem => elem.estado === 'Pago' || elem.estado === 'Completa')
    }
  }

}
</script>

<style>
    
</style>