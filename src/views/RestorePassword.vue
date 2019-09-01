<template>
  <v-container>
    <h1>Restore password</h1>
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
          label="E-mail"
          type="email"
          required
          :rules="emailRules"
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
  name: 'RestorePassword',
  data() {
    return {
      loading: false,
      error: false,
      errorMessage: '',
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
   async onSubmit () {
      try {
        this.loading = true
        this.closeError()
        if (this.$refs.form.validate()) {
          const response = await this.$Amplify.Auth.forgotPassword(this.email)
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
