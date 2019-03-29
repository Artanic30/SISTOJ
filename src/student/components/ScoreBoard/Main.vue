<template>
  <div>
    <el-row class="row-main">
      <el-col>
        <span class="title-main">ScoreBoard</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
        :data="scoreInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        class="table-only"
        highlight-current-row
        border-top
        v-loading="loading"
        >
        <el-table-column
          type="index"
          :index="ranking"
          width="50">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="Nickname">
        </el-table-column>
        <el-table-column
          prop="score"
          label="Score">
        </el-table-column>
        <el-table-column
          prop="overall_score"
          label="Overall Score">
          </el-table-column>
          <el-table-column
          prop="submission_time"
          label="Submission Time">
        </el-table-column>
          <el-table-column
          prop="delta"
          label="Delta">
        </el-table-column>
     </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
        background
        :page-size="pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      scoreInfo: [],
      loading: false,
      currentPage: 1,
      pagesize: 20,
      total: 0
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.getUid}/assignment/${this.getAssUid}/scores/`)
        .then((response) => {
          this.scoreInfo = response.data
          this.total = response.data.length
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    ranking (index) {
      return (this.currentPage - 1) * 20 + index
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    getAssUid: state => state.assignments.uid,
    Api: state => state.api
  })
}
</script>
<style scoped>
  .row-main {
    margin: 5% 0 2% 0;
  }
  .title-main {
    font-size: 35px;
    font-style: inherit;
  }
  .table-only {
    width: 100%;
    background-color: #606266;
  }
</style>
