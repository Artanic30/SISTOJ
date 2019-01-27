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
        semester: 'WinterFall',
        year: 2013,
        homepage: '',
        instructor: ['0', '0']
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
  props: ['passCoInfo'],
  watch: {
    passCoInfo: function name (newValue) {
      this.courseInfo = newValue
    }
  },
  created () {
    this.courseInfo = this.passCoInfo
  }
}
</script>
<style scoped>
  .home {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
