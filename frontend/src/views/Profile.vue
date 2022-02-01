<template>
    <button v-on:click="logout" class="button-post">Déconnexion</button>
    <div class="profil"> 
        <h2>Mon profil</h2>

        <div class="resume-profil">
            <div class="profil-author">
                <span class="profil-user"> {{ user.firstName }} {{ user.lastName }} </span>
                <i v-if="user.avatar == null || user.avatar == ''" class="profil-avatar"> <img src="../assets/logos/photo.png"/> </i>
                <img v-if="user.avatar" :src="user.avatar" :alt="'avatar de' + user.firstname + user.lastname" class="profil-avatar">            </div>
                
                <p v-if="user.description == null" class="profil-description">Vous n'avez pas encore de description</p>
                <p v-if="user.description != null" class="profil-description">{{user.description}}</p>
            </div>
        
        <div class="connexion-profil">
            <div class="info-user">
                <h3>Mes informations de profil:</h3>
                <span>Email : {{ user.email }} </span><br/>
                <span>Mot de passe : **********</span><br/>
                <span>Statut : {{ user.statut }}</span><br/>
            </div>
        </div>
        <div class="bouton">
            <div class="boutonRow" v-if="!showDelete">
                <button v-on:click="togglewModifierElement">Modifier profil</button>
                <br/>
                <button v-on:click="boutonSupprimer">Supprimer</button>
            </div> 

            <div v-if="showDelete">
                <span>Êtes vous certain de vouloir supprimer votre compte ? </span><br>
                <button v-on:click="deleteUser">Oui !</button>
                <button v-on:click="noDeleteUser">Non !</button>
            </div>

        </div>
            <form v-if="showUpdateElement" class="formUpdateProfil">
                <div class="formDetails">
                    <label>Avatar</label>
                    <img v-if="imagePreview" :src="imagePreview" class="preview"/>
                    <input type="file" v-on:change="onFileSelected" accept="image/*"> 
                </div>

                <div class="formDetails">
                    <label>Description</label>
                    <textarea v-model="user.description" type="text" class="description" placeholder="Taper votre description ici" />
                </div>

                <div class="formDetails">
                    <label>Mot de passe</label>
                    <input v-model="password" type="password" autocomplete="current-password" placeholder="**********"/>
                    <button v-on:click="updateProfil" type="button">Valider</button>
                    <button v-on:click="noUpdateProfil" type="button">Annuler</button>

                </div>
        </form>
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
                //Modification user
                password:'',
                description:'',
                avatar: '',
                showUpdateElement: false,
                showDelete: false,
			}
        },

        methods: {
            logout() {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('lastName');
                localStorage.removeItem('firstName');
                localStorage.removeItem('avatar');
                localStorage.removeItem('statut');
                this.$router.push('/');
            },
            updateProfil() {
				const userId = localStorage.getItem('userId');

				const formData = new FormData();
                if (this.avatar) {
                    formData.append("image", this.avatar);
                }
				if (this.user.description) {
                    formData.append("description", this.user.description);
                }
                if (this.password) {
                    formData.append("password", this.password);
                }

				axios.put('http://localhost:3000/api/user/' + userId, formData, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token'),
						'Content-Type': 'multipart/form-data'
					}
				})
                .then(() => {
                    console.log('Profile modifié');
                    localStorage.removeItem('avatar');  
                    localStorage.setItem('avatar', this.avatar);                    
                    window.location.reload();

                })
                .catch(() => {this.messError = 'Une erreur s\'est produite'})
			},
            noUpdateProfil(){
                this.showUpdateElement = !this.showUpdateElement
            },
            deleteUser(){
                const userId = localStorage.getItem('userId');
                axios.delete('http://localhost:3000/api/user/' + userId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {this.messReussite = 'Vous avez supprimer votre compte',
                    localStorage.clear();
                    this.$router.push('/');})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
            noDeleteUser(){
                this.showDelete = !this.showDelete
            },
            togglewModifierElement(){
				this.showUpdateElement = !this.showUpdateElement
            },			
            boutonSupprimer(){
				this.showDelete = !this.showDelete
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
        color:#FFF;
    }
    button{
        background-color: #B84D54;
        border: 2px #FFF solid;
        border-radius: 1em;
        color: #FFF;
        margin: 15px auto 25px auto;
        height: 40px;
        font-size: 1.2em;
    }
    .formUpdateProfil{
        position: relative;
        top: -350px;
        background-color: #fff;
        border: 4px solid #B84D54;
        border-radius: 1em;
        padding: 1em;
        justify-content: center;
    }
    .formDetails{
        width: 70%;
        margin: 0 15%;
    }
    textarea, input{
        color: #000;
        resize : none;
        margin: 15px 30px 35px 30px;
        padding: 10px;
        border: 2px solid #B84D54;
        border-radius: 1em;
        width: 90%;
        height: 50%;
        font-size: 1.2em;
    }
    label{
        color: #000;
        font-weight:bold;
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