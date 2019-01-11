<template>
  <div class="aside">
    <el-row style="margin-top: 15%">
      <el-col>
        <span style="font-size: 30px;font-style: inherit">{{ courseId }}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-col>
        <span class="subtitle">{{ assignmentDetail.name }}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15%">
      <el-col :span="5">
        <i class="el-icon-menu" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home/course/'+ this.assignmentDetail.uid}" style="font-size: 25px;">CourseList</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-col :span="5">
        <i class="el-icon-star-on" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="15">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home/course/' + this.assignmentDetail.uid + '/assignment/' + this.assignmentDetail.name }" style="font-size: 25px;color: black!important">Assignment</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15%">
      <el-col :span="5">
        <i class="el-icon-menu" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home/course/' + this.assignmentDetail.uid + '/scoreboard/' + this.assignmentDetail.name }" style="font-size: 25px;">Scoreboard</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
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
      },
      courseId: 'CS110'
    }
  },
  props: ['deliverDetail'],
  created () {
    this.assignmentDetail = this.deliverDetail
  },
  methods: {
  },
  mounted () {
  }

}
</script>
<style scoped>
  .subtitle {
    font-size: 15px;
    font-style: italic;
  }
</style>
