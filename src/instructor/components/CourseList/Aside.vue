<template>
  <div class="aside">
    <el-row style="margin-top: 40px">
      <el-col>
        <span style="font-size: 30px;font-style: inherit">{{ coInfo.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="subtitle">{{ coInfo.code }}</span>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home' }" style="font-size: 25px;">DashBoard</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="18">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: `/home/course/${this.coInfo.uid}/assignment` }" style="font-size: 25px;">Assignments</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10%">
      <el-col>
        <span class="subtitle">INSTRUCTOR</span>
      </el-col>
    </el-row>
    <el-row v-for="a in instructors" :key="a.uid" style="margin-top: 5%">
      <el-col :span="6">
        <i class="el-icon-info" style="margin-left: 10px"></i>
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
</style>
