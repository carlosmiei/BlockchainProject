<template>
  <div id="app" class="main">
    <v-app id="app" class="main">
     <div>
      <NavBar/>
    </div>
    <v-container grid-list-md text-xs-center class="main">
    <v-layout row wrap>
      <v-flex xs3 class="side">
        <SideBar/>
      </v-flex>
      <v-flex xs9 class="car" >
         <!-- <v-card max-height="8%" dark color="#5DBCD2"> -->
          <Bread/>
           <router-view/>
        </v-flex>
        </v-layout>
        </v-container>
        <Footer/>
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
  background-color: lightblue;
 

}

.car{
   background-color: white;
}

.main {
  background-color: #E9EAEE;
}
</style>
