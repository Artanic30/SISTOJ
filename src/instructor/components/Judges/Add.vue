<template>
  <div>
    <el-row class="row-main" :gutter="8">
      <el-col :span="8">
        <span class="title-main">Add New Judge</span>
      </el-col>
      <el-col :span="8" class="col-one">
        <el-button class="button-back" @click="goBack()"><span class="title-back">back</span></el-button>
      </el-col>
    </el-row>
    <el-row class="rows">
      <el-col>
        <el-form :model="judgeInfo" status-icon :rules="rules" ref="judge Info" label-width="100px">
          <el-form-item label="Uid:" prop="uid">
            <el-input type="text" v-model="judgeInfo.uid" autocomplete="off" placeholder="Professor's uid"></el-input>
          </el-form-item>
          <el-form-item label="Host:" prop="host">
            <el-input type="text" v-model="judgeInfo.host" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Max job" prop="max_job">
            <el-input v-model.number="judgeInfo.max_job"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('judgeInfo')">提交</el-button>
            <el-button @click="resetForm('judgeInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="rows">
      <el-col :span="24"><span class="text">Please upload the Cert file here:</span></el-col>
    </el-row>
    <el-row class="rows-two">
      <el-col>
        <!--todo: action url  -->
        <el-upload
          class="upload-demo"
          action=""
          :before-remove="beforeRemove"
          multiple
          drag
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
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
      }, 500)
    }
    return {
      judgeInfo: {
        uid: '',
        host: '',
        cert: '',
        max_job: 4
      },
      rules: {
        host: [
          {validator: check, trigger: 'blur'}
        ],
        uid: [
          { validator: check, trigger: 'blur' }
        ],
        max_job: [
          { validator: check, trigger: 'blur' }
        ]
      },
      fileList: []
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
              url: `/judge/${this.judgeInfo.uid}`,
              data: this.JudgeInfo
            }).then((response) => {
              if (response.status === 200) {
                alert('submit!')
              } else {
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
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.rows {
  margin-top: 5%;
  margin-left: 5%;
}
  .text {
    font-size: 25px;
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
  .rows-two {
  margin-top: 2%;
  margin-left: 5%;
  }
</style>
