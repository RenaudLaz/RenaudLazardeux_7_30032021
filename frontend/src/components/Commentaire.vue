<template>
    <div>
        <div v-for="commentaire in commentaires" :key="commentaire.commentaireId">
            <div class="commentary">
                <div class="commentary-author">
                    <span> {{commentaire.User.lastName}} {{commentaire.User.firstName}} </span>
                </div>

                <div class="commentary-text">
                    <p>{{commentaire.text}}</p>
                </div>

                <div v-if="userId == commentaire.userId || statut == 'admin'">
                    <button class="commentary-button" v-on:click="deleteCommentary(commentaire.id)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
    <div class="writingComm">
        <form>
            <textarea v-model="text" class="" name="message" id="message" placeholder="Exprimez vous"/>
            <button v-on:click="createCommentary" type="submit"><i class="fas fa-check-circle"></i></button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Commentaire',
        components: {
        },
        
        props: ['postId', 'commentaires'],
        
        data() {
            return {
                //identification
                userId: localStorage.getItem('userId'),
                statut: localStorage.getItem('statut'),

                text: ''
            }
        },
        
        methods: {
            // créer commentaire
            createCommentary() {
                axios.post('http://localhost:3000/api/commentaire/' + this.postId, {
                    text: this.text
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
            // supprimer un commentaire
            deleteCommentary(commentId) {                
                axios.delete('http://localhost:3000/api/commentaire/' + commentId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {console.log('Erreur à la suppression du commentaire')})
            }
        }
    }
</script>

<style scoped lang="scss">
$primaryColor: #081E42;
$secondaryColor: #B84D54;
.fas{
    font-size: 1.8em;
}
.commentary
{
    border: solid 3px $primaryColor;
    border-radius: 20px;
    margin: 3%;
    padding: 3%;
    background-color: $primaryColor;
    &-author
    {
        display: flex;
        align-items: center;
        background-color: $primaryColor;
        span
        {
            margin-left: 3%;
            color: $secondaryColor;
            font-weight: bold;
            font-size: 1.5em;
        }
    }
    &-text
    {
        background: $primaryColor;
        border-radius: 20px;
        padding: 3%;
        margin-top: 3%;
    }
    &-button{
        background-color: #B84D54;
        border: 1px #FFF solid;
        color: #FFF;
        margin: 15px auto;
        height: 40px;
        width: 100px;
        border-radius: 1em;
    }
}
.writingComm{
    margin: 3%;
    margin-top: 5%;
    form{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: $primaryColor;
        border: solid 3px $secondaryColor;
        border-radius: 20px;
        padding: 3%;
        width: 93%;
        textarea{
            width: 98%;
            background-color: #FFF;
            border-radius: 1em;
            padding: 10px;
            height: 150px;
            resize : none;
        }
        img{
            width: 100%;
        }
        button{
            background-color: $secondaryColor;
            border: 1px #FFF solid;
            color: #FFF;
            margin: 15px auto;
            height: 40px;
            width: 100px;
            border-radius: 1em;
        }
     }
}

@media (max-width: 900px){
    .writingComm{
        form{
            textarea{
                width: 92%;
            }
        }
    }
}

</style>