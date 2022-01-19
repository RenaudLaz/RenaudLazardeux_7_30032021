<template>
  <router-view></router-view>
  <Wall/>
</template>

<script>
 import Wall from './views/Wall.vue'
// import Home from './components/Home.vue'


export default {
  name: 'App',
  components: {
    Wall,
    // Home
  }
}
</script>

<style lang="scss">
*
    {
        font-family: 'modern', Arial, serif;
        color: black;  
        text-decoration: none;
        background-color: transparent;
        margin: 0;
        border: none;
    }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
