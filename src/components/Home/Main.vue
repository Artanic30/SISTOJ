<template>
  <div class="home">
    <el-row style="float: left;margin: 4% 0 10px 0;width: 100%">
      <el-col>
        <span style="font-size: 30px">Your Courses</span>
      </el-col>
    </el-row>
    <el-row style="float: left;margin: 4% 0 10px 0;width: 100%">
      <el-col>
         <span style="font-size: 20px">{{ courseInfo[0].semester + ' ' + courseInfo[0].year }}</span>
      </el-col>
    </el-row>
       <el-card class="box-card" v-for="a in courseInfo" :key="a.uid" style="height: 250px;width: 400px;margin: 3% 2% 5% 0">
         <el-button style="background-color: #fff1f1;height: 250px;width: 400px;padding: 0 0 0 0;" @click="toCourse(a.uid)">
                <el-row style="margin: 20px 0 10px 4%">
                  <span style="float: left;font-size: 40px;font-style: inherit">{{ a.name }}</span>
                </el-row>
                <el-row style="height: 100px;margin: 20px 0 0 4%">
                    <span style="font-style: italic;float: left">{{ a.code }}</span>
                </el-row>
                <el-row style="background-color: black;height: 80px" type="flex">
                    <span style="margin: 30px 0 0 4%;color: white" v-for="b in a.instructor" :key="b">{{ b }}</span>
                </el-row>
         </el-button>
       </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      courseInfo: [{
        uid: 'b3b17c00f16511e8b',
        name: 'CS100',
        code: 'programming 1',
        semester: 'Fall',
        year: 2017,
        homepage: 'https://shtech.org/course/si100c/17f/',
        instructor: ['keenan', 'jackson']
      }],
      student_id: 0
    }
  },
  methods: {
    toCourse (path) {
      this.$router.push('home/course/' + path)
    }
  },
  created () {
    if (this.$store.state.authorized === true) {
      this.axios({
        method: 'GET',
        url: `/student/${this.$store.state.student_id}/course/`
      }).then((response) => {
        if (response.status === 403) {
          this.$notify.error({
            'message': '无法获得信息',
            'title': 'Error'
          })
        } else {
          this.courseInfo = response.data
        }
      })
    }
    this.$store.commit('changeSemester', this.courseInfo[0].semester)
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
