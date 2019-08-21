<template>
  <div>
    <h1>Restore password</h1>
    <form ref="form">
      <input v-model="formModel.email" type="email" required placeholder="Email">
      <button @click.prevent="onSubmit">
        Submit
      </button>
    </form>
    <div>
      Error: <span class="error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestorePassword',
  data() {
    return {
      loading: false,
      errorMessage: '',
      showPassword: false,
      showConfirmPassword: false,
      formModel: {
        email: '',
      },
      confirmRules: [
        v => (v && v === this.formModel.password) || 'Введенные пароли не совпадают.'
      ]
    }
  },
  methods: {
   async onSubmit (e) {
      try {
        e.preventDefault()
        this.loading = true
        this.errorMessage = ''
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          const response = await this.$Amplify.Auth.forgotPassword(this.formModel.email)
          this.$router.push({ name: 'home' })
          // eslint-disable-next-line
          console.log('Submit', response)
        }
      } catch (error) {
        this.errorMessage = error.message || error
        throw new Error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
