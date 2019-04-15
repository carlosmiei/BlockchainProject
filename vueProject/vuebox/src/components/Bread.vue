<template>
  <div>
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    </div>
</template>

<script>
export default {
    name: 'Bread',
      data () {
            return {
            msg: 'Bem vindo!',
            items:[{
          text: 'Dashboard',
          disabled: true,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: true,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }]
    }
  },
}
</script>

<style>
    
</style>