<template lang="pug">
  v-list(:expand="false") 
    v-list-tile
      v-list-tile-content
        v-text-field(@keydown.enter.prevent='search()', v-model='searchCriteria', label="Search")
    v-list-group
      v-list-tile(slot="activator")
        v-list-tile-content Roles
      
      v-list-tile(@click='search()')
        v-list-tile-action
          v-checkbox(label='Admin', v-model="admin")
      v-list-tile(@click='search()')
        v-list-tile-action
          v-checkbox(label='Editor', v-model="editor")
      v-list-tile(@click='search()')
        v-list-tile-action
          v-checkbox(label='Translator', v-model="translator")
      v-list-tile(@click='search()')
        v-list-tile-action
          v-checkbox(label='Designer', v-model="designer")
</template>
<script>
export default {
  data () {
    return {
      searchCriteria: '',
      admin: true,
      editor: true,
      translator: true,
      designer: true
    }
  },
  computed: {
  },
  methods: {
    search () {
      console.log('Search criteria: ' + this.searchCriteria)
      console.log('admin: ', this.admin, ' translator: ', this.translator, ' designer: ', this.designer, ' editor: ', this.editor)
      this.$store.dispatch('users/usersSearch', { searchCriteria: this.searchCriteria, admin: this.admin, designer: this.designer, editor: this.editor, translator: this.translator })
    }
  }
}
</script>
