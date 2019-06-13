<template>
  <div class="team">
    <v-container class="my-2">
      
      <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="equipa in equipas" :key="equipa._id">
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
                            <div class="subheading">{{ equipa.nome }}</div>
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
                
                var lista = await axios.get('http://localhost:4000/users?papel=Equipa')
                console.log(lista)
                return lista.data

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
