<template>
  <div>
    <el-row style="margin-top: 5%;margin-left: 5%" :gutter="8">
      <el-col :span="8">
        <span style="font-size: 30px;">Add New Student</span>
      </el-col>
      <el-col :span="8" style="float: right">
        <el-button style="background-color: #A40004;float: right" @click="goBack()"><span style="color: white">back</span></el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 5%">
      <el-col>
        <el-form :model="studentInfo" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="Name" prop="name">
            <el-input type="text" v-model="studentInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Uid" prop="uid">
            <el-input type="text" v-model="studentInfo.uid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model.number="studentInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="Student Id" prop="student_id">
            <el-input v-model.number="studentInfo.student_id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('studentInfo')">提交</el-button>
            <el-button @click="resetForm('studentInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else if (!value.includes('@shanghaitech.edu.cn')) {
        return callback(new Error('请输入正确邮箱'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    return {
      studentInfo: {
        name: '',
        uid: '',
        email: '',
        student_id: ''
      },
      rules: {
        name: [
          {validator: check, trigger: 'blur'}
        ],
        uid: [
          { validator: check, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        student_id: [
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
              url: `/course/${this.$store.state.coInfo.uid}/students/${this.studentInfo.uid}`,
              data: this.studentInfo
            }).then((response) => {
              if (response.status === 200) {
                alert('submit!')
              } else if (response.status === 403) {
                // todo: 跳转报错页面（%参数加上当前页面地址）
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
