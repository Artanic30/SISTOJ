<template>
  <div class="aside">
    <el-row style="margin-top: 15%">
      <el-col>
        <span style="font-size: 30px;font-style: inherit">{{ getCoId }}</span>
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
        <router-link :to="{ path: `/home/course/${this.assignmentDetail.uid}` }" class="sub-title">CourseList</router-link>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15%">
      <el-col :span="5">
        <i class="el-icon-menu" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <router-link :to="{ path: `/home/course/${this.assignmentDetail.uid}/scoreboard/${this.assignmentDetail.name}` }" class="sub-title">Scoreboard</router-link>
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
      }
    }
  },
  props: ['deliverDetail'],
  created () {
    this.assignmentDetail = this.deliverDetail
  },
  computed: {
    getCoId () {
      return this.$store.state.coInfo.name
    }
  },
  mounted () {
  }

}
</script>
<style scoped>
  .subtitle {
    font-size: 20px;
    font-style: italic;
  }
  .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
 }
</style>
