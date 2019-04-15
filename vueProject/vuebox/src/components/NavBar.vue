<template>
  <div>
    <v-toolbar  color="#5DBCD2" >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>BlockTransfer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
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
  },
}
</script>

<style>
    
</style>