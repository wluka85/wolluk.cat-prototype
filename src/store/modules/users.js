const state = {
  userList: []
}
const getters = {
  userExists: (userObject => {
    return state.userList.filter(user => user.email === userObject.email).length > 0
  })
}
const actions = {

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
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
