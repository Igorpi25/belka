<template>
  <div>
    <h1>Change password</h1>
    <form ref="form">
      <input v-model="formModel.code" type="tel" required placeholder="Code">
      <input v-model="formModel.email" type="email" required placeholder="Email">
      <input v-model="formModel.password" type="password" required placeholder="New password">
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
  name: 'ChangePassword',
  data() {
    return {
      loading: false,
      errorMessage: '',
      showPassword: false,
      showConfirmPassword: false,
      formModel: {
        email: '',
        code: '',
        password: '',
        passwordConfirm: ''
      },
      confirmRules: [
        v => (v && v === this.formModel.password) || 'Введенные пароли не совпадают.'
      ]
    }
  },
  mounted () {
    this.formModel.email = this.$route.query.email || ''
    this.formModel.code = this.$route.query.code || ''
  },
  methods: {
   async onSubmit (e) {
      try {
        e.preventDefault()
        this.loading = true
        this.errorMessage = ''
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          const response = await this.$Amplify.Auth.forgotPasswordSubmit(
            this.formModel.email,
            this.formModel.code,
            this.formModel.password
          )
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
