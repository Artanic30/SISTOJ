<template>
  <div>
    <el-row class="row-half">
      <el-col>
        <span class="title-main">Assignment Judges:</span>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col>
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          :titles="['Available Judges', 'Existing Judges']"
          @change="handleChange"
          :data="getTrans">
        </el-transfer>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col>
        <el-tooltip class="item" effect="dark" content="You are going to submit the judges on the right " placement="top-start">
          <el-button @click="submit" class="button-out">submit</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      transData: [],
      value: []
    }
  },
  methods: {
    submit () {
      this.steps += 1
      let result = this.getAss
      result.state = 2
      this.axios({
        method: 'post',
        url: `${this.Api}/course/${this.getUid}/assignment/${this.passReply.uid}`,
        data: result,
        headers: {'X-CSRFToken': this.getCookie('csrftoken')}
      })
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 500)
    },
    getCookie (name) {
      let value = '; ' + document.cookie
      let parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    handleChange (cv, direction, value) {
      let that = this
      if (direction === 'right') {
        value.map(function (uid) {
          that.axios({
            method: 'post',
            url: `${that.Api}/course/${that.getUid}/assignment/${that.passReply.uid}/judge/`,
            data: {uid},
            headers: {'X-CSRFToken': that.getCookie('csrftoken')}
          }).then((response) => {
          }).catch((err) => {
            that.$message({
              type: 'error',
              message: err,
              showClose: true
            })
          })
        })
      } else {
        value.map(function (uid) {
          that.axios({
            method: 'delete',
            url: `${that.Api}/course/${that.getUid}/assignment/${that.passReply.uid}/judge/${uid}`,
            headers: {'X-CSRFToken': that.getCookie('csrftoken')}
          }).then((response) => {
          }).catch((err) => {
            that.$message({
              type: 'error',
              message: err,
              showClose: true
            })
          })
        })
      }
    },
    check (n) {
      let result = []
      for (let i = 0; i < n.length; i++) {
        if (result.indexOf(n[i]) === -1) {
          result.push(n[i])
        }
      }
      return result
    }
  },
  props: ['passReply'],
  created () {
    let that = this
    let len = 0
    if (this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.getUid}/judge/`)
        .then((response) => {
          len = response.data.length
          for (let i = 0; i < response.data.length; i++) {
            that.axios.get(`${this.Api}/judge/${response.data[i].uid}`)
              .then((response2) => {
                that.value.push(response2.data.uid)
                that.$set(that.transData, i + len, {
                  key: response2.data.uid,
                  label: response2.data.host,
                  disable: false
                })
              })
              .catch((err) => {
                that.$message({
                  type: 'error',
                  message: err,
                  showClose: true
                })
              })
          }
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
      this.axios.get(`${this.Api}/judge/`)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            that.$set(that.transData, i, {
              key: response.data[i].uid,
              label: response.data[i].host,
              disable: false
            })
          }
        }).catch((err) => {
          that.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  },
  computed: mapState({
    getUid: state => state.coInfo.uid,
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getAss: state => state.assignments,
    Api: state => state.api,
    getTrans () {
      this.value = this.check(this.value)
      if (this.transData.length === 0) {
        return []
      } else {
        return this.check(this.transData)
      }
    }
  })
}
</script>
<style>
  .button-out {
    background-color: #A40004;
    color: white;
  }
  .row-half {
    margin-top: 5%;
  }
  .title-main {
    font-size: 25px;
  }
</style>
