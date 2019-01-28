<template>
  <div class="aside">
    <el-row style="margin-top: 40px">
      <el-col>
        <span style="font-size: 30px;font-style: inherit">{{ coInfo.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="subtitle">{{ coInfo.code }}</span>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home' }" style="font-size: 25px;">DashBoard</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-col>
        <span class="subtitle">INSTRUCTOR</span>
      </el-col>
    </el-row>
    <el-row v-for="a in coInfo.instructor" :key="a" style="margin-top: 5%">
      <el-col :span="6">
        <i class="el-icon-info" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <span style="font-size: 15px">{{ a }}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: require('../../../assets/logo.png'),
      coInfo: {
      }
    }
  },
  created () {
    this.coInfo = this.$store.state.coInfo
  }
}
</script>
<style scoped>
  .mt-10percent {
    margin-top: 10%;
  }
  .aside {
    padding-left: 4%;
  }
  .subtitle {
    font-size: 15px;
    font-style: italic;
  }
</style>
