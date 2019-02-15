<template>
  <div class="aside">
    <el-row class="row-one">
      <el-col>
        <span class="title1">Your Courses</span>
      </el-col>
    </el-row>
    <el-col>
      <div class="content1">
      <span>{{msg}}</span>
    </div>
    </el-col>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Shanghai Tech online judge! Click on one of your courses to the right, or on the Account menu above.'
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
    font-size: 30px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .content1 {
    margin-top: 20px;
    font-size: 15px;
  }
  .row-one {
    margin-top: 20px;
  }
</style>
