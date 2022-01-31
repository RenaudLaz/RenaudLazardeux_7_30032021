<template>
    <div class="profil"> 
        <h2>Mon profil</h2>

        <div class="resume-profil">
            <div class="profil-author">
                <span class="profil-user"> {{ user.firstName }} {{ user.lastName }} </span>
                <span class="profil-avatar"> <img src="../assets/logos/photo.png"/> </span>
            </div>
                <span class="profil-description"> BOOOOOOOONJOUR{{ user.description }} </span>
        </div>

        <div class="connexion-profil">
            <div class="info-user">
                <h3>Mes informations de profil:</h3>
                <span>Email : {{ user.email }} </span><br/>
                <span>Mot de passe : **********</span><br/>
                <span>Statut : {{ user.statut }}</span><br/>
            </div>
        </div>
        <button v-on:click="showNewUpdateProfil" class="button-post">
            Modifier profile
        </button>
        <div class="UpdateProfil" v-if="isVisibleUpdateProfil">
            ICI ON AJOUTE LA MODIFICATION DE LUSER
        </div>
    </div>
</template>

<script>
	import axios from 'axios'

    export default {
        name: 'Profile',
        components: {
        },
        data() {
            return {
                //Voir l'user
                user: "",
                //Messages automatique
                messReussite: '',
                messError: '',
                //Modification user
                password:'',
                // description:'',
                avatar: '',
                isVisbleMessageContainer: false,
			}
        },

        methods: {
            showNewUpdateProfil() {
                this.isVisibleUpdateProfil = !this.isVisibleUpdateProfil
            }
        }, 

		mounted() {
            const userId = localStorage.getItem('userId');

            axios.get('http://192.168.1.19:3000/api/user/' + userId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                this.user = response.data;
                console.log(response.data)
            })
            .catch(() => {console.log('Chargement de l\'utilisateur échoué')})  
		}  
    }
</script>

<style scoped lang="scss">
h3{
    font-size: 25px;
    margin-bottom: 20px;
}
h2, h3{
    color: #B84D54;

}
span{
    color: #FFF;
    font-size: 1.1em;
}
img{
    border: solid 3px #B84D54;
    border-radius: 50%;
    width: 150px;
    height: 150px;
}
.profil{
    display: flex;
    flex-direction: column;
    background-color: #081E42;
    color: #FFF;
}
.connexion-profil, .resume-profil{
    margin-bottom: 40px;
    font-size:1.2em;
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
.button-post{
    background-color: #B84D54;
    border: 2px #FFF solid;
    border-radius: 1em;
    color: #FFF;
    margin: 15px auto;
    height: 40px;
    font-size: 1.2em;
}

@media (max-width: 900px){
    .profil-author{
        flex-direction:column;    
    }
    img{
        margin: 20px 0;
        width: 200px;
        height: 200px;
    }
}
</style>