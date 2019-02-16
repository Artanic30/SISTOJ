<template>
  <div>
    <el-row class="row-height" :gutter="2" v-if="this.getAuth">
      <el-col :span="4" class="col-one">
          <el-menu class="menu-only">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="18">
         <v-main :passCoInfo="courseInfo"></v-main>
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
      courseInfo: {}
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
    getID: state => state.baseInfo.uid
  }),
  mounted () {
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `/student/${this.getID}/course/`
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
  .row-height {
    height: 100%;
  }
  .col-one {
    margin-right: 5%;
  }
  .menu-only {
    float: left;
    margin-right: 5%;
    min-width: 100px;
    min-height: 1000px;
  }
  .car {
    margin-top: 10%;
  }
</style>
