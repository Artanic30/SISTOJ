<template>
    <div>
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
    </div>
</template>

<script>
import na from '../../../public/Navigation'
import main from './Main'
import aside from './Aside'

export default {
  data () {
    return {
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
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `/student/${this.getID}/course/${this.getID}/assignment/${this.getID}/history/`
      }).then((response) => {
        if (response.status === 403) {
          // todo: 跳转报错页面（%参数加上当前页面地址）
        } else {
          this.submission = response.data
        }
      })
    }
    this.assignmentDetail = this.$store.state.assignments
  },
  computed: {
    getID () {
      return this.$store.state.student_id
    },
    getAuth () {
      return this.$store.state.isAuthorized
    }
  }
}
</script>
<style scoped>
</style>
