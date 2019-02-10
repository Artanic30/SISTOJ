<template>
  <div>
    <el-row class="tle">
      <el-col :span="6">
          <div style="margin-right: 5%;">
            <span style="font-size: 30px;" >{{ coInfo.name }}</span>
          </div>
      </el-col>
      <el-col :span="2">
          <div class="blackline" style="margin-right: 5%"></div>
      </el-col>
      <el-col :span="16">
          <div>
            <span style="font-size: 35px;">{{ coInfo.semester }}</span>
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
            <el-button :style="colors(scope.row.state)" @click="updateAss(scope.row)">
              <router-link :to="getstate(scope.row)" style="text-decoration: none;color: white;">{{ scope.row.state }}</router-link>
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
import { mapState } from 'vuex'

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
      window.location.href = scope.row.descr_link
    },
    getstate (path) {
      return this.$route.path + '/submission/' + path.uid
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
      this.show = !this.show
    },
    updateAss (info) {
      this.$store.commit('updateAss', info)
    }
  },
  mounted () {
    this.coInfo = this.getCoInfo
    this.student_id = this.getID
    this.instructor = this.getInstr
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`/course/${this.getID}/assignment/`)
        .then((response) => {
          this.coState = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (this.getAuth) {
      this.axios.get(`/course/${this.getUid}/queue/`)
        .then((response) => {
          this.pendingList = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.student_id,
    getUid: state => state.coInfo.uid,
    getInstr: state => state.instructor,
    getCoInfo: state => state.coInfo
  })
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
    margin: 4% 0 10px 0;
  }
  .name{
    border: none!important;
    padding: 0 0 2px 0!important;
  }
</style>
