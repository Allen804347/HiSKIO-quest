<template>
  <div class="container">
    <div>
      <span>account</span>
      <input v-model="account" />
    </div>
    <br>
    <div>
      <span>password</span>
      <input v-model="password" type="password"/>
    </div>
    <br>
    <input type="submit" @click="submit"/>
  </div>
</template>

<script>
import { login } from '@/services/auth'

export default {
  middleware: ['checkIsLogin'],
  data () {
    return {
      account: 'account',
      password: 'password'
    }
  },
  methods: {
    async submit() {
      let res
      try {
        res = await login(this.$axios, { account: this.account, password: this.password})
        if (res.status !== 200) {
          alert('login fail')
          return
        }
        // login success
      } catch (err) {
        alert('http request error')
        return
      }
      if (res.data) {
        const now = new Date();
        const time = now.getTime();
        res.data.expires_in = time + (7 * 24 * 60 * 60 * 1000);
        this.$auth.$storage.setCookie('authUser', res.data)
        window.location = '/account'
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
