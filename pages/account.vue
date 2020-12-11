<template>
  <div>
    <div>
      Account: {{ account }}
    </div>
    <div>
      Avatar: <img :src="avatar">
    </div>
    <div>
      Description: {{ description }}
    </div>
    <div>
      <button @click="logout">
        LOGOUT
      </button>
    </div>
  </div>
</template>

<script>
import { me } from '@/services/auth'

export default {
  async created() {
    if (!this.$store.state.authUser) {
      let res
      try {
        res = await me(this.$axios)
        if (res.status !== 200) {
          alert('get user me fail')
          return
        }
        // login success
      } catch (err) {
        alert('http request error')
        return
      }
      if (res.data) {
        this.$store.commit('setUser', res.data)
      }
    }
    this.account = this.$store.state.authUser.account
    this.avatar = this.$store.state.authUser.avatar
    this.description = this.$store.state.authUser.description
  },
  middleware: ['checkIsLogin'],
  data() {
    return {
      account: '',
      avatar: '',
      description: ''
    }
  },
  methods: {
    logout() {
      this.$auth.$storage.setCookie('authUser', null)
      window.location = '/'
    }
  }
}
</script>

<style>
</style>
