<template>
  <div class="team">
    <v-container class="my-2">
        <v-layout row wrap >
            <v-flex xs12 sm8 md6 lg4>
                <v-text-field 
                class="mb-3"
                v-model="search"
                append-icon="search"
                label="Search for a team..."
                single-line
                hide-details
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 lg4 v-for="equipa in teamFilter" :key="equipa._id">
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
                            <div :search="search" class="subheading">{{ equipa.nome }}</div>
                            <div class="grey--text">{{ equipa.pais }}</div>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-card-actions class="h-align">
                    <v-btn flat color="grey" :to="'/equipas/'+equipa._id">
                        <v-icon left>subject</v-icon>
                        <span>Detalhes</span>
                    </v-btn>
                </v-card-actions>
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
        components: {
        },
        data () {
        return {
            search: '',
            equipas: [ ]
        }
        },

        async created(){
            Transferencias.init()
            console.dir('FUI A BD')
            this.equipas = await this.getEquipas()
            console.log(this.equipas)
        },
        methods:{
            
            async getEquipas(){      
                
                var lista = await axios.get('http://localhost:4000/users?tipo=Equipa')
                console.log(lista)
                return lista.data

            }
        },
        computed: {
            teamFilter () {
                return this.equipas.filter(equipa => (equipa.nome.indexOf(this.search) > -1) )
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
