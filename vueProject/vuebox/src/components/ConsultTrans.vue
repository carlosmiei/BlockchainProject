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
export default {
    name: 'ConsultTrans',
      data () {
            return {
              op:['Completa','Emitida','Em pagamento','Aceite'],
              bloco:'',
              search:'',
              headers: [
              {text: 'Hash da Transação',value: 'hash', align: 'center',},
              {text: 'Bloco', value: 'bloco' },
              {text: 'Gas', value: 'gas' },
              {text: 'Estado', value: 'estado' }
              ], transacoes: [ ]
            
    }
  },async created(){
      var lista=[]
      
      var bloco = await this.getBlockNumber()
      console.dir(bloco)

      // Ir buscar um bloco 
      for(var i=0;i<10;i++){
        var b = await this.getBlock(300-i)
        lista.push(b)
      }
      console.dir(lista)
      lista.forEach(this.fillTable);

      
},methods:{
  open(id){
    if (id == '0x0eab421867077be5e8f28d9a442389aebfcf8a001677daffe6fc56a0be6bc8bc')
        this.op=['fun']

  },
   save(estado){
     console.log('estado')
     console.dir(estado)
   },

    getBlockNumber(){
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

  }
}
}
</script>

<style>
    
</style>