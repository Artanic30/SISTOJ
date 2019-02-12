<template>
  <div class="aside">
    <el-row style="margin-top: 20px">
      <el-col>
        <span class="title1">Your Courses</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 5%">
      <el-col>
        <span style="font-family: inherit;font-size: 20px">Instructor {{ this.$store.state.coInfo.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="content1">
          <span class="message">{{msgWelcome}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="content1">
          <span class="message">{{judge}}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
        <el-col :span="5">
          <i class="el-icon-menu" style="margin: 5px 0 0 10px"></i>
        </el-col>
        <el-col :span="15">
          <router-link :to="{ path: '/judge'}" class="sub-title">Judges</router-link>
        </el-col>
      </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msgWelcome: 'Welcome to Shanghai Tech online judge! Click on one of your courses to the right, or on the Account menu above.',
      judge: 'You can manage all of your judges here:'
    }
  }
}
</script>
<style>
  .aside {
    display:flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
  }
  .title1 {
    font-size: 35px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .content1 {
    margin-top: 20px;
    font-size: 15px;
  }
  .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
  }
  .message {
    font-size: 18px;
  }
</style>
