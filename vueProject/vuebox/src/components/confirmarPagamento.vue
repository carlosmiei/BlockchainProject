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
              @save="save(props.item._id)"
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
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transacoesCompletas"
        :search="search"
        :loading="false"
      >
        <template v-slot:items="props">
          <td>
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
      headers: [
        {text: 'Id da Venda ',value: 'hash', align: 'center',},
        {text: 'Vendedor', value: 'bloco' },
        {text: 'Valor', value: 'gas' },
        {text: 'Estado', value: 'estado' }
      ],
      transacoes: [ ],
      input:''
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

      var lista = await axios.get('http://localhost:4000/transacoes?banco=0xE0b303c8158BA5b545CbCE21Aa11FC2B62bF73E3')
      console.log(lista)
      return lista.data

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
      (id == 'Em pagamento') ? this.op=['Pago'] : this.op=[]
    },
    
    async save(idVenda){

      switch (this.input) {
        case 'Pago':
          alert("entrei pago")
          var fatura = await Transferencias.recebeFatura(idVenda)

          for (var t in this.transacoesPendentes) {
            if (this.transacoesPendentes[t]._id == idVenda){
              this.transacoesPendentes[t].estado = this.input
                break;
            }
          }
          this.alteraEstado(idVenda,"Pago")

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
    }

  },
  computed: {
    transacoesPendentes(){
      return this.transacoes.filter(elem => elem.estado === 'Em pagamento')
    },

    transacoesCompletas(){
      return this.transacoes.filter(elem => elem.estado === 'Pago')
    }
  }

}
</script>

<style>
    
</style>