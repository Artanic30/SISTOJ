<template>
 <div class="line">
   <el-row type="flex" class="row-chicken" justify="space-between" align="middle">
          <el-col style="width: auto">
            <el-row type="flex" justify="center" align="middle" :gutter="20">
              <el-col type="flex" justify="center" align="middle">
                <img v-bind:src="img" class="img-logo" @click="this.backHome">
              </el-col>
              <el-col>
                <span class="text-logo">Online Judge</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="menu-top" v-if="this.getAuth">
             <el-menu
              class="menu"
              :default-active="$route.path"
              mode="horizontal"
              background-color="#A40006"
              text-color="#fff"
              active-text-color="#ffd04b"
              router>
                <el-submenu index="2" class="submenu">
                  <template slot="title">Account</template>
                  <el-menu-item index="/" v-if="this.checkRoleInstr">Student Version</el-menu-item>
                  <el-menu-item index="/instr" v-if="this.checkRoleStu">Instructor Version</el-menu-item>
                  <el-menu-item index="/profile" v-if="!profilePage">Profile</el-menu-item>
                  <el-menu-item index="/" v-else>Dashboard</el-menu-item>
                  <el-menu-item index="/" v-if="profilePage" @click="goBack">Go back</el-menu-item>
                  <el-menu-item index="/changeProfile">Change profile</el-menu-item>
                  <el-menu-item index="/" @click="logout">Logout</el-menu-item>
                </el-submenu>
              </el-menu>
          </el-col>
         <el-col v-else>
           <el-button @click="login" class="button-login">Login</el-button>
         </el-col>
   </el-row>
 </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      img: require('../assets/logo.png')
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getBase: state => state.baseInfo,
    getUid: state => state.coInfo.uid,
    getCoInfo: state => state.coInfo,
    Api: state => state.api,
    getLogout: state => state.logout_url,
    profilePage () {
      return (this.$route.name === 'instrProfile') || (this.$route.name === 'profile' || this.$route.name === 'changeProfile')
    },
    checkRoleStu () {
      return this.getBase.isInstructor && this.getBase.isStudent && (this.$route.name === 'homeStudent' || this.$route.name === 'indexStudent')
    },
    checkRoleInstr () {
      return this.getBase.isInstructor && this.getBase.isStudent && this.$route.name === 'indexInstructor'
    }
  }),
  methods: {
    logout () {
      this.$store.commit('logOut')
      this.$cookies.remove('sessionid')
      window.location.href = `${this.getLogout}`
    },
    goBack () {
      this.$router.go(-2)
    },
    backHome () {
      if (this.getBase.isStudent && !this.getBase.isInstructor) {
        this.$router.push('/')
      } else if (!this.getBase.isStudent && this.getBase.isInstructor) {
        this.$router.push('/instr')
      } else {
        if (this.$route.path.includes('instr')) {
          this.$router.push('/instr')
        } else {
          this.$router.push('/')
        }
      }
    },
    login () {
      if (!this.getAuth) {
        this.axios({
          method: 'get',
          url: `${this.Api}/user/login/oauth/param`,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'get',
            'Access-Control-Allow-Headers': 'x-requested-with,content-type'
          }
        }).then((response) => {
          this.$store.commit('login', response.data.logout_url)
          // window.location.href = response.data.login_url // todo: warning
          window.location.reload()
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            showClose: true
          })
        })
      }
    }
  },
  created () {
    let that = this
    this.$store.commit('updateApi', location.hostname) // todo:warning  'https://' + location.hostname + '/api'
    const loading = this.$loading({
      lock: true,
      text: 'Initializing!',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    setTimeout(() => {
      this.axios({
        method: 'get',
        url: `https://${location.hostname}/api/user/role`
      }).then((response) => {
        loading.close()
        this.$store.commit('login', null)
        this.$notify({
          title: 'Success!',
          message: 'Connection with potato server established!',
          type: 'success',
          offset: 50
        })
        if (!response.data.is_student && response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 2
          })
        } else if (response.data.is_student && !response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 1
          })
        } else if (!response.data.is_student && !response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 4
          })
          setTimeout(() => {
            this.$notify({
              title: 'Warning!',
              message: 'No role detected, you will be redirect to another page!',
              type: 'warning',
              offset: 50
            })
            setTimeout(() => {
              this.$router.push('/uninitialized')
            }, 3000)
          }, 1000)
        } else {
          setTimeout(() => {
            this.$notify({
              title: 'Tips!',
              message: 'Double roles detected! Version switch is available in the account menu.',
              type: 'info',
              offset: 50
            })
          }, 1000)
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 3
          })
        }
      }).catch(() => {
        loading.close()
        this.$notify({
          title: 'Failure!',
          message: 'Lost synchronism with potato server!',
          type: 'error'
        })
        setTimeout(() => {
          this.$notify({
            title: 'Info!',
            message: 'Please login again!',
            type: 'info'
          })
          setTimeout(() => {
            this.$store.commit('logOut')
            this.$cookies.remove('sessionid')
            this.$router.push('/')
          }, 3000)
        }, 1000)
      })
    }, 1000)
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
    height: 100% !important;
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
  }
  .menu {
    height: 100% !important;
    border-bottom: 0 !important;
    margin-bottom: 0 !important;
    color: #A40006 !important;
  }
</style>
