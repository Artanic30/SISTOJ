<template>
    <div>
       <el-row style="background-color: #A40006">
        <el-col :span="8">
            <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
            <span style="color: white;font-size: 15px">Online Judge</span>
        </el-col>
        <el-col :span="2" style="float: right"><v-nav></v-nav></el-col>
      </el-row>
    </div>
</template>

<script>
import nav from '../Navigation'
import main from './Main'
import aside from '../Course/Aside'

export default {
  data () {
    return {
      img: require('../../assets/logo.png'),
      isCollapse: false
    }
  },
  components: {
    'v-main': main,
    'v-nav': nav,
    'v-aside': aside
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
