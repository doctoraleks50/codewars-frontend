<template>
  <section class="edit">
    <b-container class="bv-example-row p-0" fluid>
      <b-row>
        <b-col>
          <h1>Edit Task</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TaskForm v-if="task" :initialData="task" @change="sendFormData"></TaskForm>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import TaskForm from '../components/TaskForm'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    TaskForm
  },
  beforeMount () {
    return this.fetchTaskById(this.$route.params.id)
  },
  computed: mapState('task', ['task']),
  methods: {
    ...mapActions('task', ['editTask', 'fetchTaskById']),
    sendFormData (changedformData) {
      this.editTask({
        taskId: this.$route.params.id,
        data: changedformData
      })
        .then(() => this.$router.push({ name: 'home' }))
    }
  }
}
</script>

<style scoped>
    .edit {
        margin: 0 20px;
    }
</style>
