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
    </div>
</template>

<script>
export default {
   name: 'Login',
  components:{
  },
  data () {
    return {
    }
  },methods:{
      efetuarLogin(){
        var x = window.web3.eth.accounts[0]
        if (x == undefined){
            alert("Certifique-se que tem o metamask ativo!")
        } else {
            alert("Wallet: " +  x)
            this.$store.commit('changeWallet',x)
            this.$store.commit('changeLogged',true)
            this.$router.push('/')
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