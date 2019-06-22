<template>
  <div>
    <v-toolbar height="50px" color="#327CCB" >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" class="white--text toolbar-title">
        Block<b class="grey--text text--lighten-1">Transfer</b>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down pr-100">
      <v-btn @click="logOut" class="white--text" flat>
        <span>Log Out</span>
        <v-icon right>exit_to_app</v-icon>
        </v-btn>
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
.pr-100{
  padding-right: 100px;
}

.toolbar-title {
  text-decoration: none;
}
</style>