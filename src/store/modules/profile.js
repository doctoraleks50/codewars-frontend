import User from '../../models/User'

export default {
  strict: true,
  namespaced: true,
  state: {
    user: null
  },
  actions: {
    async fetchUser (context) {
      const user = await fetch('http://cm.codewars.ua/api/v1/users/profile')
        .then(res => res.json())
        .catch(err => console.error(err))

      context.commit('updateUser', user)
    },
    updateUser (context, data) {
      fetch(`http://cm.codewars.ua/api/v1/users/${context.state.user.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).catch(err => console.error(err))
    }
  },
  mutations: {
    updateUser (state, user) {
      state.user = new User(user)
    }
  }
}
