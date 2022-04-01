<template>
    <div class="header">
        <div class="headerName">
            <div class="headerGroupo">
                <img class="img-logo" src="../../src/assets/logos/icon.png" alt="Logo Groupomania"/>
                <h1 class="headerTitle"><mark>Groupo</mark>mania - Réseau social</h1>
            </div>

            <div class="headerLogo">
                <router-link to="/Profile">
                    <div class="headerProfil">
                        <i class="far fa-user-circle"></i>  
                    </div>
                </router-link>

                <router-link to="/Wall">
                    <div class="headerWall">
                        <i class="fa-solid fa-message"></i>
                    </div>
                </router-link>
            </div>
        </div>

    <div class="footer"></div>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
//variables de couleurs
$primaryColor: #081E42;
$secondaryColor: #B84D54;
H1{
    font-size: 2.5em;
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
        height: 180px;
        padding: 20px;
    }
    &Groupo{
        position: absolute;
        left: 50px;
        top: 50px;
        display: flex;
        flex-direction: row;
    }
    &Logo{
        position: absolute;
        top: 40px;
        right: 20px;
    }
    &Profil, &Wall{
        height: 50px;
        width: 50px;
        border-radius: 50%;
        text-align: center;
        background-color: #fff;
        margin: 0px 0px 10px 0px;
    }
    img{
        height: 80px;
        width: 80px;
        border-radius: 50%;
        text-align: center;
        background-color: #fff;
    }
}
.far, .fa-solid{
    margin: 16% 0;
    font-size: 2.2em;
    background-color:#FFF;
    color: $primaryColor;
}
.footer{
    width: 100%;
    height: 180px;
    position: fixed;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(8,30,66,1) 100%);    
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