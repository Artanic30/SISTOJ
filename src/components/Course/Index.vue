<template>
  <div class="index">
    <el-row style="background-color: #A40006">
      <el-col :span="8">
          <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
          <span style="color: white;font-size: 15px">Online Judge</span>
      </el-col>
      <el-col :span="2" style="float: right"><v-nav></v-nav></el-col>
    </el-row>
    <el-row style="height: 100%" :gutter="20">
      <el-col :span="4" style="margin-right: 10%">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="float: left;margin: 0 5% 0 0">
            <v-aside :courseinformation="coinfo"></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="16">
         <v-main :coursestate="costate" :courseinformation="coinfo"></v-main>
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
      img: require('../../assets/logo.png'),
      isCollapse: false,
      coinfo: {
        name: 'CS100',
        group: 'programming',
        instructors: ['Zhongkai Liu', 'Zhongkai Liu'],
        semester: 'Fall 2018'
      },
      costate: [{
        name: '编程第一次作业',
        state: 'Submitted',
        release: 'NOV 01',
        due: 'NOV 12 T 12:00AM'
      }, {
        name: '编程第一次作业',
        state: 'Ongoing',
        release: 'NOV 01',
        due: 'NOV 12 T 12:00AM'
      }, {
        name: '编程第一次作业',
        state: '59/100',
        release: 'NOV 01',
        due: 'NOV 12 T 12:00AM'}]
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
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;

  }
</style>
