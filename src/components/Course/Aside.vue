<template>
  <div class="aside">
    <el-row style="margin: 15% 0 10% 0">
      <img v-bind:src="img" style="width: 40px; height: 40px">
      <span style="color: #A40006">Online Judge</span>
    </el-row>
    <el-row>
      <span style="font-size: 30px;font-style: inherit">{{ coinfo.name }}</span>
    </el-row>
    <el-row>
      <span class="subtitle">{{ coinfo.group }}</span>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }" style="font-size: 25px;color: #A40006">Dashboard</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-col :span="5">
        <i class="el-icon-star-on"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }" style="font-size: 25px;color: #A40006">Contest</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
      <span class="subtitle">INSTRUCTOR</span>
    </el-row>
    <el-row v-for="a in coinfo.instructors" :key="a" style="margin-top: 5%">
      <el-col :span="5">
        <i class="el-icon-info"></i>
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
      img: require('../../assets/logo.png'),
      coinfo: {
        name: '',
        group: '',
        instructors: ['']
      }
    }
  },
  props: ['courseinformation'],
  created () {
    this.coinfo = this.courseinformation
  }

}
</script>
<style scoped>
  .subtitle {
    font-size: 15px;
    font-style: italic;
  }
</style>
