<template>
    <div>
        
    <v-container grid-list-md text-xs-center >
        <v-flex xs12  >
                 <v-card dark color="primary">
                    <v-card-text class="px-0">Utilizador:  <b> [{{tipo}}] {{account}} </b> </v-card-text>
                  </v-card>
        </v-flex>
        <v-layout pa-1 row wrap justify-space-around>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
                     <!-- <b><animated :number="90"></animated> ETH </b><br> Saldo <br> -->
                   <v-card-text class="px-0"><b>{{this.saldo}} </b><br>Saldo</v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-2">
          <v-card-text class="px-0"><b>12 </b><br>Operações</v-card-text>
        </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="blue lighten-1">
          <v-card-text class="px-0"> <b>12 </b> <br> Movimentos</v-card-text>
        </v-card>
            </v-flex>
        </v-layout>
        </v-container>   

        <!-- gráficos -->
         <!-- Gráfico linhas  -->
         <v-container  grid-list-md text-xs-center class="grey lighten-3" >
             <v-layout row>
            <v-flex xs12  ma-0 pa-0>
                <v-card flat center class="ma-2 grey lighten-3 rounded-card"> 
                    <GChart 
                    type="LineChart"
                    :data="chartData"
                    :options="chartOptions"
                   
                    />  
                </v-card>
            </v-flex>  
             </v-layout>          
         </v-container>
        <!-- fim gráfico linhas -->

        <v-container>
            <v-layout row wrap justify-space-around>
            <v-flex xs6  ma-0 pa-0 >
             <v-card flat class="ma-2 grey lighten-3 rounded-card"> 
            Gráfico circular
                    <GChart 
                    type="BarChart"
                    :data="chartData"
                    :options="chartOptions"
                    />  
             </v-card>
            </v-flex>
            <v-flex xs6  ma-0 pa-0 >
             <v-card flat class="ma-2 grey lighten-3 rounded-card"> 
            Gráfico de Barras
                    <GChart 
                    type="PieChart"
                    :data="chartData"
                    :options="chartOptions"
                    
                    />  
            
             </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        
    </div>
</template>

<script>
export default {
    name: 'DashBoard',
      data () {
            return {
                account:'ola',
                type:-1,
                tipo:'',
                msg: 'Bem vindo!',
                saldo:100,
                saldo:0,
                chartData: [
                     ['Year', 'Vendas', 'Compras'],
                     ['2014', 1000, 400],
                     ['2015', 1170, 460],
                     ['2016', 660, 1120],
                     ['2017', 1030, 540]
                ],
                    chartOptions: {
                      chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        width: 300
                      }
                    }

    }
  }, mounted() { 
      /** Nota agora vai ler da wallet mas deveria ler do estado mas para nao termos de ir sempre ao login fica assim : this.$store.getters.wallet  */
        this.account = window.web3.eth.accounts[0]
        this.type = this.$store.getters.type
        this.tipo ='Equipa' // Default

        if (this.type == 3)
            this.tipo = 'Federação'
        if(this.type == 2)
            this.tipo = 'Banco'
        
         web3.eth.getBalance(this.account, (error, result)=>{
             if(!error){
                this.saldo=result.c[0]/10000;
             }else{
                 console.error(error)
             }
         })

      
  }
}
</script>

<style>

.rounded-card{
    border-radius:8px;
}
    
</style>