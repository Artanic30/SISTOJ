<template>
  <div id="test">
    <v-na></v-na>
    <router-view/>
  </div>
</template>

<script>
import na from '../public/Navigation'

export default {
  name: 'test',
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
