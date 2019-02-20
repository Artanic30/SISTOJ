<template>
  <div class="home">
    <el-row class="row-main">
      <el-col>
        <span class="title-main">Your Courses</span>
      </el-col>
    </el-row>
    <el-row class="row-main">
      <el-col>
         <span class="subtitle">{{ courseInfo[0].semester + ' ' + courseInfo[0].year }}</span>
      </el-col>
    </el-row>
       <el-card class="box-card" v-for="a in courseInfo" :key="a.uid">
         <el-button class="button-course" @click="toCourse(a)">
                <el-row class="row-button">
                  <span class="title-sub">{{ a.code }}</span>
                </el-row>
                <el-row class="row-seb">
                    <span class="title-forth">{{ a.name }}</span>
                </el-row>
                <el-row class="button-third" type="flex">
                    <span class="title-fifth">{{ a.instructor[0] }} {{ a.instructor[1] }}</span>
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
        instructor: []
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
  .row-main {
    float: left;
    margin: 4% 0 10px 0;
    width: 100%;
  }
  .title-main {
    font-size: 30px;
  }
  .subtitle {
    font-size: 20px;
  }
  .box-card {
    height: 250px!important;
    width: 400px!important;
    margin: 3% 2% 5% 0!important;
  }
  .button-course {
    background-color: #f6f0f0;
    height: 250px;
    width: 400px;
    padding: 0 0 0 0;
  }
  .row-button {
    margin: 20px 0 10px 4%;
  }
  .title-sub {
    float: left;
    font-size: 40px;
    font-style: inherit;
  }
  .row-seb {
    height: 100px;
    margin: 20px 0 0 4%;
  }
  .button-third {
    background-color: #870d0d;
    height: 80px;
  }
  .title-forth {
    font-style: italic;
    float: left;
  }
  .title-fifth {
    margin: 30px 0 0 4%;
    color: white;
  }
</style>
