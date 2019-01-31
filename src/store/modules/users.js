import router from '@/router'

const state = {
  userList: [
    {
      'id': '-LWMS-pfJ937K4iwRl7Q',
      'displayName': 'Tomek Drazek',
      'email': 'tomek@wolluk.com',
      'password': 'open-text-pass',
      'roles': {
        'admin': true // Admins other roles are irrelevant
      }
    },
    {
      'id': '-LWMS-pfJ937K4i4001l7Q', // this is id similar to Firebase (auto gen.)
      'displayName': 'Janusz Cebula',
      'email': 'janusz@example.com',
      'password': 'open-text-pass',
      'roles': {
        'editor': true,
        'translator': false,
        'designer': false
      }
    }
  ]
}
const getters = {
  getCurrentUserName (state, getters, rootState) {
    let currentUserEmail = rootState.auth.user.email
    return state.userList.filter(user => user.email === currentUserEmail)[0].displayName
  }
}
const actions = {
  userChangeName ({commit, state, rootState}, payload) {
    let email = rootState.auth.user.email
    commit('setUserName', {userName: payload, userEmail: email})
    router.push('/home')
  }
}
const mutations = {
  addUser (state, userObject) {
    state.userList.push({
      id: '',
      displayName: '',
      email: userObject.email,
      password: userObject.password,
      roles: {}
    })
  },
  setUserName (state, payload) {
    state.userList.forEach(user => {
      if (user.email === payload.userEmail) {
        user.displayName = payload.userName
      }
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
