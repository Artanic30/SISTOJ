<template>
  <div>
    <el-row class="row-main" :gutter="8">
      <el-col :span="8">
        <span class="title-main">Add New Judge</span>
      </el-col>
      <el-col :span="8" class="col-one">
        <el-button class="button-back" @click="goBack()"><span class="title-back">back</span></el-button>
      </el-col>
    </el-row>
    <el-row class="rows">
      <el-col>
        <el-form :model="judgeInfo" status-icon :rules="rules" ref="judgeInfo" label-width="15%">
          <el-form-item label="Host:" prop="host">
            <el-input type="text" v-model="judgeInfo.host" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Client Key:" prop="client_key">
            <el-input type="textarea" v-model="judgeInfo.client_key" autocomplete="off" class="height-input" :autosize="{ minRows: 10, maxRows: 100}"></el-input>
          </el-form-item>
          <el-form-item label="Client Cert:" prop="client_cert">
            <el-input type="textarea" v-model="judgeInfo.client_cert" autocomplete="off"  :autosize="{ minRows: 10, maxRows: 100}"></el-input>
          </el-form-item>
          <el-form-item label="Cert CA:" prop="cert_ca">
            <el-input type="textarea" v-model="judgeInfo.cert_ca" autocomplete="off" :autosize="{ minRows: 10, maxRows: 100}"></el-input>
          </el-form-item>
          <el-form-item label="Max job:" prop="max_job">
            <el-input type="number" v-model.number="judgeInfo.max_job"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('judgeInfo')">submit</el-button>
            <el-button @click="resetForm('judgeInfo')">reset</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 500)
    }
    return {
      judgeInfo: {
        host: '',
        client_key: '',
        client_cert: '',
        cert_ca: '',
        max_job: 4
      },
      rules: {
        host: [
          {validator: check, trigger: 'blur'}
        ],
        client_key: [
          { validator: check, trigger: 'blur' }
        ],
        client_cert: [
          { validator: check, trigger: 'blur' }
        ],
        cert_ca: [
          { validator: check, trigger: 'blur' }
        ],
        max_job: [
          { validator: check, trigger: 'blur' }
        ]
      },
      fileList: []
    }
  },
  methods: {
    goBack () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.$emit('goBack')
      }, 500)
    },
    getCookie (name) {
      let value = '; ' + document.cookie
      let parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.getAuth) {
            this.axios({
              method: 'post',
              url: `${this.Api}/judge/`,
              data: this.judgeInfo,
              headers: {'X-CSRFToken': this.getCookie('csrftoken')}
            }).then((response) => {
              alert('submit!')
              window.location.reload()
            }).catch((err) => {
              this.$message({
                type: 'error',
                message: err,
                showClose: true
              })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    Api: state => state.api
  })
}
</script>
<style scoped>
  .rows {
    margin-top: 5%;
    margin-left: 5%;
  }
  .row-main {
    margin-top: 5%;
    margin-left: 5%;
  }
  .title-main {
    font-size: 30px;
  }
  .col-one {
    float: right;
  }
  .button-back {
    background-color: #A40004;
    float: right;
  }
  .title-back {
    color: white;
  }
</style>
