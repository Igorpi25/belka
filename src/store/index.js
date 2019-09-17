import Vue from 'vue'
import Vuex from 'vuex'

import waybill from './modules/waybill'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    initialized: false
  },

  getters: {
    loggedIn (state) {
      return state.user && state.initialized
    },
    username (state) {
      return state.user && state.user.username
    }
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    init (state) {
      state.initialized = true
    }
  },

  actions: {
    async checkAuth ({ state, commit }) {
      try {
        // eslint-disable-next-line
        console.log('Check auth from store', state.initialized, state.user)
        if (state.initialized) {
          return true
        } else {
          const user = await this._vm.$Amplify.Auth.currentAuthenticatedUser()
          commit('setUser', user)
          commit('init')
        }
      } catch (error) {
        if (error === 'not authenticated') {
          // eslint-disable-next-line
          console.log(error)
        } else {
          throw new Error(error)
        }
      }
    }
  },

  modules: {
    waybill
  },

  strict: process.env.NODE_ENV !== 'production'
})
