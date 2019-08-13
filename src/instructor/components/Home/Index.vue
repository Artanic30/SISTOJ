<template>
  <div>
    <el-row class="row-main" :gutter="2" v-if="this.getAuth">
      <el-col :span="5" class="col-quarter">
          <el-menu class="el-menu-vertical-demo">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="17">
        <v-main :passCoInfo="courseInfo" :passShow="show"></v-main>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col class="car">
        <v-car></v-car>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import na from '../../../public/Navigation'
import main from '../../../public/MainCourse'
import aside from './Aside'
import { mapState } from 'vuex'
import car from '../../../public/Carousel'

export default {
  data () {
    return {
      courseInfo: [],
      show: false
    }
  },
  components: {
    'v-main': main,
    'v-na': na,
    'v-aside': aside,
    'v-car': car
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getBase: state => state.baseInfo,
    getState: state => state.baseInfo.isInstructor,
    Api: state => state.api
  }),
  created () {
    this.axios({
      method: 'GET',
      url: `${this.Api}/instructor/${this.getBase.uid}/course/`
    }).then((response) => {
      this.courseInfo = response.data
      if (response.data.length === 0) {
        this.show = true
      }
    }).catch((err) => {
      this.$message({
        type: 'error',
        message: err,
        showClose: true
      })
    })
  }
}
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 100px;
    min-height: 1000px;
  }
  .row-main {
    height: 100%;
  }
  .el-menu-vertical-demo {
    float: left!important;
    margin: 0 5% 0 0!important;
  }
  .col-quarter {
    margin-right: 5%;
  }
  .car {
    margin-top: 10%;
  }
</style>
