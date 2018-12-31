<template>
    <div>
      <el-row :gutter="16">
        <el-col :span="4" style="float: left;"><span>Release: {{assignmentDetail.release_date}}</span></el-col>
        <el-col :span="4" style="float: right;"><span>Deadline: {{assignmentDetail.deadline}}</span></el-col>
      </el-row>
      <el-row>
      </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      assignmentDetail: {
        uid: '',
        course_uid: '',
        name: '',
        deadline: 0,
        release_date: 0,
        descr_link: ''
      }
    }
  },
  created () {
    this.assignmentDetail = this.deliverDetail
  }
}
</script>

<style scoped>

</style>
