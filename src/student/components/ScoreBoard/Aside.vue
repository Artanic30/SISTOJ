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
        <router-link :to="{ path: `/`}" class="sub-title">Dashboard</router-link>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col :span="5">
        <i class="el-icon-star-on"></i>
      </el-col>
      <el-col :span="15">
        <router-link :to="{ path: `/home/course/${this.coInfo.uid}` }" class="sub-title">Course</router-link>
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
        <router-link class="instr" :to="{ path: '/instrProfile', query: { instr_uid: a.uid }}">{{ a.name }}</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coInfo: {
      },
      instructors: [{
        uid: '',
        name: '',
        email: ''
      }]
    }
  },
  created () {
    this.coInfo = this.getCoInfo
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `/course/${this.coInfo.uid}/instructor/`
      }).then((response) => {
        if (response.status === 200) {
          this.instructors = response.data
        } else {
          // （todo: 跳转报错页面（%参数加上当前页面地址)） 未测试
          this.$router.push({path: '/403', query: { path: this.$route.path }})
        }
      })
    }
  },
  computed: {
    getCoInfo () {
      return this.$store.state.coInfo
    },
    getAuth () {
      return this.$store.state.isAuthorized
    }
  }
}
</script>
<style scoped>
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
    margin-left: 10px!important;
  }
  .el-icon-star-on {
    margin-left: 10px!important;
  }
  .row-quarter {
    margin-top: 5%;
  }
  .el-icon-info {
    margin-left: 10px!important;
  }
</style>
