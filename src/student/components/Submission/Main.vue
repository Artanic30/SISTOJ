<template>
  <div>
    <el-row class="row-main">
      <el-col>
        <el-card shadow="always">
          <el-row class="margins">
            <el-col>
               <span class="title-main">{{ assignmentDetail.name }} Submission </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-row class="row-only">
        <el-col>
          <el-card>
            <el-row class="margins">
              <el-col>
                <span>
                  <span class="code-two">git@git.geekpie.club:{{this.lower(this.getCoInfo.code)}}-{{this.lower(this.getCoInfo.year + this.getCoInfo.semester)}}/{{this.lower(this.getAss.short_name)}}/{{this.lower(this.email)}}.git </span>
                    is the repo for your homework. To access
                  your repo and submit your homework, clone it use
                  <span class="code-two"> git clone git@oj.geekpie.club:{{this.lower(this.getCoInfo.code)}}-{{this.lower(this.getCoInfo.year + this.getCoInfo.semester)}}/{{this.lower(this.getAss.short_name)}}/{{this.lower(this.email)}}.git </span>
                  {{this.getAss.short_name}} and follow the instruction of your TAs in discussion.</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="row-only">
        <el-col>
          <el-card class="card-only">
            <el-row class="margins">
              <el-col>
                <span class="code">{{ message }}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="row-only">
        <el-col>
            <el-table
            :data="submission"
            v-loading="loading"
            class="table-only"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
              prop="submission_time"
              label="When"
              sortable>
            </el-table-column>
            <el-table-column
              prop="git_commit_id"
              label="Git ID">
            </el-table-column>
            <el-table-column
              prop="score"
              label="Score"
              sortable>
            </el-table-column>
            <el-table-column
              prop="overall_score"
              label="Full score">
            </el-table-column>
            <el-table-column
              prop="delta"
              label="Delta">
            </el-table-column>
              <el-table-column
                fixed="right"
                label="Outputs">
                <template slot-scope="scope">
                  <el-button @click="showMessage(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
          </el-table>
          </el-col>
        </el-row>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      submission: [
        {
          git_commit_id: '',
          course_uid: '',
          message: '',
          score: 0,
          overall_score: 0,
          submission_time: 0,
          delta: 0
        }
      ],
      assignmentDetail: {
        uid: '',
        course_uid: '',
        name: '',
        deadline: 0,
        release_date: 0,
        descr_link: ''
      },
      message: '',
      email: '',
      loading: true
    }
  },
  computed: mapState({
    getAss: state => state.assignments,
    getCoInfo: state => state.coInfo,
    getID: state => state.baseInfo.uid,
    Api: state => state.api
  }),
  props: ['deliverDetail', 'deliverInfo'],
  mounted () {
    this.submission = this.deliverDetail
    this.assignmentDetail = this.deliverInfo
    this.axios({
      method: 'GET',
      url: `${this.Api}/student/${this.getID}`
    }).then((response) => {
      let index = response.data.email.indexOf('@')
      this.email = response.data.email.slice(0, index)
    }).catch((err) => {
      this.$message({
        type: 'error',
        message: err,
        showClose: true
      })
    })
  },
  methods: {
    showMessage (data) {
      this.message = data.message
    },
    lower (word) {
      if (word === undefined) {
        return ''
      } else {
        return word.toLowerCase()
      }
    }
  },
  watch: {
    deliverDetail: function (newValue) {
      this.loading = false
      this.submission = newValue
      this.message = this.submission[0].message
    }
  }
}
</script>

<style scoped>
.margins{
  margin: 1% 0 1% 2%;
}
  .code {
    font-size: 15px;
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    color: white;
  }
  .row-main {
    margin-bottom: 10px;
  }
  .title-main {
    font-size: 25px;
  }
  .card-only {
    background-color: black;
  }
  .table-only {
    width: 100%;
  }
  .row-only {
    margin-top: 2%;
  }
  .code-two {
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    font-size: 15px;
  }
</style>
