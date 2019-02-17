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
      <el-row>
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
      <el-row>
        <el-col>
            <el-table
            :data="submission"
            class="table-only"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
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
        name: '23333',
        deadline: 157000100,
        release_date: 157000000,
        descr_link: ''
      },
      message: ''
    }
  },
  props: ['deliverDetail', 'deliverInfo'],
  mounted () {
    this.submission = this.deliverDetail
    this.assignmentDetail = this.deliverInfo
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    showMessage (data) {
      this.message = data.message
    }
  },
  watch: {
    deliverDetail: function name (newValue) {
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
</style>
