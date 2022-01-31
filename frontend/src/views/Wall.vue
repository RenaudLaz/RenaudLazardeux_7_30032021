<template>
        <div class="wall">
            <div class="action">
                <button v-on:click="showNewMessageContainer" class="create-post"><i class="fas fa-pen"></i></button>
            </div>

            <div class="new-message-container" v-if="isVisbleMessageContainer">
                <textarea v-model="newMessage" class="" name="message" id="create-text" placeholder="Entrez votre message"/>    
                <div class="create-file">
                    <label for="file">Sélectionner le fichier à envoyer</label>
                    <input type="file" id="file" name="file" accept=".png,.jpg,.jpeg,.gif" multiple>
                </div>

                <div class="button-publish">
                    <button v-on:click="cancelNewNessage" class="button-post cancel-post">Annuler</button>
                    <button v-on:click="publishNewMessage" class="button-post publish-post">Publier</button>    
                </div>
            </div>

            <section class="wall-container">
                <article v-for="post in posts" :key="post.id" class="wall-container-messages">
                    <div class="bloc-author">
                        <span class="author"> {{ post.User.firstName }} {{ post.User.lastName }} </span>

                        <span class="author-avatar">    
                            <!--<p v-if="user.avatar == null"> <img src="../assets/logos/avatarnull.png" class="avatar"> </p>-->
                            <!--<p v-if="user.avatar != null"> <img :src="post.User.avatar" class="avatar"/> </p>-->
                            <img class="avatar" :src="post.User.avatar"/>
                        </span>
                    </div>

                    <div class="bloc-post">
                        <span class="post-image"> 
                            <img :src="post.imageURL" style="max-width: 300px"/> 
                        </span>

                        <span class="post-text"> 
                            {{ post.text }} 
                        </span> <br/>     
                    </div>  

                        <button v-on:click="showNewCommentContainer" class="button-post reply-post">Répondre</button>   

                    <div class="new-comment-container" v-if="isVisbleCommentContainer">
                        <textarea class="create-reply" placeholder=" Entrez votre réponse en commentaire" v-model="newComment"></textarea><br/>
                        <div class="button-publish">
                            <button v-on:click="cancelNewComment" class="button-post cancel-reply">Annuler</button>
                            <button v-on:click="publishNewComment" class="button-post publish-reply">Publier</button>   
                        </div> 
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
        },
        data() {
            return {
                isVisbleMessageContainer: false,
                isVisbleCommentContainer: false,
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
                }, {})
                // apres, soit on recharge la page (solution la moins bien)
                // soit on ajoute ce dernier message dans notre array this.messages et il apparaitra sur la page automatiquement (solution comme il faut) 
                .then(response => {this.newMessage = response.data;})
                .catch(() => {console.log('Erreur à la publication du message')}) 
            }
        },
        mounted() {

          axios.get('http://localhost:3000/api/post', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {this.posts = response.data;})
            .catch(() => {console.log('Erreur au chargement des messages')}) 

            const userId = localStorage.getItem('userId');

            axios.get('http://localhost:3000/api/user/' + userId, {
                //headers: {
                    //Authorization: 'Bearer ' + localStorage.getItem('token')
                //}
            })
            .then(response => {this.user = response.data;})
            .catch(() => {console.log('Erreur au chargement de l\'utilisateur')})

        }
    }
</script>


<style scoped lang="scss">
.fas{
    font-size: 2em;
    color: #081E42;
}
.create-post{
    position:absolute;
    top: 300px;
    right: 50px;   
    height: 80px;
    width: 80px;
    background-color: #FFF;
    border: 3px solid #B84D54;
    border-radius: 3em;
}
textarea{
    background-color: #FFF;
    resize : none;
    margin: 30px 30px 15px 30px;
    padding: 5px;
    border: 1px solid #B84D54;
    border-radius: 1em;
    width: 90%;
    height: 50%;
    font-size: 1.2em;
}
label{
    color: #FFF;
}
input{
    color: #FFF;
    margin: 15px 0;
    border: solid #B84D54;
}
.button-post{
    margin: auto 10%;
    background-color: #B84D54;
    font-weight: bold;
    border-radius: 1em;
}
.new-message-container{  
    margin: 40px 0 0 40px;
    background-color: #081E42;
    height: 400px;
    width: 70%;
    border: #B84D54 5px solid;
    border-radius: 1.5em;
    display: flex;
    flex-direction: column;
}
.wall-container{
    margin: 110px auto;
    background-color: #081E42;
    height: auto;
    width: 95%;
    border: #B84D54 5px solid;
    border-radius: 1.5em;
}
.wall-container-messages {
    color: white;
    background-color: #fff;
    border: #B84D54 4px solid;
    border-radius: 1.5em;
    margin: 35px 35px 50px 35px;
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
    background-color: #081E42;
    justify-content: space-between;
    padding: 0 10px ;
    height: 70px;
    border-radius: 1.2em 1.2em 0 0;
    border-bottom: 5px #B84D54 solid;
}
.avatar{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #B84D54;
}
span.author {
    font-weight: bolder;
    font-size: 1.5em;
    color: #FFF;
    background-color: #081E42;
}
.post-text{
    margin-left: 30px;
    text-align: justify;
    font-size: 1.3em;
}
.create-reply{
    margin-top: 30px;
    height: 80px;
}
.new-comment-container{
    border-top:#B84D54 solid 4px;
    background-color: #081E42;
    border-radius: 0 0 1.2em 1.2em;
}
.button-publish{
    display: flex;
    justify-content: space-around;
}
.button-post{
    background-color: #B84D54;
    border: 1px #FFF solid;
    color: #FFF;
    margin: 15px auto;
    height: 40px;
}
.img-logo{
    height: 100px
}

@media (max-width: 900px){
    textarea{
        margin: 10px;
    }
    .create-post{
    position:absolute;
    top: 200px; 
    right: 10px;
    height: 60px;
    width: 60px;   
    }
    .new-message-container{  
        margin: 20px;
    }
    .bloc-post{
        display: flex;
        flex-direction: column;
        text-align: justify;
        justify-content: space-between;
        align-items: center;
    } 
    .post-text{
        margin-top:30px;
        margin-left:0;
    }  
}
</style>

