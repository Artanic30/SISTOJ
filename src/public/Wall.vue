<template>
  <div class="wall-main">
    <el-container style="height: 100%">
      <el-header style="padding: 0">
        <el-row type="flex" style="background-color: #A40006; padding:0 1rem;" justify="space-between" align="middle">
          <el-col style="width: auto">
            <el-row type="flex" justify="start" align="middle" :gutter="20">
              <el-col>
                <img v-bind:src="img" style="width: 100px;">
              </el-col>
              <el-col>
                <span style="color: white;">Online Judge</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="width: auto" v-if="getAuth">
            <v-na></v-na>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="height: 100%">
        <el-row type="flex" justify="center" align="middle">
          <el-col style="width: auto">
            <span style="color: #b82e3b;font-size: 7rem;">4 0 4</span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="10">
            <el-card class="cards">
              <el-row type="flex" justify="space-around" align="middle">
                <span class="words">Page was gone.....</span>
              </el-row>
              <el-row type="flex" justify="space-around" align="middle">
                <img v-bind:src="img2" class="img">
              </el-row>
              <el-row type="flex" justify="space-around" align="middle">
                <router-link class="link" :to="{ path: '/'}">Dashboard</router-link>
                <router-link class="link" :to="{ path: this.$route.query.path}">Go back</router-link>
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
      img: require('../assets/logo.png'),
      img2: require('../assets/404.jpg')
    }
  },
  components: {
    'v-na': na
  },
  computed: {
    getAuth () {
      return this.$store.state.authorized
    }
  }
}
</script>
<style scoped>
  .wall-main {
    height: 100vh;
  }

  .words {
    color: #b82e3b;
    font-size: 50px;
    flex-wrap: nowrap !important;
  }

  .link {
    text-decoration: none;
    font-size: 30px;
    color: #363636;
  }

  .link:hover {
    font-size: 30px;
    color: #b82e3b;
  }

  .cards {
    padding: 4rem 0;
  }

  .img {
    padding: 3rem 0;
    height: 200px !important;
  }
</style>
