<template>
  <div class="task">
    <router-link :to="{ name: 'instruction', params: { id: task.id }}">{{ task.title }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'task-item',
  props: {
    task: Object
  }
}
</script>

<style scoped>
.task {
  padding-bottom: 13px;
}
</style>
