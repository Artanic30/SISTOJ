<template>
  <div class="aside">
    <el-row style="margin-top: 40px;">
      <span style="font-size: 30px;font-style: inherit">{{ coInfo.name }}</span>
    </el-row>
    <el-row>
      <span class="subtitle">{{ coInfo.group }}</span>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }" style="font-size: 25px;">DashBoard</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-star-on" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="15">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/score' }" style="font-size: 25px;color: black!important">ScoreBoard</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <span class="subtitle">INSTRUCTOR</span>
    </el-row>
    <el-row v-for="a in coInfo.instructors" :key="a" style="margin-top: 5%">
      <el-col :span="5">
        <i class="el-icon-info" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <span style="font-size: 15px">{{ a }}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: require('../../assets/logo.png'),
      coInfo: {
        name: '',
        group: '',
        instructors: [''],
        semester: 'Fall 2018'
      }
    }
  },
  props: ['courseInformation'],
  created () {
    this.coInfo = this.courseInformation
  }

}
</script>
<style scoped>
  .mt-10percent {
    margin-top: 10%;
  }
  .aside {
    padding-left: 4%;
  }
  .subtitle {
    font-size: 15px;
    font-style: italic;
  }
</style>
