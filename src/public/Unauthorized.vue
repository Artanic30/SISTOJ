<template>
  <div class="wall-main">
    <el-container style="height: 100%">
      <el-main style="height: 100%">
        <el-row type="flex" justify="center" align="middle">
          <el-col style="width: auto">
            <span style="color: #b82e3b;font-size: 7rem;">4 0 3</span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="10">
            <el-card class="cards">
              <el-row type="flex" justify="space-around" align="middle">
                <el-col class="space-center">
                  <span class="words">Unauthorized request detected or</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" align="middle">
                <el-col class="space-center">
                  <span class="words">unknown error happens, please</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" align="middle">
                <el-col class="space-center">
                  <span class="words-last">logout and login again!!!</span>
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

export default {
  data () {
    return {
      img2: require('../assets/pagenotfound.jpg'),
      historyUrl: ''
    }
  },
  components: {
    'v-na': na
  },
  computed: {
    getAuth () {
      return this.$store.state.isAuthorized
    }
  },
  methods: {
    logout () {
    },
    login () {
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
  .words-last {
    color: #b82e3b;
    font-size: 50px;
    flex-wrap: nowrap !important;
    margin-left: 20px;
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
</style>
