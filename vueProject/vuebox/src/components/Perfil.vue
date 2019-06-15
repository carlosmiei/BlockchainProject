<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
       
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex  v-if="equipa.liga!=-1"
                  xs6>
                  <v-text-field
                   :value="equipa.liga"
                    mb-0
                    label="Federação"
                    disabled/>
                </v-flex>

                <v-flex
                  xs6
                 
                >
                  <v-text-field
                  :value="equipa.nome"
                    label="Nome"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                
                >
                  <v-text-field
                  :value="equipa._id"
                    label="Adress"
                    class="purple-input"/>
                </v-flex>
            
                <!-- <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="City"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="Country"
                    class="purple-input"/>
                </v-flex> -->
                <v-flex
                  xs12
                  >
                  <v-text-field
                    :value="equipa.pais"
                    class="purple-input"
                    label="País"
                    />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    class="purple-input"
                    label="Contribuinte"
                    :value="equipa.contribuinte"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                  block
                    class="font-weight-light grey lighten-3"
                   
                  >
                    Atualizar Perfil
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>

      </v-flex>
      <v-flex
        class="border"
        xs12
        md4
      >
       
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="140"
          >
            <img  
              v-bind:src="equipa.foto"
              width="100px" height="40%"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h5 class="category text-gray font-weight-thin mb-2">{{equipa.tipo}}</h5>
            <!-- <h4 class="card-title font-weight-light">Alec Thompson</h4> -->
            <p class=" card-description font-weight-light">{{equipa.descricao}}</p>
            <v-btn
              v-bind:href="equipa.site"
              round
              class="grey lighten-3 font-weight-light"
            >Saber Mais</v-btn>
          </v-card-text>
       
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            equipa:null,
            conta:''
        }
        },
        async created(){
          /** Nota agora vai ler da wallet mas deveria ler do estado mas para nao termos de ir sempre ao login fica assim : this.$store.getters.wallet  */
          this.conta = window.web3.eth.accounts[0]
          console.log(this.conta)
          //ir buscar infos a bd
          var equipa = await axios.get('http://localhost:4000/users?utilizador=' + this.conta)
          this.equipa = equipa.data
          console.dir(this.equipa)
          if (!this.equipa.liga)
            this.equipa.liga =-1
        }
}
</script>

<style>
  .border{
        border-style: solid;
        border-width: 5px;
        border-color:#EEEEEE;
  }
  
</style>