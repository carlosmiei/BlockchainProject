<template>
    <div>

      <v-card>
        <div v-if="transacao">
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Detalhes Transaçao!   &nbsp;  <v-icon color="green" x-large >check</v-icon>

          </v-card-title>

          <v-card-text>
            <b>Id de Venda: </b> {{this.transacao._id}} <br>
            <b>Vendedor: </b> {{this.transacao.from}} <br>
            <b>Comprador: </b> {{this.transacao.to}} <br>
            <b>Nome do Jogador: </b> {{this.transacao.nomeJogador}} <br>
            <b>Valor Total / Valor Iva: </b> {{this.transacao.valorT}} &euro; /  {{this.transacao.valorI}} &euro; <br>
            <b>Hash Transação: </b> {{this.transacao.hashTrans}} <br>
            <b>Gas utilizado: </b> {{this.transacao.gas}} <br>
            <b>Número da fatura: </b> {{this.transacao.numFatura}} <br>
            <b>Número do bloco: </b> {{this.transacao.numBloco}} <br>
            <b>Estado: </b> {{this.transacao.estado}}
          </v-card-text>
        </div>

        <div v-if="jogador">
          <v-card-title 
            class="headline grey lighten-2"
            primary-title
          >
            Detalhes do Jogador   &nbsp;  <v-icon color="green" x-large >check</v-icon>

          </v-card-title>

          <v-card-text>
            <v-layout>
              <v-flex row wrap xs12 sm7 md8 lg9>
                <b>Nome: </b> {{ this.jogador.nome }} <br>
                <b>Idade: </b> {{ this.idade }} <br>
                <b>Nacionalidade: </b> {{ this.jogador.pais }} <br>
                <b>Posições: </b>
                <div v-for="pos in jogador.posicoes" :key="pos"> &nbsp;&nbsp; {{ pos }}</div> 
              </v-flex>
              <v-flex xs12 sm5 md4 lg43>
                <v-img
                    class="img"
                    :src="jogador.foto"
                    height="100px"
                    width="100px"
                    contain
                >
                </v-img>
              </v-flex>
            </v-layout>
          </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="enviarParent"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>
<script>
export default {
    name: 'PopUp',
      props: {
        transacao: {
          type: Object,
          required: false
          // default: 'Lucas'
        },
        jogador: {
          type: Object,
          required: false
        }
    },
    components: {

    },
    data () {
        return {
                     
        }
    
    },mounted() {
       // alert("entrei PopUp")
        //console.dir(transacao)
    }
    ,methods: {
        enviarParent(event){
          this.$emit('childToParent', false)
        }
    },
    computed: {
      idade(){
        var today = new Date();
        var birthDate = new Date(this.jogador.nascimento);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if(isNaN(age)) 
          return "Não disponível"
        else 
          return age + " anos"
      }
    }
}
</script>
<style>
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>