<template>
  <div>
    <el-row style="margin-top: 5%;margin-left: 5%" :gutter="8">
      <el-col :span="8">
        <span style="font-size: 30px;">Add New Assignment</span>
      </el-col>
      <el-col :span="8" style="float: right">
        <el-button style="background-color: #A40004;float: right" @click="goBack()"><span style="color: white">back</span></el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%;margin-left: 5%">
      <el-steps :active="steps">
        <el-step title="步骤 1" description="Please enter the information of new assignment"></el-step>
        <el-step title="步骤 2" description="Please go to the complete the details"></el-step>
        <el-step title="步骤 3" description="You are done!"></el-step>
      </el-steps>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="Name" prop="name">
          <el-input type="password" v-model="ruleForm2.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="deadline" prop="deadline">
          <el-input type="password" v-model="ruleForm2.deadline" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="courseId" prop="courseId">
          <el-input v-model.number="ruleForm2.courseId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row v-if="url.magic" style="margin-top: 5%">
      <el-card shadow="hover">
        <el-row style="margin: 5% 5% 5% 5%">
          <el-col :span="16"><span style="font-size: 20px">Please press the following button to complete:</span></el-col>
          <el-col :span="8" ><el-button @click="goOutside" style="background-color: #A40004;float: right;margin-right: 40%;color: white">前往</el-button></el-col>
        </el-row>
      </el-card>
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
    return {
      ruleForm2: {
        name: '',
        deadline: '',
        courseId: ''
      },
      rules2: {
        name: [
          { validator: check, trigger: 'blur' }
        ],
        deadline: [
          { validator: check, trigger: 'blur' }
        ],
        courseId: [
          { validator: check, trigger: 'blur' }
        ]
      },
      steps: 1,
      url: [{
        site: 'www.google.com',
        magic: false
      }]
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.steps += 1
          this.url.magic = true
          // todo:axios post
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
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
    goOutside () {
      window.location.href = 'http://www.baidu.com'
    }
  }
}
</script>

<style scoped>

</style>
