<template>
    <div>
      <el-row :gutter="16">
        <el-col class="col-half" :span="4">
          <span class="title-main">Instructors</span>
        </el-col>
        <el-col :span="4" class="col-one">
          <el-tooltip class="item" effect="dark" content="Add New Instructor" placement="left">
              <el-button @click="addInstructor()" class="button-only"><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table
          :data="instructorList"
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
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, instructorList)"
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      instructorList: [{
        uid: '3545',
        name: 'willion',
        email: 'jbk@qq.com'
      }],
      childChange: false
    }
  },
  methods: {
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该助教, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            methods: 'delete',
            url: `/course/${this.getUid}/instructor/${rows.uid}`,
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
    addInstructor () {
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
      this.axios.get(`/course/${this.getUid}/instructor/`)
        .then((response) => {
          this.instructorList = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid
  })
}
</script>

<style scoped>
  .col-half {
    margin-top: 5%;
  }
  .title-main {
    font-family: inherit;
    font-size: 30px;
  }
  .col-one {
    float: right;
    margin-top: 5%;
  }
  .button-only {
    background-color: #A40004;
  }
  .el-icon-plus {
    color: white!important;
  }
</style>
