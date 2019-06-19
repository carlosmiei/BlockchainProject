<template>
  <div>
<!-- inicio tabela pendentes -->
<!-- Tabela do Histórico  -->
    <v-card color="">
    <v-card-title class="grey lighten-3 ">
      Consultar Compras Pendentes
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
    <v-card-title class="grey lighten-3">
      Consultar Transações Completas
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
      :items="transacoes"
      :search="search2"
      :loading="false"
    >
      <template v-slot:items="props">
        <td @click="clickTable(props.item)" >
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
              search2:'',
              headers: [
              {text: 'Id da Venda ',value: '_id', align: 'center'},
              {text: 'Comprador', value: 'to' },
              {text: 'Jogador', value: 'nomeJogador' },
              {text: 'Valor', value: 'valorT' },
              {text: 'Estado', value: 'estado' }],
              transacoes: [ ],
              transacoesPendentes:[],
              input:''
             
    }
  },async mounted(){
     Transferencias.init()
      var lista=[]
      console.dir('FUI A BD')
      var transacoes = await this.getTransacoes()
      //Preencher a primeira
      //console.dir(transacoes)
      transacoes.forEach(this.cutS);
      this.transacoesPendentes = transacoes
      this.transacoesC = transacoes
      
      // ## Preencher a segunda tabela
      this.transacoes = this.transacoesC.filter(elem => elem.estado=='Completa');
      this.transacoesPendentes = this.transacoesPendentes.filter(elem => elem.estado!='Completa')

      
},methods:{
  open(id){
    if (id == 'Emitida'){
        this.op=['Recebida']
    }
    if (id == 'Recebida'){
        this.op=['Aceite','Rejeitada']
    }
    if (id == 'Rejeitada' || id=='Em pagamento'){
        this.op=[]
    }
    if (id == 'Aceite'){
        this.op=['Em pagamento']
    }
        

  }, async getTransacoes(){      

      var lista  = await axios.get('http://localhost:4000/transacoes?utilizador=' + this.account + '&&tipo=compra' )
      return lista.data

   },async alteraEstado(id,estado,equipa,jogador){
     //alterar estado para emPagamento
      alert("Entrei altera estado")
      var obj = {}
      obj['_id'] = id
      obj['estado'] = estado
      alert("pasei obj")


      axios.post('http://localhost:4000/transacoes/setEstado',obj)
        .then(response => {
            console.log('Correu tudo bem' + response)    
            if(obj.estado == 'Rejeitada'){
              var obj2 = {}
              obj2['equipa'] = equipa
              obj2['jogador'] = jogador
              axios.post('http://localhost:4000/users/desbloqueiaJogador/', obj2)
                .then(response => {
                  console.log('Correu tudo bem' + response) 
                  console.log("Jogador: " + obj2.jogador)   
                }).catch(e => {
                  console.log('ERRO: ' + e)
                })
            }
          }).catch(e => {
              console.log('ERRO: ' + e)
          })
    return true
   },cutS(elem){
        elem['_id2'] = /*'0x' +*/ elem._id.substr(0, 20) + '...'
        elem['_id'] = /*'0x' +*/ elem._id //.substr(0, 20) + '...'
        elem['to'] =  elem.to
        elem['to2'] =  elem.to.substr(0, 20) + '...'
        elem['from2'] =  elem.from.substr(0, 20) + '...'
        return elem

  },alteraData(id,metodo){

    //A data é a atual
    var data = new Date().toISOString().substr(0, 10)
    var obj = {_id:id, data:data}
  
    //fazer aqui o pedido
    axios.post('http://localhost:4000/transacoes/setData' + metodo, obj)
        .then(response => {
            console.log('Correu tudo bem' + response) 

            //ALTERAR LOCALMENTE
            var alterar = this.transacoesPendentes.find(x => x._id === id)
            var index = this.transacoesPendentes.indexOf(alterar)
            alterar['data'][metodo] = data
            this.transacoesPendentes[index] = alterar
                  
        }).catch(e => {
            console.log('ERRO: ' + e)
        })

        return true

  },
  async save(idVenda){
    var teste = this.transacoesPendentes
    var jogador
    var equipa
    for (var x in teste) {

      var obj = teste[x]
      if (obj._id == idVenda){
        this.transacoesPendentes[x].estado=this.input
        equipa = this.transacoesPendentes[x].from
        jogador = this.transacoesPendentes[x].nomeJogador
      }
    }

     switch (this.input) {
       case 'Recebida':
          alert("entrei recebida")
          var fatura = await Transferencias.recebeFatura(idVenda)
            this.alteraEstado(idVenda,"Recebida", equipa, jogador)

          console.log("passei do metamask")
          break; 
       case 'Aceite':
          var fatura = await Transferencias.validaFatura(idVenda,true)
          this.alteraEstado(idVenda,"Aceite", equipa, jogador)
          this.alteraData(idVenda,"Aceite")
          break;
       case 'Rejeitada':
          var fatura = await Transferencias.validaFatura(idVenda,false)
          this.alteraEstado(idVenda,"Rejeitada", equipa, jogador)
          this.alteraData(idVenda,"Rejeitada")       
          break
       case 'Em pagamento':
          var fatura = await Transferencias.emPagamento(idVenda)
          this.alteraEstado(idVenda,"Em pagamento", equipa, jogador) 
          this.alteraData(idVenda,"EmPagamento")      
          break
       default: 
         alert('Erro a processar alteração de estado')
         break
       }

      return true;
  
  }, clickTable(elem){
     this.dialog = true
     console.dir(elem)
     this.varPassar = elem

  }, onChildClick(elem){
    this.dialog = elem
  }
}

}
</script>

<style>
    
</style>