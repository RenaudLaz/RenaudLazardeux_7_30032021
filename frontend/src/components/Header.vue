<template>
    <div class="header">
        <h1 class="header-title"><mark>Groupo</mark>mania - Réseau social</h1>

        <div class="header-name">
            <router-link to="/Wall">
                    <img class="img-logo" src="../../src/assets/logos/icon.png" alt="Logo Groupomania"/>
            </router-link>

            <router-link to="/Profile">
                <div class="header-profil">
                    <i class="far fa-user-circle"></i>  
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
h1{
    background-color: #000;
    color: #FFF;
    padding: 10px 0;
    width: 100%;
    border-radius: 0 0 0.5em 0.5em;
}
mark{
    color: #FED6D7;  
}
.header { 
    background-color: #FED6D7;
    display: flex;
    flex-direction: column;
}
.header-name{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 40px;
}
.far{
    margin: 12% 0;
    font-size: 4.7em;
    color:#FED6D7;
}
a{
    color: #000;
}
.header-profil, img{
    height: 100px;
    width: 100px;
    border: #000 3px solid;
    border-radius: 1.5em;
    text-align: center;
    background-color: #fff;
}

@media (max-width: 900px){
    .header-name{
        display:flex;
        flex-direction: row;
        margin: 0 20px;
        height:100px;  
    }
    .header-title{
        font-size:20px;
    }
    img, .header-profil{
        height: 80px;
        width: 80px;
    }
    .far{
        font-size: 3.9em;
    }
}
</style>