<template>
    <router-view></router-view>
    <Wall/>
    <Profile/>
</template>


<script>
    import Wall from './views/Wall.vue'
    import Profile from './views/Profile.vue'
    //import Home from './views/Home.vue'

    export default {
        name: 'App',
        components: {
            Wall,
            Profile,
            //Home,
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
}
</style>
