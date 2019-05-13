<template>
    <div>
    <v-container grid-list-md text-xs-center >
        <v-layout row wrap justify-space-around>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
          <v-card-text class="px-0">
              <b><animated :number="90"></animated> ETH </b><br> Saldo <br>
              
              </v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-2">
          <v-card-text class="px-0"><b>12 </b><br>Operações</v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
          <v-card-text class="px-0"> <b>12 </b> <br> Movimentos</v-card-text>
        </v-card>
            </v-flex>

        </v-layout>
        </v-container>    


        
    </div>
</template>

<script>
import animated from './animated-number.vue'
export default {
    name: 'DashBoard',
      data () {
            return {
            msg: 'Bem vindo!',
            saldo:100,
            names: [ 'MS', 'Apple', 'Google' ],
            values: [
                [ 10, 5, 5, 5 ],
                [ 40, 10, 10, 10 ],
                 [ 30, 30, 30, 30 ]
        ]
    }
  }
}