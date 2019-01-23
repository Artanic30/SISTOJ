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
    <el-row style="margin-top: 10%">
      <el-col>
        <el-tooltip class="item" effect="dark" content="Those who disrespect rules and cause harm to system will be on the list" placement="top">
          <el-button size="mini" @click="showPending" style="float: right">Show shot list</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row v-if="show">
      <el-col>
        <el-table
        :data="pendingList"
        style="width: 100%"
        stripe>
        <el-table-column
          prop="git_commit_id"
          label="git commit id">
        </el-table-column>
        <el-table-column
          prop="course_id"
          label="course id">
        </el-table-column>
        <el-table-column
          prop="submission_time"
          label="submission time">
        </el-table-column>
        <el-table-column
          prop="submitter"
          label="submitter">
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
      student_id: 0,
      show: false,
      pendingList: [{
        git_commit_id: '',
        course_id: '',
        submission_time: 0,
        submitter: ''
      }]
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
    },
    showPending () {
      this.showpending = !this.showpending
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
    if (this.$store.state.authorized) {
      this.axios.get(`/course/${this.$store.state.coInfo.uid}/queue/`)
        .then((response) => {
          this.pendingList = response.data
          console.log(this.pendingList)
          console.log(response)
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
