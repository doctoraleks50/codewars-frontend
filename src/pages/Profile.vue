<template>
  <section class="d-flex flex-column">
    <b-container class="bv-example-row flex-grow-1 my-3">
      <b-row class="d-flex justify-content-center">
        <b-col md="6" sm="12">
          <b-form v-if="user" @submit.prevent="updateUser(form)" @reset.prevent="reset">
            <b-form-group label="First name" label-for="first-name">
              <b-form-input type="text" id="first-name" v-model="form.firstName" required></b-form-input>
            </b-form-group>
            <b-form-group label="Last name" label-for="last-name">
              <b-form-input type="text" id="last-name" v-model="form.lastName" required></b-form-input>
            </b-form-group>
            <b-form-group label="Level">
              <span v-if="form.level" class="form-control">{{ form.level }}</span>
              <span v-else class="form-control">no data</span>
            </b-form-group>
            <b-form-group label="Points">
              <span v-if="form.points" class="form-control">{{ form.points }}</span>
              <span v-else class="form-control">no data</span>
            </b-form-group>
            <div class="d-flex justify-content-between">
              <b-button type="submit" variant="primary">Save changes
                <span>
                  <font-awesome-icon class="icon" icon="save" />
                </span>
              </b-button>
              <b-button type="reset" variant="outline-primary">Reset
                <span>
                  <font-awesome-icon class="icon" icon="undo" />
                </span>
              </b-button>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    <the-footer></the-footer>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import TheFooter from '../components/TheFooter'

export default {
  name: 'profile',
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        level: '',
        points: ''
      }
    }
  },
  components: {
    TheFooter
  },
  computed: mapState('profile', ['user']),
  methods: {
    ...mapMutations('profile', ['updateUser']),
    ...mapActions('profile', ['fetchUser', 'updateUser']),
    reset () {
      this.form.firstName = decodeURIComponent(this.user.firstName)
      this.form.lastName = decodeURIComponent(this.user.lastName)
    }
  },
  async mounted () {
    await this.fetchUser()
    this.form.firstName = decodeURIComponent(this.user.firstName)
    this.form.lastName = decodeURIComponent(this.user.lastName)
    this.form.level = decodeURIComponent(this.user.level)
    this.form.points = decodeURIComponent(this.user.points)
  }
}
</script>
