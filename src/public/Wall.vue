<template>
  <div style="background: #303133;height: 1000px;">
    <el-row style="background-color: #A40006">
      <el-col :span="8">
          <img v-bind:src="img" style="width: 100px;height: 30px;margin: 14px 20px 0 20px">
          <span style="color: white;">Online Judge</span>
      </el-col>
      <el-col :span="2" style="float: right" v-if="getAuth">
        <v-na></v-na>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="margin-left: 45%">
        <span style="color: white;font-size: 70px;">4 0 4</span>
      </el-col>
    </el-row>
    <el-row style="margin: 1% 10% 0 35%">
          <el-card class="cards">
              <el-row>
                <el-col :span="12">
                  <img class="img" v-bind:src="img2">
                </el-col>
                <el-col :span="12" style="margin-top: 10%;">
                  <span class="words">Page was gone.....</span>
                </el-col>
              </el-row>
              <el-row style="margin: 70px 0 0 50px" :gutter="6">
                <el-col :span="10">
                  <router-link class="link" :to="{ path: '/'}">Dashboard</router-link>
                </el-col>
                <el-col :span="8" class="link2">
                  <router-link class="link" :to="{ path: this.$route.query.path}">Go back</router-link>
                </el-col>
              </el-row>
          </el-card>
    </el-row>
  </div>
</template>
<script>
import na from './Navigation'
export default {
  data () {
    return {
      img: require('../assets/logo.png'),
      img2: require('../assets/404.jpg')
    }
  },
  components: {
    'v-na': na
  },
  computed: {
    getAuth () {
      return this.$store.state.authorized
    }
  }
}
</script>
<style scoped>
  .words{
    display: flex;
    font-size: 50px;
    flex-wrap: nowrap!important;
    margin-top: 10%;
  }
  .link {
    font-size: 30px;
    color: black;
  }
  .cards {
    height: 400px;
    width: 400px;
  }
  .img {
    height: 150px!important;
    margin: 50px 0 0 30px;
  }
  .link2 {
    float: right;
    margin-right: 40px;
  }
</style>
