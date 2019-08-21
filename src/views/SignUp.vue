<template>
  <div>
    <h1>Register</h1>
    <form ref="form">
      <input v-model="formModel.firstName" type="text" required placeholder="First name">
      <input v-model="formModel.lastName" type="text" required placeholder="Last name">
      <input v-model="formModel.email" type="email" required placeholder="Email">
      <input v-model="formModel.password" type="password" required minlength="8" placeholder="Password">
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
  name: 'SignUp',
  data() {
    return {
      loading: false,
      errorMessage: '',
      showPassword: false,
      formModel: {
        firstName: '',
        lastName: '',
        email: '',
        password: '' 
      }
    }
  },
  methods: {
   async onSubmit (e) {
      try {
        e.preventDefault()
        this.loading = true
        this.errorMessage = ''
        const isValid = this.$refs.form && this.$refs.form.checkValidity()
        if (isValid) {
          const { firstName, lastName, email, password } = this.formModel
          const response = await this.$Amplify.Auth.signUp({
            username: email,
            password,
            attributes: {
              family_name: lastName,
              given_name: firstName,
              email
            }
          })
          this.$router.push({ name: 'welcome' })
          // eslint-disable-next-line
          console.log(response)
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
