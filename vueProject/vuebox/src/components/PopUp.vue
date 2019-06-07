<template>
    <div>

      <v-card>
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
            required: true
            // default: 'Lucas'
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
    
}
</script>
<style>
    
</style>