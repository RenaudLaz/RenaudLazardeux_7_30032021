<template>
    <Header/>
        <div class="wall">
            <div class="action">
                <button v-on:click="showNewMessageContainer" class="create-post"><i class="fas fa-pen"></i></button>
            </div>

            <div class="new-message-container" v-if="isVisbleMessageContainer">
                <textarea class="create-text" placeholder=" Entrez votre message" v-model="newMessage"></textarea><br/>
                <button v-on:click="cancelNewNessage" class="button-post cancel-post">Annuler</button>
                <button v-on:click="publishNewMessage" class="button-post publish-post">Publier</button>    
            </div>

            <section class="wall-container">
                <article v-for="post in posts" :key="post.id" class="wall-container-messages">
                    <div class="bloc-author">
                        <span class="author"> {{ post.User.firstName }} {{ post.User.lastName }}</span>
                        <span class="author-avatar">    
                            <!--<p v-if="user.avatar == null"> <img src="../assets/logos/avatarnull.png" class="avatar"> </p>-->
                            <p v-if="user.avatar != null"> <img :src="post.User.avatar" class="avatar"/> </p>
                        </span>
                    </div>

                    <div class="bloc-post">
                        <span class="post-text"> 
                            {{ post.text }} 
                        </span> <br/>
                            
                        <span class="post-image"> 
                            <img :src="post.imageURL" style="max-width: 300px"/> 
                        </span>
                    </div>  

                        <button v-on:click="showNewCommentContainer" class="button-post reply-post">Répondre</button>   

                    <div class="new-comment-container" v-if="isVisbleCommentContainer">
                        <textarea class="create-reply" placeholder=" Entrez votre réponse en commentaire" v-model="newComment"></textarea><br/>
                        <button v-on:click="cancelNewComment" class="button-post cancel-reply">Annuler</button>
                        <button v-on:click="publishNewComment" class="button-post publish-reply">Publier</button>    
                    </div>   
                </article>
            </section>
        </div>
</template>


<script>
    import axios from 'axios'

    import Header from '@/components/Header.vue'
    export default {
        name: 'Wall',
        components: {
            Header,
        },
        props: {
            // msg: String
        },
        data() {
            return {
                isVisbleMessageContainer: false,
                isVisbleCommentContainer: false,
                // messages: [],
                newMessage: "",
                newComment: "",
                messages: [

                ]
            }
        },
        methods: {
            showNewMessageContainer() {
                this.isVisbleMessageContainer = !this.isVisbleMessageContainer
            },
            showNewCommentContainer() {
                this.isVisbleCommentContainer = !this.isVisbleCommentContainer 
            },
            cancelNewNessage() {
                this.newMessage = ''
                this.isVisbleMessageContainer = false;
            },
            cancelNewComment() {
                this.newComment = ''
                this.isVisbleCommentContainer = false;
            },
            publishNewMessage() {    
                axios.post('http://192.168.1.24:3000/api/post', {
                    message: this.newMessage
                })
                // apres, soit on recharge la page (solution la moins bien)
                // soit on ajoute ce dernier message dans notre array this.messages et il apparaitra sur la page automatiquement (solution comme il faut) 
                .then(response => {this.newMessage = response.data;})
                .catch(() => {this.messError = 'Une erreure s\'est produite'})
            }
        },
        mounted() {

          axios.get('http://192.168.1.24:3000/api/post', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {this.posts = response.data;})
            .catch(() => {this.messError = 'Une erreure s\'est produite'})

            const userId = localStorage.getItem('userId');


            axios.get('http://192.168.1.24:3000/api/user/' +userId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {this.user = response.data;})
            .catch(() => {this.messError = 'Une erreure s\'est produite'})
        }
    }
</script>


<style scoped lang="scss">
.fas{
    font-size: 2em;
}
.create-post{
    position: absolute;
    top: 370px;
    right: 40px;
    height: 80px;
    width: 80px;
    color: #FED6D7;
    background-color: #FED6D7;
    border: 3px solid #000;
    border-radius: 3em;
}
textarea{
    background-color: #FED6D7;
    resize : none;
    margin-top: 20px;
    margin-bottom: 30px;
    border-radius: 1em;
    width: 90%;
    height: 65%;
    font-size: 1.2em;
}
.button-post{
    margin: auto 10%;
    background-color: lightgrey;
    font-weight: bold;
    border-radius: 1em;
}
.new-message-container{  
    margin: 150px auto auto auto;
    margin-bottom: 50px;
    background-color: #FFF;
    height: 350px;
    width: 90%;
    border: red 5px solid;
    border-radius: 1.5em;
}
.wall-container{
    margin: 150px auto;
    background-color: #FED6D7;
    height: auto;
    width: 90%;
    border: #000 5px solid;
    border-radius: 1.5em;
}
.wall-container-messages {
    color: white;
    background-color: #fff;
    border: black 2px solid;
    border-radius: 1.5em;
    margin: 15px 15px 50px 15px;
}
.bloc-post{
    margin: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bloc-author{
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px ;
    height: 50px;
    border-radius: 1.5em 1.5em 0 0;
    border-bottom: 5px #FED6D7 solid;
}
.avatar{
    width: 40px;
    height: 40px;
    border-radius: 1.5em;
}
span.author {
    font-weight: bolder;
    font-size: 1.5em;
}
.post-text{
    font-size: 1.3em;
}
.new-comment-container{
    border-top:black solid 2px;
}
.button-post{
    background-color: #FED6D7;
    border: 1px black solid;
    color: black;
    margin: 5px auto;
}
.img-logo{
    height: 100px
}
</style>

