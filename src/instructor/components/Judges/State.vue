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
            prop="cert_ca"
            label="Cert CA"
            >
          </el-table-column>
            <el-table-column
            prop="client_cert"
            label="Client Cert"
            >
          </el-table-column>
            <el-table-column
            prop="client_key"
            label="Client Key"
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
        client_key: '',
        client_cert: '',
        cert_ca: '',
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
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该服务器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            methods: 'delete',
            url: `${this.Api}/judge/${rows[index].uid}/`
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
      this.axios.get(`${this.Api}/judge/`)
        .then((response) => {
          if (response.status === 200) {
            this.judges = response.data
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
