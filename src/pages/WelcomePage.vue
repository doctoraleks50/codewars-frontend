<template>
  <div class="greetings">
      <h1>{{greetingsText}}</h1>
      <login-button></login-button>
  </div>
</template>

<script>
import LoginButton from '../components/LoginButton'
import { mapState } from 'vuex'

export default {
  name: 'login',
  components: {
    LoginButton
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    greetingsText () {
      return this.isUserLoggedIn ? 'Good bye ;)' : 'Welcome to Codewars!'
    }
  }
}

</script>

<style>
.greetings {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
