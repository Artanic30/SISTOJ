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
          :data="transData">
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
        headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}
      })
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        window.location.reload()
      }, 500)
    },
    handleChange (cv, direction, value) {
      let that = this
      if (direction === 'right') {
        value.map(function (uid) {
          that.axios({
            method: 'post',
            url: `${that.Api}/course/${that.getUid}/assignment/${that.passReply.uid}/judge/`,
            data: {uid},
            headers: {'X-CSRFToken': that.$cookies.get('csrftoken')}
          }).then((response) => {
          }).catch((err) => {
            that.$message({
              type: 'error',
              message: err.status,
              showClose: true
            })
          })
        })
      } else {
        value.map(function (uid) {
          that.axios({
            method: 'delete',
            url: `${that.Api}/course/${that.getUid}/assignment/${that.passReply.uid}/judge/${uid}`,
            headers: {'X-CSRFToken': that.$cookies.get('csrftoken')}
          }).then((response) => {
          }).catch((err) => {
            that.$message({
              type: 'error',
              message: err.status,
              showClose: true
            })
          })
        })
      }
    },
    checkObj (value) {
      let result = []
      let keys = []
      value.map(element => {
        if (keys.indexOf(element.key) === -1) {
          result.push(element)
          keys.push(element.key)
        }
      })
      return result
    },
    checkNum (value) {
      let result = new Set(value)
      return [...result]
    }
  },
  props: ['passReply'],
  created () {
    let that = this
    let len = 0
    if (this.getAuth) {
      let promise = new Promise((resolve, reject) => {
        this.axios.get(`${this.Api}/course/${this.getUid}/judge/`).then((response) => {
          len = response.data.length
          resolve(response.data)
        })
      })
      promise.then(data => {
        for (let i = 0; i < data.length; i++) {
          that.axios.get(`${this.Api}/judge/${data[i].uid}`).then(response => {
            that.$set(that.transData, i + len - 1, {
              key: response.data.uid,
              label: response.data.host,
              disable: false
            })
          })
        }
      }).catch((err) => {
        that.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
      promise.then(() => {
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
      })
    }
    /* ajax 申请来数据后对数据进行去重 */
    this.value = this.checkNum(this.value)
    this.transData = this.checkObj(this.transData)
  },
  computed: mapState({
    getUid: state => state.coInfo.uid,
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getAss: state => state.assignments,
    Api: state => state.api
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
