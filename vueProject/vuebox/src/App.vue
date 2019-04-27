<template>
  <div id="app" class="main">
    <v-app v-if="$route.path!='/login'" id="app" class="main">
     <div>
      <NavBar/>
    </div>
    <v-container grid-list-md text-xs-center class="main2">
    <v-layout row wrap class="main3">
      <v-flex xs3  class="side">
        <SideBar/>
      </v-flex>
      <v-flex xs9 md9 class="car" >
         <!-- <v-card max-height="8%" dark color="#327CCB"> -->
          <!-- <Bread/> -->
           <router-view/>
        </v-flex>
        </v-layout>
        </v-container>
        <Footer/>
    </v-app>
    <v-app v-else>
      <router-view></router-view>
    </v-app>
    
  </div>

</template>

<script>
import SideBar from './components/SideBar.vue'
import Bread from './components/Bread.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
export default {
  components:{
    SideBar,
    Bread,
    NavBar
  },
  name: 'app'
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.side{
  background-color: #327CCB;

}

.car{
   background-color: white;
}

.main {
  background-color: #E9EAEE;

}

.main2 {
   
    background-color: #E9EAEE;
}

.main3{
  min-height: 700px;
}
</style>
