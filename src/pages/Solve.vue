<template>
  <section class="solve">
    <b-container class="bv-example-row d-flex flex-column p-0" fluid>
      <b-row>
        <b-col class="col-12">
            <div class="d-flex align-items-center">
                <div>
                    <b-badge class="level">Level {{ currentTask.level }}</b-badge>
                </div>
                <h1 v-html="currentTask.title"></h1>
            </div>
        </b-col>
      </b-row>
      <b-row class="flex-grow-1">
        <b-col md="5" sm="12" class="mb-3">
          <b-tabs
                  active-nav-item-class="font-weight-bold text-uppercase"
                  active-tab-class="font-weight-bold instruction"
                  content-class=""
                  justified
          >
            <b-tab title="Instructions" :active="activeTab" @click="tabClick">
              <div v-html="currentTask.instruction"></div>
            </b-tab>
            <b-tab title="Output" :active="!activeTab" @click="tabClick">
              <div>
                <pre> {{ output }} </pre>
              </div>
            </b-tab>
          </b-tabs>
        </b-col>
        <b-col md="7" sm="12" class="mb-3">
          <form
                  class="solve-form d-flex flex-column justify-content-between"
                  @submit.prevent="submit"
                  @reset.prevent="reset"
          >
            <div class="flex-grow-1 d-flex flex-column">
                  <div class="flex-grow-1 d-flex flex-column justify-content-between mb-2">
                    <div class="d-flex flex-column position-relative">
                      <label><span>Solution:</span></label>
                      <CodeEditor
                                :height="'42vh'"
                                v-model="form.code"
                                :value="currentTask.start_code" @input="changeSolutionCode"
                      ></CodeEditor>
                      <div v-if="final" class="solve-message position-absolute w-100">
                          <span>
                              <span>
                                 <font-awesome-icon class="icon" icon="thumbs-up" />
                              </span>
                              Good Job! You may take your time to refactor/comment your solution. Submit when ready.
                          </span>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                      <label><span>Sample Tests:</span></label>
                      <CodeEditor
                                 :height="'30vh'"
                                 v-model="form.sampleTest"
                                 :value="currentTask.basic_tests"
                      ></CodeEditor>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between flex-wrap">
                      <b-button
                              class="mr-auto mt-3 col col-md-auto col-sm-6"
                              v-if="taskLoad && !currentTask.lastTask"
                              :to="{ name: 'task.solve', params: { id: randomTask.id }}"
                      >Skip
                          <span>
                              <font-awesome-icon class="icon" icon="angle-double-right" />
                          </span>
                      </b-button>
                      <b-button
                              class="mr-auto mt-3 col-md-auto col-sm-6"
                              v-else disabled
                      >Skip
                          <span>
                              <font-awesome-icon class="icon" icon="angle-double-right" />
                          </span>
                      </b-button>
                      <b-button
                              class="mr-2 mt-3 col-md-auto col-sm-6"
                              variant="light"
                              type="reset"
                      >Reset
                          <span>
                              <font-awesome-icon class="icon" icon="undo" />
                          </span>
                      </b-button>
                      <b-button
                              class="mr-2 mt-3 col-md-auto col-sm-6"
                              variant="outline-primary"
                              @click="runSampleTest"
                      >Run sample tests
                      </b-button>
                      <b-button
                              class="mt-3 col-md-auto col-sm-6"
                              v-if="!final"
                              variant="primary"
                              @click="runFullTests"
                      >Attempt
                          <span>
                              <font-awesome-icon class="icon" icon="play-circle" />
                          </span>
                      </b-button>
                      <b-button
                              class="mt-3 col-md-auto col-sm-6"
                              v-else
                              variant="success"
                              type="submit"
                              :disabled="submitDisable"
                      >Submit final
                      </b-button>
                  </div>
              </form>
          </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CodeEditor from '../components/CodeEditor'

export default {
  name: 'solve',
  data () {
    return {
      currentTask: {
        title: '',
        instruction: '',
        start_code: '',
        basic_tests: '',
        level: '',
        lastTask: false
      },
      form: {
        code: '',
        sampleTest: ''
      },
      output: null,
      activeTab: true,
      final: false,
      currentSolution: null,
      taskLoad: false,
      submitDisable: false
    }
  },
  components: {
    CodeEditor
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: mapState('task', ['task', 'randomTask']),
  methods: {
    ...mapActions('task',
      ['fetchTaskById', 'addSolution', 'checkSolution', 'fetchRandomTask']
    ),
    fetchData () {
      this.fetchTaskById(this.$route.params.id)
        .then(() => {
          this.currentTask.title = this.task.title
          this.currentTask.instruction = this.task.instruction
          this.currentTask.start_code = this.task.start_code
          this.currentTask.basic_tests = this.task.basic_tests
          this.currentTask.level = this.task.level
          this.form.code = this.task.start_code
          this.form.sampleTest = this.task.basic_tests
          this.activeTab = true
          this.output = null
        })
      this.fetchRandomTask()
        .then(() => {
          this.taskLoad = true
          this.currentTask.lastTask = this.randomTask.lastTask
        })
    },
    submit () {
      this.submitDisable = true
      this.$emit('change', this.addSolution({
        taskId: this.$route.params.id,
        code: this.form.code
      })
        .then(res => {
          if (res) {
            this.$router.push({ name: 'home' })
              .then(() => this.fetchRandomTask())
          } else {
            this.submitDisable = false
          }
        }))
    },
    reset () {
      this.form.code = this.task.start_code
      this.form.sampleTest = this.task.basic_tests
      this.activeTab = true
      this.output = null
      this.currentSolution = null
    },
    runSampleTest () {
      this.activeTab = false
      this.$emit('change', this.checkSolution({
        taskId: this.$route.params.id,
        code: this.form.code
      })
        .then(err => (this.output = err))
        .then(res => {
          if (res === `0`) {
            this.output = `Simple test done`
          }
        })
      )
    },
    runFullTests () {
      this.activeTab = false
      this.$emit('change', this.checkSolution({
        taskId: this.$route.params.id,
        code: this.form.code,
        testType: 'full'
      })
        .then(err => (this.output = err))
        .then(res => {
          if (res === `0`) {
            this.final = true
            this.output = `Full test done`
            this.currentSolution = this.form.code
          }
        })
      )
    },
    changeSolutionCode (value) {
      this.form.code = value
      if (this.form.code === this.currentSolution) {
        this.final = true
      } else {
        this.final = false
      }
    },
    tabClick () {
      this.activeTab = !this.activeTab
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang='scss' scoped>
    .solve {
        margin: 0 20px;
    }

    .level {
        font-size: 1.5em;
        margin-right: 10px;
    }

    .instruction {
        height: 80vh;
        padding-right: 10px;
        overflow: auto;
    }

    .solve-form {
        height: 100%;
    }

    .solve-form label, .solve-message {
        height: 30px;
        background-color: #5e5e5e;
        margin: 0;
        display: flex;
        align-items: center;

        & span {
            margin-left: 10px;
            color: white;
        }
    }

    .solve-message {
        bottom: 0;
        padding: 10px 0;
        height: auto;
        z-index: 10;

        & .icon {
            color: green;
            filter: drop-shadow(1px 1px 1px black);
            margin-right: 5px;
        }
    }
</style>
