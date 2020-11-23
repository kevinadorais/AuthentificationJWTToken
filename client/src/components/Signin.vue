<template>
  <div class="container d-flex flex-column justify-content-center align-items-center p-3">
    <h2>Connexion</h2>
      <form @submit="trySubmit" class="text-left w-50">
        <div class="form-group">
          <label>E-mail</label>
          <input class="form-control" v-model="form.email" type="text"/>
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input class="form-control" v-model="form.password" type="password"/>
        </div>
        <ul v-if="errors.length">
          <li class="text-danger" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <button class="btn btn-primary" :class="{ 'disabled' : isLoading }">Valider</button>
      </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' ;

export default {
  name: 'Signin',
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isLoading']),
    ...mapGetters('user', ['errors'])
  },
  methods: {
    trySubmit(e) {
      e.preventDefault();
      if(this.isValid()){
        if(!this.isLoading){
          this.$store.dispatch('user/trySignin', this.form)
        }
      }
    },
    isValid(){
      return true ;
    }
  }
}
</script>

<style scoped>

</style>