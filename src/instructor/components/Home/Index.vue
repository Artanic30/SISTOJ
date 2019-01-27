<template>
  <div class="test">
    <el-button @click="test">233</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    test () {
      this.$router.push('add')
    }
  }
}
</script>
<style scoped>
</style>
