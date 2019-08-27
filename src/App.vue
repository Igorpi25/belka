<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signin">SignIn</router-link> |
      <router-link to="/signup">SignUp</router-link> |
      <router-link to="/restore-password">Restore password</router-link> |
      <router-link to="/change-password">Change password</router-link>
    </div>
    <section>
      Logged In: {{ Number(isLoggedIn) }}
    </section>
    <section>
      <router-view/>
    </section>
  </div>
</template>

<script>
import { Hub } from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.loggedIn
    },
  },
  created () {
    this.$store.commit('init')
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          // eslint-disable-next-line
          console.log('Sign In From Hub', data.payload.data)
          Auth.currentAuthenticatedUser()
            .then(user => {
              this.$store.commit('setUser', user)
              this.$store.commit('init')
              this.$router.push({ name: 'home' })
            })
          // this.setState({authState: 'signedIn', authData: data.payload.data})
          break
        case 'signIn_failure':
          // eslint-disable-next-line
          console.log('Sign In fail From Hub', data.payload.data)
          // this.setState({authState: 'signIn', authData: null, authError: data.payload.data})
          break
        default:
          break
      }
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
form > * {
  margin: 10px 20px;
}
section {
  padding: 20px 30px;
}
.error {
  color: red;
}
</style>
