import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "require-auth" */ '@/views/Home.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "require-not-auth" */ '@/views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "require-not-auth" */ '@/views/SignUp.vue')
    },
    {
      path: '/restore-password',
      name: 'restore-password',
      component: () => import(/* webpackChunkName: "require-not-auth" */ '@/views/RestorePassword.vue')
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import(/* webpackChunkName: "require-not-auth" */ '@/views/ChangePassword.vue')
    },
    {
      path: '/email-confirm',
      name: 'email-confirm',
      beforeEnter: (to, from, next) => {
        if (to.query.username) {
          if (to.query.state === 'success') {
            alert('Email confirmed')
          } else if (to.query.state === 'confirmed') {
            alert('Email already confirmed')
          } else if (to.query.state === 'error') {
            alert(to.query.message)
            // Add message to Analytics
          }
        }
        next('/')
      }
    },
    {
      path: '/start-google-signin',
      component: () => import(/* webpackChunkName: "google-signin-start" */ './views/GoogleSignInStart.vue')
    },
    {
      path: '/finish-google-signin',
      component: () => import(/* webpackChunkName: "google-signin-finish" */ './views/GoogleSignInFinish.vue')
    },
  ]
})
