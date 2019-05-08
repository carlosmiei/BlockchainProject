<template>
  <div>
       
 </div>
</template>

<script>
import Transferencias from '../js/transferencias.js'
export default {
    name: 'ConsultTrans',
      data () {
            return {
              bloco:''
            
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
    }

  }
}
</script>

<style>
    
</style>