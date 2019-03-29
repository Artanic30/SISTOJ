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
    <el-row class="row-one" v-if="checkRole">
      <el-col>
        <span class="title">Tips:</span>
      </el-col>
    </el-row>
    <el-row v-if="checkRole">
      <el-col>
        <span class="content1">Since you are instructor and student in the meantime, version switch is available in the account menu.</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      msg: 'Welcome to Shanghai Tech online judge! Click on one of your courses to the right, or on the Account menu above.'
    }
  },
  computed: mapState({
    getBase: state => state.baseInfo,
    checkRole () {
      return this.getBase.isInstructor && this.getBase.isStudent
    }
  })
}
</script>
<style>
  .aside {
    display:flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
    padding: 0 20px 0 20px;
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
  .title {
    font-size: 30px;
  }
</style>
