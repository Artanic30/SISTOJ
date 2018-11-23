<template>
  <div class="home">
    <el-row style="float: left;margin: 10px 0 10px 0;width: 100%">
        <span style="font-size: 30px">Your Courses</span>
    </el-row>
    <el-row style="float: left;margin: 10px 0 10px 0;width: 100%">
       <span>{{ semester }}</span>
    </el-row>
     <el-row>
       <el-card class="box-card" v-for="a in TD" :key="a">
          <div slot="header" class="card-title" style="float: left">
           <span>{{ a.name }}</span>
          </div>
          <div class="text item">
            <span>{{ a.address }}</span>
          </div>
          <div class="bottom" style="float: left">
            <span>状态栏</span>
          </div>
       </el-card>
     </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      semester: 'Fall 2018',
      TD: [{
        name: 'cs100',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: 'cs101',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: 'cs102',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .text {
    font-size: 14px;
  }
  .box-card {
    font-size: 30px;
    width: 480px;
    height:500px;
    background-color: #D3DCE6;
  }
</style>
