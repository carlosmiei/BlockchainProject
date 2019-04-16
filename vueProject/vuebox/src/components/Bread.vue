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
                  text: 'Menu',
                  disabled: true,
                  href: 'breadcrumbs_dashboard'
        }]
    }
  },computed(){
    console.log('Entrei bread')
    var path = this.$route.fullPath
    path = path.substring(1);
    
    var obj = {
      text: path,
      disabled: true,
      href: 'breadcrumbs_link_2'
    }
    this.items.push(obj)

    console.dir(this.$route.fullPath)
  }
}
</script>

<style>
    
</style>