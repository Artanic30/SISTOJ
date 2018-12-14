<template>
  <div class="home">
    <el-row style="float: left;margin: 4% 0 10px 0;width: 100%">
        <span style="font-size: 30px">Your Courses</span>
    </el-row>
    <el-row style="float: left;margin: 4% 0 10px 0;width: 100%">
       <span style="font-size: 20px">{{ semester }}</span>
    </el-row>
       <el-card class="box-card" v-for="a in courseInfo" :key="a" style="height: 250px;width: 400px;margin: 3% 2% 5% 0">
         <el-button style="background-color: #fff1f1;height: 250px;width: 400px;padding: 0 0 0 0;" @click="toCourse(a.course_id)">
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
import axios from 'axios'

export default {
  data () {
    return {
      semester: '', // wait untill api is settled todo:change variable name //
      courseInfo: [{
        name: 'CS100',
        group: 'programming 1',
        state: '4assignment',
        course_id: 110
      }, {
        name: 'CS101',
        group: 'programming 2',
        state: '4assignment',
        course_id: 120
      }, {
        name: 'CS102',
        group: 'programming 3',
        state: '4assignment',
        course_id: 130
      }],
      id: 2333,
      student_id: 0
    }
  },
  methods: {
    toCourse (path) {
      this.$router.push('/student/' + this.student_id + '/course/' + path)
    }
  },
  mounted: function () {
    this.semester = this.$store.state.semester
    this.student_id = this.$store.state.student_id
    axios({
      method: 'GET',
      url: this.GetApi + 'clubs/profile',
      params: {
        ClubId: this.ClubId
      }
    }).then(function (response) {
      if (response.data.message === 'success') {
        this.Club = response.data.data
      } else {
        this.$notify.error({
          'message': '无法获得社团信息',
          'title': 'Error'
        })
      }
    }.bind(this))
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
