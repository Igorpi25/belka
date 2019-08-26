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
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Home.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/restore-password',
      name: 'restore-password',
      component: () => import('./views/RestorePassword.vue')
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('./views/ChangePassword.vue')
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
  ]
})
