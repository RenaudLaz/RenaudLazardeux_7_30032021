<template>
    <div>
        <div v-for="commentaire in commentaires" :key="commentaire.commentaireId">
            <div class="commentaire">
                <div class="ecrivain">
                    <span> {{commentaire.User.lastName}} {{commentaire.User.firstName}} </span>
                </div>

                <div class="contenu">
                    <p>{{commentaire.text}}</p>
                </div>

                <div class="ecrivain-boutons" v-if="userId == commentaire.userId || statut == 'admin'">
                    <button v-on:click="deleteCommentaire(commentaire.id)">Supprimer</button>
                </div>
            </div>
        </div>
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
            }
        },

        methods: {
            // supprimer un commentaire
            deleteCommentaire(commentId) {                
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
</style>