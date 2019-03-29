<template>
  <div>
    <el-button @click="requestData" v-if="this.show" size="mini">Request</el-button>
    <el-dropdown v-else>
      <span class="el-dropdown-link">Here<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in Judges" v-bind:key="item.uid" v-if="checkData(item)">
          <el-button @click="returnJudges(item)" class="button-title">
            <span>{{ item.host }}</span>
          </el-button>
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
      Judges: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      JudgeUid: [
        {
          uid: ''
        }
      ]
    }
  },
  props: ['passAssUID'],
  methods: {
    requestData () {
      let that = this
      for (let i = 0; i < this.JudgeUid.length; i++) {
        that.axios.get(`${that.Api}/judge/${that.JudgeUid[i].uid}`)
          .then((response) => {
            that.$set(that.Judges, i, response.data)
          })
          .catch((err) => {
            that.$message({
              type: 'error',
              message: err,
              showClose: true
            })
          })
      }
      this.show = false
    },
    returnJudges (data) {
      this.$emit('reJudges', data)
    },
    checkData (item) {
      return !(Object.keys(item).length === 0)
    }
  },
  watch: {
    passAssUID: function name (newValue) {
      this.passAssUID = newValue
    },
    Judges: function (newValue) {
      this.Judges = newValue
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    Api: state => state.api
  }),
  created () {
    if (this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.getUid}/assignment/${this.passAssUID}/judge/`)
        .then((response) => {
          this.JudgeUid = response.data
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  }
}
</script>

<style scoped>
.button-title {
  width: 150px;
}
</style>
