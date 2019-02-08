<template>
 <div class="line">
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
             <el-menu
              :default-active="$route.path"
              mode="horizontal"
              background-color="#A40006"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
              >
              <el-submenu index="2" style="float: right">
                <template slot="title">Account</template>
                <el-menu-item index="/profile">Profile</el-menu-item>
                <el-menu-item index="/password">change password</el-menu-item>
                <el-menu-item index="/key">change key</el-menu-item>
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
    }
  }
}
</script>

<style scoped>
  .line {
    background: #A40006;
  }
</style>
