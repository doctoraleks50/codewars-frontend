<template>
  <section class="create">
    <b-container class="bv-example-row p-0" fluid>
      <b-row>
        <b-col>
          <h1>Create Task</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TaskForm :initialData="form" @change="sendFormData"></TaskForm>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import TaskForm from '../components/TaskForm'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        title: '',
        instruction: '',
        start_code: '',
        basic_tests: '',
        full_tests: '',
        level: ''
      }
    }
  },
  components: {
    TaskForm
  },
  methods: {
    ...mapActions('task', ['createTask']),
    sendFormData (data) {
      this.createTask(data)
        .then(() => this.$router.push({ name: 'home' }))
    }
  }
}
</script>

<style scoped>
  .create {
    margin: 0 20px;
  }
</style>
