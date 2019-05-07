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
            
    }
  },created(){
      var lista=[]
      //var num = await window.web3.eth.blockNumber
      //var l =window.web3.eth.accounts[0]

      window.web3.eth.getBlockNumber().then(data => {
            this.bloco = data
      });


      alert(this.bloco)
      for (var i=0; i < 10; i++) {  
      lista.push(window.web3.eth.getBlock(200 - i));
    }
    console.dir(lista)


  }
}
</script>

<style>
    
</style>