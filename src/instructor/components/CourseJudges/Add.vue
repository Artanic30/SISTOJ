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
        <el-form :model="judgeInfo.uid" status-icon ref="judgeInfo">
          <el-form-item label="Uid:" prop="uid">
            <el-select v-model="resultUID" placeholder="请选择服务器">
              <el-option
                v-for="item in judgeInfo"
                :key="item.uid"
                :label="item.host"
                :value="item.uid">
              </el-option>
            </el-select>
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
    return {
      judgeInfo: [{
        uid: '',
        host: '',
        max_job: 0
      }],
      resultUID: ''
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
    submitForm () {
      console.log([{uid: this.resultUID}])
      if (this.getAuth) {
        this.axios({
          method: 'post',
          url: `${this.Api}/course/${this.getUid}/judge/`,
          data: [{uid: this.resultUID}]
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
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`${this.Api}/judge/`)
        .then((response) => {
          if (response.status === 200) {
            this.judgeInfo = response.data
          } else if (response.status === 401) {
            this.$router.push('/unauthorized')
          } else {
            this.$router.push('/error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
  .row-quarter {
    margin-top: 5%;
  }
  .title-back {
    color: white;
  }
  .title-sub {
    font-size: 20px;
  }
</style>
