import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Instruction from '@/pages/Instruction'
import Profile from '@/pages/Profile'
import Create from '@/pages/Create'
import WelcomePage from '@/pages/WelcomePage'
import Solve from '@/pages/Solve'
import Edit from '@/pages/Edit'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: ':id/instruction',
        name: 'instruction',
        component: Instruction
      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/task',
      component: { render: h => h('router-view') },
      children: [
        {
          path: 'create',
          name: 'task.create',
          component: Create
        },
        {
          path: ':id/solve',
          name: 'task.solve',
          component: Solve
        },
        {
          path: ':id/edit',
          name: 'task.edit',
          component: Edit
        }
      ],
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('auth/isSessionExist').then(() => {
    if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.isUserLoggedIn) {
      next({ path: '/welcome' })
    } else {
      next()
    }
  }).catch(err => next(err))
})

export default router
