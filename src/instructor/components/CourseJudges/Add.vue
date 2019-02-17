<template>
  <div>
    <el-row class="row-one" :gutter="8">
      <el-col :span="8">
        <span class="title-main">Add New Judge</span>
      </el-col>
      <el-col :span="8" class="col-one">
        <el-button class="button-back" @click="goBack()"><span class="title-back">back</span></el-button>
      </el-col>
    </el-row>
    <el-row class="row-quarter">
      <el-col>
        <el-form :model="judgeInfo" status-icon :rules="rules" ref="judgeInfo" label-width="100px">
          <el-form-item label="Uid:" prop="uid">
            <el-input type="text" v-model="judgeInfo.uid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('judgeInfo')">提交</el-button>
            <el-button @click="resetForm('judgeInfo')">重置</el-button>
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
        uid: ''
      },
      rules: {
        name: [
          {validator: check, trigger: 'blur'}
        ],
        uid: [
          { validator: check, trigger: 'blur' }
        ],
        email: [
          { validator: check, trigger: 'blur' }
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
              url: `/course/${this.getUid}/judge/${this.judgeInfo.uid}`,
              data: this.judgeInfo
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
