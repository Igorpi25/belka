import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: '/restore-password',
      name: 'restore-password',
      component: () => import('@/views/RestorePassword.vue')
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/views/ChangePassword.vue')
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
      component: () => import('./views/GoogleSignInStart.vue')
    },
    {
      path: '/finish-google-signin',
      component: () => import('./views/GoogleSignInFinish.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  // check amplify auth, for init
  await store.dispatch('checkAuth')
  const loggedIn = store.getters.loggedIn
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!loggedIn) {
      next({
        name: 'signin'
      })
    } else {
      next()
    }
  } else {
    next() // всегда так или иначе нужно вызвать next()!
  }
})

export default router
