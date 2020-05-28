import Tasks from '../../models/Tasks'

export default {
  strict: true,
  namespaced: true,
  state: {
    tasks: [],
    task: null,
    randomTask: null
  },
  actions: {
    async fetchTasks (context, search = '', limit = 50) {
      const res = await fetch(
        `http://cm.codewars.ua/api/v1/tasks?_limit=${limit}&search=${search}`
      )

      const tasks = await res.json()
      context.commit('updateTasks', tasks)
    },
    async createTask (context, data) {
      await fetch(
        'http://cm.codewars.ua/api/v1/tasks', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      ).catch(err => console.error(err))
    },
    async editTask (context, { taskId, data }) {
      await fetch(
        'http://cm.codewars.ua/api/v1/tasks/' + taskId, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )
    },
    checkSolution (context, data) {
      return fetch(
        'http://cm.codewars.ua/api/v1/tasks/' + data.taskId + '/solutions/check', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )
        .then(response => response.text())
    },
    async addSolution (context, data) {
      const res = await fetch(
        'http://cm.codewars.ua/api/v1/tasks/' + data.taskId + '/solutions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )
      if (res.status === 200) {
        return res.text()
      } else {
        return false
      }
    },
    async fetchTaskById (context, id) {
      context.commit('updateTask', null)
      const res = await fetch(
        'http://cm.codewars.ua/api/v1/tasks/' + id
      )
      const task = await res.json()

      context.commit('updateTask', task)
    },
    async fetchRandomTask (context) {
      const res = await fetch(
        `http://cm.codewars.ua/api/v1/tasks/random`
      )
      const randomTask = (res.status === 200) ? await res.json() : null

      context.commit('setRandomTask', randomTask)
    }
  },
  mutations: {
    updateTasks (state, tasks) {
      state.tasks = tasks.map(item => new Tasks(item))
    },
    updateTask (state, task) {
      state.task = task
    },
    setRandomTask (state, task) {
      if (task) {
        state.randomTask = new Tasks(task)
      } else {
        state.randomTask = null
      }
    }
  }
}
