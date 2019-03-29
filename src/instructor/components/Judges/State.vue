<template>
    <div>
      <el-row :gutter="16" class="row-quarter">
        <el-col :span="4">
          <span class="title-main">Judges</span>
        </el-col>
        <el-col :span="4" class="col-one">
          <el-tooltip class="item" effect="dark" content="Add New Judges" placement="top">
              <el-button @click="manageJudges()" class="button-judge"><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row class="row-quarter">
        <el-col>
          <el-table
          :data="judges"
          style="width: 90%"
          >
          <el-table-column
            fixed
            prop="uid"
            label="Uid"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="host"
            label="Host">
          </el-table-column>
          <el-table-column
            prop="max_job"
            label="Max job"
            >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, judges)"
                type="text"
                size="small">
                移除服务器
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
      judges: [{
        uid: '',
        host: '',
        max_job: 4
      }]
    }
  },
  methods: {
    manageJudges () {
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
    getCookie (name) {
      let value = '; ' + document.cookie
      let parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该服务器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            method: 'delete',
            url: `${this.Api}/judge/${rows[index].uid}`,
            headers: {'X-CSRFToken': this.getCookie('csrftoken')}
          }).then((response) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            rows.splice(index, 1)
          })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
                showClose: true
              })
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
      this.axios.get(`${this.Api}/judge/`)
        .then((response) => {
          this.judges = response.data
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    Api: state => state.api
  })
}
</script>

<style scoped>
.row-quarter {
  margin-top: 5%;
}
  .title-main {
    font-size: 40px;
  }
  .col-one {
    float: right;
    margin-right: 60px !important;
  }
  .el-icon-plus {
    color: white!important;
  }
  .button-judge {
    background-color: #A40004;
  }
</style>
