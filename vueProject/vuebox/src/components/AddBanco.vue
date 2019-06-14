<template>
    <div>
        <v-container>
        <v-flex xs12  >
                 <v-card dark color="primary">
                    <v-card-text class="px-0">Utilizador:  <b> [{{tipo}}] {{account}} </b> </v-card-text>
                  </v-card>
        </v-flex>

        </v-container>
    <v-form>
            <v-container py-0 px-5>
              <v-layout wrap>
                <v-flex
                  xs6                >
                  <v-text-field
                   :value="nome"
                    mb-0
                    label="Nome do Banco"
                />
                </v-flex>

                <v-flex
                  xs6
                 
                >
                  <v-text-field
                  :value="wallet"
                    label="Wallet do banco"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                
                >
                  <v-text-field
                  :value="cidade"
                    label="Adress"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs6
                  >
                  <v-text-field
                    :value="pais"
                    class="purple-input"
                    label="País"
                    />
                </v-flex>
                <v-flex
                  xs6
                  >
                  <v-text-field
                    :value="cidade"
                    class="purple-input"
                    label="Cidade"
                    />
                </v-flex>
                <v-flex
                  xs12
                  >
                  <v-text-field
                    :value="foto"
                    class="purple-input"
                    label="Link da foto"
                    />
                </v-flex>
                <v-flex
                  xs12
                  >
                  <v-textarea
                    box
                    :value="descricao"
                    class="purple-input"
                    label="Pequena descrição"
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
    </div>
</template>

<script>
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
            account: this.$store.getters.wallet,
            tipo: this.$store.getters.tipo
        }
        },    
}
</script>