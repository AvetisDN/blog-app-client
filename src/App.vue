<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    background-color: #f4f5f7;
    padding: 30px 0;
  }
  .is-danger {
    color: #a44;
  }
  input.is-danger {
    box-shadow: rgba(170, 68, 68, .7) 0 0 3px !important;
  }
</style>