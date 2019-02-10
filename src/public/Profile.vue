<template>
    <div>
    <el-row>
      <el-col align="middle" v-if="!getState"><span class="title">{{ this.Info.nickname }}</span></el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="24" align="middle">
        <el-card class="cards">
          <img v-bind:src="imgStudent" class="img-profile" v-if="getState">
          <img v-bind:src="imgInstructor" class="img-profile" v-else>
        </el-card>
      </el-col>
    </el-row>
      <el-row>
        <el-col align="middle">
          <el-card class="cards">
            <el-row type="flex" justify="center" align="middle" class="card-row">
              <el-col :span="4">
                <span class="sub-title">Name:</span>
              </el-col>
              <el-col :span="8">
                <el-input class="shortInput" v-model="Info.name" :disabled="true"></el-input>
              </el-col>
              <el-col :span="5">
                <span class="sub-title">Student ID:</span>
              </el-col>
              <el-col :span="5">
                <el-input class="shortInput" v-model="Info.student_id" :disabled="true"></el-input>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-row type="flex" align="middle" class="card-row2">
              <el-col :span="4">
                <span class="sub-title">Email:</span>
              </el-col>
              <el-col :span="18">
                <el-input class="shortInput" v-model="Info.email" :disabled="true"></el-input>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-row type="flex" align="middle" class="card-row2">
              <el-col :span="4">
                <span class="sub-title">Public Key:</span>
              </el-col>
              <el-col :span="18">
                <el-input class="shortInput" v-model="Info.rsa_pub_key" :disabled="true"></el-input>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import na from './Navigation'

export default {
  data () {
    return {
      imgStudent: require('../assets/student.jpg'),
      imgInstructor: require('../assets/instructor.jpg'),
      Info: {
        uid: 'dlsakhdiagsfdcbhkagcu2',
        name: '王大锤',
        nickname: 'hammerwang',
        email: 'sjbdkjas@shanghaitech.edu.cn',
        student_id: 2018533110,
        rsa_pub_key: 'vakbhjgfbivgagkrhjafgiyrf'
      }
    }
  },
  components: {
    'v-na': na
  },
  computed: {
    getState () {
      return this.$store.state.instructor
    },
    getAuth () {
      return this.$store.state.isAuthorized
    },
    getID () {
      return this.$store.state.student_id
    }
  },
  created () {
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `/student/${this.getID}/`
      }).then((response) => {
        if (response.status === 200) {
          this.Info = response.data
        } else {
          // （todo: 跳转报错页面（%参数加上当前页面地址)） 未测试
          this.$router.push({path: '/403', query: { path: this.$route.path }})
        }
      })
    }
    console.log(this.$route.params)
  }
}
</script>

<style scoped>
  .img-profile {
    padding: 2%;
  }
  .cards {
    width: 700px;
  }
  .title {
    font-size: 40px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .sub-title {
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    float: right;
    margin-right: 8%;
  }
  .card-row {
    margin: 3% 0 2% 5%;
  }
  .card-row2 {
    margin: 3% 0 2% 5%;
  }
</style>
