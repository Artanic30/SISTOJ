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
        <router-link class="instr" :to="{ path: '/instrProfile', query: { instr_uid: a.email }}">{{ a.name }}</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coInfo: {},
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
        } else if (response.status === 401) {
          this.$router.push('/unauthorized')
        } else {
          this.$router.push('/error')
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
  .mt-10percent {
    margin-top: 10%;
  }
  .aside {
    padding-left: 4%;
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
    margin-left: 10px!important;
  }
  .row-half {
    margin-top: 10%;
  }
  .el-icon-info {
    margin-left: 10px!important;
    height: 17px!important;
  }
  .row-quarter {
    margin-top: 5%;
  }
</style>
