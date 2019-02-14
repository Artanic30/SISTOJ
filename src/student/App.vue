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
<<<<<<< HEAD
=======
  html {
  }
>>>>>>> parent of 59b5e78... add root font-size and the texts'size won't change with the browser
</style>
