<template>
  <div class="home">
    <el-row class="row-main">
      <el-col>
        <span class="title-main">Your Courses</span>
      </el-col>
    </el-row>
    <el-row class="row-main" v-if="!this.show">
      <el-col>
         <span class="subtitle">{{ getYear(this.courseInfo) }}</span>
      </el-col>
    </el-row>
       <el-card class="box-card" v-for="a in courseInfo" :key="a.uid" >
         <el-button class="button-course" @click="toCourse(a)">
                <el-row class="row-button">
                  <span class="title-sub">{{ a.code }}</span>
                </el-row>
                <el-row class="row-seb">
                    <span class="title-forth">{{ a.name }}</span>
                </el-row>
                <el-row class="button-third" type="flex">
                    <span class="title-fifth">{{ getInstr(a.instructor) }}</span>
                </el-row>
         </el-button>
       </el-card>
    <el-row class="row-main" v-if="this.show">
      <el-col>
        <el-card class="card-index">
          <span class="title-notify">Opps! You're not currently associated with any courses....</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      courseInfo: [],
      show: true,
      student_id: 0
    }
  },
  methods: {
    toCourse (course) {
      this.$store.commit('updateCoInfo', course)
      if (this.$route.name === 'indexInstructor') {
        this.$router.push('instr/home/course/' + course.code)
      } else {
        this.$router.push('home/course/' + course.code)
      }
    },
    getYear (info) {
      if (info.length === 0) {
        return ''
      } else {
        return info[0].semester + ' ' + info[0].year
      }
    },
    getInstr (instr) {
      if (instr.length === 0) {
        return ''
      } else if (instr.length === 1) {
        return instr[0].slice(0, 14) + '...'
      } else {
        return instr[0].slice(0, 14) + '...' + ' ' + instr[1].slice(0, 14) + '...'
      }
    }
  },
  props: ['passCoInfo'],
  watch: {
    passCoInfo: function name (newValue) {
      if (newValue.length > 0) {
        this.show = false
      }
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
    height: 250px!important;
    width: 400px!important;
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
  .title-notify {
    font-size: 30px;
  }
  .card-index {
    padding: 50px;
  }
</style>
