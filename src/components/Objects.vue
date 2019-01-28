<template lang="pug">
  v-container(fluid='')
    v-layout(row='', wrap='')  
      h1 Object database
    v-btn(fab bottom right color="pink" dark fixed :to="{name:'createObject'}")
      v-icon add
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      filter: 'objects/structure'
    })
  }
}
</script>
