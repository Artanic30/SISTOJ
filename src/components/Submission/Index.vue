<template>
    <div>
      <el-row>
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
                <v-aside :deliverDetail="assignmentDetail"></v-aside>
              </el-menu>
            </el-col>
            <el-col :span="18" style="float: right">
              <v-main style="margin: 5% 5% 5% 5%" :deliverDetail="submission" :deliverInfo="assignmentDetail"></v-main>
            </el-col>
          </el-row>
      </el-row>
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
      submission: [
      ],
      assignmentDetail: {
        uid: 'b3b17c00f16511e8b3dfdca9047a0f14',
        course_uid: 'b3b17c00f16511e8b3dfdca9047a0f14',
        name: 'Homework1: Postfix Calculator',
        deadline: 157000100,
        release_date: 157000000,
        descr_link: 'https://shtech.org/course/si100c/17f/hw/1'
      }
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
  },
  created () {
    if (this.$store.state.authorized) {
      this.axios({
        method: 'GET',
        url: `/student/${this.$store.state.student_id}/course/${this.$store.state.student_id}/assignment/${this.$store.state.student_id}/history/`
      }).then((response) => {
        if (response.status === 403) {
          // todo: 跳转报错页面（%参数加上当前页面地址）
        } else {
          this.submission = response.data
        }
      })
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 1000px;
  }
</style>
