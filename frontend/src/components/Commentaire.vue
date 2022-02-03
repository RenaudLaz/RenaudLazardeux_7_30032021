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

                <div class="commentary-button" v-if="userId == commentaire.userId || statut == 'admin'">
                    <button v-on:click="deleteCommentary(commentaire.id)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
    <div class="writingComm">
        <form>
            <textarea v-model="text" class="" name="message" id="message" placeholder="Exprimez vous"/>
            <button v-on:click="createCommentary" type="submit">Publier</button>
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
.commentary
{
    border: solid 3px #091F43;
    border-radius: 20px;
    margin: 3%;
    padding: 3%;
    &-author
    {
        display: flex;
        align-items: center;
        span
        {
            margin-left: 3%;
            color: #D1515A;
            font-weight: bold;
            font-size: 1.5em;
        }
    }
    &-text
    {
        background: #091f4312;
        border-radius: 20px;
        padding: 3%;
        margin-top: 3%;
    }
}
 .writingComm
    {
        margin: 3%;
        margin-top: 5%;
        form
        {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: solid 3px #D1515A;
            border-radius: 20px;
            padding: 3%;
            width: 93%;
            textarea
            {
                width: 98%;
                height: 150px;
            }
            img
            {
                width: 100%;
            }
            button
            {
                border-radius: 30px;
                box-shadow: 0px 3px 5px #091F43;
                width: 50%;
                font-size: 1.5em;
                color: #D1515A;
                margin-top: 3%;
                margin-left: 25%;
            }
        }
    }
</style>