<template>
  <div id="app">
    <the-header></the-header>
    <div class="d-flex flex-column w-100">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  computed: {
    ...mapGetters('user', ['jwtToken'])
  },
  beforeMount() {
    if(this.jwtToken) {
      this.$store.dispatch('user/refreshToken') ;
    }
  },
  components: {
    TheHeader,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.flex-fill{
  flex: auto;
}
</style>
