<template>
    <div>
      <el-row style="margin-top: 20%">
        <el-col>
          <span style="margin-top: 20px;font-size: 200%;">Welcome</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%">
        <el-col>
          <span style="font-size: 150%;margin-top: 5%">instructor<br>{{ name }}</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%" type="flex" align="middle" justify="center">
        <el-col>
          <span style="margin-top: 5%;font-size: 20px">You can check students' assignments state and add new assignment here</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10%">
        <el-col :span="5">
          <i class="el-icon-menu" style="margin: 5px 0 0 10px"></i>
        </el-col>
        <el-col :span="15">
          <router-link :to="{ path: `/`}" class="sub-title">Dashboard</router-link>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10%">
        <el-col :span="5">
          <i class="el-icon-menu" style="margin: 5px 0 0 10px"></i>
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
</style>
