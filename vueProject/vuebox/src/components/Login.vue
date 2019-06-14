<template>
    <div>
        <div class="split left">
  <div class="centered">
    <h1>Bem Vindo! </h1>
    <h3 class="grey--text"> Carregue no botão para efetuar login  com o metamask</h3>
    <v-btn @click="efetuarLogin" block round color="#327CCB" dark>Login</v-btn>
    
  </div>
</div>

<div class="split right">
  <div class="centered">
    <img src="../assets/logo_transparent.png" alt="Avatar man" style=" height: 100%;width: 100%">
  </div>
</div>

<div v-if="loading == true" class="loader">
<v-layout row justify-center>
    <v-dialog v-model="value" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <v-progress-circular indeterminate :size="90" :width="7" color="blue"></v-progress-circular>
          <h1>Aguarde a conexão com todos os sistemas!</h1>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
  </div>

    </div>


    
</template>

<script>
import Transferencias from '@/js/transferencias'

export default {
   name: 'Login',
  components:{
  },
  data () {
    return {
      loading: true
    }
  },created(){
        Transferencias.init()
  },methods:{
     async  efetuarLogin(){
        var x = window.web3.eth.accounts[0]
        if (x == undefined){
            alert("Certifique-se que tem o metamask ativo!")
        } else {

            var res =  await Transferencias.typeA(x)
            console.log(res)
            
            if (res.c[0]!=0) {
              alert('Sou do tipo: ' + res.c[0])
              this.$store.commit('changeType',res.c[0])

              //guaardar o numero e a string
              var tipo ='Equipa' // Default
              if (res.c[0] == 3)
                  tipo = 'Federação'
              if(res.c[0] == 2)
                  tipo = 'Banco'              
              this.$store.commit('changeTipo',tipo)


            }else {
              alert('Atenção não é membro!')
              this.$store.commit('changeType',res.c[0])
            }
            this.loading=true;
            //alert('entrei else')
            setTimeout(function(){this.loading=false; }, 2000);
            
            this.$store.commit('changeWallet',x)
            this.$store.commit('changeLogged',true)
            this.$router.push('/dashboard')
        }



}
  }
}
</script>

<style>
.grad1{
    width: 50%;
    height: 100%;
   
    background-image: linear-gradient(rgb(24, 103, 192), rgb(92, 187, 246));
    color: white;
    opacity: 0.95;
}

.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.left {
  left: 0;
  background-color: white;

  color:#327CCB;

}
.left.h2{
      font-size: 180%;
}
.right {
  right: 0;
  background-color:#327CCB;
  background-color: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 80%);
  opacity: 0.90;
  background-color: #327ccb;
  height: 100%; 
  
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */



/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.centered img {
  width: 150px;
  border-radius: 50%;
}
</style>