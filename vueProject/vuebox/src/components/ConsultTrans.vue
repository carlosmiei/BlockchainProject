<template>
  <div>
<!-- inicio tabela pendentes -->
<!-- Tabela do Histórico  -->
    <v-card color="">
    <v-card-title color="white">
      Consultar Transações Pendentes
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
        <td>
          <v-layout justify-center>
              {{ props.item._id }}
          </v-layout>
        </td>
        <td class="text-xs-right">
          <v-layout justify-center>
          
          {{ props.item.to }}
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
          <!-- Parte editável da Coluna estado -->
          <v-edit-dialog
            :return-value.sync="props.item.estado"
            large
            lazy
            persistent
            @save="save(props.item.name)"
            @cancel=""
            @open="open(props.item.name)"
            @close=""
          >
            <div>{{ props.item.estado }}</div>
            <template v-slot:input>
              <div class="mt-3 title">Atualizar Estado</div>
            </template>
            <template v-slot:input>
        <v-select
          :items="op"
          label="Estado"
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
      Consultar Histórico de Transações
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
      :items="transacoes"
      :search="search"
      :loading="false"
    >
      <template v-slot:items="props">
        <td>
          <v-layout justify-center>
              {{ props.item.name }}
          </v-layout>
        </td>
        <td class="text-xs-right">
          <v-layout justify-center>
          
          {{ props.item.number }}
         </v-layout>
        </td>
        <td class="text-xs-right">
           <v-layout justify-center>
              {{ props.item.gas }}
          </v-layout>

        </td>
        <td class="text-xs-right"> 
          <!-- Parte editável da Coluna estado -->
          <v-edit-dialog
            :return-value.sync="props.item.estado"
            large
            lazy
            persistent
            @save="save(props.item.name)"
            @cancel=""
            @open="open(props.item.name)"
            @close=""
          >
            <div>{{ props.item.estado }}</div>
            <template v-slot:input>
              <div class="mt-3 title">Atualizar Estado</div>
            </template>
            <template v-slot:input>
        <v-select
          :items="op"
          label="Estado"
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
  <!-- fim da tabela do histório -->
 </div>
</template>

<script>
import Transferencias from '../js/transferencias.js'
import axios from 'axios';
export default {
    name: 'ConsultTrans',
      data () {
            return {
              account: window.web3.eth.accounts[0],
              op:['Completa','Emitida','Em pagamento','Aceite'],
              bloco:'',
              search:'',
              headers: [
              {text: 'Id da Venda ',value: 'hash', align: 'center',},
              {text: 'Comprador', value: 'bloco' },
              {text: 'Jogador', value: 'jogador' },
              {text: 'Valor', value: 'gas' },
              {text: 'Estado', value: 'estado' }
             ],
              transacoes: [ ],
              transacoesPendentes:[]
            
    }
  },async created(){
      var lista=[]
      var transacoes = await this.getTransacoes()
      //Preencher a primeira
      console.dir(transacoes)
      transacoes.forEach(this.cutS);
      this.transacoesPendentes = transacoes
      

      // ## Preencher a segunda tabela
      var bloco = await this.getBlockNumber()
      for(var i=0;i<10;i++){
        var b = await this.getBlock(300-i)
        lista.push(b)
      }
      lista.forEach(this.fillTable);

      
},methods:{
  open(id){
    if (id == '0x0eab421867077be5e8f28d9a442389aebfcf8a001677daffe6fc56a0be6bc8bc')
        this.op=['fun']

  },
   save(estado){
     console.log('estado')
     console.dir(estado)
   },async getTransacoes(){

      var lista  = await axios.get('http://localhost:4000/transacoes?utilizador=' + this.account + '&&tipo=venda' )
      return lista.data


   }
   ,getBlockNumber(){
        return new Promise (function (resolve, reject) {
             window.web3.eth.getBlockNumber(function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
             }
              })
          })
    },
    getBlock(num){
        return new Promise (function (resolve, reject) {
             window.web3.eth.getBlock(num,function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
             }
              })
          })
    }, fillTable(elem){
        var obj = {}
        obj['name'] = elem.hash
        obj['number'] = elem.number
        obj['gas'] = elem.gasUsed
        obj['estado'] = 'Completa'
        this.transacoes.push(obj)

  }, fillTable2(elem){
        var obj = {}
        obj['id'] = elem._id
        obj['number'] = elem.number
        obj['gas'] = elem.gasUsed
        obj['estado'] = 'Completa'
        this.transacoes.push(obj)
},cutS(elem){
  elem['_id'] = '0x' + elem._id.substr(0, 20) + '...'
  elem['to'] =  elem.to.substr(0, 20) + '...'
  return elem

}

}
}
</script>

<style>
    
</style>