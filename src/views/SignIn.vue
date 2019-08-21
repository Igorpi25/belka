<template>
  <div>
    <h1>Lig In</h1>
    <form ref="form">
      <input v-model="formModel.login" type="email" required placeholder="Email">
      <input v-model="formModel.password" type="password" required minlength="8" placeholder="Password">
      <button @click.prevent="onSubmit">
        Submit
      </button>
    </form>
    <div>
      Info: {{ infoMessage }}
    </div>
    <div>
      Error: <span class="error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      loading: false,
      infoMessage: '',
      errorMessage: '',
      showPassword: false,
      formModel: {
        login: '',
        password: '',
      },
    }
  },
  mounted () {
    // TODO check federation for text message
    if (this.$route.query.code && this.$route.query.state) {
      this.infoMessage = 'Идет авторизация через google.'
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loading = true
        this.errorMessage = ''
        const isValid = this.$refs.form && this.$refs.form.checkValidity()
        if (isValid) {
          const user = await this.$Amplify.Auth.signIn(this.formModel.login, this.formModel.password)
          // eslint-disable-next-line
          console.log(user)
          this.$store.commit('setUser', user)
          this.$router.push({ name: 'home' })
        } else {
          this.errorMessage = 'Ошибка валидации'
        }
      } catch (error) {
        this.errorMessage = error.message || error
        throw new Error(error)
      } finally {
        this.loading = false
      }
    },
  }
}
</script>
