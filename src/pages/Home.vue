<template>
  <section class="d-flex flex-column">
    <b-container class="bv-example-row mt-3 flex-grow-1">
      <b-row>
        <b-col class="mb-4">
          <random-task class="random-task"></random-task>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mb-4">
          <search-tasks></search-tasks>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="f">
          <ul role="tablist">
            <li
                    class="d-flex flex-column"
                    v-for="task in tasks"
                    :key="task.id"
            >
              <b-card no-body class="mb-1" v-if="task">
                <b-card-header header-tag="header" class="p-1 d-flex" role="tab">
                  <b-button block v-b-toggle.accordion="String(task.id)" class="card-button">
                    <b-badge>Level {{ task.level }}</b-badge>
                    {{ task.title }}</b-button>
                </b-card-header>
                <b-collapse :id="String(task.id)" role="tabpanel">
                  <b-card-body>
                    <b-button
                            v-if="task.user_id === user.id"
                            variant="outline-primary"
                            class="ml-4 mb-3"
                            :to="{ name: 'task.edit', params: { id: task.id }}"
                    >Edit task
                      <span>
                      <font-awesome-icon class="icon" icon="edit" />
                    </span>
                    </b-button>
                    <b-button
                            v-else-if="solutionsId.includes(task.id)"
                            variant="outline-secondary"
                            class="mb-3"
                            :to="{ name: 'task.solve', params: { id: task.id }}"
                    >Solve again
                      <span>
                      <font-awesome-icon class="icon" icon="play-circle" />
                    </span>
                    </b-button>
                    <b-button
                            v-else variant="primary"
                            class="mb-3"
                            :to="{ name: 'task.solve', params: { id: task.id }}"
                    >Solve task
                      <span>
                      <font-awesome-icon class="icon" icon="play-circle" />
                    </span>
                    </b-button>
                    <b-card-text text-tag="div" class="overflow-auto mb-2 p-3" v-html="task.instruction"></b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <the-footer></the-footer>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchTasks from '../components/SearchTasks'
import RandomTask from '../components/RandomTask'
import TheFooter from '../components/TheFooter'

export default {
  name: 'home',
  data () {
    return {
      solutionsId: []
    }
  },
  computed: {
    ...mapState('task', ['tasks']),
    ...mapState('profile', ['user'])
  },
  methods: {
    ...mapActions('task', ['fetchTasks']),
    ...mapActions('profile', ['fetchUser'])
  },
  components: {
    SearchTasks,
    RandomTask,
    TheFooter
  },
  mounted () {
    this.fetchUser()
      .then(() => this.fetchTasks())
      .then(() => (this.solutionsId = this.user.solutionsId))
      .then(() => console.log(this.tasks))
  }
}
</script>

<style lang='scss' scoped>
  .overflow-auto {
    max-height: 315px;
  }

  h1 {
    padding-bottom: 20px;
  }

  h3 {
    padding-bottom: 10px;
  }

  .card-button {
    background-color: var(--base-color);
    transition: all 0.3s;

    &:hover {
      background-color: var(--base-color);
      filter: hue-rotate(20deg);
    }
  }
</style>
