<template lang="pug">
  v-container(fluid='')
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-5='')
        h1 Add User
      v-flex(xs12='', sm10='', offset-sm1='', md4='', offset-md4, mt-5='')
        form( @submit.prevent='addUser')
          v-layout(column='')
            v-flex
              v-text-field#email(name='email', ref='email', label='Email' required='', type='email', v-model='email')
            v-flex
              v-text-field#displayName(name='displayName', ref='displayName', label='Display name' required='', v-model='displayName')
            v-flex
              v-text-field#newPassword(name='newPassword', ref='newPassword', label='Password' required='', type='password', v-model='newPassword')
            v-flex
              v-text-field#confirmPassword(name='confirmPassword', ref='confirmPassword', label='Confirm password' type='password', required='', :rules='[comparePasswords]', v-model='confirmPassword')
            v-list-tile
              v-list-tile-title Roles:
            v-list-tile
              v-list-tile-action
                v-checkbox(label='Admin', v-model="admin")
            v-list-tile
              v-list-tile-action
                v-checkbox(label='Editor', :disabled='checkboxActive()', v-model="editor")
            v-list-tile
              v-list-tile-action
                v-checkbox(label='Translator', :disabled='checkboxActive()', v-model="translator")
            v-list-tile
              v-list-tile-action
                v-checkbox(label='Designer', :disabled='checkboxActive()', v-model="designer")
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
      email: '',
      displayName: '',
      newPassword: '',
      confirmPassword: '',
      alert: false,
      admin: false,
      editor: false,
      translator: false,
      designer: false
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
    checkboxActive () {
      if (this.editor && this.translator && this.designer) {
        this.admin = true
      }
      return this.admin
    },
    addUser () {
      if (this.comparePasswords !== true) {
        return
      } else if (!this.admin && !this.translator && !this.designer && !this.editor) {
        this.$store.commit('auth/setError', 'You should choose role')
        return
      }
      let roles
      this.admin ? roles = { admin: this.admin } : roles = {editor: this.editor, designer: this.designer, translator: this.translator}
      this.$store.commit('auth/setError', null)
      this.$store.dispatch('users/userAdd', { displayName: this.displayName, email: this.email, password: this.password, roles: roles })
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
    },
    admin () {
      if (this.admin) {
        this.designer = this.editor = this.translator = true
      } else {
        this.designer = this.editor = this.translator = false
      }
    }
  }
}
</script>
