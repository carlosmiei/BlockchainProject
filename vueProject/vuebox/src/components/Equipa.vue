<template>
  <div class="team">
    <v-container class="my-2">
        <h1>{{ this.equipa.nome }}</h1>
      <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="jogador in jogadores" :key="jogador._id">
                <v-card flat class="ma-2 grey lighten-3 rounded-card">
                <v-layout columns class="h-align" >
                    <v-flex xs3 offset-xs1>
                        <v-img
                            src="https://upload.wikimedia.org/wikipedia/pt/f/f0/500px-SL_Benfica_logo_svg.png"
                            height="45px"
                            width="45px"
                            contain
                        >
                        </v-img>
                    </v-flex>
                    <v-flex xs7>
                        <v-card-text class="text--right">
                            <div class="subheading">{{ jogador.nome }}</div>
                            <div class="grey--text">{{ jogador.pais }}</div>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <!-- <v-card-actions class="h-align">
                    <v-btn flat color="grey" :to="'/jogadores/'+jogador._id">
                        <v-icon left>subject</v-icon>
                        <span>Detalhes</span>
                    </v-btn>
                </v-card-actions> -->
                </v-card>
            </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
    import Transferencias from '../js/transferencias.js'
    import axios from 'axios';

    export default {
        props: ['id'],
        components: {
        },
        data () {
        return {
            equipa: null,
            jogadores: [ 
                {_id: "0x778sfaf8asf6asfas8", nome:"Flash" , pais: "Portugal"},
                {_id: "0x32huasi7ra98o21jol", nome:"Hulk" , pais: "Portugal"},
                {_id: "0x2m1m12klfdisas9sai", nome:"Thanos" , pais: "Portugal"},
                {_id: "0x92h1ib214a512kb1bj", nome:"Thor" , pais: "Portugal"}
            ]
        }
        },

        async created(){
            Transferencias.init()
            console.dir('FUI A BD')
            this.equipa = await this.getEquipa(this.id)
            console.log(this.equipa)
        },
        methods:{
            
            async getEquipa(id){      
                
                var lista = await axios.get('http://localhost:4000/users?id='+id)
                console.log(lista.data[0])
                return lista.data[0]

            }
        }
    }
</script>

<style scoped>
.h-align {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rounded-card{
    border-radius:10px;
}
</style>
