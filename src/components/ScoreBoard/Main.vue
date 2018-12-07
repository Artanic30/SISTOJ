<template>
  <div>
    <el-row>
      <span style="font-size: 30px;font-style: inherit ">ScoreBoard</span>
    </el-row>
    <el-row>
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
          prop="user"
          label="user"
          width="180">
        </el-table-column>
        <el-table-column
          prop="AC"
          label="AC">
        </el-table-column>
        <el-table-column
          prop="Total"
          label="Total"
          width="180"
          >
          </el-table-column>
          <el-table-column
          prop="Rating"
          label="Rating">
        </el-table-column>
          <el-table-column
          prop="points"
          label="Points">
        </el-table-column>
          <!-- v-bind:style="classcolor(costate.state)" -->
     </el-table>
    </el-row>
    <el-row style="justify-content: center" type="flex">
      <el-pagination
      background
      :page-size="pagesize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
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
      pagesize: 5,
      total: 10
    }// todo:计算total的值
  },
  props: ['scoreInformation'],
  created () {
    this.scoreInfo = this.scoreInformation
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSizeChange (val) {
      this.pagesize = val
    }
  }
}
</script>
<style>
</style>
