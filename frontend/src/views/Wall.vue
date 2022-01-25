<template>
        <div class="wall">
            <div class="action">
                <button v-on:click="showNewMessageContainer" class="create-post"><i class="fas fa-pen"></i></button>
            </div>

            <div class="new-message-container" v-if="isVisbleMessageContainer">
                <textarea class="create-text" placeholder=" Entrez votre message" v-model="newMessage"></textarea><br/>
                <div class="button-publish">
                    <button v-on:click="cancelNewNessage" class="button-post cancel-post">Annuler</button>
                    <button v-on:click="publishNewMessage" class="button-post publish-post">Publier</button>    
                </div>
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

    export default {
        name: 'Wall',
        components: {
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
                /*headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }*/
            })
            .then(response => {this.posts = response.data;})
            .catch(() => {this.messError = 'Une erreure s\'est produite'})

/*            const userId = localStorage.getItem('userId');


            axios.get('http://192.168.1.24:3000/api/user/' +userId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {this.user = response.data;})
            .catch(() => {this.messError = 'Une erreure s\'est produite'})
*/
        }
    }
</script>


<style scoped lang="scss">
.fas{
    font-size: 2em;
}
.create-post{
    position:absolute;
    top: 320px;
    right: 50px;   
    height: 80px;
    width: 80px;
    color: #FED6D7;
    background-color: #FED6D7;
    border: 3px solid #000;
    border-radius: 3em;
}
textarea{
    background-color: #FFF;
    resize : none;
    margin: 30px;
    padding: 5px;
    border: 1px solid #000;
    border-radius: 1em;
    width: 90%;
    height: 50%;
    font-size: 1.2em;
}
.button-post{
    margin: auto 10%;
    background-color: lightgrey;
    font-weight: bold;
    border-radius: 1em;
}
.new-message-container{  
    margin: 40px 0 0 40px;
    background-color: #FED6D7;
    height: 350px;
    width: 70%;
    border: #000 5px solid;
    border-radius: 1.5em;
    display: flex;
    flex-direction: column;
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
.button-publish{
    display: flex;
    justify-content: space-around;
}
.button-post{
    background-color: #000;
    border: 1px #000 solid;
    color: #FFF;
    margin: 5px auto;
    height: 40px;
}
.img-logo{
    height: 100px
}

@media (max-width: 900px){
    .create-post{
    position:absolute;
    top: 260px;    
    }
}
</style>

