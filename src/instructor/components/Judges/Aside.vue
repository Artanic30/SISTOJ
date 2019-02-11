<template>
    <div>
      <el-row style="margin-top: 20%">
        <el-col>
          <span style="margin-top: 20px;font-size: 200%;">Welcome</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%">
        <el-col>
          <span style="font-size: 150%;margin-top: 5%">instructor<br>{{ name }}</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%" type="flex" align="middle" justify="center">
        <el-col>
          <span style="margin-top: 5%;font-size: 20px">You can check all the judges here and manage your judges.</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10%">
        <el-col :span="5">
          <i class="el-icon-menu" style="margin: 5px 0 0 10px"></i>
        </el-col>
        <el-col :span="15">
          <span @click="backDashboard" class="sub-title">Dashboard</span>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    backDashboard () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
 .sub-title {
   font-size: 25px;
 }
</style>
