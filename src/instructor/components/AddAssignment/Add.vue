<template>
  <div>
    <el-row class="row-one" :gutter="8">
      <el-col :span="8">
        <span class="title">Add New Assignment</span>
      </el-col>
      <el-col :span="8" class="col-one">
        <el-button class="button-back" @click="goBack()"><span class="title-back">back</span></el-button>
      </el-col>
    </el-row>
    <el-row class="row-two">
      <el-col>
        <el-steps :active="steps" align-center>
          <el-step title="步骤 1" description="Please enter the information of new assignment"></el-step>
          <el-step title="步骤 2" description="Please go to the given url and complete the detail collection"></el-step>
          <el-step title="步骤 3" description="Assignment successfully added"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row class="row-two" v-if="this.steps === 1">
      <el-col>
        <el-form :model="studentInfo" status-icon :rules="rules" ref="studentInfo" label-width="100px" class="demo-ruleForm">
          <el-form-item label="Uid:" prop="uid">
            <el-input v-model="studentInfo.uid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Course uid:" prop="course_uid">
            <el-input v-model="studentInfo.course_uid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Name:" prop="name">
            <el-input v-model="studentInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Describe link:" prop="descr_link">
            <el-input v-model="studentInfo.descr_link" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Deadline:" prop="deadline">
            <el-date-picker
              v-model="studentInfo.deadline"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd "
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Release date:" prop="release_date">
            <el-date-picker
              v-model="studentInfo.release_date"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd "
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('studentInfo')">提交</el-button>
            <el-button @click="resetForm('studentInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="this.steps === 2" class="row-two">
      <el-col>
        <el-card>
          <el-row class="card-rows" type="flex" align="middle">
            <el-col :span="16"><span class="title-info">Please go to the following url and submit the detailed information of the assignment:</span></el-col>
          </el-row>
          <el-row class="card-rows" type="flex" align="middle">
            <el-col :span="20"><span class="title-info">{{ this.site }}</span></el-col>
            <el-col :span="4" ><el-button @click="goOutside" class="button-out">前往</el-button></el-col>
          </el-row>
        </el-card>
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
      studentInfo: {
        uid: '',
        course_uid: '',
        name: '',
        deadline: '',
        release_date: '',
        descr_link: '',
        state: 1
      },
      rules: {
        name: [
          { validator: check, trigger: 'blur' }
        ],
        deadline: [
          { validator: check, trigger: 'blur' }
        ],
        uid: [
          { validator: check, trigger: 'blur' }
        ],
        course_uid: [
          { validator: check, trigger: 'blur' }
        ],
        descr_link: [
          { validator: check, trigger: 'blur' }
        ],
        release_date: [
          { validator: check, trigger: 'blur' }
        ]
      },
      steps: 1,
      site: 'http://www.baidu.com'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.steps += 1
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (this.getAuth) {
            this.axios({
              method: 'post',
              url: `/course/${this.getUid}/assignment/${this.studentInfo.uid}`,
              data: this.studentInfo
            }).then((response) => {
              if (response.status === 200) {
                loading.close()
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
      window.location.href = this.site
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.student_id
  })
}
</script>

<style scoped>
.card-rows {
  margin: 2% 2% 2% 2%;
}
  .row-one {
    margin-top: 5%;
    margin-left: 5%
  }
  .title {
    font-size: 30px;
  }
  .col-one {
    float: right;
    margin-right: 2%;
  }
  .button-back {
    background-color: #A40004;
    float: right;
  }
  .title-back {
    color: white;
  }
  .row-two {
    margin-top: 5%;
  }
  .title-info {
    font-size: 20px;
  }
  .button-out {
    background-color: #A40004;
    float: right;
    color: white;
  }
</style>
