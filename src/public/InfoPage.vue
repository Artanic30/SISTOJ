<template>
    <div>
      <el-row style="background-color: #A40006">
        <el-col :span="24">
          <v-na></v-na>
        </el-col>
    </el-row>
    </div>
</template>

<script>
import na from './Navigation'

export default {
  data () {
    return {
    }
  },
  components: {
    'v-na': na
  }
}
</script>

<style scoped>

</style>
