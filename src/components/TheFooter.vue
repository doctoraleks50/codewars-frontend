<template>
  <footer class="the-footer mb-3">
    <b-container class="bv-example-row p-0 w-75" fluid>
      <b-row>
        <b-col md="4" sm="12" class="item">
          <span>Codewars API</span>
        </b-col>
        <b-col md="4" sm="12" class="item">
          <span>2019 Codewars</span>
        </b-col>
        <b-col md="4" sm="12" class="item">
          <span>customsmobile team</span>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang='scss' scoped>
  .the-footer {
    display: flex;
    align-items: center;

    & .item {
      display: flex;
      justify-content: center;

      & span {
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
</style>
