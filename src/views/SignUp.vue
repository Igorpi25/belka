<template>
  <v-container>
    <h1>Register</h1>
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
          v-model="firstName"
          :rules="[v => !!v || 'First name is required']"
          label="First name"
          required
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :rules="[v => !!v || 'Last name is required']"
          label="Last name"
          required
        ></v-text-field>
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
          @click="onSubmit"
        >
          Submit
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      loading: false,
      error: false,
      errorMessage: '',
      showPassword: false,
      valid: false,
      firstName: '',
      lastName: '',
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
          const response = await this.$Amplify.Auth.signUp({
            username: this.email,
            password: this.password,
            attributes: {
              family_name: this.lastName,
              given_name: this.firstName,
              email: this.email
            }
          })
          this.$router.push({ name: 'home' })
          // eslint-disable-next-line
          console.log(response)
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
    }
  }
}
</script>
