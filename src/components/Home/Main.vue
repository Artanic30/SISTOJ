<template>
  <div class="home">
    <el-row style="float: left;margin: 4% 0 10px 0;width: 100%">
        <span style="font-size: 30px">Your Courses</span>
    </el-row>
    <el-row style="float: left;margin: 4% 0 10px 0;width: 100%">
       <span style="font-size: 20px">{{ semester }}</span>
    </el-row>
       <el-card class="box-card" v-for="a in courseinfo" :key="a" style="height: 250px;width: 400px;margin: 3% 2% 5% 0">
         <el-button style="background-color: #fff1f1;height: 250px;width: 400px;padding: 0 0 0 0;" @click="tocourse()">
                <el-row style="margin: 20px 0 10px 4%">
                  <span style="float: left;font-size: 40px;font-style: inherit">{{ a.name }}</span>
                </el-row>
                <el-row style="height: 100px;margin: 20px 0 0 4%">
                    <span style="font-style: italic;float: left">{{ a.group }}</span>
                </el-row>
                <el-row style="background-color: black;height: 80px" type="flex">
                    <span style="margin: 30px 0 0 4%;color: white">{{ a.state }}</span>
                </el-row>
         </el-button>
       </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      semester: 'Fall 2018', // wait untill api is settled todo:change variable name //
      courseinfo: [{
        name: 'CS100',
        group: 'programming 1',
        state: '4assignment'
      }, {
        name: 'CS101',
        group: 'programming 2',
        state: '4assignment'
      }, {
        name: 'CS102',
        group: 'programming 3',
        state: '4assignment'
      }]
    }
  },
  methods: {
    tocourse () {
      this.$router.push('/course')
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
</style>
