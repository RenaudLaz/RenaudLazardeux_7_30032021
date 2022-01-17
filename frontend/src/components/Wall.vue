<template>
    <header>
    <!-- <img :src="../src/assets/illustation/icon-left-font.png" alt="Logo Groupomania"/>  -->
    
    <a href>Profil </a>
    </header>

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
                    <img :src="post.User.avatar" class="avatar"/>
                </span>
            </div>
            <div class="bloc-post">
                    <span class="post-text"> 
                        {{ post.text }} 
                    </span>
                    <br/>
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
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Wall',
        components: {},
        props: {
            msg: String
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
                
                axios.post('http://localhost:3000/api/post', {
                    message: this.newMessage
                })
                // apres, soit on recharge la page (solution la moins bien)
                // soit on ajoute ce dernier message dans notre array this.messages et il apparaitra sur la page automatiquement (solution comme il faut) 
                .then(response => {this.newMessage = response.data;})
                .catch(() => {this.messError = 'Une erreure s\'est produite'})
            }
        },
        mounted() {
          axios.get('http://localhost:3000/api/post', {
                /*headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }*/
            })
            .then(response => {this.posts = response.data;})
            .catch(() => {this.messError = 'Une erreure s\'est produite'})

            //const userId = localStorage.getItem('userId');



            // Appeler l'API, obtenir les messages
            // Set les message dans this.messages
            // Utiliser axios
            /*
                let response = await this.$axios.get('http://localhost:3000/api/post')
                this.messages = response.data
            */
        }
    }
</script>

<style scoped lang="scss">

header { 
    position: absolute;
    top:0;
    width: 100%;
    background-color: #DC143C;
    height: 70px;
}
.fas{
    font-size: 2em;
}
.create-post{
    position: absolute;
    top: 150px;
    right: 40px;
    height: 80px;
    width: 80px;
    color: #DC143C;
    background-color: white;
    border: 3px solid #DC143C;
    border-radius: 3em;
}
textarea{
    resize : none;
    margin-top: 20px;
    margin-bottom: 30px;
    border-radius: 1em;
    width: 90%;
    height: 65%;
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
    background-color: #134aa7;
    height: 400px;
    width: 300px;
    border: #DC143C 5px solid;
    border-radius: 1.5em;
}
.wall-container{
    margin: 100px auto;
    background-color: #DC143C;
    height: auto;
    width: 90%;
    border: #134aa7 5px solid;
    border-radius: 1.5em;
}
.wall-container-messages {
    color: white;
    background-color: #134aa7;
    border-radius: 1.5em;
    margin: 15px 15px 50px 15px;
}
.bloc-author{
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px ;
    height: 50px;
    border-radius: 1.5em 1.5em 0 0;
    background-color: white;
    border-bottom: 5px #DC143C solid;
}
.avatar{
    width: 40px;
    height: 40px;
    border-radius: 1.5em;
}
span.author {
    color: #134aa7;
}
.post-text{
    font-size: 1.3em;
}
.reply-post{
    position: absolute;
    right: 0;
    background-color: #134aa7;
    border: 1px white solid;
    color: white;
}
</style>

