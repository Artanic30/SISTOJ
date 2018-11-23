<template>
  <div class="home">
    <div class="head">
      <h1>Your Courses </h1>
    </div>
    <div class="head">
      <h1>{{semester}}</h1>
    </div>
    <el-card class="box-card" v-for="a in TD" :key="a">
      <div slot="header" class="card-title" style="float: left">
       <span>{{a.name}}</span>
      </div>
      <div class="text item">
        <span>{{a.address}}</span>
      </div>
      <div class="bottom" style="float: left">
        <span>状态栏</span>
      </div>
    </el-card>
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
  .head{
    display: flex;
    justify-content: left;
    width: 100%;
    font-size: 25px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .box-card {
    font-size: 30px;
    width: 480px;
    height:500px;
    background-color: #D3DCE6;
  }
  .card-title {

  }
  .bottom {
    background-color: #5daf34;
  }
</style>
