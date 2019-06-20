<template>
  <div>
  <!-- inicio tabela pendentes -->
    <v-card color="">
      <v-card-title class="grey lighten-3 subheading">
        Consultar Pagamento de Imposto Pendente
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
              @save="save(props.item._id)"
              @open="open(props.item.estado)"
            >
              <div><b class="green--text">{{ props.item.estado }}</b>  </div>
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

  <!-- inicio tabela em curso -->
    <v-card color="">
      <v-card-title class="grey lighten-3 subheading ">
        Consultar Pagamentos Pendentes
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
        :items="transacoesEmCurso"
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
            
            {{ props.item.from2 }}
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
          <td class="text-xs-right"> 
            <v-layout justify-center>
              <b v-if="atrasado(props.item,props.item.estado)" class="red--text">  {{ props.item.estado }} </b>
              <b v-else  class="amber--text">  {{ props.item.estado }} </b>
            </v-layout>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search2 }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <!-- fim tabela em curso -->

    <!-- Tabela do Histórico  -->
    <v-card color="">
      <v-card-title class="grey lighten-3 subheading">
        Consultar Pagamentos Confirmados
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search3"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transacoesCompletas"
        :search="search3"
        :loading="false"
      >
        <template v-slot:items="props">
          <td @click="clickTable(props.item)">
            <v-layout justify-center >
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
            Your search for "{{ search3 }}" found no results.
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
  </div>
</template>

<script>
import Transferencias from '../js/transferencias.js'
import PopUp from './PopUp.vue'
import Vue from "vue";
import axios from 'axios';
export default {
  name: 'ConsultTrans',
  components:{
    PopUp

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
      search3:'',
      headers: [
      {text: 'Id da Venda ',value: '_id', align: 'center'},
      {text: 'Comprador', value: 'to' },
      {text: 'Jogador', value: 'nomeJogador' },
      {text: 'Valor', value: 'valorT' },
      {text: 'Estado', value: 'estado' }],
      transacoes: [ ],
      input:'',
      ms : 1000 * 60 * 60 * 24,
      hoje: new Date().toISOString().substr(0, 10),
      atrasoMaximo:30
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

      var lista = await axios.get('http://localhost:4000/transacoes')
      console.log(lista)
      return lista.data

    },alteraData(id,metodo){

    //A data é a atual
    var data = new Date().toISOString().substr(0, 10)
    var obj = {_id:id, data:data}
  
    //fazer aqui o pedido
    axios.post('http://localhost:4000/transacoes/setData' + metodo, obj)
        .then(response => {
            console.log('Correu tudo bem' + response) 
            this.jogadores = this.jogadores.filter(x => x != obj.jogador)      
        }).catch(e => {
            console.log('ERRO: ' + e)
        })

        return true

  },
  
    async alteraEstado(id,estado){
      //alterar estado para emPagamento
      alert("Entrei altera estado")
      var obj = {}
      obj['_id'] = id
      obj['estado'] = estado
      alert("pasei obj")
      axios.post('http://localhost:4000/transacoes/setEstado',obj)
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
      (id == 'Pago') ? this.op=['Completa'] : this.op=[]
    },
    
    async save(idVenda){

      switch (this.input) {
        case 'Completa':
          alert("entrei completa")
          var fatura = await Transferencias.recebeFatura(idVenda)

          for (var t in this.transacoesPendentes) {
            if (this.transacoesPendentes[t]._id == idVenda){
              this.transacoesPendentes[t].estado = this.input
                break;
            }
          }
          this.alteraEstado(idVenda,"Completa")
          this.alteraData(idVenda,"Completo")

          console.log("passei do metamask")
          break; 
        default: 
          alert('Erro a processar alteração de estado')
          break
      }

      return true;
    
    }, 
    
    clickTable(elem){
      this.dialog = true
      console.dir(elem)
      this.varPassar = elem

    }, 
    
    onChildClick(elem){
      this.dialog = elem

    },atrasado(obj,id){
      
      if (obj.data && obj.data.Pago) {
       var a = new Date(obj.data.Pago)
       var b = new Date(this.hoje)
       var x = this.dateDiffInDays(a, b)
       if (x> this.atrasoMaximo) {
          return true
       }

      }
      return false

    }, dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / this.ms);
    },
  },
  computed: {
    transacoesEmCurso(){
      return this.transacoes.filter(elem => (elem.estado !== 'Pago' && elem.estado !== 'Completa'))
    },
    transacoesPendentes(){
      return this.transacoes.filter(elem => elem.estado === 'Pago')
    },

    transacoesCompletas(){
      return this.transacoes.filter(elem => elem.estado === 'Completa')
    }
  }

}
</script>

<style>
    
</style>