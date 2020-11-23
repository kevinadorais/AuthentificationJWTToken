<template>
  <div class="container d-flex flex-column justify-content-center align-items-center p-3">
    <h2>Inscription</h2>
      <form @submit="trySubmit" class="text-left w-50">
        <div class="form-group">
          <label>Email</label>
          <input class="form-control" v-model="form.email" type="email"/>
        </div>
        <div class="form-group">
          <label>Pseudo</label>
          <input class="form-control" v-model="form.username" type="text"/>
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input class="form-control" v-model="form.password" type="password"/>
        </div>
        <div class="form-group">
          <label>Verifier le Mot de passe</label>
          <input class="form-control" v-model="form.password2" type="password"/>
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
  name: 'Signup',
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
        password2: "",
      },
      errors: []
    }
  },
  computed: {
    ...mapGetters('user', ['isLoading'])
  },
  methods: {
    trySubmit(e) {
      e.preventDefault();
      if(this.isValid() && !this.isLoading){
        console.log(this.form)
        this.$store.dispatch('user/trySignup', this.form)
      }
    },
    isValid(){
      this.errors = [];
      if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.email)){
        this.errors.push('Email is not valid !')
      }
      if(!this.form.username){
        this.errors.push('Pseudo missing ! Pseudo need a minimum of 5 characters !')
      }
      else {
        if(this.form.username.length < 5){
          this.errors.push('Pseudo need a minimum of 5 characters !')
        }
      } 
      if(!this.form.password){
        this.errors.push('Mot de passe missing ! Mot de passe need a minimum of 5 characters !')
      }
      else {
        if(this.form.password.length < 5){
          this.errors.push('Mot de passe need a minimum of 5 characters !')
        }
      }
      if(this.form.password != this.form.password2) {
        this.errors.push('The 2 Mot de passe must be identical !')
      } 
      return this.errors.length === 0 ;
    }
  }
}
</script>

<style scoped>

</style>