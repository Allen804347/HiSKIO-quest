import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: () => ({
      authUser: null
    }),
    mutations: {
      setUser(state, user) {
        console.info('setUser has been called')
        state.authUser = user
      }
    }
  })

export default store