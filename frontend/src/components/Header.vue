<template>
    <div class="header">
        <img class="img-logo" src="../../src/assets/logos/icon.png" alt="Logo Groupomania"/>
        <div>
        
        <a href> <i class="far fa-user-circle"></i> <br/>Profil</a>
        </div>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
.header { 
    background-color: #FED6D7;
    height: 200px;
    font-size: 1.5em;
    display:flex;
    justify-content: space-between; 
    padding: 0 50px;
    align-items: center;
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