<template>
  <div id="app">
    <v-na></v-na>
    <router-view/>
  </div>
</template>

<script>
import na from '../public/Navigation'

export default {
  name: 'app',
  components: {
    'v-na': na
  }
}
</script>

<style>
  body {
    margin: 0 !important;
  }
</style>
