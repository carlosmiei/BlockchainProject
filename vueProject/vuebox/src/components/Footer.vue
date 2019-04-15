<template>
  <div>
 <v-footer class="pa-3" app color="#5DBCD2">
    <v-spacer></v-spacer>
    <div>&copy; BlockTransfer {{ new Date().getFullYear() }}</div>
  </v-footer>
 </div>
</template>

<script>
export default {
    name: 'Footer',
      data () {
            return {
            msg: 'Bem vindo!',
            
    }
  },
}
</script>

<style>
    
</style>