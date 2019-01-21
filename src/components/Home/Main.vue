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
         <el-button style="background-color: #fff1f1;height: 250px;width: 400px;padding: 0 0 0 0;" @click="toCourse(a)">
                <el-row style="margin: 20px 0 10px 4%">
                  <span style="float: left;font-size: 40px;font-style: inherit">{{ a.name }}</span>
                </el-row>
                <el-row style="height: 100px;margin: 20px 0 0 4%">
                    <span style="font-style: italic;float: left">{{ a.code }}</span>
                </el-row>
                <el-row style="background-color: black;height: 80px" type="flex">
                    <span style="margin: 30px 0 0 4%;color: white">{{ a.instructor[0] }} {{ a.instructor[1] }}</span>
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
        uid: '',
        name: '',
        code: '',
        semester: '',
        year: 0,
        homepage: '',
        instructor: ['']
      }],
      student_id: 0
    }
  },
  methods: {
    toCourse (course) {
      this.$store.commit('updateCoInfo', course)
      this.$router.push('home/course/' + course.uid)
    }
  },
  created () {
    if (this.$store.state.authorized) {
      this.axios({
        method: 'GET',
        url: `/student/${this.$store.state.student_id}/course/`
      }).then((response) => {
        if (response.status === 403) {
          // todo: 跳转报错页面（%参数加上当前页面地址）
        } else {
          this.courseInfo = response.data
        }
      })
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
