<template>
  <div class="container d-flex flex-column">
    <div>Email : {{ user.email }}</div>
    <div>Pseudo : {{ user.username }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
  },
  computed: {
    ...mapGetters('user', { user: 'currentUser' })
  }
}
</script>

<style scoped>

</style>