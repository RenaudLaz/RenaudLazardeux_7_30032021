<template>
    <div class="wall">
<!--  Bloc de création message  -->
        <div class="new-message-container">
            <form v-on:submit.prevent="publishNewMessage">
                <textarea v-model="newMessage" class="" name="message" id="text" placeholder="Quoi de neuf?"/>   
                <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
                <label for="file-input">
                    <i class="fa-solid fa-image"></i>                
                </label>  
                <input id="file-input" type="file" @change="onFileSelected" accept="images/*">       
            </form>
            <div class="button-publish">
                <button v-on:click="cancelNewMessage" class="button-type cancel-post"><i class="fa-solid fa-xmark"></i></button>
                <button v-on:click="publishNewMessage" type="submit" class="button-type publish-post"><i class="fa fa-check"></i></button>    
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
                        <i v-if="post.User.avatar == null || post.User.avatar == ''"> <img  class="avatar" src="../assets/logos/photo.png"/> </i>
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
                        <button type="submit"><i class="fas fa-check-circle"></i></button>
                    </form>
                </div>
<!--  Bloc des boutons  -->
                <div class="button">
                    <div class="button-commentary">
                        <button class="button-commentary-seen" v-on:click="voir('commentSection-' + post.id)"><i class="far fa-comments"></i></button>
                    </div>
<!--test like
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
test like-->
                    <div class="button-author">
                        <button class="button-author-update" v-if="userId == post.userId" v-on:click="modifPostBouton('modifSection-' + post.id)"><i class="fas fa-pen"></i></button>
                        <button class="button-author-delete" v-if="userId == post.userId || statut == 'admin'" v-on:click="deletePost(post.id)"><i class="fas fa-trash-alt"></i></button>
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
                replyFormId: '',
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
            cancelNewMessage() {
                this.newMessage = '';
                window.location.reload();
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
                .catch(() => {console.log('Erreur à la modification du message')})
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
/*            //like
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
*/            // afficher les commentaires
            voir(sectionId) {
                if (this.commentSectionId == sectionId) {
                    this.commentSectionId = '';
                } else {
                    this.commentSectionId = sectionId;
                }
                // this.commentSectionId = sectionId;
                // this.boutonVoir = !this.boutonVoir;
               
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


#preview{
    width: 80%;
}
.fas, .far{
    font-size: 1.5em;
    color: $primaryColor;
    background-color: #FFF;
}
textarea{
    background-color: #FFF;
    resize : none;
    margin: 30px 0px 15px 0px;
    padding: 5px;
    border-radius: 1em;
    width: 97%;
    height: 100px;
    font-size: 1.2em;
}
label{
    color: #FFF;
}
input{
    color: #FFF;
    margin: 15px 0;
    border: solid $primaryColor;
}
button{
    color: #FFF;
    margin: 15px auto;
    border-radius: 50%;
    justify-content: space-around;
    font-size: 1.2em;
    width: 60px;
    height: 60px;
    &-like{
        background-color: #fff;
    }
}
.fa-xmark{
    font-size: 2em;
    color:red
}
.fa-check{
    font-size: 2em;
    color: green;
}
.fa-image{
    font-size: 3em;
    color: #FFF;
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
            background-color: $primaryColor;
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
            color: $primaryColor;
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
    }
}
.new-message-container{  
    margin-left: 10%;
    background: linear-gradient(315deg, rgba(255,255,255,1) 0%, rgba(8,30,66,1) 50%, rgba(255,255,255,1) 100%);
    height: auto;
    width: 80%;
    border: $primaryColor 1px solid;
    border-radius: 1.5em;
    display: flex;
    flex-direction: column;
}

.wall-container{
    background-color: #fff;
    position: absolute;
    margin-left: 20%;
    height: auto;
    width: 60%;
    &-messages {
        color: white;
        background-color: #fff;
        border: $primaryColor 4px solid;
        border-radius: 1.5em;
        margin: 10px;
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
    justify-content: space-between;
    padding: 0 10px ;
    height: 70px;
    border-radius: 1.2em 1.2em 0 0;
    border-bottom: 5px $primaryColor solid;
    &-name {
        font-weight: bolder;
        font-size: 1.5em;
        color: $primaryColor;
    }
    .avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid $primaryColor;
    }
}
form{
    z-index: 999;
    
    &>input{
        display: none;
    }
}
@media (max-width: 900px){
    textarea{
        margin: 10px;
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
        width: 100%;
    }
    .button{
        &-publish{
        display: flex;
        justify-content: center;
        }
        &-commentary{
        width: 33%;
        }
        &-author{
        width: 66%;
        }     
    }
}
</style>

