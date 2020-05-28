export default {
  strict: true,
  namespaced: true,
  state: {
    isUserLoggedIn: false
  },
  actions: {
    isSessionExist (context) {
      return fetch('http://cm.codewars.ua/api/v1/users/profile')
        .then(obj => obj.json())
        .then(data => context.commit('changeIsUserLoggedInState', !!data))
    }
  },
  mutations: {
    changeIsUserLoggedInState (state, condition) {
      state.isUserLoggedIn = condition
    }
  }
}
