<template>
  <Header/>
    <div class="profil"> Mon profil
        <div class="resume-profil">
        <span class="profil-user"> {{ user.firstName }} {{ user.lastName }} </span>
        <span class="profil-avatar"> <img :src="user.avatar" class="avatar"/> </span>
        </div>
        <div class="connexion-profil">
            <div class="info-user">
                <h2>Mes informations de profil:</h2>
                <span>Email : {{ user.email }}</span><br/>
                <span>Mot de passe : **********</span><br/>
                <span>Statut : {{ user.statut }}</span><br/>
            </div>
        </div>
        <div class ="update-profil">
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'

    export default {
        name: 'Profile',
        components: {
            Header,
        },
        data() {
            return
        }       
    }
</script>

<style scoped lang="scss">
.profil{
    border: solid 2px #000;
    border-radius: 1.5em;
}

</style>

