<template>
    <div>
      <button class="login-button">
        <a v-bind:href = buttonProperties.link><span>{{buttonProperties.buttonName}}</span></a>
      </button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'LoginButton',
  methods: {
    ...mapActions('auth', ['isSessionExist'])
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    buttonProperties () {
      return {
        link: this.isUserLoggedIn ? 'http://cm.codewars.ua/api/v1/auth/logout' : 'http://cm.codewars.ua/api/v1/auth/google',
        buttonName: this.isUserLoggedIn ? 'LOGOUT' : 'LOGIN'
      }
    }
  },
  created () {
    this.isSessionExist()
  }
}

</script>

<style scoped>
.login-button {
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.login-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.login-button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.login-button:hover span {
  padding-right: 25px;
}

.login-button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
