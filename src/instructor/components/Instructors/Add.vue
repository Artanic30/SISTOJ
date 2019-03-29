<template>
  <div>
    <el-row class="row-one" :gutter="8">
      <el-col :span="8">
        <span class="title-main">Add New Instructor</span>
      </el-col>
      <el-col :span="8" class="col-one">
        <el-button class="button-back" @click="goBack()"><span class="title-back">back</span></el-button>
      </el-col>
    </el-row>
    <el-row class="row-quarter">
      <el-col>
        <el-form :model="instructorInfo" status-icon :rules="rules" ref="instructorInfo" label-width="20%">
          <el-form-item label="Name:" prop="name">
            <el-input type="text" v-model="instructorInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email:" prop="enroll_email">
            <el-input type="email" v-model.number="instructorInfo.enroll_email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('instructorInfo')">submit</el-button>
            <el-button @click="resetForm('instructorInfo')">reset</el-button>
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
    let check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 500)
    }
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else if (!value.includes('@shanghaitech.edu.cn')) {
        return callback(new Error('请输入正确邮箱'))
      }
      setTimeout(() => {
        callback()
      }, 500)
    }
    return {
      instructorInfo: {
        name: '',
        enroll_email: ''
      },
      rules: {
        name: [
          {validator: check, trigger: 'blur'}
        ],
        enroll_email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
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
              url: `${this.Api}/course/${this.getUid}/instructor/`,
              data: this.instructorInfo,
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
  .row-one {
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
  .row-quarter {
    margin-top: 5%;
  }
  .title-back {
    color: white;
  }
</style>
