<template>
    <div>
    <v-container grid-list-md text-xs-center >
        <v-layout row wrap justify-space-around>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
          <v-card-text class="px-0">Saldo: 92 ETH</v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-2">
          <v-card-text class="px-0">Operações: 12</v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
          <v-card-text class="px-0"> Movimentos 12</v-card-text>
        </v-card>
            </v-flex>

        </v-layout>
        </v-container>    
    </div>
</template>

<script>
export default {
    name: 'DashBoard',
      data () {
            return {
            msg: 'Bem vindo!',
        
    }
  }
}