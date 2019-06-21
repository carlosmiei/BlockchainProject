<template>
  <div>
    <v-toolbar height="50px" color="#327CCB" >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">BlockTransfer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="logOut" class="white--text" flat>Log Out</v-btn>
      <v-btn @click="logOut" class="white--text" flat></v-btn>
      <v-btn @click="logOut" class="white--text" flat></v-btn>
    </v-toolbar-items>
    </v-toolbar>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
      data () {
            return {
            msg: 'Bem vindo!',
            
    }
  },methods:{
    logOut(){
       this.$store.commit('changeWallet','')
       this.$store.commit('changeLogged',false)
       this.$router.push('/login')
    }
  }
}
</script>

<style>
    
</style>