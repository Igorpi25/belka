<template>
  <div></div>
</template>

<script>
export default {
  created () {
    // for redirect in same window
    // this.$notify({
    //   color: 'primary',
    //   text: 'Идет авторизация через google.',
    //   name: 'social-signin-info'
    // })
    // if (window.opener) {
    //   // TODO check state query param?
    //   const finishGoogleSigninEvent = new CustomEvent('googlesignin', { detail: this.$route.query.code })
    //   window.opener.dispatchEvent(finishGoogleSigninEvent)
    // }
  },
}
</script>
