<template>
  <!--<Header />-->
  <router-view></router-view>
</template>

<script>
// import Wall from './components/Wall.vue'
// import Header from './components/Header.vue'
// import Home from './components/Home.vue'


export default {
  name: 'App',
  components: {
    // Header,
    // Wall,
    // Home
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
