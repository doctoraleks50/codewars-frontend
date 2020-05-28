<template>
  <section>
    <b-container class="bv-example-row p-0" fluid>
      <ValidationObserver
              v-slot="{ errors, invalid }"
      >
        <form
                @submit.prevent="submit"
                @reset.prevent="reset"
                novalidate
        >
          <b-row>
            <b-col>
              <div class="mb-3 button-group">
                <b-button-group size="lg">
                  <b-button variant="success" :disabled="invalid" type="submit">save
                    <span>
                      <font-awesome-icon class="icon" icon="save" />
                    </span>
                  </b-button>
                  <b-button variant="outline-primary" type="reset">reset
                    <span>
                      <font-awesome-icon class="icon" icon="undo" />
                    </span>
                  </b-button>
                </b-button-group>
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col md="6" sm="12" class="d-flex flex-column justify-content-between">
                <div class="mb-3">
                  <ValidationProvider tag="div" class="form-group" rules="required" v-slot="{ errors }">
                    <label for="title">Title</label>
                    <input
                            id="title"
                            class="form-control"
                            :class="{ 'is-invalid': errors[0], 'is-valid': !errors[0] && form.title }"
                            type="text"
                            v-model="form.title"
                            maxlength="200"
                    />
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider tag="div" class="form-group" rules="required" v-slot="{ errors }">
                    <label for="level_of_task">Level</label>
                    <select class="form-control" v-model="form.level" id="level_of_task">
                      <option disabled value="">Please select level</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </ValidationProvider>
                </div>
                <div>
                  <ValidationProvider tag="div" class="form-group mb-0" rules="required" v-slot="{ errors }">
                    <label>Instruction</label>
                    <TextEditor id="text-editor" v-model="form.instruction"></TextEditor>
                    <div class="text-danger" v-if="errors[0]">
                      <span>
                        <font-awesome-icon class="icon" icon="exclamation-triangle" />
                        {{ errors[0] }}
                      </span>
                    </div>
                  </ValidationProvider>
                </div>
            </b-col>
            <b-col md="6" sm="12">
              <ValidationProvider tag="div" class="form-code " rules="required" v-slot="{ errors }">
                <label><span>Start code:</span></label>
                <CodeEditor :height="'600px'" v-model="form.start_code"></CodeEditor>
                <div class="text-danger" v-if="errors[0]">
                  <span>
                    <font-awesome-icon class="icon" icon="exclamation-triangle" />
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6" sm="12" class="my-3">
              <ValidationProvider tag="div" class="form-code" rules="required" v-slot="{ errors }">
                <label><span>Basic test:</span></label>
                <CodeEditor :height="'40vh'" v-model="form.basic_tests"></CodeEditor>
                <div class="text-danger" v-if="errors[0]">
                  <span>
                    <font-awesome-icon class="icon" icon="exclamation-triangle" />
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </b-col>
            <b-col md="6" sm="12" class="my-3">
              <ValidationProvider tag="div" class="form-code" rules="required" v-slot="{ errors }">
                <label><span>Full test:</span></label>
                <CodeEditor :height="'40vh'" v-model="form.full_tests"></CodeEditor>
                <div class="text-danger" v-if="errors[0]">
                  <span>
                    <font-awesome-icon class="icon" icon="exclamation-triangle" />
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
    </b-container>
    <the-footer></the-footer>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import TextEditor from '../components/TextEditor'
import CodeEditor from '../components/CodeEditor'
import TheFooter from './TheFooter'

extend('required', {
  ...required,
  message: 'The field is required'
})

function createForm () {
  return {
    title: '',
    instruction: '',
    start_code: '',
    basic_tests: '',
    full_tests: '',
    level: ''
  }
}

export default {
  props: {
    initialData: Object
  },
  data () {
    const form = createForm()
    if (this.initialData) {
      Object.assign(form, this.initialData)
    }
    return {
      form
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    TextEditor,
    CodeEditor,
    TheFooter
  },
  methods: {
    reset () {
      this.form = createForm()
      if (this.initialData) {
        Object.assign(this.form, this.initialData)
      }
    },
    submit () {
      this.$emit('change', this.form)
    }
  }
}
</script>

<style lang='scss' scoped>
  .button-group {
    & button {
      padding: 5px 15px;
    }
  }

  #text-editor {
    height: 350px;
  }

  .form-code label {
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

  .form-group, .form-code {
    position: relative;

    & .text-danger {
      width: 100%;
      position: absolute;
      bottom: 0;
      z-index: 10;
      display: flex;
      align-items: center;

      & span {
        flex-grow: 1;
        background-color: #5e5e5e;
        padding: 5px 15px;
        text-transform: uppercase;
        font-weight: bold;
        color: white;

        & .icon {
          color: red;
        }
      }
    }
  }
</style>
