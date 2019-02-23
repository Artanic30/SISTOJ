<template>
  <div>
    <el-row class="row-main" :gutter="8">
      <el-col :span="8">
        <span class="title-main">Add New Course</span>
      </el-col>
      <el-col :span="8" class="col-one">
        <el-button class="button-back" @click="goBack()"><span class="title-back">back</span></el-button>
      </el-col>
    </el-row>
    <el-row class="rows">
      <el-col>
        <el-form :model="courseInfo" status-icon :rules="rules" ref="courseInfo" label-width="100px">
          <el-form-item label="Name:" prop="name">
            <el-input type="text" v-model="courseInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Code:" prop="code">
            <el-input type="text" v-model="courseInfo.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Semester:" prop="semester">
            <el-input type="text" v-model="courseInfo.semester" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Year:" prop="year">
            <el-input type="text" v-model="courseInfo.year" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Homepage:" prop="homepage">
            <el-input v-model="courseInfo.homepage"></el-input>
          </el-form-item>
          <el-form-item label="Instructor Email:" prop="instructor" v-for="item in courseInfo.instructor" :key="item.enroll_email">
            <el-input v-model="item.enroll_email" disabled></el-input>
          </el-form-item>
          <el-form-item label="Add Instructor:">
            <template slot-scope="scope">
              <el-input v-model="scope.tem_instr" class="input-short" prop="Instructor" placeholder="instructor's email"></el-input>
              <el-button @click="AddInstructor(scope.tem_instr)"><i class="el-icon-plus"></i></el-button>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('courseInfo')">提交</el-button>
            <el-button @click="resetForm('courseInfo')">重置</el-button>
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
      courseInfo: {
        name: '',
        code: '',
        semester: '',
        year: '',
        homepage: '',
        instructor: []
      },
      tem_instr: '',
      rules: {
        name: [
          {validator: check, trigger: 'blur'}
        ],
        code: [
          { validator: check, trigger: 'blur' }
        ],
        semester: [
          { validator: check, trigger: 'blur' }
        ],
        year: [
          { validator: check, trigger: 'blur' }
        ],
        homepage: [
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
              url: `${this.Api}/instructor/${this.getID}/course/`,
              data: this.courseInfo
            }).then((response) => {
              if (response.status === 200) {
                alert('submit!')
                // window.location.reload()
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
    },
    AddInstructor (value) {
      this.courseInfo.instructor.push({enroll_email: value})
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    getID: state => state.baseInfo.uid,
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
  .input-short {
    width: 200px;
  }
</style>
