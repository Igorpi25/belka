import Vue from 'vue'
import Amplify, { Hub, I18n, Logger } from '@aws-amplify/core'
import Auth, { AuthClass } from '@aws-amplify/auth'
import API, { APIClass, graphqlOperation } from '@aws-amplify/api'
import { AmplifyPlugin, components } from 'aws-amplify-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import awsconfig from './aws-exports'
import vuetify from './plugins/vuetify'
// TODO ошибка errors
import * as AmplifyModules from 'aws-amplify'

Vue.use(AmplifyPlugin, {
  Auth,
  AuthClass,
  Hub,
  I18n,
  Logger,
  API,
  APIClass,
  graphqlOperation
})
Vue.component('amplify-connect', components.Connect)

Amplify.configure(awsconfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created () {
    // eslint-disable-next-line
    console.log('AmplifyModules', AmplifyModules)
  },
  render: h => h(App)
}).$mount('#app')
