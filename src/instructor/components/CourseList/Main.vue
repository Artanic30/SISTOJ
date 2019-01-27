<template>
    <div>
      <el-row>
        <el-col>
          <el-table
          :data="studentList"
          style="width: 100%"
          stripe>
          <el-table-column
            prop="name"
            label="name">
          </el-table-column>
          <el-table-column
            prop="email"
            label="email">
          </el-table-column>
          <el-table-column
            prop="student_id"
            label="student id">
          </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, studentList)"
                type="text"
                size="small">
                移除学生
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      studentList: {
        uid: '',
        name: '',
        email: '',
        student_id: ''
      }
    }
  },
  methods: {
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        rows.splice(index, 1)
        // todo: axios delete
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    if (this.$store.state.authorized) {
      this.axios({
        method: 'GET',
        url: `/course/${this.$store.state.student_id}/students/${this.$store.state.student_id}`
      }).then((response) => {
        if (response.status === 403) {
          // todo: 跳转报错页面（%参数加上当前页面地址）
        } else {
          this.studentList = response.data
          console.log(response.data)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
