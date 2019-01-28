// import { firebaseAction } from 'vuexfire'
// Not used yet.

import firebase from '@/firebase'
const db = firebase.database()

const state = {
  items: []
}

const getters = {
  items: state => state.items
}

const mutations = {
  setItems (state, payload) {
    state.items = payload
  }
}

const actions = {
  loadItems ({commit}) {
    console.log('load items')
    // db.ref('messages')
    db.ref('/projects/test/agents').once('value')
      .then((data) => {
        const items = []
        const obj = data.val()
        for (let key in obj) {
          items.push(obj[key])
        }
        console.log(data, items, data.val())
        commit('setItems', items)
      })
      .catch((err) => {
        console.error(err)
      })
    //
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
