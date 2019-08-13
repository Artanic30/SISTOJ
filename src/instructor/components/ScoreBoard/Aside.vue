<template>
  <div class="aside">
    <el-row class="row-two">
      <el-col>
        <span class="title-main">{{ coInfo.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="subtitle">{{ coInfo.group }}</span>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
        <router-link :to="{ path: `/instr`}" class="sub-title">Dashboard</router-link>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="15">
        <router-link :to="{ path: `/instr/home/course/${this.$route.query.coUid}/assignment` }" class="sub-title">Assignment</router-link>
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
      coInfo: {
      },
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
  .aside {
    padding: 0 20px 0 20px;
  }
  .subtitle {
    font-size: 15px;
    font-style: italic;
  }
  .sub-title {
   font-size: 25px;
   text-decoration: none;
   color: black;
 }
  .instr {
    font-size: 15px;
    text-decoration: none;
    color: black;
  }
  .row-two {
    margin-top: 40px;
  }
  .title-main {
    font-size: 30px;
    font-style: inherit;
  }
  .row-half {
    margin-top: 10%;
  }
  .el-icon-menu {
    margin-top: 3px !important;
    font-size: 20px !important;
    margin-left: 10px!important;
  }
  .row-quarter {
    margin-top: 5%;
  }
  .el-icon-info {
    margin-left: 10px!important;
    font-size: 20px !important;
  }
</style>
