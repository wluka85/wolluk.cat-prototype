<template lang="pug">
  v-container(fluid='')
    v-btn(fab bottom right color="pink" dark fixed :to="{name:'addUser'}")
      v-icon add
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-3='')
        h1 System users
        v-container(fluid='', grid-list-md='')
          v-flex(mt-2='')
            v-layout(row wrap)
              v-flex(v-for='(item, index) in userListSearched', :key='index', sm6='', md4='', lg3='' mt-3='')
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
                          v-list-tile-sub-title.text-xs-center {{ generateRoles(item.roles) }}
                        v-btn(v-if="isCurrentUser(item.email)", flat color="green", @click='userDelete(item.email)') DELETE
                        v-btn(flat color="green") EDIT
</template>

<script>
import md5 from 'js-md5'

export default {
  created () {
    return this.$store.dispatch('users/usersSearch', { searchCriteria: '' })
  },
  methods: {
    userAvatar (email) {
      return 'https://www.gravatar.com/avatar/' + md5(email)
    },
    userDelete (email) {
      this.$store.dispatch('users/userDelete', {email: email})
    },
    isCurrentUser (email) {
      return this.$store.getters['auth/getCurrentUser'] !== email
    },
    generateRoles (roles) {
      let rolesStr = ''
      for (const key in roles) {
        if (roles[key]) {
          rolesStr += key.toUpperCase() + ' '
        }
      }
      return rolesStr
    }
  },
  computed: {
    userListSearched () {
      return this.$store.getters['users/getUsers']
    }
  }
}
</script>