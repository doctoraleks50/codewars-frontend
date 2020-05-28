<template>
  <div class="instruction">
    <p v-if="task" v-html="task.instruction"></p>
    <div class="solve-task">
      <router-link :to="{ name: 'task.solve', params: { id: $route.params.id }}">Solve task</router-link>
       <router-link :to="{ name: 'task.edit', params: { id: $route.params.id }}">Edit task</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'instruction',
  computed: mapState('task', ['task']),
  mounted () {
    this.fetchTaskById(this.$route.params.id)
  },
  methods: {
    ...mapActions('task', ['fetchTaskById'])
  }
}
</script>

<style lang="scss" scoped>
  .instruction {
    width: 600px;
  }

  .solve-task {
    margin-top: 40px;
    & a{
      padding: 5px 10px;
      border: 1px solid #fff;
      border-radius: 10px;
      cursor: pointer;
      &:hover{
        transition: all .4s;
      }
    }
  }
</style>
