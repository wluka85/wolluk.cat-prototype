<template lang="pug">
  v-container(fluid='')
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-5='')
        h1 Edit Password
      v-flex(xs12='', sm10='', offset-sm1='', md4='', offset-md4, mt-5='')
        form( @submit.prevent='userPasswordChange')
          v-layout(column='')
            v-flex
              v-text-field#oldPassword(name='oldPassword', ref='oldPassword', label='Old password' required='', type='password', v-model='oldPassword')
            v-flex
              v-text-field#newPassword(name='newPassword', ref='newPassword', label='New password' required='', type='password', v-model='newPassword')
            v-flex
              v-text-field#confirmPassword(name='confirmPassword', ref='confirmPassword', label='Confirm password' type='password', required='', :rules='[comparePasswords]', v-model='confirmPassword')
            v-flex.text-xs-center(mt-3='')
              v-btn(to='/home') Cancel
              v-btn(color='primary', type='submit') Save
            v-flex
              v-alert(type='error', dismissible='', v-model='alert') {{ error }}
</template>

<script>
export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      alert: false
    }
  },
  computed: {
    comparePasswords () {
      return this.newPassword === this.confirmPassword ? true : "Passwords don't match"
    },
    error () {
      return this.$store.state.auth.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    userPasswordChange () {
      if (this.comparePasswords === true) {
        this.$store.commit('auth/setError', null)
        this.$store.dispatch('users/userChangePassword', {oldPassword: this.oldPassword, newPassword: this.newPassword})
      }
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('auth/setError', null)
      }
    }
  }
}
</script>
