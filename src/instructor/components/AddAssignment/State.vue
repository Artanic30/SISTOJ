<template>
    <div>
      <el-row :gutter="16" style="margin-top: 5%">
        <el-col :span="4">
          <span style="font-size: 30px">Assignment</span>
        </el-col>
        <el-col :span="4" style="float: right">
          <el-tooltip class="item" effect="dark" content="Add New Assignment" placement="top">
              <el-button @click="addHomework()" style="background-color: #A40004"><i class="el-icon-plus" style="color: white"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%">
        <el-col>
          <el-table
          :data="coState"
          style="width: 100%">
          <el-table-column
            fixed
            prop="name"
            label="NAME">
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
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, coState)"
                type="text"
                size="small">
                移除
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
      childChange: false,
      coState: [{
        name: '',
        descr_link: '',
        release_date: '',
        deadline: '',
        uid: '',
        course_id: ''
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
        if (this.getAuth) {
          this.axios({
            methods: 'delete',
            url: `/course/${this.getUid}/assignment/${rows.uid}`,
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
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`/course/${this.getUid}/assignment/`)
        .then((response) => {
          if (response.status === 200) {
            this.coState = response.data
          } else {
            this.$router.push('/404')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    getAuth () {
      return this.$store.state.isAuthorized
    },
    getUid () {
      return this.$store.state.coInfo.uid
    }
  }
}
</script>

<style scoped>

</style>
