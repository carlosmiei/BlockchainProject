<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>

    <!-- Snackbar -->
    <Snackbar v-if="snackbarUpd" :msg="msg" v-on:childToParentSnackbar="onChildClick"></Snackbar>

    <v-layout
      justify-center
      wrap
    >
      <v-flex xs12 md8>

        <v-form>
          <v-container>
            <v-layout wrap>
              <v-flex v-if="equipa.liga" xs12 sm6>
                <v-text-field
                  :value="equipa.liga"
                  label="Federação"
                  disabled/>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  v-model="equipa.nome"
                  label="Nome"
                  class="purple-input"/>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                :value="equipa._id"
                  label="Adress"
                  class="purple-input"
                  disabled/>
              </v-flex>

              <v-layout row wrap mx-0>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="equipa.pais"
                    class="purple-input"
                    label="País"
                    />
                </v-flex>
                <v-flex v-if="equipa.cidade" xs12 sm6 md4>
                  <v-text-field
                    v-model="equipa.cidade"
                    class="purple-input"
                    label="Cidade"
                    />
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    class="purple-input"
                    label="Contribuinte"
                    v-model="equipa.contribuinte"
                  />
                </v-flex>
              </v-layout>
              <v-flex xs12>
                <v-text-field
                  class="purple-input"
                  label="Site"
                  v-model="equipa.site"
                />
              </v-flex>
              <v-flex
                xs12
                text-xs-right
              >
                <v-btn
                  block
                  @click="atualizaPerfil()"
                  class="font-weight-light grey lighten-3 rounded"
                  
                >
                  Atualizar Perfil
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>

      </v-flex>
      <v-flex class="border" xs12 md4>
        <v-img
          slot="offset"
          class="mx-auto d-block"
          v-bind:src="foto"
          width="120px"
          >
        </v-img>

        <!-- Popup da foto -->
        <v-dialog max-width="600px" v-model="dialog2">
          <v-tooltip top slot="activator">
            <v-btn small slot="activator" depressed class="rounded" color="primary">
              <v-icon small left>edit</v-icon>
              <span>Alterar fotografia</span>
            </v-btn>
            <span>Atualizar Fotografia</span>
          </v-tooltip>
          <v-card>
            <br>
            <v-card-text class="margin-up">
              <v-form class="px-3">
                <v-text-field
                  label="URL da foto"
                  v-model="equipa.foto"
                  class="purple-input"
                  rows="12"
                >
                </v-text-field>
              <v-btn small depressed class="ml-3 mt-1 rounded" color="primary" @click="submitFoto()" :loading="loading2">Alterar fotografia</v-btn>
              <v-btn small depressed class="mt-1 rounded" color="primary" @click="dialog2=!dialog2">Cancelar</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        
        <v-card-text class="text-xs-center">
          <h5 class="category text-gray caption mb-2">{{equipa.tipo}}</h5>
          <p class="category text-gray font-weight-light mb-2">{{descricao}}</p>

          <!-- Popup da descrição -->
          <v-dialog max-width="600px" v-model="dialog">
            <v-tooltip top slot="activator">
              <v-btn small slot="activator" depressed class="rounded" color="primary">
                <v-icon small left>edit</v-icon>
                <span v-if="this.descricao" >Atualizar descrição</span>
                <span v-else>Adicionar descrição</span>
              </v-btn>
              <span>Atualizar Descrição</span>
            </v-tooltip>
            <v-card>
              <v-card-title>
                  <h3 class="title">Atualizar Descrição</h3>
              </v-card-title>
              <v-card-text class="margin-up">
                <v-form class="px-3">
                  <v-textarea
                    v-model="equipa.descricao"
                    class="purple-input"
                    rows="12"
                  >
                  </v-textarea>
                <v-btn small depressed class="ml-3 mt-1 rounded" color="primary" @click="submitDesc()" :loading="loading">Atualizar descrição</v-btn>
                <v-btn small depressed class="mt-1 rounded" color="primary" @click="dialog=!dialog">Cancelar</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>

          
          <v-spacer></v-spacer>
          <v-tooltip top slot="activator">
          <v-btn 
            slot="activator"
            v-bind:href="site"
            target="_blank"
            round
            class="mt-4 grey lighten-3 font-weight-light">
              <v-icon small left>open_in_new</v-icon>
              <span>Saber Mais</span>
            </v-btn>
            <span>Visitar website</span>
          </v-tooltip>

        </v-card-text>
       
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import Snackbar from './Snackbar.vue'
import axios from 'axios';

export default {
    data () {
        return {
            equipa: '',
            conta:'',
            site: '',
            descricao: '',
            foto: '',
            loading: false,
            dialog: false,
            loading2: false,
            dialog2: false,
            snackbarUpd: false,
            msg: ''
      }
    },
    components:{
      Snackbar
    },
    async created(){
      /** Nota agora vai ler da wallet mas deveria ler do estado mas para nao termos de ir sempre ao login fica assim : this.$store.getters.wallet  */
      this.conta = window.web3.eth.accounts[0]
      console.log(this.conta)
      //ir buscar infos a bd
      var equipa = await axios.get('http://localhost:4000/users?utilizador=' + this.conta)
      this.equipa = equipa.data
      console.dir(this.equipa)

      this.site = this.equipa.site
      this.descricao = this.equipa.descricao
      this.foto = this.equipa.foto
    },
    methods: {
      submitDesc(){
        var obj = {
          _id: this.equipa._id,
          desc: this.equipa.descricao
        }
        console.log(obj)
        axios.post('http://localhost:4000/users/alteraDesc', obj)
        .then(response => {
          console.log('Correu tudo bem' + response)    
          this.msg = "Descrição atualizada"
          this.snackbarUpd = true
          this.descricao = this.equipa.descricao
        }).catch(e => {
          console.log('ERRO: ' + e)
        })

        this.loading = false
        this.dialog = false
        return true
      },

      submitFoto(){
        var obj = {
          _id: this.equipa._id,
          foto: this.equipa.foto
        }
        console.log(obj)
        axios.post('http://localhost:4000/users/alteraFoto', obj)
        .then(response => {
          console.log('Correu tudo bem' + response)     
          this.msg = "Fotografia atualizada"
          this.snackbarUpd = true 
          this.foto = this.equipa.foto
        }).catch(e => {
          console.log('ERRO: ' + e)
        })

        this.loading2 = false
        this.dialog2 = false
        return true
      },

      atualizaPerfil(){
        var obj = {
          _id: this.equipa._id,
          nome: this.equipa.nome,
          pais: this.equipa.pais,
          cidade: this.equipa.cidade,
          contribuinte: this.equipa.contribuinte,
          site: this.equipa.site
        }
        console.log(obj)
        axios.post('http://localhost:4000/users/atualizaPerfil', obj)
        .then(response => {
          console.log('Correu tudo bem' + response)        
          this.msg = "Perfil atualizado"
          this.snackbarUpd = true 
          this.site = this.equipa.site
        }).catch(e => {
          console.log('ERRO: ' + e)
        })

        return true

        }, 
        onChildClick(elem){
          this.snackbarUpd = elem
        }
    }
}
</script>

<style scoped>
  .border{
        border-style: solid;
        border-width: 5px;
        border-color:#EEEEEE;
  }

  .rounded{
    border-radius:7px;
  }

  .margin-up{
    margin-top: -20px;
  }
  
</style>