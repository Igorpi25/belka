<template>
  <v-container>
    <h1>Log In</h1>
    <v-slide-y-transition>
      <v-alert
        v-if="error"
        type="error"
        color="red"
        dismissible
      >
        {{ errorMessage }}
      </v-alert>
    </v-slide-y-transition>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          :loading="loading"
          :ripple="false"
          color="primary"
          class="mr-4"
          @click="onSubmit"
        >
          Submit
        </v-btn>
        <!-- <span>or</span> -->
        <!-- <GoogleSignIn class="ml-4" /> -->
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
// import GoogleSignIn from '@/components/GoogleSignIn.vue'

export default {
  name: 'SignIn',
  components: {
    // GoogleSignIn
  },
  data () {
    return {
      loading: false,
      error: false,
      errorMessage: '',
      showPassword: false,
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 8) || 'Password must be more than 7 characters',
      ],
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loading = true
        this.closeError()
        if (this.$refs.form.validate()) {
          const user = await this.$Amplify.Auth.signIn(this.email, this.password)
          // eslint-disable-next-line
          console.log(user)
          this.$store.commit('setUser', user)
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        this.error = true
        this.errorMessage = error.message || error
        throw new Error(error)
      } finally {
        this.loading = false
      }
    },
    closeError () {
      this.error = false
      this.errorMessage = ''
    },
    async googleSignIn () {
      try {
        const credentials = await this.$Amplify.Auth.federatedSignIn({ provider: 'Google' })
        // eslint-disable-next-line
        console.log(credentials)
      } catch (error) {
        this.errorMessage = error.message || error
        throw new Error(error)
      }
    }
  }
}
</script>
