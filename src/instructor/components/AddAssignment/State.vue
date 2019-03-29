<template>
    <div>
      <el-row :gutter="16" class="row-quarter">
        <el-col :span="4">
          <span class="title-main">Assignment</span>
        </el-col>
        <el-col :span="4" class="col-one">
          <el-tooltip class="item" effect="dark" content="Add New Assignment" placement="left">
              <el-button @click="addHomework()" class="button-add"><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row class="row-only">
        <el-col>
          <el-card class="card-only">
            <el-collapse :v-model="judgeInfo">
              <el-collapse-item title="Host" name="1">
                <span>{{ judgeInfo.host}}</span>
              </el-collapse-item>
              <el-collapse-item title="Max job" name="2">
                <span>{{ judgeInfo.max_job}}</span>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="row-quarter">
        <el-col>
          <el-table
          :data="getCoState(coState)"
          style="width: 90%"
          class="table-only">
          <el-table-column label="NAME" fix>
          <template slot-scope="scope" >
            <el-button @click="getpath(scope)" class="name">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
          <el-table-column
            prop="release_date"
            label="RELEASE">
          </el-table-column>
          <el-table-column
            prop="deadline"
            label="DUE"
            >
          </el-table-column>
            <el-table-column
            label="Judges"
            width="120">
            <template slot-scope="scope">
              <v-judge :passAssUID="scope.row.uid" v-on:reJudges="loadJudges"></v-judge>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, coState)"
                type="text"
                size="small">
                移除作业
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import request from './AssJudges'

export default {
  data () {
    return {
      childChange: false,
      store: [],
      coState: [],
      judgeInfo: {
        host: 'Please choose on of your judges',
        max_job: 'Please choose on of your judges'
      },
      judgeList: [{
        host: '',
        client_cert: '',
        cert_ca: '',
        client_key: '',
        max_job: ''
      }]
    }
  },
  methods: {
    addHomework () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.$emit('changeState', this.childChange)
      }, 500)
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
    },
    getCookie (name) {
      let value = '; ' + document.cookie
      let parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            method: 'delete',
            url: `${this.Api}/course/${this.getUid}/assignment/${rows[index].uid}`,
            headers: {'X-CSRFToken': this.getCookie('csrftoken')}
          })
            .then((response) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              rows.splice(index, 1)
              window.location.reload() // todo: bug here
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
                showClose: true
              })
            })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getpath (scope) {
      window.location.href = scope.row.descr_link
    },
    loadJudges (data) {
      this.judgeInfo = data
    }
  },
  components: {
    'v-judge': request
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.getUid}/assignment/`)
        .then((response) => {
          this.coState = response.data
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  },
  watch: {
    coState: function name (newValue) {
      this.coState = newValue
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    Api: state => state.api
  })
}
</script>

<style scoped>
.row-quarter {
  margin-top: 5%;
}
  .title-main {
    font-size: 40px;
  }
  .col-one {
    float: right;
  }
  .button-add {
    background-color: #A40004;
  }
  .el-icon-plus {
    color: white !important;
  }
  .name{
    border: none !important;
    padding: 0 0 2px 0 !important;
  }
  .row-only {
    margin-top: 2%;
    margin-right: 10%;
  }
  .card-only {
    padding: 0 10px 0 10px;
  }
  .table-only {

  }
</style>
