<template lang="pug">
  v-container(fluid='')
    v-btn(fab bottom right color="pink" dark fixed :to="{name:'createObject'}")
      v-icon add
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-3='')
        h1 System users
        v-container(fluid='', grid-list-md='')
          v-flex(mt-2='')
            v-layout(row wrap)
              v-flex(v-for='(item, index) in userList', :key='index', sm6='', md4='', lg3='' mt-3='')
                v-card
                  v-flex(pa-2, pt-4)
                    v-avatar(tile=false size='120px')
                      img(v-bind:src="userAvatar(item.email)", alt="avatar")
                    v-flex(mt-1='')
                      v-list(light)
                        v-list-tile
                          v-list-tile-title.text-xs-center 
                            h2 {{ item.displayName }}
                        v-list-tile
                          v-list-tile-title.text-xs-center {{ item.email }}
                        v-list-tile
                          v-list-tile-sub-title.text-xs-center roles
                        v-btn(flat color="green") DELETE
                        v-btn(flat color="green") EDIT
</template>

<script>
import md5 from 'js-md5'

export default {
  data () {
    return {
      userList: this.$store.getters['users/getAllUsers']
    }
  },
  computed: {
    user () {
      console.log(this.$store.getters['auth/getCurrentUser'])
      return this.$store.getters['auth/getCurrentUser']
    }
  },
  methods: {
    userAvatar (email) {
      console.log('userek: ', this.user)
      return 'https://www.gravatar.com/avatar/' + md5(email)
    }
  }
}
</script>