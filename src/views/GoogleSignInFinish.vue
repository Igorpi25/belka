<template>
  <div></div>
</template>

<script>
export default {
  created () {
    // for redirect in same window
    console.log('Идет авторизация через google.')
    // if (window.opener) {
    //   // TODO check state query param?
    //   const finishGoogleSigninEvent = new CustomEvent('googlesignin', { detail: this.$route.query.code })
    //   window.opener.dispatchEvent(finishGoogleSigninEvent)
    // }
  },
}
</script>
