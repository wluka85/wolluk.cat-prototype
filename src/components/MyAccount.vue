<template lang="pug">
  v-container(fluid='')
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-5='')
        h1 My Account
      v-flex.text-xs-center(xs12='', sm10='', offset-sm1='', md2='', offset-md3='' mt-5='')
        //- v-avatar(tile=true, color="grey lighten-4")
        img(v-bind:src="userImage()", width='120px', alt="avatar")
      v-flex(xs12='', sm10='', offset-sm1='', md3='', mt-5='')
        form( @submit.prevent='userChangeName')
            v-layout(column='')
              v-flex
                v-text-field#displayName(name='displayName', ref='name', label='Display name' required='', v-model='displayName')
              v-flex.text-xs-center(mt-3='')
                v-btn(to='/home') Cancel
                v-btn(color='primary', type='submit') Save
</template>

<script>
export default {
  data () {
    return {
      displayName: this.$store.getters['users/getCurrentUserName']
    }
  },
  methods: {
    userChangeName () {
      this.$store.dispatch('users/userChangeName', this.$refs.name.value)
    },
    userImage () {
      return this.$store.getters['auth/getAvatarLink']
    }
  }
}
</script>
