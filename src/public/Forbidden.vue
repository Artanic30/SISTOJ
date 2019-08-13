<template>
  <div class="wall-main">
    <el-container style="height: 100%">
      <el-main style="height: 100%">
        <el-row type="flex" justify="center" align="middle">
          <el-col style="width: auto">
            <span class="title-number">4 0 3</span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="10">
            <el-card class="cards">
              <el-row type="flex" justify="space-around" align="middle">
                <el-col class="space-center">
                  <span class="words">Forbidden request detected or unknown error happens, please login again!</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" align="middle">
                <img v-bind:src="img2" class="img">
              </el-row>
              <el-row type="flex" justify="space-around" align="middle">
                <el-button @click="logout"><span class="title-button">Logout</span></el-button>
                <el-button @click="login"><span class="title-button">Login</span></el-button>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import na from './Navigation'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      img2: require('../assets/pagenotfound.jpg')
    }
  },
  components: {
    'v-na': na
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    Api: state => state.api,
    getLogout: state => state.logout_url
  }),
  methods: {
    logout () {
      this.$store.commit('logOut')
      this.$store.commit('refreshReq')
      this.$cookies.remove('sessionid')
      window.location.href = `${this.getLogout}`
    },
    login () {
      this.axios({
        method: 'get',
        url: `${this.Api}/user/login/oauth/param`
      }).then((response) => {
        this.$store.commit('login', response.data.logout_url)
        window.location.href = response.data.login_url
      })
    }
  }
}
</script>
<style scoped>
  .wall-main {
    height: 100vh;
  }

  .words {
    color: black;
    font-size: 40px;
    flex-wrap: nowrap !important;
  }
  .cards {
    padding: 4rem 0;
  }

  .img {
    padding: 3rem 0;
    height: 200px !important;
  }
  .space-center {
    margin: 0 5% 0 10%;
  }
  .title-button {
    font-size: 25px;
  }
  .title-number {
    color: #b82e3b;
    font-size: 7rem;
  }
  .el-table_2_column_8 {
    padding-top: 0 !important;
  }
</style>
