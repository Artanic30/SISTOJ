<template>
    <div>
      <el-row>
          <el-row style="background-color: #A40006">
            <el-col :span="8">
              <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
            <span style="color: white;font-size: 15px">Online Judge</span>
            </el-col>
            <el-col :span="2" style="float: right"><v-na></v-na></el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="4">
              <el-menu style="float: left;margin-right: 5%;width: 220px;min-height: 1000px;">
                <v-aside :deliverDetail="assignmentDetail"></v-aside>
              </el-menu>
            </el-col>
            <el-col :span="18" style="float: right">
              <v-main style="margin: 5%" :deliverDetail="submission" :deliverInfo="assignmentDetail"></v-main>
            </el-col>
          </el-row>
      </el-row>
    </div>
</template>

<script>
import na from '../../../public/Navigation'
import main from './Main'
import aside from './Aside'

export default {
  data () {
    return {
      img: require('../../../assets/logo.png'),
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
    'v-na': na,
    'v-aside': aside
  },
  methods: {
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
    this.assignmentDetail = this.$store.state.assignments
    console.log(this.$store.state.assignments)
  }
}
</script>
<style scoped>
</style>
