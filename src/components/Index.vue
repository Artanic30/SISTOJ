<template>
  <div class="index">
    <el-container>
      <el-header >
        <v-nav class="nav"></v-nav>        <!-- todo:小屏幕按钮超出  -->
      </el-header>
      <el-container>
        <el-aside width="200px">
          <v-aside></v-aside>
        </el-aside>
        <div class="black"></div>
        <el-main>
          <v-home></v-home>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import nav from './Navigation'
import home from './Home'
import aside from './Aside'

export default {
  data () {
    return {
    }
  },
  components: {
    'v-home': home,
    'v-nav': nav,
    'v-aside': aside
  }
}
</script>
<style>
  .index {
    display: flow;
    height: 100%;
  }
  .el-header {
    display: flex;
    line-height: 10%;
    background-color: #A40006;
    padding-right: 0;
    padding-left: 0;
  }
  .el-aside {
    display:flex;
    width: 20%!important;
    justify-content: center;
    background-color: #D3DCE6;
    color: #333;
    line-height: 100px;
  }
  .black {
    background-color: black;
    width: 2px;
  }
  .el-main {
    text-align: center;
    line-height: 30%;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 100%;
  }
  .nav {
    padding-left: 90%!important;
    padding-right: 5%;
  }
</style>
