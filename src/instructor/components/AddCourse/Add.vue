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
        <el-form :model="courseInfo" status-icon :rules="rules" ref="courseInfo" label-width="20%">
          <el-form-item label="Name:" prop="name">
            <el-input type="text" v-model="courseInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Code:" prop="code">
            <el-input type="text" v-model="courseInfo.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Semester:" prop="semester">
            <el-select v-model="courseInfo.semester" placeholder="请选择">
              <el-option
                v-for="item in seasons"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Year:" prop="year">
            <el-input type="number" v-model="courseInfo.year" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Homepage:" prop="homepage">
            <el-input v-model="courseInfo.homepage" placeholder="https://github.com"></el-input>
          </el-form-item>
          <el-form-item label="Instructor Email:">
            <el-table
              :data="courseInfo.instructor"
              style="width: 100%"
              max-height="250">
              <el-table-column
                fixed
                prop="enroll_email"
                label="Email"
                width="600">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, courseInfo.instructor)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="Add Instructor:" prop="tem_instr">
            <el-input v-model="courseInfo.tem_instr" class="input-short" placeholder="instructor's email"></el-input>
            <el-button @click="AddInstructor(courseInfo.tem_instr)"><i class="el-icon-plus"></i></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('courseInfo')">submit</el-button>
            <el-button @click="resetForm('courseInfo')">reset</el-button>
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
    let checkUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else if (!value.includes('http')) {
        return callback(new Error('请输入正确网址'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    return {
      courseInfo: {
        name: '',
        code: '',
        semester: '',
        year: 2019,
        homepage: '',
        instructor: [],
        tem_instr: ''
      },
      seasons: [
        {
          value: 1,
          label: 'Spring'
        },
        {
          value: 2,
          label: 'Summer'
        },
        {
          value: 3,
          label: 'Fall'
        },
        {
          value: 4,
          label: 'Winter'
        }
      ],
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
          { validator: checkUrl, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.axios.get(`${this.Api}/instructor/${this.getID}`).then(response => {
      this.courseInfo.instructor.push({enroll_email: response.data.email})
    })
      .catch(err => {
        this.$message({
          type: 'error',
          message: err.status,
          showClose: true
        })
      })
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
              data: this.courseInfo,
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
    deleteRow (index, rows) {
      let email = this.courseInfo.instructor[index]
      this.courseInfo.instructor.map((currentValue, index) => {
        if (currentValue.enroll_email === email.enroll_email) {
          this.courseInfo.instructor.splice(index, 1)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    AddInstructor (value) {
      this.courseInfo.instructor.push({enroll_email: value})
      this.courseInfo.tem_instr = ''
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
    margin-left: 20px;
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
