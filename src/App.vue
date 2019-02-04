<template lang="pug">
  v-app
    v-navigation-drawer(v-if="hasSidebar" :clipped="true" fixed v-model="sidebar" app)
      router-view(name="sidebar")
    v-toolbar(app="" clipped-left fixed color="green" dark)
      span
        v-toolbar-side-icon(@click="sidebar = !sidebar")
      v-toolbar-title 
        router-link(to="/" tag="span" style="cursor:pointer") {{ appTitle }}
      v-spacer
      v-toolbar-items.hidden-xs-only
        v-btn(flat v-for='item in menuItems' :key='item.title' :to='item.path')
          v-icon(left dark) {{ item.icon }}
          | {{ item.title }}
        v-menu(v-if="isAuthenticated" offset-y :nudge-right="200")
          v-btn(flat slot='activator')
            v-icon settings
          v-list(light)
            v-list-tile
              v-list-tile-action
                img(v-bind:src="userImage()",width='30px', alt="avatar")
              v-list-tile-title Signed in as {{ userName }}
            v-list-tile(@click='myAccount') 
              v-list-tile-action
                v-icon(left) account_circle
              v-list-tile-title My account
            v-list-tile(@click='passwordEdit') 
              v-list-tile-action
              v-list-tile-title Change password
            v-list-tile(@click='systemUsers') 
              v-list-tile-action
              v-list-tile-title System users
            v-divider
            v-list-tile(@click='userSignOut') 
              v-list-tile-action
                v-icon(left) exit_to_app
              v-list-tile-title Sign Out
    v-content
      router-view
</template>

<script>
  export default {
    data () {
      return {
        appTitle: 'Wolluk.cat',
        sidebar: true
      }
    },
    computed: {
      // appTitle () {
      //   return this.$store.state.appTitle
      // },
      userName () {
        return this.$store.getters['users/getCurrentUserName']
      },
      isAuthenticated () {
        return this.$store.getters['auth/isAuthenticated']
      },
      menuItems () {
        if (this.isAuthenticated) {
          return [
            { title: 'Home', path: '/home', icon: 'home' },
            { title: 'Objects', path: '/objects', icon: 'place' },
            { title: 'Catalogues', path: '/projects', icon: 'local_library' },
            { title: 'Translations', path: '/translation', icon: 'translate' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
        }
      },
      hasSidebar () {
        let matched = this.$route.matched[0]
        return matched && matched.components && matched.components.sidebar
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('auth/userSignOut')
      },
      myAccount () {
        this.$store.dispatch('auth/myAccount')
      },
      passwordEdit () {
        this.$store.dispatch('auth/passwordEdit')
      },
      userImage () {
        return this.$store.getters['auth/getAvatarLink']
      },
      systemUsers () {
        this.$store.dispatch('auth/systemUsers')
      }
    }
  }
</script>