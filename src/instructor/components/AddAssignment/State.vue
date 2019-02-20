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
              <el-collapse-item title="Client cert" name="2">
                <span>{{ judgeInfo.client_cert}}</span>
              </el-collapse-item>
              <el-collapse-item title="Cert CA" name="3">
                <span>{{ judgeInfo.cert_ca}}</span>
              </el-collapse-item>
              <el-collapse-item title="Client key" name="4">
                <span>{{ judgeInfo.client_key}}</span>
              </el-collapse-item>
              <el-collapse-item title="Max job" name="5">
                <span>{{ judgeInfo.max_job}}</span>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="row-quarter">
        <el-col>
          <el-table
          :data="coState"
          style="width: 90%"
          @row-click="request">
          <el-table-column label="NAME" fix>
          <template slot-scope="scope" >
            <el-button @click="getpath(scope)" class="name">{{ scope.row.name }}</el-button>
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
            label="DUE"
            >
          </el-table-column>
            <el-table-column
            label="Judges"
            width="120">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">click here<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in scope.row.Judges" v-bind:key="item.uid">{{ item }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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

export default {
  data () {
    return {
      childChange: false,
      store: [],
      coState: [{
        name: '',
        descr_link: '',
        release_date: '',
        deadline: '',
        uid: '',
        course_uid: '',
        Judges: []
      }],
      judgeInfo: {
        host: 'Please choose on of your judges',
        client_cert: 'Please choose on of your judges',
        cert_ca: 'Please choose on of your judges',
        client_key: 'Please choose on of your judges',
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
    },
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            methods: 'delete',
            url: `/course/${this.getUid}/assignment/${rows[index].uid}/`
          })
            .then((response) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              rows.splice(index, 1)
            })
            .catch((err) => {
              console.log(err)
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
    request (row) {
      if (this.getAuth) {
        console.log(row)
        this.axios.get(`/course/${this.getUid}/assignment/${row.uid}/judge/`)
          .then((response) => {
            if (response.status === 200) {
              row.judges = response.data
            } else if (response.status === 401) {
              this.$router.push('/unauthorized')
            } else {
              this.$router.push('/error')
            }
          })
          .catch((err) => {
            console.log(err)
          })
        console.log(row)
      }
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`/course/${this.getUid}/assignment/`)
        .then((response) => {
          if (response.status === 200) {
            this.coState = response.data
            for (let i = 0; i < response.data.length; i++) {
              this.coState[i].Judges = []
            }
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
  watch: {
    coState: function name (newValue) {
      this.coState = newValue
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid
  })
}
</script>

<style scoped>
.row-quarter {
  margin-top: 5%;
}
  .title-main {
    font-size: 30px;
  }
  .col-one {
    float: right;
  }
  .button-add {
    background-color: #A40004;
  }
  .el-icon-plus {
    color: white!important;
  }
  .name{
    border: none!important;
    padding: 0 0 2px 0!important;
  }
  .row-only {
    margin-top: 2%;
    margin-right: 10%;
  }
  .card-only {
    padding: 0 10px 0 10px;
  }
</style>
