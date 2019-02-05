<template lang="pug">
  v-container(fluid='')
    v-layout(row, justify-center)    
    v-dialog(v-model="dialog", max-width="290")
      v-card
        v-card-title(class="headline") Delete
        v-card-text Are you sure you want to delete this user?
        v-card-actions
          v-spacer
          v-btn(color="green darken-1", flat="flat", @click="dialog = false") Cancel
          v-btn(color="green darken-1", flat="flat", @click="userDelete") Delete

    v-btn(fab bottom right color="pink" dark fixed :to="{name:'addUser', params: {isAddComponent: true, name: 'Add user'}}")
      v-icon add
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-3='')
        h1 System users
        v-container(fluid='', grid-list-md='')
          v-layout(row wrap, mt-2)
            v-flex(v-for='(item, index) in userListSearched', :key='index', sm6='', md4='', lg3='' mt-3='')
              v-card
                v-flex(pa-2, pt-4)
                  v-avatar(tile=false size='120px')
                    img(v-bind:src="userAvatar(item.email)", alt="avatar")
                  v-list(light, mt-1='')
                    v-list-tile
                      v-list-tile-title.text-xs-center 
                        h2 {{ item.displayName }}
                    v-list-tile
                      v-list-tile-title.text-xs-center {{ item.email }}
                    v-list-tile
                      v-list-tile-sub-title.text-xs-center {{ generateRoles(item.roles) }}
                    v-btn(v-if="isCurrentUser(item.email)", flat color="green", @click='userToDelete(item.email)') DELETE
                    v-btn(flat color="green", :to="{name:'addUser', params: {isAddComponent: false, name: 'Edit user', user: item}}") EDIT
</template>

<script>
import md5 from 'js-md5'

export default {
  data () {
    return {
      dialog: false,
      userToDeleteEmail: ''
    }
  },
  created () {
    return this.$store.dispatch('users/usersSearch', { searchCriteria: '' })
  },
  methods: {
    userAvatar (email) {
      return 'https://www.gravatar.com/avatar/' + md5(email)
    },
    userToDelete (email) {
      this.userToDeleteEmail = email
      this.dialog = true
    },
    userDelete () {
      this.$store.dispatch('users/userDelete', {email: this.userToDeleteEmail})
      this.dialog = false
      this.userToDeleteEmail = null
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