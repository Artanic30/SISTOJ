<template>
    <div>
      <el-row :gutter="16" class="row-quarter">
        <el-col :span="4">
          <span class="title-main">Course</span>
        </el-col>
        <el-col :span="4" class="col-one">
          <el-tooltip class="item" effect="dark" content="Add New Course" placement="top">
              <el-button @click="manageCourse()" class="button-judge"><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row class="row-quarter">
        <el-col>
          <el-table
          :data="courseList"
          style="width: 90%"
          >
          <el-table-column
            prop="name"
            label="Name">
          </el-table-column>
          <el-table-column
            prop="code"
            label="Code"
            >
          </el-table-column>
            <el-table-column
            prop="semester"
            label="Semester"
            >
          </el-table-column>
            <el-table-column
            prop="year"
            label="Year"
            >
          </el-table-column>
            <el-table-column
            prop="homepage"
            label="Homepage"
            >
          </el-table-column>
            <el-table-column
            label="Instructors"
            width="120"
             prop="instructor">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  Click here<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in scope.row.instructor" :key="item">{{ item }}</el-dropdown-item>
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
                @click.native.prevent="deleteRow(scope.$index, courseList)"
                type="text"
                size="small">
                移除课程
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
      courseList: [{
        uid: '',
        name: '',
        code: '',
        semester: '',
        year: 0,
        homepage: '',
        instructor: []
      }]
    }
  },
  methods: {
    manageCourse () {
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
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            methods: 'delete',
            url: `/course/${rows[index].uid}/`
          }).then((response) => {
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
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`/instructor/${this.getID}/course`)
        .then((response) => {
          if (response.status === 200) {
            this.courseList = response.data
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
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid
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
  .el-icon-plus {
    color: white!important;
  }
  .button-judge {
    background-color: #A40004;
  }
</style>
