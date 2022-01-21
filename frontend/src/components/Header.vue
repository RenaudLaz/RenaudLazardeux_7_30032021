<template>
    <div class="header">
        <img class="img-logo" src="../../src/assets/logos/icon.png" alt="Logo Groupomania"/>
        
        <span class="header-title">Groupomania<br/>Réseau social</span>
        
        <div>
            <router-link to="/Profile">
             <a href> <i class="far fa-user-circle"></i> <br/>Profil</a>
            </router-link>
        </div>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
.header { 
    background-color: #FED6D7;
    height: 250px;
    font-size: 1.5em;
    display:flex;
    justify-content: space-between; 
    padding: 0 50px;
    align-items: center;
}
.header-title{
    background-color: white;
    font-size: 1.5em;
    font-weight: bolder; 
    padding: 10px;
    border: 1px solid black;
    border-radius: 1em;
}
.far{
    font-size:1.5em;
}
a{
    color: #000;
    font-weight: bold;
}
img{
    height: 150px;
    width: 150px;
    border: #000 1px solid;
    border-radius: 1.5em;
}

</style>