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
          <el-col style="width: auto" v-if="getAuth">
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
   </el-row>
 </div>
</template>

<script>
export default {
  data () {
    return {
      img: require('../assets/logo.png')
    }
  },
  computed: {
    getAuth () {
      return this.$store.state.isAuthorized
    },
    profilePage () {
      return (this.$route.name === 'instrProfile') || (this.$route.name === 'profile')
    }
  },
  methods: {
    logout () {
      console.log(2333)
    },
    goBack () {
      this.$route.go(-1)
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
</style>
