<template>
    <div class="aside">
      <el-row class="row-one">
        <el-col>
          <span class="title-main">Welcome</span>
        </el-col>
      </el-row>
      <el-row class="row-quarter">
        <el-col>
          <span class="title-instr">instructor<br>{{ name }}</span>
        </el-col>
      </el-row>
      <el-row class="row-quarter" type="flex" align="middle" justify="center">
        <el-col>
          <span class="title-msg">You can check all the judges here and manage your judges.</span>
        </el-col>
      </el-row>
      <el-row class="row-half">
        <el-col :span="5">
          <i class="el-icon-menu"></i>
        </el-col>
        <el-col :span="15">
          <router-link :to="{ path: `/instr`}" class="sub-title">Dashboard</router-link>
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
  }
}
</script>

<style scoped>
  .aside {
    padding: 0 20px 0 20px;
  }
 .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
 }
  .row-one {
    margin-top: 20%;
  }
  .title-main {
    margin-top: 20px;
    font-size: 50px;
  }
  .row-quarter {
    margin-top: 5%;
  }
  .title-instr {
    font-size: 150%;
    margin-top: 30px;
  }
  .title-msg {
    margin-top: 5%;
    font-size: 20px;
  }
  .row-half {
    margin-top: 10%;
  }
  .el-icon-menu {
    margin: 3px 0 0 10px!important;
    font-size: 20px !important;
  }
</style>
