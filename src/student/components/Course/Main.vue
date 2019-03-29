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
        :data="getCoState(coState)"
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
            <el-button :style="colors(scope.row)" @click="updateAss(scope.row)" class="fake-href">
              {{ getScore(scope.row) }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="release_date"
          label="RELEASE">
        </el-table-column>
        <el-table-column
          prop="deadline"
          label="DUE">
        </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="row-half" v-if="show">
      <el-col>
        <el-tooltip class="item" effect="dark" content="A list for those who made some mistakes" placement="left">
          <el-button size="mini" @click="showPending" class="button-shot">Show list</el-button>
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
      coState: [],
      coInfo: {
      },
      show: false,
      pendingList: [{
        git_commit_id: '',
        course_id: '',
        submission_time: 0,
        submitter: ''
      }],
      length: 0
    }
  },
  methods: {
    getpath (scope) {
      window.location.href = scope.row.descr_link
    },
    colors (situation) { // don't use state as the variable name
      if (situation.grade >= 70) {
        return 'background-color: #67C23A;color: white;width: 100px;'
      } else if (situation.grade >= 50) {
        return 'background-color: #E6A23C;color: white;width: 100px;'
      } else if (situation.grade >= 20) {
        return 'background-color: #F56C6C;color: white;width: 100px;'
      } else if (situation.grade === null || situation.grade === undefined) {
        return 'background-color: #909399;color: white;width: 100px;'
      } else {
        return 'background-color: black;color: white;width: 100px;'
      }
    },
    showPending () {
      this.show = !this.show
    },
    updateAss (info) {
      this.$store.commit('updateAss', info)
      this.$router.push(`${this.$route.path}/submission/${info.name}`)
    },
    getScore (row) {
      if (row.grade === null || row.grade === undefined) {
        return 'no result'
      } else {
        return row.grade
      }
    },
    convertUTCTimeToLocalTime (UTCDateString) {
      if (!UTCDateString) {
        return '-'
      }
      if (UTCDateString.includes('PM') || UTCDateString.includes('AM')) {
        return UTCDateString
      }
      function formatFunc (str) {
        return str > 9 ? str : '0' + str
      }
      let date2 = new Date(UTCDateString)
      let year = date2.getFullYear()
      let mon = formatFunc(date2.getMonth() + 1)
      let day = formatFunc(date2.getDate())
      let hour = date2.getHours()
      let noon = hour >= 12 ? 'PM' : 'AM'
      hour = hour >= 12 ? hour - 12 : hour
      hour = formatFunc(hour)
      let min = formatFunc(date2.getMinutes())
      return year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min
    },
    getCoState (data) {
      let that = this
      if (!data) {
        return data
      }
      let result = []
      data.map(function (a) {
        a.deadline = that.convertUTCTimeToLocalTime(a.deadline)
        a.release_date = that.convertUTCTimeToLocalTime(a.release_date)
        result.push(a)
      })
      return result
    }
  },
  mounted () {
    this.coInfo = this.getCoInfo
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`${this.Api}/student/${this.getID}/course/${this.getUid}/assignment/`)
        .then((response) => {
          this.length = response.data.length
          this.coState = response.data
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
    if (!this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.getUid}/queue`)
        .then((response) => {
          this.pendingList = response.data
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getUid: state => state.coInfo.uid,
    getCoInfo: state => state.coInfo,
    Api: state => state.api
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
    color: #cb0c0a;
  }
  .button-shot {
    float: right;
  }
  .table-only {
    width: 100%;
  }
  .row-half{
    margin-top: 10%;
  }
</style>
