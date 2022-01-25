<template>
    <div class="profil"> 
        <h2>Mon profil</h2>

        <div class="resume-profil">
            <div class="profil-author">
                <span class="profil-user"> Nom Prénom<!--{{ user.firstName }} {{ user.lastName }}--> </span>
                <span class="profil-avatar"> <img src="../assets/logos/photo.png" class="avatar"/> </span>
            </div>
                <span class="profil-description"> Description<!--{{ user.description }}--> </span>
        </div>

        <div class="connexion-profil">
            <div class="info-user">
                <h3>Mes informations de profil:</h3>
                <span>Email : *****@groupomania.com<!--{{ user.email }}--> </span><br/>
                <span>Mot de passe : **********</span><br/>
                <span>Statut : user<!--{{ user.statut }}--></span><br/>
            </div>
        </div>
        <div class ="update-profil">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Profile',
        components: {
        },
        data() {
            return
        }       
    }
</script>

<style scoped lang="scss">
h3{
    font-size: 25px;
    margin-bottom: 20px;
}
img{
    border: solid 3px black;
    border-radius: 50%;
    width:150px;
    height:150px;
}
.profil{
    display: flex;
    flex-direction: column;
    border: solid 2px #000;
    background-color: #FED6D7;
}
.resume-profil{
margin-bottom: 40px;
}
.connexion-profil{
margin-bottom: 40px;

}
.profil-author{
    margin: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.profil-user{
    font-size: 2em;
}
.profil-description{
    font-size: 1.2em;
}

@media (max-width: 900px){
    .profil-author{
        flex-direction:column;    
    }
    img{
        margin: 20px 0;
    }
}
</style>

