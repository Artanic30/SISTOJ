<template>
  <div>
    <el-row style="margin: 5% 0 2% 0">
      <el-col>
        <span style="font-size: 35px;font-style: inherit ">ScoreBoard</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
        :data="scoreInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%;background-color: #606266"
        highlight-current-row
        border-top
        v-loading="loading"
        >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="nickname">
        </el-table-column>
        <el-table-column
          prop="score"
          label="score">
        </el-table-column>
        <el-table-column
          prop="overall_score"
          label="overall score">
          </el-table-column>
          <el-table-column
          prop="submission_time"
          label="submission time">
        </el-table-column>
          <el-table-column
          prop="delta"
          label="delta">
        </el-table-column>
     </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="position: center!important;">
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
export default {
  data () {
    return {
      scoreInfo: [{
        user: '',
        AC: 0,
        Total: 0,
        points: 0,
        Rating: 0
      }],
      loading: false, // todo:loading related functions
      currentPage: 1,
      pagesize: 10,
      total: 0
    }
  },
  created () {
    let courseId = 0
    let assignmentId = 0
    if (this.getAuth) {
      this.axios.get(`/course/${courseId}/assignment/${assignmentId}/scores/`)
        .then((response) => {
          this.scoreInfo = response.data
          // 很诡异 只有这种写法跑的起来(非同步跟新)
          this.total = response.data.length
        })
        .catch((err) => {
          console.log(err)
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
    getAuth () {
      return this.$store.state.authorized
    }
  }
}
</script>
<style>
</style>
