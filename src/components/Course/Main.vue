<template>
  <div>
    <el-row style="margin: 4% 0 10px 0">
      <el-col>
        <div class="tle">
          <div style="margin-right: 5%;">
            <span style="font-size: 30px;" >{{ coInfo.name }}</span>
          </div>
          <div class="blackline" style="margin-right: 5%"></div>
          <div style="margin-top: 5px">
            <span style="font-size: 20px;font-style: normal;">{{ coInfo.semester }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
        :data="coState"
        style="width: 100%"
        stripe>
        <el-table-column label="NAME">
          <template slot-scope="scope" >
            <el-button @click="getpath(scope)" class="name">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="STATUS"
          width="180">
          <template slot-scope="scope">
            <el-button :style="colors(scope.row.state)">
              <router-link :to="getstate(scope.row.name)" style="text-decoration: none;color: white;">{{ scope.row.state }}</router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="release"
          label="RELEASE">
        </el-table-column>
        <el-table-column
          prop="due"
          label="DUE(CST"
          width="180"
          >
        </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coState: [{
        uid: '',
        course_uid: '',
        name: '',
        deadline: 0,
        release_date: 0,
        descr_link: ''
      }],
      coInfo: {
        name: '',
        group: '',
        instructors: ['']
      },
      student_id: 0
    }
  },
  methods: {
    getpath (scope) {
      if (this.$store.state.instructor) {
        this.$router.push(this.$route.path + '/instructor/' + scope.row.name)
      } else {
        window.location.href = scope.row.descr_link
      }
    },
    getstate (path) {
      if (this.$store.state.instructor) {
        return this.$route.path + '/instructor/' + path
      } else {
        return this.$route.path + '/submission/' + path
      }
    },
    colors (situation) { // don't use state as the variable name
      if (situation === 'Failed') {
        return 'background-color: #ed3f14;width: 100px'
      } else if (situation === 'Ongoing') {
        return 'background-color: #19be6b;;width: 100px'
      } else {
        return 'background-color: #2d8cf0;;width: 100px'
      }
    }
  },
  props: ['courseInformation'],
  mounted () {
    this.coInfo = this.courseInformation
    this.student_id = this.$store.state.student_id
    this.instructor = this.$store.state.instructor
  },
  created () {
    if (this.$store.state.authorized) {
      this.axios.get(`/course/${this.$store.state.student_id}/assignment/`)
        .then((response) => {
          this.coState = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

</script>
<style scoped>
  .blackline {
    height: 30px;
    background-color: black;
    width: 1px;
    margin-top: 5px;
  }
  .tle {
    display: flex;
    flex-direction: row;
  }
  .name{
    border: none!important;
    padding: 0 0 2px 0!important;
  }
</style>
