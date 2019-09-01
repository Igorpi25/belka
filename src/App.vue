<template>
  <v-app>
    <v-app-bar
      app
      flat
      dense
      dark
    >
      <v-toolbar-title class="headline">
        Zennnn
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <div
          v-for="(item, i) in items"
          :key="item.to"
          :class="['d-flex align-center', { 'pr-2': i + 1 < items.length }]"
        >
          <router-link
            class="white--text"
            :to="item.to"
          >
            {{ item.text }}
          </router-link>
        </div>
      </v-toolbar-items>
      <v-menu
        v-if="isLoggedIn"
        left
        bottom
        offset-y
        min-width="160"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            class="ml-2"
            :ripple="false"
            v-on="on"
          >
            <v-icon>{{ icons.mdiAccount }}</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-subheader>{{ username }}</v-subheader>
          <v-list-item
            @click="signOut"
          >
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-else
        small
        depressed
        color="primary"
        class="ml-2"
        :ripple="false"
        to="/signin"
      >
        Sign In
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mdiAccount } from '@mdi/js'

export default {
  data () {
    return {
      icons: {
        mdiAccount
      },
    }
  },
  computed: {
    items () {
      return this.isLoggedIn
        ? [
          { to: '/', text: 'Home' },
        ]
        : [
          { to: '/restore-password', text: 'Restore password' },
          { to: '/change-password', text: 'Change password' },
          { to: '/signup', text: 'Sign Up' },
        ]
    },
    username () {
      const user = this.$store.state.user || {}
      const attributes = user.attributes || {}
      let name = attributes.given_name || ''
      return attributes.family_name
        ? `${name} ${attributes.family_name}`
        : name
    },
    isLoggedIn () {
      return this.$store.getters.loggedIn
    },
  },
  created () {
    this.$Amplify.Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          // eslint-disable-next-line
          console.log('Sign In From Hub', data.payload.data)
          this.$Amplify.Auth.currentAuthenticatedUser()
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
  methods: {
    async signOut () {
      await this.$Amplify.Auth.signOut()
      this.$store.commit('setUser')
      this.$router.push('/signin')
    }
  }
}
</script>

<style>
.w-full {
  width: 100%;
}
</style>
