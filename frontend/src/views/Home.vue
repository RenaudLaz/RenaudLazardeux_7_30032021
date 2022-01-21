<template>
    <Header/>
        <div class="homeeeeee">
            <div class="signuplogin">
                <form class="signup">
                    <h2 class="title">Créer un compte:</h2>
                    <label for="lastName" class="signup-lastName">Nom: </label>
                    <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Last name">
                    <label for="firstName" class="signup-firstName">Prénom: </label>
                    <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="First name">
                    <br/>
                    <label for="email" class="signup-email">Email: </label>
                    <input type="email" v-model="signupemail" id="signupemail" name="email" placeholder="groupomania@groupomania.com">
                    <label for="password" class="signup-pwd">Mot de passe: </label>
                    <input type="password" v-model="signuppwd" id="signuppwd" name="password" placeholder="**********">
                    <button class="valid-home">Valider inscription</button>
                </form>

                <form class="login">
                    <h2 class="title">Se connecter:</h2>
                    <label for="email" class="login-email">Email: </label>
                    <input type="email" v-model="loginemail" id="loginemail" name="email" placeholder="groupomania@groupomania.com">
                    <br/>
                    <label for="password" class="login-pwd">Mot de passe: </label>
                    <input type="password" v-model="loginpwd" id="loginpwd" name="password" placeholder="**********">
                    <button class="valid-home">Valider connexion</button>
                </form>
            </div>

            <span>{{messError}}</span>
            <span class="reussite">{{messReussite}}</span>
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
                //message                
                messReussite:'',
                messError: '',
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
                axios.post('http://192.168.1.24:3000/api/user/login', {
                    email: this.loginemail,
                    password: this.loginmdp,
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('lastName', response.data.lastName);
                    localStorage.setItem('firstName', response.data.firstName);
                    //localStorage.setItem('avatar', response.data.avatar);
                    //localStorage.setItem('statut', response.data.statut);
                    this.$router.push('wall');
                })
                .catch(() => {this.messError = 'Une erreure s\'est produite'})
            },
            //S'inscrire
            signup() {
                axios.post('http://192.168.1.24:3000/api/user/signup', {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.signupemail,
                    password: this.signupmdp,
                })
                .then(() => {this.messReussite = 'Vous pouvez vous connecter'})
                .catch(() => {this.messError = 'Une erreure s\'est produite'})
            },
        }
    }
</script>


<style scope lang="scss">
.signuplogin{
    display:flex;
    justify-content:center;
    background-color: #FED6D7;
    border: 1px solid black;
}
h2{
    text-align:center;
    padding:20px;
    font-size:40px;
}
.signup, .login{
    display:flex;
    background-color: #FFF;
    text-align:left;
    width:40%;
    flex-direction:column;
    margin: 2em;
    padding-left: 10px;
    border: 5px solid black;
    border-radius: 1.5em;
    font-size:20px;
}
input{
    width: 95%;
    border: 1px lightgrey solid;
    border-radius: 0.8em;
    font-size:15px;
    padding:5px;
}
.valid-home{
    margin:30px 20%; 
    width: 60%;  
    border:2px solid #000;
    border-radius:1.5em;
    background-color: #FED6D7;
    font-size:1.2em;
}
</style>