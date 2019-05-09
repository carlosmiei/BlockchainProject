<template>
  <div>

    <v-card>
    <v-card-title>
      Consultar Transações
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
          
          <v-layout justify-center>
              {{ props.item.estado }}
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
       
 </div>
</template>

<script>
import Transferencias from '../js/transferencias.js'
export default {
    name: 'ConsultTrans',
      data () {
            return {
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