<template>
    <v-snackbar v-model="snackbarUpd" :timeout="snackbarTO" top color="blue lighten-1">
      <v-icon small dark>priority_high</v-icon>
      <span>{{ this.msg }}</span>
      <v-btn flat color="white" @click="enviarParent">Close</v-btn>
    </v-snackbar>
</template>


<script>
export default {
  name: "Snackbar",
  props: {
    msg: {
      type: String,
      required: true
    },
    timeout: {
      type: Number,
      required: false
    }
  },
  data(){
      return{
          snackbarUpd: false
      }
  },  
  created() {
    console.log('Dentro do Snackbar')
    console.dir(this.msg)
    this.showSnackbar()
  },
  methods: {
    showSnackbar(){
        this.snackbarUpd=true;
        setTimeout(() => { this.$emit("childToParentSnackbar", false); }, this.snackbarTO);
    },
    enviarParent(event) {
        this.$emit("childToParentSnackbar", false);
    }
  },
  computed: {
      snackbarTO(){
          return this.timeout ? this.timeout : 4000
      }
  }
}

</script>

