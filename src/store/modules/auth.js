import router from '@/router'
import md5 from 'js-md5'

const state = {
  user: null,
  error: null,
  loading: false
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}

const getters = {
  isAuthenticated (state) {
    return state.user !== null && state.user !== undefined
  },
  getAvatarLink (state) {
    return 'https://www.gravatar.com/avatar/' + md5(state.user.email)
  },
  getCurrentUser (state) {
    console.log('user: ', state.user)
    return state.user.email
  }
}
const actions = {
  userSignUp ({commit, rootState}, payload) {
    // Add user to /users
    if (!rootState.users.userList.filter(user => user.email === payload.email).length > 0) {
      commit('users/addUser', payload, { root: true })
      commit('setUser', { email: payload.email })
      router.push('/home')
    } else {
      commit('setError', 'An account with this email already exists!')
    }
    // rootState.// verify from /users/
    // commit('setLoading', true)
    // rootState.// verify from /users/
    // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    // .then(firebaseUser => {
    //   commit('setUser', {email: firebaseUser.user.email})
    //   commit('setLoading', false)
    //   router.push('/home')
    // })
    // .catch(error => {
    //   commit('setError', error.message)
    //   commit('setLoading', false)
    // })
  },
  userSignIn ({commit, state, rootState}, payload) {
    // commit('setLoading', true)
    let userList = rootState.users.userList
    userList.forEach(user => {
      if (user.email === payload.email && user.password === payload.password) {
        commit('setUser', { email: payload.email })
        router.push('/home')
      }
    })
    if (!state.user) {
      commit('setError', 'Wrong email or password!')
    }
    // firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    // .then(firebaseUser => {
    //   commit('setUser', {email: firebaseUser.user.email})
    //   commit('setLoading', false)
    //   commit('setError', null)
    //   router.push('/home')
    // })
    // .catch(error => {
    //   commit('setError', error.message)
    //   commit('setLoading', false)
    // })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', { email: payload.email })
  },
  userSignOut ({commit}) {
    // firebase.auth().signOut()
    commit('setUser', null)
    router.push('/')
  },
  myAccount ({commit}) {
    router.push('myAccount')
  },
  passwordEdit ({commit}) {
    router.push('passwordEdit')
  },
  systemUsers ({commit}) {
    router.push('systemUsers')
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
