<template>
  <div>
    <el-row class="row-one" :gutter="8">
      <el-col :span="8">
        <span class="title-main">Add New Student</span>
      </el-col>
      <el-col :span="8" class="col-one">
        <el-button class="button-back" @click="goBack()"><span class="title-back">back</span></el-button>
      </el-col>
    </el-row>
    <el-row class="row-quarter">
      <el-col>
        <span class="title-sub">Batch Upload</span>
      </el-col>
    </el-row>
    <el-row class="row-mini">
        <el-col>
          <el-card class="card-only">
            <el-collapse>
              <el-collapse-item title="Rule" name="1">
                <span>The uploading file must be execl and excel only.The first row of the file must contain three
                  label----<span class="red">student_id, enroll_email</span> and <span class="red">name</span>.And the order and place of labels doesn't matter.Data should be
                  listed below every label.If there are anything unclear, you may check the demo below.</span>
              </el-collapse-item>
              <el-collapse-item title="Demo" name="2">
                <img v-bind:src="img" class="img-demo">
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    <el-row class="row-quarter">
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        multiple
        action=""
        :show-file-list="false"
        :on-change="readExcel"
        :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Please drag the file here，or<em> click here</em></div>
    </el-upload>
    </el-row>
    <el-row class="row-quarter">
      <el-col>
        <el-button class="button-single" @click="singleUpload">
          <span class="title-back">Single Upload</span>
        </el-button>
      </el-col>
    </el-row>
    <el-row class="row-quarter" v-if="this.show">
      <el-col>
        <el-form :model="studentInfo" status-icon :rules="rules" ref="studentInfo" label-width="20%">
          <el-form-item label="Email:" prop="enroll_email">
            <el-input type="email" v-model.number="studentInfo.enroll_email"></el-input>
          </el-form-item>
          <el-form-item label="Student ID:" prop="student_id">
            <el-input v-model.number="studentInfo.student_id"></el-input>
          </el-form-item>
          <el-form-item label="Name:" prop="name">
            <el-input v-model.number="studentInfo.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('studentInfo')">submit</el-button>
            <el-button @click="resetForm('studentInfo')">reset</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import XLSX from 'xlsx'

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
      studentInfo: {
        enroll_email: '',
        student_id: '',
        name: ''
      },
      show: false,
      img: require('../../../assets/Demo.png'),
      rules: {
        enroll_email: [
          {validator: checkEmail, trigger: 'blur'}
        ],
        student_id: [
          {validator: check, trigger: 'blur'}
        ],
        name: [
          {validator: check, trigger: 'blur'}
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
    singleUpload () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.show = !this.show
      }, 500)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.getAuth) {
            this.axios({
              method: 'post',
              url: `${this.Api}/course/${this.getUid}/students/`,
              data: this.studentInfo,
              headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}
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
    },
    readExcel (file) {
      let that = this
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          for (let sheet in workbook.Sheets) {
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            let length = sheetArray.length
            sheetArray.map(function (obj, index) {
              that.axios({
                method: 'post',
                url: `${that.Api}/course/${that.getUid}/students/`,
                data: obj,
                headers: {'X-CSRFToken': that.$cookies.get('csrftoken')}
              }).then((response) => {
                if (index === length - 1) {
                  alert('submit!')
                  window.location.reload()
                }
              }).catch((err) => {
                that.$message({
                  type: 'error',
                  message: err,
                  showClose: true
                })
              })
            })
          }
        } catch (e) {
          that.$message.warning('文件类型不正确！')
          return false
        }
      }
      fileReader.readAsBinaryString(file.raw)
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
  .button-single {
    background-color: #A40004;
  }
  .row-quarter {
    margin-top: 5%;
  }
  .title-back {
    color: white;
  }
  .card-only {
    padding: 0 10px 0 10px;
  }
  .title-sub {
    font-size: 25px;
  }
  .row-mini {
    margin-top: 2%;
  }
  .img-demo {
    height: 400px;
  }
  .red {
    color: #A40004;
    font-size: 20px;
  }
</style>
