<template>
  <div class="aside">
    <el-row class="row-two">
      <el-col>
        <span class="title-main">{{ coInfo.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="subtitle">{{ coInfo.code }}</span>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
        <router-link :to="{ path: `/`}" class="sub-title">Dashboard</router-link>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
          <router-link :to="{ path: `/home/course/${this.coInfo.uid}/assignment`}" class="sub-title">Assignments</router-link>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
          <router-link :to="{ path: `/home/course/${this.coInfo.uid}/`}" class="sub-title">Student List</router-link>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
          <router-link :to="{ path: `/home/course/${this.coInfo.uid}/judge`}" class="sub-title">Judges List</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coInfo: {
      }
    }
  },
  created () {
    this.coInfo = this.getCoInfo
  },
  computed: {
    getCoInfo () {
      return this.$store.state.coInfo
    }
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
  .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
 }
  .row-two {
    margin-top: 40px;
  }
  .title-main {
    font-size: 30px;
    font-style: inherit;
  }
  .el-icon-menu {
    margin-left: 10px!important;
    margin-top: 8px!important;
  }
</style>
