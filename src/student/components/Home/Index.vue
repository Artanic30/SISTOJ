<template>
  <div>
    <el-row style="background-color: #A40006">
      <el-col :span="8">
          <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
          <span style="color: white;">Online Judge</span>
      </el-col>
      <el-col :span="2" style="float: right" v-if="authorized">
        <v-nav></v-nav>
      </el-col>
    </el-row>
    <el-row style="height: 100%" :gutter="2">
      <el-col :span="4" style="margin-right: 5%">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="float: left;margin: 0 5% 0 0">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="18">
         <v-main></v-main>
      </el-col>
    </el-row>
    <!--
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">   todo:展开收缩
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    -->
  </div>
</template>
<script>
import nav from '../Navigation'
import main from './Main'
import aside from './Aside'

export default {
  data () {
    return {
      isCollapse: false,
      img: require('../../../assets/logo.png'),
      authorized: true,
      uid: 2018233
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
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 100px;
    min-height: 1000px;
  }
</style>
