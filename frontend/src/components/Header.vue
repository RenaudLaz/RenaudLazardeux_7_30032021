<template>
    <div class="header">

        <div class="headerName">
            <router-link to="/Wall">
                    <img class="img-logo" src="../../src/assets/logos/icon.png" alt="Logo Groupomania"/>
            </router-link>

            <h1 class="headerTitle"><mark>Groupo</mark>mania - Réseau social</h1>

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
H1{
    font-size: 4em;
    padding: 20px 3em;
    color:#FFF;
}
mark{
    color: $primaryColor;  
}
.header { 
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(8,30,66,1) 100%);    
    display: flex;
    flex-direction: row;
    display: flex;
    justify-content: space-around;
    text-align: center;

    &Name{
        display: flex;
        justify-content: space-between;
        padding: 20px;
        margin: 40px;
    }
    &Profil, img{
        height: 110px;
        width: 110px;
        border-radius: 50%;
        text-align: center;
        background-color: #fff;
    }
    
}
.far{
    margin: 16% 0;
    font-size: 4.7em;
    background-color:#FFF;
    color: $primaryColor;
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
            font-size: 20px;
        } 
        &Profil img{
            height: 80px;
            width: 80px;
        }
    }
    .far{
        font-size: 4.8em;
    }
}
</style>