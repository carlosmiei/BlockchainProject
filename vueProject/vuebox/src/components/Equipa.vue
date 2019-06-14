<template>
  <div class="team">
    <!-- fim da tabela do histório -->
    <!-- Inicio do PopUp -->
    <v-dialog v-model="dialog" width="400">
        <PopUp v-if="dialog" :jogador="varPassar" v-on:childToParent="onChildClick" ></PopUp>
    </v-dialog>
    <!-- Fim do popup -->
    <v-container class="my-2">
        <v-layout row wrap >
            <v-flex xs12 sm5 md5 lg4>
                <v-card flat class="ma-2 grey lighten-3">                    
                    <h2>{{ this.equipa.nome }}</h2>
                    <h3 class="grey--text">{{ this.equipa.pais }}</h3>
                    <h4 class="grey--text">{{ this.equipa.liga }}</h4>
                    <v-img
                        class="img mt-3"
                        :src="equipa.foto"
                        height="80"
                        width="80"
                        contain
                    >
                    </v-img>
                    <br>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 md7 lg8>
                <v-layout wrap fill-height h-align>
                    <p>{{ this.equipa.descricao }}</p>
                    <v-btn depressed color="primary" class="rounded-card" :href="this.equipa.site">Visitar site</v-btn>
                </v-layout> 
            </v-flex>
        </v-layout>
        <br>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <br>
        <h3 class="ml-3 text-sm-left">Jogadores</h3>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 sm6 md4 lg3 v-for="jogador in equipa.jogadores" :key="jogador._id">
                <v-card flat color="grey" @click="clickTable(jogador)" class="clickable ma-2 grey lighten-3 rounded-card">
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
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
  </div>
</template>

<script>
    import Transferencias from '../js/transferencias.js'
    import PopUp from './PopUp.vue'
    import axios from 'axios';

    export default {
        props: ['id'],
        components: {
            PopUp
        },
        data () {
        return {
            varPassar: '',
            equipa: '',
            dialog:false
        }
        },

        async mounted(){
            Transferencias.init()
            console.dir('FUI A BD')
            this.equipa = await this.getEquipa(this.id)
            console.log(this.equipa)
        },
        methods:{
            
            async getEquipa(id){      
                
                var lista = await axios.get('http://localhost:4000/users?utilizador='+id)
                console.log(lista.data)
                return lista.data

            },
            clickTable(elem){
                this.dialog = true
                console.dir(elem)
                this.varPassar = elem
    
            }, 
            onChildClick(elem){
                this.dialog = elem
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

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}

.rounded-card{
    border-radius:10px;
}

.right{
    float:right;
}

.clickable {
  cursor: pointer;
}

.v-card:hover {
  box-shadow: 0 0 5px rgba(35, 93, 211, 0.775); 
}
</style>
