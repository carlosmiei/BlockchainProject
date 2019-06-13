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
                <v-flex
                  xs6                >
                  <v-text-field
                   mb-0
                    label="Federação"
                    disabled/>
                </v-flex>

                <v-flex
                  xs6
                 
                >
                  <v-text-field
                    label="Nome"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                
                >
                  <v-text-field
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
                    class="purple-input"
                    label="País"
                    type="number"/>
                </v-flex>
                <!-- <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-flex> -->
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
        xs12
        md4
      >
       
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="140"
          >
            <img  
              src="https://upload.wikimedia.org/wikipedia/pt/f/f0/500px-SL_Benfica_logo_svg.png"
              width="40%" height="40%"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-2">Equipa de Futebol</h6>
            <h4 class="card-title font-weight-light">Alec Thompson</h4>
            <p class=" card-description font-weight-light">O Sport Lisboa e Benfica é um clube multidesportivo sediado na freguesia de São Domingos de Benfica, em Lisboa. O seu eclectismo, historial e forte base de adeptos fazem do Benfica um dos Grandes clubes de Portugal e um dos mais prestigiados a nível mundial.</p>
            <v-btn
            
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

          //ir buscar infos a bd
          var equipa = await axios.get('http://localhost:4000/users?utilizador=' + this.conta + '?tipo=Equipa')
          console.dir(equipa)
        }
}
</script>