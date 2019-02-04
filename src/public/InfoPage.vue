<template>
    <div>
      <el-row style="background-color: #A40006">
        <el-col :span="24">
          <v-na></v-na>
        </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="4" align="middle">
        <el-menu class="midway">
          <img v-bind:src="img2" class="Img" v-if="getState">
          <img v-bind:src="img" class="Img" v-else>
        </el-menu>
      </el-col>
      <el-col :span="18">
      </el-col>
    </el-row>
    </div>
</template>

<script>
import na from './Navigation'

export default {
  data () {
    return {
      img: require('../assets/student.jpg'),
      img2: require('../assets/instructor.jpg')
    }
  },
  components: {
    'v-na': na
  },
  computed: {
    getState () {
      return this.$store.state.instructor
    }
  }
}
</script>

<style scoped>
.midway {
  min-height: 1000px;
}
  .Img {
    height: 150px;
  }
</style>
