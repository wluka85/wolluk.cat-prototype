<template lang="pug">
  v-container(fluid)
    v-form
      v-layout(row wrap)
        v-flex(xs12)
          h1 Edit Object
          v-text-field(required label="Name" v-model="object.name")
          v-select(:items="{'1':'jeden', '2': 'dwa'}" v-model="object.items" label="Items")
        v-flex.text-xs-center(mt-3)
          v-btn(:to="{name: 'listObjects'}") Cancel
          v-btn(@click="saveObject()") Add/Save

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      items: [{}],
      object: { }
    }
  },
  computed: {
    ...mapGetters({
      filters: 'objects/structure'
    })
  },
  methods: {
    saveObject () {
      console.log('save object', this.object)
    }
  }
}
</script>
