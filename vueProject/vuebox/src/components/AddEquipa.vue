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
                    label="Nome da Equipa"
                />
                </v-flex>

                <v-flex
                  xs6
                 
                >
                  <v-text-field
                   required
                  v-model="contribuinte"
                    label="Contribuinte do Equipa"
                    />
                </v-flex>
                <v-flex
                  xs12
                
                >
                  <v-text-field
                  v-model="wallet"
                    label="Adress"
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
                  <v-select
                    v-model="bancosEscolhidos"
                    :items="nomesBancos"
                    label="Bancos da equipa"
                    required
                    multiple
                    chips
                    attach
                    />
                </v-flex>
                <v-flex
                  xs12
                  >
                  <v-text-field
                    v-model="foto"
                    
                    label="Link da foto"
                    required
                    />
                </v-flex>
                <v-flex
                  xs12
                  >
                  <v-text-field
                    v-model="site"
                    
                    label="Site da Equipa"
                    required
                    />
                </v-flex>
                <v-flex
                  xs12
                  pb-0
                  >
                  <v-textarea
                    box
                    v-model="descricao"
                    
                    label="Pequena descrição"
                    required
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
                   Adicionar Equipa
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
          Equipa Adicionado!   &nbsp;  <v-icon color="green" x-large >check</v-icon>

        </v-card-title>

        <v-card-text>
        <b>Hash Transação: </b> {{this.trHash}} <br>
        <b>Gas utilizado: </b> {{this.gas}} <br>
        <b>Número do bloco: </b> {{this.block}} <br>
        <b>Evento acionado: </b> {{this.event}}
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
    <!-- Inicio Loading -->
    <!-- v-if="show != true" -->
    <div v-if="loading == true"  class="loader">
    <v-layout row justify-center>
        <v-dialog v-model="value" persistent content content-class="centered-dialog">
          <v-container fill-height>
            <v-layout column justify-center align-center>
              <v-progress-circular indeterminate :size="90" :width="7" color="blue"></v-progress-circular>
              <h1>Confirme a transação no metamask!</h1>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>
        </div>
    <!-- Fim do loading -->
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
            wallet:'',
            cidade:'',
            foto:'',
            descricao:'',
            site:'',
            contribuinte:'',
            account: this.$store.getters.wallet,
            tipo: this.$store.getters.tipo,
            valid:true,
            recibo:'',
            trHash:'',
            gas:'',
            block:'',
            event:'',
            loading:false,
            dialog:false,
            value:'ol',
            bancosEscolhidos:[],
            nomesBancos:[],
            bancos:[],
            bancosEnviar:[]
        }
        }, watch: {
         
         bancosEscolhidos: function (newQ, old) {

            var bancosA = this.bancos
            var bancos2 = []
            newQ.forEach(function(elem){

              var banco = bancosA.find(x => x.nome === elem)
              bancos2.push(banco._id)
            
            })

            this.bancosEnviar = bancos2

         }


        },async created() {
            Transferencias.init()
            var resB = await axios.get('http://localhost:4000/users?tipo=Banco')
            this.bancos = resB.data
            var namesB = []
            console.dir(this.bancos)
            this.bancos.forEach(function(elem) {namesB.push(elem.nome)})
            console.dir(namesB)
            this.nomesBancos = namesB


        }, methods: {

            async validate(){
                
                if(this.nome == '' || this.wallet == '' || this.wallet == '' || this.bancosEnviar.length == 0) {
                    alert('Por favor, preencha todos os campos!')
                } else {
                    var Equipa = {
                        _id : this.wallet.toLowerCase(),
                        foto: this.foto,
                        descricao: this.descricao,
                        site: this.site,
                        nome: this.nome,
                        pais: this.pais,
                        cidade: this.cidade,
                        contribuinte: this.contribuinte,
                        tipo:'Equipa',
                        bancos: this.bancosEnviar
                    }
                    console.dir(Equipa)
                    this.loading=true
                    //adicionar o Equipa a blockchain
                    var res = await Transferencias.adicionarEquipa(Equipa._id)
                    this.recibo = res

                    //Adicionar á basededados
                    axios.post('http://localhost:4000/users/',Equipa)
                        .then(response => {
                            console.log('Correu tudo bem' + response)    
                            this.resetForm()
                            this.fillPopup(res)

                        }).catch(e => {
                            console.log('ERRO: ' + e)
                        })                    

                    //Desligar o loader
                    this.loading=false
                    this.show=false
                    this.showRecibo=true
                }
            },
            resetForm(){
                // reset Form
                this.nome=''
                this.wallet=''
                this.contribuinte=''
                this.cidade= ''
                this.pais= ''
                this.foto=''
                this.site= ''
                this.descricao= ''
                this.bancosEscolhidos = []

            }, fillPopup(res){
                  this.trHash= res["receipt"].transactionHash
                  this.gas= res["receipt"].gasUsed
                  this.block = res["receipt"].blockNumber
                  var array = res["logs"]
                  this.event = array[0].event
                  this.dialog=true
            },

              
    }     
        

}
</script>