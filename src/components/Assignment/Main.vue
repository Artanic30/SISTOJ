<template>
    <div>
      <el-row>
        <el-card shadow="always">
        <el-row :gutter="8" style="margin: 1% 15% 3% 0">
          <el-col :span="4" style="float: left;margin-left: 20%"><span>Release Date:</span><spna>{{ assignmentDetail.release_date }}</spna></el-col>
          <el-col :span="4" style="float: right;"><span>Deadline: {{ assignmentDetail.deadline }}</span></el-col>
        </el-row>
        <el-row style="margin: 0 15% 1% 0">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage" status="success" style="margin-left: 20%"></el-progress>
        </el-row>
      </el-card>
      </el-row>
      <el-row style="margin-top: 2%">
        <el-card shadow="always">
          <el-row class="seCard">
            <span style="font-style: inherit;font-size: 30px">{{ assignmentDetail.name }}</span>
          </el-row>
          <el-row class="seCard">
            <span style="font-size: 15px">Check the detail description of the assignment by click the link below:</span>
          </el-row>
          <el-row class="seCard">
            <a v-bind:href="assignmentDetail.descr_link">{{ assignmentDetail.descr_link }}</a>
          </el-row>
        </el-card>
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
  computed: {
    getPercentage () {
      var myDate = new Date()
      // let result = (this.deadline - myDate.toLocaleTimeString()) / (this.deadline - this.release_date) * 100
      console.log(myDate.toLocaleTimeString())
      return 55
      // todo:show the right percentage
    }
  },
  props: ['deliverDetail'],
  created () {
    this.assignmentDetail = this.deliverDetail
  }
}
</script>

<style scoped>
  .seCard{
    margin: 1% 0 3% 5%;
  }
</style>
