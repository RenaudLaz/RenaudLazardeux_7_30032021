<template>
  <Wall msg="Bienvenue sur le réseau social de Groupomania"/>
</template>

<script>
import Wall from './components/Wall.vue'
//import Home from './components/Home.vue'


export default {
  name: 'App',
  components: {
    Wall,
    //Home
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
