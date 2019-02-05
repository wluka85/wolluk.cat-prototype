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
  ],
  searchResultList: []
}
const getters = {
  getCurrentUserName (state, getters, rootState) {
    let currentUserEmail = rootState.auth.user.email
    return state.userList.find(user => user.email === currentUserEmail).displayName
  },
  getCurrentUserRoles (state, getters, rootState) {
    let currentUserEmail = rootState.auth.user.email
    return state.userList.find(user => user.email === currentUserEmail).roles
  },
  getUsers (state, getters, rootState) {
    return state.searchResultList
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
      commit('resetSearch')
      router.push('/systemUsers')
    } else {
      commit('auth/setError', 'An account with this email already exists!', { root: true })
    }
  },
  userEdit ({commit, state, rootState}, payload) {
    if (rootState.users.userList.filter(user => user.email === payload.email && user.id !== payload.id).length > 0) {
      commit('auth/setError', 'An account with this email already exists!', { root: true })
      router.push('/editUser')
    } else {
      commit('editUser', payload)
      commit('resetSearch')
      router.push('/systemUsers')
    }
  },
  userDelete ({commit}, payload) {
    commit('deleteUser', payload)
    commit('resetSearch')
  },
  usersSearch ({commit, state}, payload) {
    let resultListByText = state.userList.filter(user => user.email.match(payload.searchCriteria) || user.displayName.toLowerCase().match(payload.searchCriteria))
    let filteredList = []
    if (payload.admin) {
      filteredList = filteredList.concat(resultListByText.filter(user => user.roles.admin))
    }
    if (payload.designer) {
      filteredList = filteredList.concat(resultListByText.filter(user => user.roles.designer))
    }
    if (payload.editor) {
      filteredList = filteredList.concat(resultListByText.filter(user => user.roles.editor))
    }
    if (payload.translator) {
      filteredList = filteredList.concat(resultListByText.filter(user => user.roles.translator))
    }
    if (!payload.admin && !payload.designer && !payload.editor && !payload.translator) {
      filteredList = resultListByText
    }
    filteredList = filteredList.filter((elem, index, self) => {
      return index === self.indexOf(elem)
    })
    commit('setSearchResultList', filteredList)
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
  editUser (state, payload) {
    let userToEdit = state.userList.find(user => user.id === payload.id)
    userToEdit.displayName = payload.displayName
    userToEdit.email = payload.email
    userToEdit.password = payload.password
    userToEdit.roles = payload.roles
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
  },
  setSearchResultList (state, searchResultList) {
    state.searchResultList = searchResultList
  },
  resetSearch (state) {
    state.searchResultList = state.userList
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
