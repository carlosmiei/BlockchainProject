<template>
    <div>
       <v-navigation-drawer
          class="primary"
         dark
          permanent
        >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
        :to="item.route"
        active-class="blue lighten-1"
      >
        <v-list-tile-action >
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
 
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
      data () {
            return {
            msg: 'Bem vindo!',
            items: [
          { title: 'Dashboard', icon: 'dashboard' ,route:'/dashboard'},
          { title: 'Efetuar Compra', icon: 'transfer_within_a_station',route:'/addTransfer' },
          { title: 'Alterar Transação', icon: 'touch_app' },
          { title: 'Consultar Transação', icon: 'list', route:'/consultTrans'},
          { title: 'Perfil', icon: 'dashboard' },
          { title: 'Jogadores', icon: 'person' },
          { title: 'Account', icon: 'account_box' },
          { title: 'Admin', icon: 'gavel' }
          
        ]
    }
  },
}
</script>

<style>
    .primary2{
      background-color:#327CCB;
    }
</style>