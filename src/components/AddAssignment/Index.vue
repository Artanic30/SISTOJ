<template>
    <div>
      <el-row style="background-color: #A40006">
        <el-col :span="8">
            <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
            <span style="color: white;font-size: 15px">Online Judge</span>
        </el-col>
        <el-col :span="2" style="float: right"><v-nav></v-nav></el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :span="4">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="float: left;margin: 0 5% 0 0">
            <v-aside></v-aside>
        </el-menu>
        </el-col>
        <el-col :span="18" style="float: right;">
            <v-state v-if="change" v-on:changeState="changeState"></v-state>
            <v-add v-if="!change"></v-add>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import nav from '../Navigation'
import state from './State'
import aside from './Aside'
import add from './Add'

export default {
  data () {
    return {
      img: require('../../assets/logo.png'),
      change: true
    }
  },
  components: {
    'v-nav': nav,
    'v-state': state,
    'v-aside': aside,
    'v-add': add
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeState: function (value) {
      this.change = value
    }
  },
  mounted () {
    console.log(this.change)
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 100px;
    min-height: 1000px;
    max-width: 180px;
  }
</style>
