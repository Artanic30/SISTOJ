<template>
  <div class="aside">
    <div class="logo1" style="margin: 10% 0 10% 0">
      <img v-bind:src="img" style="width: 40px; height: 40px">
      <span style="color: #A40006">Online Judge</span>
    </div>
    <div class="title1">
      <span >Your Courses</span>
    </div>
    <div class="content1">
      <span>{{msg}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Shanghai Tech online judge! Click on one of your courses to the right, or on the Account menu above.',
      img: require('../../assets/logo.png')
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
</style>
