<template>
  <div class="input-group md-form form-sm form-1 pl-0">
    <input
      class="form-control my-0 py-1"
      type="text"
      placeholder="Search"
      aria-label="Search"
      @input="searchTasks"
      v-model="searchValue"
      maxlength="50"
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import debounce from '../lib/debounce'

export default {
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    ...mapActions('task', ['fetchTasks']),
    searchTasks: debounce(function () {
      this.fetchTasks(this.searchValue)
    }, 1000)
  }
}

</script>
