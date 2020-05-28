<template>
  <header class="header">
    <b-navbar toggleable="lg" class="navbar-menu p-0">
    <b-navbar-toggle target="nav-collapse" class="collapse-icon">
      <b-nav-item @click="menuCollapse">
        <span>
          <font-awesome-icon class="icon" icon="bars" />
        </span>
      </b-nav-item>
    </b-navbar-toggle>
      <b-nav-item to="/home" class="logo">
        <div>
          <img src="@/assets/logo.png" alt />
        </div>
        <div>
          <span>Code<br>Wars</span>
        </div>
      </b-nav-item>
      <b-collapse is-nav class="menu-collapse">
      <b-nav class="nav-menu align-items-center" v-for="link in linkMenu" :key="link.title">
        <b-nav-item :to="link.route">{{ link.title }}</b-nav-item>
      </b-nav>
      </b-collapse>
      <div
              id="nav-user"
              :class="{ active: visibleUser }"
      >
        <b-nav-item @click="userCollapse">
              <font-awesome-icon class="icon" icon="user" />
        </b-nav-item>
      </div>
    </b-navbar>
    <b-collapse id="nav-collapse" v-model="visibleMenu" class="nav-collapse">
      <b-nav vertical v-for="link in linkMenu" :key="link.title">
        <b-nav-item :to="link.route"><span>{{ link.title }}</span></b-nav-item>
      </b-nav>
    </b-collapse>
    <b-collapse v-model="visibleUser" class="collapse-user">
      <b-nav vertical v-for="link in userMenu" :key="link.title">
        <b-nav-item :to="link.route">{{ link.title }}</b-nav-item>
      </b-nav>
    </b-collapse>
  </header>
</template>

<script>
export default {
  name: 'theHeader',
  data () {
    return {
      visibleUser: false,
      visibleMenu: false,
      linkMenu: [
        {
          title: 'Create Task',
          route: {
            name: 'task.create'
          }
        }
      ],
      userMenu: [
        {
          title: 'Profile',
          route: {
            name: 'profile'
          }
        },
        {
          title: 'Log Out',
          route: {
            name: 'welcome'
          }
        }
      ]
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.visibleUser = false
      this.visibleMenu = false
    },
    userCollapse () {
      this.visibleUser = !this.visibleUser
      this.visibleMenu = false
    },
    menuCollapse () {
      this.visibleMenu = !this.visibleMenu
      this.visibleUser = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background-color: var(--base-color);
    position: relative;
    height: 70px;

    & .navbar-menu, .menu-collapse, .nav-menu {
      height: 100%;
    }

    & a {
      color: white;
    }

    & .logo {
      height: 100%;
      background-color: var(--base-color);
      transition: all 0.3s;

      & a {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      & img {
        height: 40px;
      }

      & span {
        font-size: 15px;
        font-weight: bold;
      }

      &:hover {
        filter: hue-rotate(20deg);
      }
    }

    & .nav-menu {
      flex-grow: 1;
      background-color: white;
      height: 100%;
      border-bottom: 2px solid var(--base-color);
      border-top: 2px solid var(--base-color);
      transition: all 0.3s;

      & .nav-item {
        height: 100%;
        width: 100%;
      }

      & a {
        height: 100%;
        color: var(--base-color);
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        filter: brightness(0.9);
      }

      & .router-link-active {
        text-decoration: underline;
      }
    }

    & .collapse-icon {
      padding: 0;
      font-size: 30px;
      border-style: none;
    }

    & .nav-collapse {
      position: absolute;
      left: 0;
      z-index: 15;
      width: 100vw;
      background-color: var(--base-color);

      & a {
        text-align: center;
        font-size: 0.9em;
        padding: 20px 40px;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 1px solid white;
        transition: all 0.3s;
      }
    }

    & #nav-user {
      height: 100%;
      width: 70px;
      font-size: 25px;
      transition: all 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--base-color);

      & li, a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        filter: hue-rotate(20deg);
      }

      &.active {
        filter: hue-rotate(0);
      }
    }

    & .collapse-user {
      position: absolute;
      right: 0;
      z-index: 15;
      background-color: var(--base-color);
      border: 1px solid var(--base-color);

      & a {
        font-size: 0.9em;
        padding: 20px 40px;
        text-transform: uppercase;
        border-bottom: 1px solid white;
        transition: all 0.3s;

        &:hover {
          background-color: white;
          color: var(--base-color);
        }
      }

      & ul:last-child a {
        border-bottom: none;
      }
    }
  }

</style>
