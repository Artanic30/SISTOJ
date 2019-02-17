<template>
 <div class="line">
   <el-row type="flex" class="row-chicken" justify="space-between" align="middle">
          <el-col style="width: auto">
            <el-row type="flex" justify="start" align="middle" :gutter="20">
              <el-col>
                <img v-bind:src="img" class="img-logo">
              </el-col>
              <el-col>
                <span class="text-logo">Online Judge</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="menu-top" v-if="this.getAuth">
             <el-menu
              :default-active="$route.path"
              mode="horizontal"
              background-color="#A40006"
              text-color="#fff"
              active-text-color="#ffd04b"
              router>
                <el-submenu index="2" class="submenu">
                  <template slot="title">Account</template>
                  <el-menu-item index="/profile" v-if="!profilePage">Profile</el-menu-item>
                  <el-menu-item index="/" v-else>Dashboard</el-menu-item>
                  <el-menu-item index="/" v-if="profilePage" @click="goBack">Go back</el-menu-item>
                  <el-menu-item index="/" @click="logout">Log out</el-menu-item>
                </el-submenu>
              </el-menu>
          </el-col>
         <el-col v-else>
           <el-button @click="login" class="button-login">Login in</el-button>
         </el-col>
   </el-row>
 </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      img: require('../assets/logo.png'),
      isAuth: false
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getUid: state => state.coInfo.uid,
    getCoInfo: state => state.coInfo,
    profilePage () {
      return (this.$route.name === 'instrProfile') || (this.$route.name === 'profile')
    }
  }),
  methods: {
    logout () {
      this.$store.commit('logOut')
      window.location.reload()
    },
    goBack () {
      this.$router.go(-2)
    },
    login () {
      this.$store.commit('login')
      window.location.reload() // another solution: vuex + watch
    }
  }
}
</script>

<style scoped>
  .line {
    background: #A40006;
  }
  .row-chicken {
    background-color: #A40006;
    padding:0 1rem;
  }
  .img-logo {
    width: 100%;
  }
  .text-logo {
    color: white;
  }
  .submenu {
    float: right;
  }
  .button-login {
    float: right;
    height: 40px;
    margin: 10px;
  }
  .menu-top {
    width: auto;
    height: 60px;
  }
</style>
