<template>
    <div>
        <!-- inicio tabela pendentes -->
<!-- Tabela do Histórico  -->
    <v-card  color="">
    <v-card-title class="grey lighten-3 title">
      Consultar Blocos Blockchain
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
      :items="blocos"
      :search="search"
      :loading="true"
      class="elevation-1"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
     <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <td @click="clickTable(props.item)"> 
          <v-layout justify-center>
              {{ props.item.number}}
          </v-layout>
        </td>
        <td class="text-xs-right">
          <v-layout justify-center>
          
          {{ props.item.gasUsed }}
         </v-layout>
        </td>
        <td class="text-xs-right">
           <v-layout justify-center>
              {{ props.item.timestamp }}
          </v-layout>
        <td class="text-xs-right">
           <v-layout justify-center>
              {{ props.item.nonce }}
          </v-layout>

        </td>
        <td class="text-xs-right"> 
           <v-layout justify-center>
              {{ props.item.parentHash }}
          </v-layout>
         <td class="text-xs-right"> 
           <v-layout justify-center>
              {{ props.item.miner }}
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
import Transferencias from '@/js/transferencias'
export default {
          data () {
            return {
                loading:false,
                search:'',
                numero:'',
                blocos:[],
                headers:[{text:'Numero'},
                {text:'Gas Utilizado'},
                {text:'Timestamp'},
                {text: 'Nonce'},
                {text: 'ParentHash'},
                {text:'Miner'}
                ],rowsPerPageItems: [10, 20, 30, 40],
                pagination: {
                    rowsPerPage: 20
                },
                
            
    }
  },async mounted() {

      var res = await this.getBlockNumber()

      //ir buscar os ultimos 10
      for (var i=0;i<10;i++) {
          var bloco = await this.getBlock(res-i)
          this.blocos.push(bloco)
      }
      console.dir(this.blocos)
  },
  methods: {
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
    
  }
  }
}
</script>