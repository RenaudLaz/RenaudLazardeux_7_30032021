<template>
        <div class="home">
            <div class="signupLogin">
                <form @submit.prevent="signup" class="signup" method="post">
                    <h2 class="title">Créer un compte:</h2>
                    <label for="lastName" class="signupLastName">Nom: </label>
                    <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Last name">
                    <label for="firstName" class="signupFirstName">Prénom: </label>
                    <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="First name">
                    <br/>
                    <label for="email" class="signupEmail">Email: </label>
                    <input type="email" v-model="signupemail" id="signupemail" name="email" placeholder="groupomania@groupomania.com">
                    <label for="password" class="signupPwd">Mot de passe: </label>
                    <input type="password" v-model="signuppwd" id="signuppwd" name="password" placeholder="**********">
                    <br/>
                    <button class="valid">Valider inscription</button>
                </form>
                <span class="infoConnection">Si vous avez déjà un compte:</span>
                <form @submit.prevent="login" class="login" method="post">
                    <h2 class="title">Se connecter:</h2>
                    <label for="email" class="loginEmail">Email: </label>
                    <input type="email" v-model="loginemail" id="loginemail" name="email" placeholder="groupomania@groupomania.com">
                    <br/>
                    <label for="password" class="loginPwd">Mot de passe: </label>
                    <input type="password" v-model="loginpwd" id="loginpwd" name="password" placeholder="**********">
                    <button class="valid">Valider connexion</button>
                </form>
            </div>
        </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'Home',
            components: {},
        data() {
            return {
                //connection
                loginemail: '',
                loginpwd: '',
                //inscription
                lastName: '',
                firstName: '',
                signupemail: '',
                signuppwd: '',
            }
        },
        mounted() {
            if (localStorage.getItem('token') !== null){
            this.$router.push('wall');
            }
        },
                
        methods: {
            //Se connecter
            login() {
                axios.post('http://localhost:3000/api/user/login', {
                    email: this.loginemail,
                    password: this.loginpwd,
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('lastName', response.data.lastName);
                    localStorage.setItem('firstName', response.data.firstName);
                    localStorage.setItem('avatar', response.data.avatar);
                    localStorage.setItem('statut', response.data.statut);
                    this.$router.push('wall');
                })
                .catch(() => {console.log('Connexion échouée')})
            },
            //S'inscrire
            signup() {
                axios.post('http://localhost:3000/api/user/signup', {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.signupemail,
                    password: this.signuppwd,
                })
                .then(() => {console.log('Inscription prise en compte')})
                .catch(() => {console.log('Inscription échouée')})
            },
        }
    }
</script>


<style scope lang="scss">
//variables de couleurs
$primaryColor: #081E42;
$secondaryColor: #B84D54;

.signupLogin{
    display:flex;
    justify-content:center;
    background-color: $primaryColor;
    width: auto;
}
.signup, .login{
    display:flex;
    background-color: #FFF;
    text-align:left;
    width:40%;
    flex-direction:column;
    margin: 2em;
    padding:0 10px;
    border: 5px solid $secondaryColor;
    border-radius: 1.5em;
    font-size:20px;
}
.infoConnection{
    display:none;
    color: #FFF;
}
.valid{
    margin:30px 20%; 
    width: 60%;  
    border:2px solid #000;
    border-radius:1.5em;
    background-color: $secondaryColor;
    color: #FFF;
    font-size:1.2em;
}
h2{
    text-align:center;
    padding:20px;
    font-size:40px;
}
input{
    width: 95%;
    border: 1px lightgrey solid;
    border-radius: 0.8em;
    font-size:15px;
    padding: 5px;
}
button{
    cursor:pointer;
}
@media (max-width: 900px){
    h2{
        font-size: 30px;
    }
    .signupLogin{
        flex-direction: column;
        width:100%;
    }
    .signup, .login{
        padding:0 10px;
        margin: 5px auto;
        width:80%;
        flex-direction:column;
    }
    .infoConnection{
        display: contents;
        font-weight: bolder;
    }
}
</style>