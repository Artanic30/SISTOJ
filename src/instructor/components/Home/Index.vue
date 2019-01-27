<template>
  <div>
    <el-row style="background-color: #A40006">
      <el-col :span="8">
          <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
          <span style="color: white;">Online Judge</span>
      </el-col>
      <el-col :span="2" style="float: right" v-if="this.$store.state.authorized">
        <v-nav></v-nav>
      </el-col>
    </el-row>
    <el-row style="height: 100%" :gutter="2">
      <el-col :span="4" style="margin-right: 5%">
          <el-menu class="el-menu-vertical-demo" style="float: left;margin: 0 5% 0 0">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="18">
         <v-main :passCoInfo="courseInfo"></v-main>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import nav from '../../../public/Navigation'
import main from '../../../public/MainCourse'
import aside from './Aside'

export default {
  data () {
    return {
      img: require('../../../assets/logo.png'),
      courseInfo: {}
    }
  },
  components: {
    'v-main': main,
    'v-nav': nav,
    'v-aside': aside
  },
  methods: {
  },
  created () {
    if (this.$store.state.authorized) {
      this.axios({
        method: 'GET',
        url: `/instructor/${this.$store.state.student_id}/course/`
      }).then((response) => {
        if (response.status === 403) {
          // todo: 跳转报错页面（%参数加上当前页面地址）
        } else {
          this.courseInfo = response.data
        }
      })
    }
  }
}
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 100px;
    min-height: 1000px;
  }
</style>
