<template>
    <div class="wall">
        <div class="pen">
            <button v-on:click="showNewMessageContainer" class="create-post"><i class="fas fa-pen"></i></button>
        </div>
<!--  Bloc de création message  -->
        <div class="new-message-container" v-if="isVisbleMessageContainer">
            <form v-on:submit.prevent="publishNewMessage">
                <textarea v-model="newMessage" class="" name="message" id="text" placeholder="Entrez votre message"/>   
                <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
                <input type="file" @change="onFileSelected" accept="images/*">       
            </form>
            <div class="button-publish">
                <button v-on:click="cancelNewNessage" class="button-type cancel-post">Annuler</button>
                <button v-on:click="publishNewMessage" type="submit" class="button-type publish-post">Publier</button>    
            </div>
        </div>
<!--  Bloc de création message  -->

<!--  Bloc d'un message  -->
        <section class="wall-container">
            <article v-for="post in posts" :key="post.id" class="wall-container-messages">
                <div class="bloc-author">
                    <span class="bloc-author-name"> {{ post.User.firstName }} {{ post.User.lastName }} </span>
                    <span class="bloc-author-avatar">    
                        <img v-if="post.User.avatar" :src="post.User.avatar" :alt="'avatar de ' + post.User.lastName + post.User.firstName" class="avatar"/>
                        <i v-if="post.User.avatar == null || post.User.avatar == ''" class="fa fa-user-astronaut avatar"></i>
                    </span>
                </div>
                <div class="bloc-post">
                    <span class="bloc-post-image"> 
                        <img :src="post.imageURL"/> 
                    </span>
                    <span class="bloc-post-text"> 
                        {{ post.text }} 
                    </span> <br/>
                </div>  
<!--  Bloc d'un message  -->
                <div v-if="modifId != 'modifSection-' + post.id" class="contenu">
                    <img :src="post.imagURL" style="max-width: 100%" />
                </div>
                <div>
                    <form :postId="post.id" v-if="modifId == 'modifSection-' + post.id" v-on:submit.prevent="modifPost(post)">
                        <textarea v-model="post.text" class="" name="message" id="message"/>    
                        <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
                        <input type="file" @change="onFileSelected" accept="image/*">       
                        <button type="submit">Publier</button>
                    </form>
                </div>
<!--  Bloc des boutons  -->
                <div class="button">
                    <div class="button-commentary">
                        <button class="button-commentary-reply" v-on:click="repondre('replyForm-' + post.id)">Répondre</button>
                        <button class="button-commentary-seen" v-on:click="voir('commentSection-' + post.id)">Voir les commentaires</button>
                    </div>
                    <div class="button-like">
                        <button class="button-like-hand" v-on:click="likePost(post.id)" v-if="like=true" >
                            <i class="far fa-thumbs-up button-like-empty"></i>
                            <i class="fas fa-thumbs-up button-like-full"></i>
                            <i class="fas fa-thumbs-up calque"></i>
                        </button>
                        <div class="button-like-count">
                            <span v-if="post.likes > 0" class="button-like-count-number">{{ post.likes }}</span>
                        </div>
                    </div>
                    <div class="button-author">
                        <button class="button-author-update" v-if="userId == post.userId" v-on:click="modifPostBouton('modifSection-' + post.id)">Modifier</button>
                        <button class="button-author-delete" v-if="userId == post.userId || statut == 'admin'" v-on:click="deletePost(post.id)">Supprimer</button>
                    </div>
                </div>
<!--  Bloc des boutons  -->
                <Commentaire :postId="post.id" :commentaires="commentaires" v-if="commentSectionId == 'commentSection-' + post.id"/>
            </article>
        </section>
    </div>
</template>


<script>
    import axios from 'axios'
    import Commentaire from '@/components/Commentaire.vue'


    export default {
        name: 'Wall',
        components: {   
            Commentaire,
        },
        props: {
        },
        data() {
            return {
                isVisbleMessageContainer: false,
                //identification
                userId: localStorage.getItem('userId'),
                statut: localStorage.getItem('statut'),
                newMessage: '',
                user: {},
                posts: [],
                post: '',
                imageURL: '',
                //affichage commentaire
                commentaires: [],
                imagePreview:'',
                //bouton
                boutonVoir: false,
                filter: 'all',
                replyFormId: '',
                likeFormId: '',
                commentSectionId: '',
                modifId: '',
                //likes
                postLikes: []
            }
        },
        methods: {
            onFileSelected(event) {
                this.imageURL = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.imageURL);
            },
            publishNewMessage() {    
                const formData = new FormData();
                formData.append("text", this.newMessage);
                formData.append("image", this.imageURL);
                formData.append("userId", localStorage.getItem('userId'));

                console.log(formData)

                axios.post('http://localhost:3000/api/post', formData, {  
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                            'Content-Type' : 'application/json'
                        }
                    }
                )
                .then(response => {
                    this.newMessage = response.data;
                    window.location.reload();
                })
                .catch(() => {console.log('Erreur à la publication du message')}) 
            },
            showNewMessageContainer() {
                this.isVisbleMessageContainer = !this.isVisbleMessageContainer
            },
            cancelNewMessage() {
                this.newMessage = ''
                this.isVisbleMessageContainer = false;
            }, 
                        modifPost(post) {    
                const formData = new FormData();                
                formData.append("userId", this.userId);
                formData.append("text", post.text);
                formData.append("image", this.imageURL);


                axios.put('http://localhost:3000/api/post/' + post.id, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    window.location.reload()}
                )
                .catch(() => {this.messError = 'Une erreur s\'est produite'})
            },

            // supprimer post
            deletePost(id) {
                const postId = id;

                axios.delete('http://localhost:3000/api/post/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {console.log('Impossible de supprimer le message')})
            },   
            //like
            likePost(postId) {
                //rechercher les likes avec le postID
                axios.get('http://localhost:3000/api/post/' + postId + '/like', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {this.postLikes = response.data;
                        axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                            like: this.like,
                        },{
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(() => {window.location.reload()})
                        .catch(() => {console.log('Une erreure s\'est produite')})
                })
                .catch(() => {console.log('Erreur à la création du like')})
            },
            // afficher les commentaires
            voir(sectionId) {
                this.commentSectionId = sectionId;
                this.boutonVoir = !this.boutonVoir
                
                const postId = sectionId.replace('commentSection-', '');

                axios.get('http://localhost:3000/api/commentaire/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {this.commentaires = response.data;})
                .catch(() => {console.log('Impossible d\'afficher les commentaires')})
            },
            //bouton
			modifPostBouton(postModifSection){
                if (this.modifId == postModifSection) {
                    this.modifId = ''
                } else {
                    this.modifId = postModifSection
                }
            },            
            repondre(replyFormId) {
                this.replyFormId = replyFormId
            },
            applyFilter(filter) {
                this.filter = filter
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
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {this.user = response.data;})
            .catch(() => {console.log('Erreur au chargement de l\'utilisateur')})
        }
    }
</script>


<style scoped lang="scss">
//variables de couleurs
$primaryColor: #081E42;
$secondaryColor: #B84D54;

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
.fas{
    font-size: 2em;
    color: #081E42;
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
button{
    background-color: #B84D54;
    color: #FFF;
    margin: 15px auto;
    border-radius: 1em;
    justify-content: space-around;
    font-size: 1.2em;
    width: 130px;
    height: 50px;
    &-like{
        background-color: #fff;
    }
}
.button{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto 15px;
    align-items: baseline;
    &-like{
        display: flex;
        flex-direction: row;
        align-items: center;
        &-count{
            min-width: 30px;
            background-color: $secondaryColor;
            border-radius: 50%;
            &-number{
                font-size: 1.5em;
            }
        }
        &-hand{
            background-color: #FFF;
        }
        &-full{
            position: absolute;
            color: $secondaryColor;
            font-size: 1.7em;
            z-index: 1;
        }
        .calque{
            position: absolute;
            font-size: 1.7em;
            z-index: 2;
            color: white;
            background-color: white;
            transition: transform 1s;
            transform-origin: center top;
        }
        &-empty{
            position: absolute;
            color: $primaryColor;
            background-color: transparent;
            font-size: 1.7em;
            z-index: 3;
        &:hover + .calque{
            transform: scaleY(0);
        }
        &:hover{
            opacity: 0;
        }
    }
    }
    &-publish{
        display: flex;
        justify-content: space-around;
    }
    &-author, &-commentary{
        display: flex;
        flex-direction: row;
        width: 30%;
        &-update, &-delete{
            background-color: $primaryColor;
        }
    }
}
.new-message-container{  
    margin: 40px 0 0 40px;
    background-color: #081E42;
    height: auto;
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
    &-messages {
        color: white;
        background-color: #fff;
        border: #B84D54 4px solid;
        border-radius: 1.5em;
        margin: 35px 35px 50px 35px;
    }
}
.bloc-post{
    margin: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-text{
        margin-left: 30px;
        color: #000;
        text-align: justify;
        font-size: 1.6em;
    }
    img{
        max-width: 400px;
    }
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
    &-name {
        font-weight: bolder;
        font-size: 1.5em;
        color: #FFF;
        background-color: #081E42;
    }
    .avatar, .fa-user-astronaut{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #B84D54;
    }
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
    img{
        max-width: 100%;
    }
    .button{
        flex-direction: column;
        margin: 0;
    &-author, &-commentary{
        align-items: center;
    }
}
}
</style>

