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
          <el-step title="step 1" description="Please enter the information of new assignment"></el-step>
          <el-step title="step 2" description="Please add judges for the assignment and you will receive a git command"></el-step>
          <el-step title="step 3" description="Assignment successfully added"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row class="row-two" v-if="this.steps === 1">
      <el-col>
        <el-form :model="assignmentInfo" status-icon :rules="rules" ref="assignmentInfo" label-width="20%" class="demo-ruleForm">
          <el-form-item label="Name:" prop="name">
            <el-input v-model="assignmentInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Short Name:" prop="short_name">
            <el-input v-model="assignmentInfo.short_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Describe link:" prop="descr_link">
            <el-input v-model="assignmentInfo.descr_link" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Grade:" prop="grade">
            <el-input v-model="assignmentInfo.grade" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Date:">
            <el-date-picker
                v-model="assignmentInfo.tem_time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="release date"
                end-placeholder="deadline">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('assignmentInfo')">submit</el-button>
            <el-button @click="resetForm('assignmentInfo')">reset</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="this.steps === 2" class="row-two">
      <el-col>
        <el-card>
          <el-row class="card-rows" type="flex" align="middle">
            <el-col :span="16"><span class="title-info">After you submit assignment judges, the git command may be useful for you:</span></el-col>
          </el-row>
          <el-row class="card-rows" type="flex" align="middle">
            <el-col :span="20"><span class="title-info">{{ this.reply.ssh_url_to_repo }}</span></el-col>
          </el-row>
          <el-row class="card-rows" type="flex" align="middle">
            <el-col>
              <v-transform :passReply="this.reply"></v-transform>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import transform from './TransformJudge'

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
      }, 500)
    }
    return {
      assignmentInfo: {
        course_uid: '',
        name: '',
        deadline: '',
        release_date: '',
        descr_link: '',
        grade: '',
        short_name: '',
        tem_time: '',
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
        descr_link: [
          { validator: checkUrl, trigger: 'blur' }
        ],
        release_date: [
          { validator: check, trigger: 'blur' }
        ],
        grade: [
          { validator: check, trigger: 'blur' }
        ],
        short_name: [
          { validator: check, trigger: 'blur' }
        ],
        tem_time: [
          { validator: check, trigger: 'blur' }
        ]
      },
      steps: 1,
      reply: {
        ssh_url_to_repo: '',
        uid: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.assignmentInfo.release_date = this.formateDate(this.assignmentInfo.tem_time[0])
          this.assignmentInfo.deadline = this.formateDate(this.assignmentInfo.tem_time[1])
          this.$store.commit('updateAss', this.assignmentInfo)
          if (this.getAuth) {
            this.axios({
              method: 'post',
              url: `${this.Api}/course/${this.getUid}/assignment/`,
              data: this.assignmentInfo,
              headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}
            }).then((response) => {
              this.steps += 1
              this.reply = response.data
              alert('submit!')
            })
              .catch((err) => {
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
    formateDate (time) {
      let Hours = time.toLocaleTimeString()
      if (Hours[0] === '上') {
        Hours = Hours.replace(/上午/, '').length === 7 ? '0' + Hours.replace(/上午/, '') : Hours.replace(/上午/, '')
      } else {
        Hours = Hours.replace(/下午[0-9]+:/, (Hours) => {
          return `${Number(Hours.slice(Hours.search(/午/) + 1, Hours.search(/:/))) + 12}:`
        })
      }
      let date = ''
      time.toLocaleDateString().split('/').map((item, index) => {
        if (index === 0) {
          date += item
        } else {
          if (item.length === 1) {
            date += '-0' + item
          } else {
            date += '-' + item
          }
        }
      })
      return `${date}T${Hours}+08:00`
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
    }
  },
  created () {
    this.assignmentInfo.course_uid = this.getUid
  },
  computed: mapState({
    getUid: state => state.coInfo.uid,
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    Api: state => state.api
  }),
  watch: {
    Judges: function (newValue) {
      this.Judges = newValue
    }
  },
  components: {
    'v-transform': transform
  }
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
</style>
