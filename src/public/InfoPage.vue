<template>
    <div>
      <el-row style="background-color: #A40006;margin-bottom: 1%">
        <el-col :span="24">
          <v-na></v-na>
        </el-col>
    </el-row>
    <el-row>
      <el-col align="middle"><span class="title">{{ this.Info.name }}</span></el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="24" align="middle">
        <el-card class="cards">
          <img v-bind:src="img" class="Img" v-if="getState">
          <img v-bind:src="img2" class="Img" v-else>
        </el-card>
      </el-col>
    </el-row>
      <el-row>
        <el-col align="middle">
          <el-card class="cards">
            <el-row type="flex" justify="center" align="middle" class="card_row">
              <el-col :span="6">
                <span class="sub_title">Nickname:</span>
              </el-col>
              <el-col :span="10">
                <el-input class="shortInput" v-model="Info.nickname" :disabled="true"></el-input>
              </el-col>
              <el-col :span="6">
                <span class="sub_title">Student Id:</span>
              </el-col>
              <el-col :span="10">
                <el-input class="shortInput" v-model="Info.student_id" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="card_row2">
              <el-col :span="4">
                <span class="sub_title">Email:</span>
              </el-col>
              <el-col :span="18">
                <el-input class="shortInput" v-model="Info.email" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="card_row2">
              <el-col :span="4">
                <span class="sub_title">Public Key:</span>
              </el-col>
              <el-col :span="18">
                <el-input class="shortInput" v-model="Info.rsa_pub_key" :disabled="true"></el-input>
              </el-col>
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
      img: require('../assets/student.jpg'),
      img2: require('../assets/instructor.jpg'),
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
      return this.$store.state.authorized
    }
  },
  created () {
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `/student/${this.$store.state.student_id}`
      }).then((response) => {
        if (response.status === 200) {
          this.Info = response.data
        } else {
          // （todo: 跳转报错页面（%参数加上当前页面地址)） 未测试
          this.$router.push({path: '/403', query: { path: this.$route.path }})
        }
      })
    }
  }
}
</script>

<style scoped>
  .Img {
    height: 350px;
  }
  .cards {
    width: 700px;
  }
  .title {
    font-size: 40px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .sub_title {
    font-size: 20px;
    font-family: "Lucida Grande", "DejaVu Sans", "Bitstream Vera Sans", Verdana, Arial, sans-serif;
  }
  .card_row {
    margin: 3% 3% 2% 3%;
  }
  .card_row2 {
    margin: 3% 0 2% 5%;
  }
</style>
