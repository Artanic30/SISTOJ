<template>
  <div>
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
import na from '../../../public/Navigation'
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
    'v-na': na,
    'v-aside': aside
  },
  computed: {
    getAuth () {
      return this.$store.state.authorized
    },
    getID () {
      return this.$store.state.student_id
    }
  },
  created () {
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `/instructor/${this.getID}/course/`
      }).then((response) => {
        if (response.status === 200) {
          this.courseInfo = response.data
        } else {
          // （todo: 跳转报错页面（%参数加上当前页面地址)） 未测试
          this.$router.push({path: '/404', query: { path: this.$route.path }})
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
