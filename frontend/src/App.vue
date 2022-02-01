<template>
    <Header/>
    <router-view></router-view>
</template>


<script>
    import Header from './components/Header.vue'

    export default {
        name: 'App',
        components: {
            Header,
        }
    }
</script>

<style lang="scss">
*
{
    font-family: 'modern', Arial, serif;
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
    background-color: #081E42;
}
</style>
