<template>
  <div class="team">
    <!-- fim da tabela do histório -->
    <!-- Inicio do PopUp -->
    <v-dialog v-model="dialog" width="400">
        <PopUp v-if="dialog" :jogador="varPassar" v-on:childToParent="onChildClick" ></PopUp>
    </v-dialog>
    <!-- Fim do popup -->
    <v-container class="my-2">
        <v-layout row wrap class="h-align">
            <v-flex xs12 sm5 md5 lg4>
                <v-card flat class="mx-4 grey lighten-3">    
                    <br>
                    <v-layout class="innerbox img-background mb-3">
                        <v-img
                            class="img mt-2"
                            :src="equipa.foto"
                            height="80"
                            width="80"
                            contain
                        >
                        </v-img>
                    </v-layout>                
                    <h3 class="subheading">{{ this.equipa.nome }}</h3>
                    <div class="grey--text">{{ this.equipa.pais }}</div>
                    <div class="grey--text">{{ this.equipa.liga }}</div>
                    <br>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 md7 lg8>
                <v-layout wrap fill-height h-align>
                    <p>{{ this.equipa.descricao }}</p>
                    <v-btn target="_blank" small depressed color="primary" class="rounded-card" :href="this.equipa.site">Visitar site</v-btn>
                </v-layout> 
            </v-flex>
        </v-layout>
        <br>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <br>
        <div class="text-sm-left">
            <v-icon left class="ml-5">group</v-icon>
            <span class="title grey--text"><b>Jogadores</b></span>
        </div>
        <v-layout row wrap class="my-2">
            <v-flex xs12 sm6 md4 lg3 v-for="jogador in equipa.jogadores" :key="jogador._id">
                <v-card flat height="110" color="grey" @click="clickTable(jogador)" class="h-align clickable jogador-card ma-2 grey lighten-3 rounded-card">
                    <v-layout columns class="h-align" >
                        <v-flex xs3 offset-xs1>
                            <v-img 
                                class="rounded-img grey lighten-2"
                                :src = "jogador.foto"
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

        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>

        <v-layout v-if="!minhaEquipa()" mt-3 wrap fill-height h-align>
            <v-btn block depressed color="primary" class="rounded-card" href="/#/equipas">Voltar</v-btn>
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
            dialog:false,
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
            minhaEquipa(){
                return this.id == window.web3.eth.accounts[0]
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

.innerbox {
   width:100px; /* or whatever width you want. */
   height:100px; /* or whatever width you want. */
   display: inline-block;
}

.rounded-img{
    border-radius:10px;
    border: 2px solid rgb(102, 102, 102);
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

.jogador-card:hover,
.jogador-card:focus {
  box-shadow: 0 0 5px rgba(35, 93, 211, 0.775); 
  transform: translateY(-0.25em);
}

.img-background {
    background-color: white;
    border-radius:10px;
    border: 2px solid rgba(194, 194, 194, 0.775); 
}

</style>
