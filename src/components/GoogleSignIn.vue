<template>
  <div>
    <button @click.prevent="signIn">
      Google Sign In
    </button>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
// import awsconfig from '@/aws-exports'

const CLIENT_ID = '608967944605-upablqhsus4618t5ut0mdecc122gumvk.apps.googleusercontent.com'

export default {
  name: 'GoogleSignIn',
  created () {
    const ga = window.gapi && window.gapi.auth2
      ? window.gapi.auth2.getAuthInstance()
      : null
    if (!ga) this.createScript()
    // this.googleSignIn()
    // const { domain, scope, responseType } = awsconfig.oauth
    // const clientId = awsconfig.aws_user_pools_web_client_id
    // const identityProvider = 'Google'
    // const state = 'STATE' // this.generateRandom(64)
    // // const pkceKey = this.generateRandom(128)
    // const codeChallenge = 'X4O5AzsVJMPwV8eDQUWe8FyCT5hB9COnjDqLpPQgmG8' // this.generateChallenge(pkceKey)
    // const codeChallengeMethod = 'S256'
    // const redirectSignIn = 'http://localhost:8080/finish-google-signin/'
    // const redirectUri = `
    //   https://${domain}/oauth2/authorize?redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}&identity_provider=${identityProvider}&scopes=${scope.join()}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}
    // `
    // window.location.href = redirectUri
  },
  methods: {
    async googleSignIn () {
      try {
        const credentials = await Auth.federatedSignIn({ provider: 'Google' })
        // eslint-disable-next-line
        console.log(credentials)
      } catch (error) {
        const message = error.message || error
        throw new Error(message)
      }
    },
    signIn () {
      const ga = window.gapi.auth2.getAuthInstance()
      ga.signIn({ prompt: 'select_account' }).then(
        googleUser => {
          this.getAWSCredentials(googleUser)
        },
        error => {
          console.log(error)
          if (error.error === 'popup_closed_by_user') {
            console.log('Popup closed by user')
          } else {
            console.log(error)
          }
        }
      )
    },
    async getAWSCredentials (googleUser) {
      const { id_token, expires_at } = googleUser.getAuthResponse()
      const profile = googleUser.getBasicProfile()
      let user = {
        email: profile.getEmail(),
        name: profile.getName()
      }

      console.log('expires_at', expires_at)

      const credentials = await Auth.federatedSignIn(
        'google',
        {
          token: id_token,
          expires_at
        },
        user
      )
      console.log('credentials', credentials)
    },
    createScript () {
      // load the Google SDK
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/platform.js'
      script.async = true
      script.onload = this.initGapi
      document.body.appendChild(script)
    },
    initGapi () {
      // init the Google SDK client
      const g = window.gapi
      g.load('auth2', function () {
        g.auth2.init({
          client_id: CLIENT_ID,
          // authorized scopes
          scope: 'profile email openid'
        })
      })
    }
    // randomBytes (nBytes) {
    //   return Buffer.from((CryptoJS.lib.WordArray.random(nBytes)).toString(), 'hex')
    // },
    // generateChallenge (code) {
    //   return this.base64URL(SHA256(code))
    // },
    // base64URL (string) {
    //   return string.toString(Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    // },
    // generateRandom (size) {
    //   const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    //   const buffer = new Uint8Array(size)
    //   if (typeof window !== 'undefined' && !!(window.crypto)) {
    //     window.crypto.getRandomValues(buffer)
    //   } else {
    //     for (let i = 0; i < size; i += 1) {
    //       buffer[i] = (Math.random() * CHARSET.length) | 0
    //     }
    //   }
    //   return this.bufferToString(buffer)
    // },
    // bufferToString (buffer) {
    //   const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    //   const state = []
    //   for (let i = 0; i < buffer.byteLength; i += 1) {
    //     const index = buffer[i] % CHARSET.length
    //     state.push(CHARSET[index])
    //   }
    //   return state.join('')
    // }
  },
}
</script>
