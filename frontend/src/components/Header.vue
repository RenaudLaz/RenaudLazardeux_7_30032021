<template>
    <div class="header">
        <h1 class="headerTitle"><mark>Groupo</mark>mania - Réseau social</h1>

        <div class="headerName">
            <router-link to="/Wall">
                    <img class="img-logo" src="../../src/assets/logos/icon.png" alt="Logo Groupomania"/>
            </router-link>

            <router-link to="/Profile">
                <div class="headerProfil">
                    <i class="far fa-user-circle"></i>  
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
//variables de couleurs
$primaryColor: #081E42;
$secondaryColor: #B84D54;

h1{
    background-color: $secondaryColor;
    color: #FFF;
    padding: 10px 0;
    width: 100%;
    border-radius: 0 0 0.5em 0.5em;
}
mark{
    color: $primaryColor;  
}
.header { 
    background-color: $primaryColor;
    display: flex;
    flex-direction: column;

    &Name{
        display: flex;
        justify-content: space-between;
        padding: 20px;
        margin: 40px;
    }
    &Profil, img{
        height: 100px;
        width: 100px;
        border: $secondaryColor 3px solid;
        border-radius: 1.5em;
        text-align: center;
        background-color: #fff;
    }
}
.far{
    margin: 12% 0;
    font-size: 4.7em;
    background-color:#FFF;
    color: $secondaryColor;
}


@media (max-width: 900px){
    .header{
        &Name{
        display:flex;
        flex-direction: row;
        margin: 0 20px;
        height:100px;  
        }
        &Title{
            font-size:20px;
        } 
        &Profil img{
            height: 80px;
            width: 80px;
        }
    }
    .far{
        font-size: 3.9em;
    }
}
</style>