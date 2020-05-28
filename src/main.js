import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faExclamationTriangle,
  faEdit,
  faPlayCircle,
  faAngleDoubleRight,
  faUndo,
  faThumbsUp,
  faSave,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)

library.add(
  faUser,
  faExclamationTriangle,
  faEdit,
  faPlayCircle,
  faAngleDoubleRight,
  faUndo,
  faThumbsUp,
  faSave,
  faBars
)
library.add(faFontAwesome)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
