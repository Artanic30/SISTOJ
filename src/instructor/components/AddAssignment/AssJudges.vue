<template>
  <div>
    <el-button @click="requestData" v-if="this.show">Request</el-button>
    <el-dropdown v-else>
      <span class="el-dropdown-link">click here<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in Judges" v-bind:key="item.uid">
          <el-button @click="returnJudges(item)" class="button-title">{{ item.host }}</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      show: true,
      Judges: []
    }
  },
  props: ['passAssUID'],
  methods: {
    requestData () {
      if (this.getAuth) {
        this.axios.get(`${this.Api}/course/${this.getUid}/assignment/${this.passAssUID}/judge/`)
          .then((response) => {
            if (response.status === 200) {
              this.Judges = response.data
            } else if (response.status === 401) {
              this.$router.push('/unauthorized')
            } else {
              this.$router.push('/error')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
      this.show = false
    },
    returnJudges (data) {
      this.$emit('reJudges', data)
    }
  },
  watch: {
    passAssUID: function name (newValue) {
      this.passAssUID = newValue
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    Api: state => state.api
  })
}
</script>

<style scoped>
.button-title {
  width: 150px;
}
</style>
