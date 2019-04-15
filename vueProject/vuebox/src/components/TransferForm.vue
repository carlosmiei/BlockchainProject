<template>
  <div>
  <form-wizard color="#5DBCD2" shape="square" title="Adicionar uma Transferencia">
  <tab-content title="Personal details">
    <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12  
        >
          <v-text-field
            v-model="hashT"
            :counter="256"
            label="Hash da transação"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  </tab-content>
  <tab-content title="Valor da transação">
        <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12  
        >
          <v-text-field
            v-model="hashT"
            :counter="256"
            label="Valor da transação (euros)"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
   </tab-content>
</form-wizard>
  </div>
</template>

<script>
export default {
    name: 'TransferForm',
      data () {
            return {
            msg: 'Bem vindo!',
            
    }
  },
}
</script>

<style>
    
</style>