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
          { title: 'Adicionar Transação', icon: 'dashboard',route:'/addTransfer' },
          { title: 'Alterar Transação', icon: 'dashboard' },
          { title: 'Consultar Transação', icon: 'dashboard' },
          { title: 'Perfil', icon: 'dashboard' },
          { title: 'Jogadores', icon: 'dashboard' },
          { title: 'Account', icon: 'account_box' },
          { title: 'Admin', icon: 'gavel' }
        ]
    }
  },
}
</script>

<style>
    
</style>