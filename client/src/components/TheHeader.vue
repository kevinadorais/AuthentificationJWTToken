<template>
  <div class="container-header d-flex flex-row justify-content-center w-100 align-items-center p-5">
    <router-link to='/'>TestJWT</router-link>
    <div class="flex-fill"></div>
    <div v-if="!jwtToken && isLoggedIn === false" class="d-flex flex-row">
      <router-link to='/signin' class="mr-2">Connexion</router-link>
      <router-link to='/signup'>Inscription</router-link>
    </div>
    <div style="cursor:pointer;" v-if="jwtToken && isLoggedIn === true" class="d-flex flex-row" @click="signout">Deconnexion</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  components: {
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'jwtToken'])
  },
  methods: {
    signout() {
      this.$store.commit('user/signout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.container-header{
  background-color: #1B1464;
  color: white;
}
a{
  color: white;
  text-decoration: none;
}
a:hover{
  color: #FFC312;
}
</style>