<template>
  <div class="aside">
    <el-row class="row-main">
      <el-col>
        <span class="title-main">{{ coInfo.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="subtitle">{{ coInfo.code }}</span>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
        <router-link :to="{ path: `/`}" class="sub-title">Dashboard</router-link>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col>
        <span class="subtitle">INSTRUCTOR</span>
      </el-col>
    </el-row>
    <el-row v-for="a in instructors" :key="a.uid" class="row-quarter">
      <el-col :span="6">
        <i class="el-icon-info"></i>
      </el-col>
      <el-col :span="18">
        <router-link class="instr" :to="{ path: '/instrProfile', query: { instr_uid: a.enroll_email }}">{{ getEmail(a) }}</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      coInfo: {},
      instructors: [{
        uid: '',
        name: '',
        enroll_email: ''
      }]
    }
  },
  methods: {
    getEmail (instr) {
      let email = instr.enroll_email
      if (instr.name) {
        return instr.name
      } else {
        return email.slice(0, 14) + '...'
      }
    }
  },
  created () {
    this.coInfo = this.getCoInfo
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `${this.Api}/course/${this.coInfo.uid}/instructor/`
      }).then((response) => {
        this.instructors = response.data
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getCoInfo: state => state.coInfo,
    Api: state => state.api
  })
}
</script>
<style scoped>
  .mt-10percent {
    margin-top: 10%;
  }
  .aside {
    padding: 0 20px 0 20px;
  }
  .subtitle {
    font-size: 15px;
    font-style: italic;
  }
  .instr {
    font-size: 15px;
    text-decoration: none;
    color: black;
  }
  .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
 }
  .row-main {
    margin-top: 40px;
  }
  .title-main {
    font-size: 30px;
    font-style: inherit;
  }
  .el-icon-menu {
    margin-left: 10px !important;
    margin-top: 3px !important;
    font-size: 20px !important;
  }
  .row-half {
    margin-top: 10%;
  }
  .el-icon-info {
    margin-left: 10px !important;
    font-size: 20px !important;
  }
  .row-quarter {
    margin-top: 5%;
  }
</style>
