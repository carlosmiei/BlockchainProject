<template>
    <div>
        <v-container>
        <v-flex xs12  >
                 <v-card dark color="primary">
                    <v-card-text class="px-0">Utilizador:  <b> [{{tipo}}] {{account}} </b> </v-card-text>
                  </v-card>
        </v-flex>

        </v-container>
    <form
    >
            <v-container py-0 px-5>
              <v-layout wrap>
                <v-flex
                  xs6                >
                  <v-text-field
                   v-model="nome"
                    mb-0
                    label="Nome do Jogador"
                />
                </v-flex>

                <v-flex
                  xs6
                 
                >
                  <v-text-field
                   required
                  v-model="contribuinte"
                    label="Contribuinte do Jogador"
                    />
                </v-flex>
                <v-flex
                  xs6
                  >
                  <v-text-field
                    v-model="pais"
                    
                    label="País"
                    />
                </v-flex>

                <v-flex
                  xs6
                  >
                  <v-text-field
                    v-model="cidade"
                    
                    label="Cidade"
                    required
                    />
                </v-flex>
                <v-flex
                  xs12
                  >
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="nascimento"
            label="Data de nascimento"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="nascimento" @input="menu = false"></v-date-picker>
      </v-menu>
                </v-flex>
                <v-flex
                  xs6
                  >
                  <v-select
                    v-model="equipaEscolhida"
                    :items="equipas"
                    label="Equipa do jogador"
                    required
                    chips
                    attach
                    />
                </v-flex>
                <v-flex
                  xs6
                  >
                  <v-select
                    v-model="posicoesEscolhidas"
                    :items="posicoes"
                    label="Posições do  jogador"
                    required
                    chips
                    multiple
                    attach
                    />
                </v-flex>
                <v-flex
                  xs12
                  >
                  <v-text-field
                    v-model="foto"
                    
                    label="Link da foto"
                    />
                </v-flex>
                <v-flex
                
                  xs12
                  text-xs-right
                  pa-0
                  pb-6 
                >
                  <v-btn
                  block
                  
                  class="font-weight-light grey lighten-3"
                  @click="validate"
                  >
                   Adicionar Jogador
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </form>

          <!-- popup temporiamente aqui -->
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Jogador Adicionado!   &nbsp;  <v-icon color="green" x-large >check</v-icon>

        </v-card-title>

        <v-card-text>
        <b>Nome do Jogador: </b> {{this.nomeP}} <br>
        <b>Equipa: </b> {{this.equipaP}} <br>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          <!-- fim do pop up -->

    </div>
</template>

<script>
import Transferencias from '../js/transferencias.js'
import axios from 'axios';

export default {
    
    data () {
        return {
            nome:'',
            pais:'',
            cidade:'',
            cidade:'',
            foto:'',
            contribuinte:'',
            account: this.$store.getters.wallet,
            tipo: this.$store.getters.tipo,
            valid:true,
            loading:false,
            dialog:false,
            value:'ol',
            menu:false,
            nascimento:'',
            posicoes:[],
            posicoesEscolhidas:[],
            equipas:[],
            equipasT:[],
            equipaEscolhida:'',
            idEquipa:'',
            nomeP:'',
            equipaP:''
        }
        },watch: {
          equipaEscolhida: function (newQ,old) {
              var equipasA = this.equipasT
              var equipa = equipasA.find(x => x.nome === newQ)
              this.idEquipa = equipa._id

          }
        }
        ,async created() {
            Transferencias.init()
            this.posicoes= ['Guarda Redes','Defesa','Médio','Avançado']
            var resE = await axios.get('http://localhost:4000/users?tipo=Equipa')
            resE = resE.data
            this.equipasT=resE
            var equi = []
            resE.forEach(function(elem) {equi.push(elem.nome)})
            this.equipas = equi


        }, methods: { 
            async validate(){
                
                if(this.nome == '' || this.contribuinte == '' || this.equipas.length==0) {
                    alert('Por favor, preencha todos os campos!')
                } else {
                    var Jogador = {
                        foto: this.foto,
                        nome: this.nome,
                        pais: this.pais,
                        contribuinte: this.contribuinte,
                        posicoes: this.posicoesEscolhidas,
                        nascimento: this.nascimento.toString()
                    }

                    var enviar = {
                      jogador: Jogador,
                      _id: this.idEquipa
                    }

                    //Adicionar á basededados
                    axios.post('http://localhost:4000/users/addJogador',enviar)
                        .then(response => {
                            console.log('Correu tudo bem' + response)    
                           
                            this.fillPopup(this.nome,this.equipaEscolhida)
                            this.resetForm()

                        }).catch(e => {
                            console.log('ERRO: ' + e)
                        })                    

                }
            },
            resetForm(){
                // reset Form
                this.nome=''
                this.contribuinte=''
                this.pais= ''
                this.foto=''
                this.cidade=''
                this.nascimento=''
              //  this.equipas = []
              

            }, fillPopup(a,b){
                  this.nomeP = a
                  this.equipaP = b 
                  this.dialog=true
            },

              
    }     
        

}
</script>