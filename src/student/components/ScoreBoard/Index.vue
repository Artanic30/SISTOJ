<template>
  <div class="index">
    <el-row style="background-color: #A40006">
      <el-col :span="8">
          <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
          <span style="color: white;font-size: 15px">Online Judge</span>
      </el-col>
      <el-col :span="2" style="float: right"><v-nav></v-nav></el-col>
    </el-row>
    <el-row style="height: 100%" :gutter="2">
      <el-col :span="4" style="margin-right: 10%">
          <el-menu style="float: left;margin-right: 5%;width: 200px;min-height: 400px;">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="16">
         <v-main></v-main>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import nav from '../../../public/Navigation'
import main from './Main'
import aside from './Aside'

export default {
  data () {
    return {
      img: require('../../../assets/logo.png'),
      coInfo: {
      },
      scoreInfo: [
      ]
    }
  },
  components: {
    'v-main': main,
    'v-nav': nav,
    'v-aside': aside
  },
  methods: {
  },
  created () {
    this.coInfo = this.$store.state.coInfo
  }
}
</script>
<style scoped>
</style>
