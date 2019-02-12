<template>
    <div>
      <el-row class="row-one">
        <el-col>
          <span class="title-welcome">Welcome</span>
        </el-col>
      </el-row>
      <el-row class="row-quarter">
        <el-col>
          <span class="title-instr">instructor<br>{{ name }}</span>
        </el-col>
      </el-row>
      <el-row class="row-quarter" type="flex" align="middle" justify="center">
        <el-col>
          <span class="title-msg">You can check students' assignments state and add new assignment here</span>
        </el-col>
      </el-row>
      <el-row class="row-half">
        <el-col :span="5">
          <i class="el-icon-menu"></i>
        </el-col>
        <el-col :span="15">
          <router-link :to="{ path: `/`}" class="sub-title">Dashboard</router-link>
        </el-col>
      </el-row>
      <el-row class="row-half">
        <el-col :span="5">
          <i class="el-icon-menu"></i>
        </el-col>
        <el-col :span="15">
          <router-link :to="{ path: `/home/course/${this.getCourseUid}` }" class="sub-title">Student List</router-link>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    getCourseUid () {
      return this.$store.state.coInfo.uid
    }
  }
}
</script>

<style scoped>
 .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
 }
  .title-welcome {
    margin-top: 20px;
    font-size: 200%;
  }
  .row-one {
    margin-top: 20%;
  }
  .row-quarter {
    margin-top: 5%;
  }
  .row-half {
    margin-top: 10%;
  }
  .title-instr {
    font-size: 150%;
    margin-top: 5%;
  }
  .title-msg {
    margin-top: 5%;
    font-size: 20px;
  }
  .el-icon-menu {
    margin: 5px 0 0 10px!important;
  }
</style>
