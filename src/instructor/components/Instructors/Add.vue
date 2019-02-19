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
        <el-form :model="instructorInfo" status-icon :rules="rules" ref="instructorInfo" label-width="100px">
          <el-form-item label="Name:" prop="name">
            <el-input type="text" v-model="instructorInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email:" prop="email">
            <el-input type="email" v-model.number="instructorInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('instructorInfo')">提交</el-button>
            <el-button @click="resetForm('instructorInfo')">重置</el-button>
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
      instructorInfo: {
        name: '',
        email: '@shanghaitech.edu.cn'
      },
      rules: {
        name: [
          {validator: check, trigger: 'blur'}
        ],
        email: [
          { validator: check, trigger: 'blur' }
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.getAuth) {
            this.axios({
              method: 'post',
              url: `/course/${this.getUid}/instructor/`,
              data: this.instructorInfo
            }).then((response) => {
              if (response.status === 200) {
                alert('submit!')
                window.location.reload()
              } else if (response.status === 401) {
                this.$router.push('/unauthorized')
              } else {
                this.$router.push('/error')
              }
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
    getUid: state => state.coInfo.uid
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
