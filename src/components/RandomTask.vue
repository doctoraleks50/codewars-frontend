<template>
  <b-container class="bv-example-row" fluid>
    <b-row>
      <b-col id="dashboard" md="3" sm="12">
        <b-col class="my-2">
          <label>Your Next Challenge...</label>
        </b-col>
        <b-col class="my-3">
          <b-button
            v-if="randomTask  && !randomTask.lastTask"
            class="mx-1 my-1"
            @click="fetchRandomTask"
          >Skip
            <span>
              <font-awesome-icon class="icon" icon="angle-double-right" />
            </span>
          </b-button>
          <b-button
            v-if="randomTask"
            variant="success"
            :to="{ name: 'task.solve', params: { id: randomTask.id }}"
            class="m-1"
          >Solve task
            <span>
              <font-awesome-icon class="icon" icon="play-circle" />
            </span>
          </b-button>
        </b-col>
      </b-col>
      <b-col id="random-task" md="9" sm="12">
        <b-col class="my-3">
          <h2 class="d-flex" v-if="randomTask" :task='randomTask'>
            <b-badge class="mr-2">Level {{ randomTask.level }}</b-badge>
            <span class="overflow-auto">{{ randomTask.title }}</span>
          </h2>
        </b-col>
        <b-col class="overflow-auto instruction" :class="{ 'flex': loading }">
          <the-loading v-if="loading"></the-loading>
          <span v-else-if="randomTask" v-html="randomTask.instruction"></span>
          <span v-else>no suitable tasks</span>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import theLoading from './TheLoading'

export default {
  name: 'RandomTask',
  data () {
    return {
      loading: true
    }
  },
  components: {
    theLoading
  },
  computed: mapState('task', ['randomTask']),
  beforeMount () {
    this.fetchRandomTask()
      .then(() => (this.loading = false))
  },
  methods: {
    ...mapActions('task', ['fetchRandomTask'])
  }
}
</script>

<style scoped>
  #dashboard {
    background-color: var(--base-color);
  }

  #random-task {
    height: 500px;
    background-color: #cccccc;
  }

  .instruction {
    height: 400px;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
