import Vue from 'vue'
import Amplify, { Hub, I18n, Logger } from '@aws-amplify/core'
import Auth, { AuthClass } from '@aws-amplify/auth'
import API, { APIClass, graphqlOperation } from '@aws-amplify/api'
import PubSub, { PubSubClass } from '@aws-amplify/pubsub'
import { AmplifyPlugin, components } from 'aws-amplify-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import awsconfig from './aws-exports'
import vuetify from './plugins/vuetify'

Vue.use(AmplifyPlugin, {
  Auth,
  AuthClass,
  Hub,
  I18n,
  Logger,
  API,
  APIClass,
  PubSub,
  PubSubClass,
  graphqlOperation
})
Vue.component('amplify-connect', components.Connect)

Amplify.configure(awsconfig)

// log level for Logger
window.LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'WARN' : 'INFO'

const localDate = (dateString, format) => {
  if (!dateString) return ''
  const d = new Date(dateString)
  if (!(d instanceof Date)) return ''
  const locale = process.env.VUE_APP_I18N_LOCALE || 'ru'
  let options = {}
  switch (format) {
    case 'long':
      options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      break
    case 'short':
      options = { month: 'long', day: 'numeric' }
      break
    case 'time':
      options = { hour: '2-digit', minute: '2-digit' }
      break
    default:
      options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      break
  }
  return d.toLocaleString(locale, options)
}

Vue.filter('localDate', localDate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
