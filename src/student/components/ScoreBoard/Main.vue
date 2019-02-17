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
      scoreInfo: [{
        user: '',
        AC: 0,
        Total: 0,
        points: 0,
        Rating: 0
      }],
      loading: false, // todo:loading related functions
      currentPage: 1,
      pagesize: 20,
      total: 0
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`/course/${this.getUid}/assignment/${this.getAssUid}/scores/`)
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
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    getAssUid: state => state.assignments.uid
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
