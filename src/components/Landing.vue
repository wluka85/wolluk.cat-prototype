<template lang="pug">
  v-container(fluid='')
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-5='')
        h1 Welcome to Awesome App
      v-flex(xs12='', sm6='', offset-sm3='', mt-3='')
        blockquote.blockquote.text-xs-center
          | It's a basic Single Page application
          br
          | with fake authentication
      v-flex.text-xs-center(v-if="!isAuthenticated", xs12='', sm6='', offset-sm3='', mt-5='')
        v-btn(color='primary', to='/signup') Sign Up
        v-btn(to='/signin') Sign In
</template>

<script>
export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>
