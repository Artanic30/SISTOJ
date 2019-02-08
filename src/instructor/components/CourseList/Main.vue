<template>
    <div>
      <el-row :gutter="16">
        <el-col style="margin-top: 5%" :span="4">
          <span style="font-family: inherit;font-size: 30px">Students</span>
        </el-col>
        <el-col :span="4" style="float: right;margin-top: 5%">
          <el-tooltip class="item" effect="dark" content="Add New Student" placement="top">
              <el-button @click="addStudent()" style="background-color: #A40004"><i class="el-icon-plus" style="color: white"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
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
      studentList: [{
        uid: '3545',
        name: 'willion',
        email: 'jbk@qq.com',
        student_id: '23565765875'
      }],
      childChange: false
    }
  },
  methods: {
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            methods: 'delete',
            url: `/course/${this.getID}/students/${rows.uid}`,
            data: rows.splice(index, 1)
          })
            .then((response) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
    addStudent () {
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
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`/course/${this.getID}/students/`)
        .then((response) => {
          this.studentList = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    getAuth () {
      return this.$store.state.authorized
    },
    getID () {
      return this.$store.state.student_id
    }
  }
}
</script>

<style scoped>
</style>
