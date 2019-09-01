<template>
  <v-container>
    <h1>Change password</h1>
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
          v-model="password"
          label="Password"
          type="password"
          required
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          :rules="[...passwordRules, ...confirmPasswordRules]"
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
  name: 'ChangePassword',
  data() {
    return {
      loading: false,
      error: false,
      errorMessage: '',
      showPassword: false,
      showConfirmPassword: false,
      valid: false,
      email: '',
      code: '',
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 8) || 'Password must be more than 7 characters',
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        v => (v && v === this.password) || 'Passwords not match'
      ]
    }
  },
  mounted () {
    this.email = this.$route.query.email || ''
    this.code = this.$route.query.code || ''
  },
  methods: {
   async onSubmit () {
      try {
        this.loading = true
        this.closeError()
        if (!this.code || !this.email) {
          throw new Error('Code or email required')
        }
        if (this.$refs.form.validate()) {
          const response = await this.$Amplify.Auth.forgotPasswordSubmit(
            this.email,
            this.code,
            this.password
          )
          this.$router.push({ name: 'home' })
          // eslint-disable-next-line
          console.log('Submit', response)
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
  }
}
</script>
