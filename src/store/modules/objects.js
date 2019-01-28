const state = {
  items: [],
  filter: {},
  structure: {
    name: { type: 'text', label: 'Name' },
    type: {
      type: 'radio',
      label: 'Object Type',
      options: {
        hotel: { label: 'Hotel', icon: 'home' },
        resort: 'Resort',
        page: 'Page',
        region: 'Region or Country'
      }
    },
    features: {
      type: 'checkbox',
      label: 'Features',
      options: {
        ai: 'All inclusive',
        family: 'Family Hotel',
        new: 'New'
      }
    },
    stars: {
      type: 'radio',
      label: 'Stars category',
      options: {
        '1': { label: '1', icon: 'star' }
      }
    },
    location: {
      type: 'location',
      label: 'Location'
    }
  }
}
const getters = {
  structure (state) {
    return state.structure
  },
  filter (state) {
    // TODO: enrish with filter none/all for radio and checkboxes.
    return state.structure
  }
}
const mutations = {
  // Set current filter for the objects:
  setFilter (state, payload) {
  },
  addObject (state, payload) {
  }
}
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
