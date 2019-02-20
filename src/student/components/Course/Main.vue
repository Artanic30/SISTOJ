<template>
  <div>
    <el-row class="tle">
      <el-col :span="7">
          <div class="div-quarter">
            <span class="title-main">{{ coInfo.name }}</span>
          </div>
      </el-col>
      <el-col :span="2">
          <div class="blackline"></div>
      </el-col>
      <el-col :span="15">
          <div>
            <span class="title-sup">{{ coInfo.semester }}</span>
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
          label="STATUS"
          width="180">
          <template slot-scope="scope">
            <el-button :style="colors(scope.row.state)" @click="updateAss(scope.row)">
              <router-link :to="getstate(scope.row)" class="fake-href">{{ getScore(scope.row) }}</router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="release_date"
          :formatter="timestampToTime1"
          label="RELEASE">
        </el-table-column>
        <el-table-column
          prop="deadline"
          :formatter="timestampToTime2"
          label="DUE(CST"
          width="180"
          >
        </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-col>
        <el-tooltip class="item" effect="dark" content="A list for those who made some mistakes" placement="left">
          <el-button size="mini" @click="showPending" class="button-shot">Show shot list</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row v-if="show">
      <el-col>
        <el-table
        :data="pendingList"
        class="table-only"
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
          :formatter="timestampToTime3"
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
        descr_link: '',
        score: 0,
        overall_score: 0
      }],
      coInfo: {
      },
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
      console.log(23)
      window.location.href = scope.row.descr_link
    },
    getstate (path) {
      return this.$route.path + '/submission/' + path.uid
    },
    colors (situation) { // don't use state as the variable name
      if (situation === 'Failed') {
        return 'background-color: #ed3f14;width: 100px;'
      } else if (situation === 'Ongoing') {
        return 'background-color: #19be6b;width: 100px;'
      } else {
        return 'background-color: #2d8cf0;width: 100px;'
      }
    },
    showPending () {
      this.show = !this.show
    },
    updateAss (info) {
      this.$store.commit('updateAss', info)
    },
    getScore (row) {
      return row.score + '/' + row.overall_score
    },
    timestampToTime3 (row) {
      let date = new Date(row.submission_time * 1000)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    timestampToTime1 (row) {
      let date = new Date(row.release_date * 1000)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    timestampToTime2 (row) {
      let date = new Date(row.deadline * 1000)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  },
  mounted () {
    this.coInfo = this.getCoInfo
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`/student/${this.getID}/course/${this.getUid}/assignment/`)
        .then((response) => {
          if (response.status === 200) {
            this.coState = response.data
          } else if (response.status === 401) {
            this.$router.push('/unauthorized')
          } else {
            this.$router.push('/error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (this.getAuth) {
      this.axios.get(`/course/${this.getUid}/queue/`)
        .then((response) => {
          if (response.status === 200) {
            this.pendingList = response.data
          } else if (response.status === 401) {
            this.$router.push('/unauthorized')
          } else {
            this.$router.push('/error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getUid: state => state.coInfo.uid,
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
    margin-right: 5%;
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
  .div-quarter {
    margin-right: 5%;
  }
  .title-main {
    font-size: 30px;
  }
  .title-sup {
    font-size: 35px;
  }
  .fake-href {
    text-decoration: none;
    color: white;
  }
  .button-shot {
    float: right;
  }
  .table-only {
    width: 100%;
  }
</style>
