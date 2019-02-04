import router from '@/router'
import uuidv1 from 'uuid/v1'

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
    return state.userList.find(user => user.email === currentUserEmail).displayName
  },
  getAllUsers (state, getters, rootState) {
    return state.userList
  }
}
const actions = {
  userChangeName ({commit, state, rootState}, payload) {
    let email = rootState.auth.user.email
    commit('setUserName', {userName: payload, userEmail: email})
    router.push('/home')
  },
  userChangePassword ({commit, state, rootState}, payload) {
    let currentUserEmail = rootState.auth.user.email
    let currentUser = state.userList.find(user => user.email === currentUserEmail)
    let oldPassword = payload.oldPassword
    let newPassword = payload.newPassword
    if (oldPassword === currentUser.password) {
      currentUser.password = newPassword
      router.push('/home')
    } else {
      commit('auth/setError', 'Wrong old password!', { root: true })
    }
  },
  userAdd ({commit, state, rootState}, payload) {
    if (!rootState.users.userList.filter(user => user.email === payload.email).length > 0) {
      commit('addUser', payload)
      router.push('/home')
    } else {
      commit('auth/setError', 'An account with this email already exists!', { root: true })
    }
  },
  userDelete ({commit}, payload) {
    commit('deleteUser', payload)
  }
}
const mutations = {
  addUser (state, userObject) {
    let id = uuidv1()
    if (!userObject.displayName) {
      userObject.displayName = ''
    }
    state.userList.push({
      id: id,
      displayName: userObject.displayName,
      email: userObject.email,
      password: userObject.password,
      roles: userObject.roles
    })
  },
  setUserName (state, payload) {
    state.userList.forEach(user => {
      if (user.email === payload.userEmail) {
        user.displayName = payload.userName
      }
    })
  },
  deleteUser (state, payload) {
    state.userList.splice(state.userList.findIndex(user => user.email === payload.email), 1)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
