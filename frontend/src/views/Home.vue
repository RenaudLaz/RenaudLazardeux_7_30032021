<template>
        <div class="home">
            <div class="signupLogin">
                <div class="button-signupLogin">
                    <button v-on:click="seenLogin = true, seenSignup = false" class="buttonHome buttonLogin">Connexion</button>
                    <button v-on:click="seenLogin = false, seenSignup = true" class="buttonHome buttonSignup">Inscription</button>
                </div>
                <form v-if="seenSignup" @submit.prevent="signup" class="signup" method="post">
                    <label for="lastName" class="signupLastName">Nom: </label>
                    <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Lastname">
                    <br/>
                    <label for="firstName" class="signupFirstName">Prénom: </label>
                    <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="Firstname">
                    <br/>
                    <label for="email" class="signupEmail">Email: </label>
                    <input type="email" v-model="signupemail" id="signupemail" name="email" placeholder="groupomania@groupomania.com">
                    <br/>
                    <label for="password" class="signupPwd">Mot de passe: </label>
                    <input type="password" v-model="signuppwd" id="signuppwd" name="password" placeholder="**********">
                    <br/>
                    <button class="valid">Valider inscription</button>
                </form>
                <form v-if="seenLogin" @submit.prevent="login" class="login" method="post">
                    <label for="email" class="loginEmail">Email: </label>
                    <input type="email" v-model="loginemail" id="loginemail" name="email" placeholder="groupomania@groupomania.com">
                    <br/>
                    <label for="password" class="loginPwd">Mot de passe: </label>
                    <input type="password" v-model="loginpwd" id="loginpwd" name="password" placeholder="**********">
                    <br/>
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
                seenSignup: false,
                seenLogin: true
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
            }
        }
    }
</script>


<style scope lang="scss">
//variables de couleurs
$primaryColor: #081E42;
$cd-txt--invalid: #fff;
$cd-danger: #b20a37;

.home{
    padding-top: 130px;
    display: flex;
    justify-content: center;
    background: #FFF;
    
}
.signupLogin{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #FFF;
    border: 1px $primaryColor solid;
    width: 40%;
    height: auto;
}
.buttonHome{
    width: 50%;
    border-bottom: 1px solid $primaryColor;
}
.buttonLogin:hover{
    background: linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(8,30,66,1) 100%);
    color: #FFF;
    animation: myAnim 1s ease 0s 1 normal forwards;
    }
.buttonSignup:hover{
    background: linear-gradient(315deg, rgba(255,255,255,1) 0%, rgba(8,30,66,1) 100%);
    color: #FFF;
    animation: myAnim 1s ease 0s 1 normal forwards;
}
.login{
    display: block;
    padding-top: 10px;
}
.signup{
    display: block;
    padding-top: 10px;
}
button{
    font-size: 1.3em;
    height: 2.5em;
    cursor: pointer;
    color: $primaryColor;
}
.buttonLogin{
    border-right: 1px $primaryColor solid;
}
.valid{
    display: block;
    border-top: 1px solid $primaryColor;
    width: 100%;
    margin-top: 35px;
    &:hover{
        background: linear-gradient(315deg, rgba(255,255,255,1) 0%, rgba(8,30,66,1) 50%, rgba(255,255,255,1) 100%);
        color: #FFF;
        animation: myAnim 1s ease 0s 1 normal forwards;
    }
}
input{
    margin-top: 15px;
    width: 300px;
    font-size: 18px;
    &:invalid {
        background: $cd-danger;
        border: 2px solid $cd-danger;
        color: $cd-txt--invalid;
    }
}
@keyframes myAnim {
  0% {
    opacity: 0;
    color: $primaryColor;
  }

  100% {
    opacity: 1;
    color: #fff;
  }
}
@media (max-width: 900px){

}
</style>