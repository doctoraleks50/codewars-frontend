<template>
  <main id="root">
    <the-header></the-header>
    <router-view class="content"></router-view>
  </main>
</template>

<script>
import TheHeader from './components/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>

<style lang='scss'>
@import "~bootstrap";
@import '~bootstrap-vue';
@import "./styles/reset.css";
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');

#root {
  min-height: 100vh;
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  flex-direction: column;
  --base-color: rgb(0, 120, 255);

  .content {
    flex-grow: 1;
  }

  & h1 {
    font-size: 2em;
    padding: 5px 20px;
  }
}
</style>
