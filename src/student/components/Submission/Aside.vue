<template>
  <div class="aside">
    <el-row class="row-three-forth">
      <el-col>
        <span class="row-main">{{ getCoId }}</span>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col>
        <span class="subtitle">{{ assignmentDetail.name }}</span>
      </el-col>
    </el-row>
    <el-row class="row-three-forth">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
        <router-link :to="{ path: `/home/course/${this.$route.params.course_code}` }" class="sub-title">Assignment</router-link>
      </el-col>
    </el-row>
    <el-row class="row-three-forth">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
        <router-link :to="{ path: `/home/course/${this.$route.params.course_code}/scoreboard/${this.assignmentDetail.name}` }" class="sub-title">Scoreboard</router-link>
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
  }
}
</script>
<style scoped>
  .aside {
    padding: 0 20px 0 20px;
  }
  .subtitle {
    font-size: 20px;
    font-style: italic;
  }
  .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
 }
  .row-three-forth {
    margin-top: 15%;
  }
  .row-main {
    font-size: 30px;
    font-style: inherit;
  }
  .row-half {
    margin-top: 10%;
  }
  .el-icon-menu {
    margin-left: 10px!important;
    margin-top: 3px !important;
    font-size: 20px !important;
  }
</style>
