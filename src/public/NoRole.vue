<template>
  <div class="index">
    <el-row>
      <el-col>
        <el-card class="card-index">
          <el-row>
            <el-col>
              <span class="sub-text">Hey there! We noticed that you're not currently given any identification.
                    Here are some resources to get you started.</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h1>For students</h1>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class=" sub-text"> For most types of courses, students can't enroll themselves. Fire off an
                      email to your instructor and they can make sure that you get added.</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h1>For instructors</h1>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class=" sub-text"> You should ask your system administrator to include you as an instructor. Only then can you operate the system.</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h1>One last thing.....</h1>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class=" sub-text"> You can claim that you are a student or instructor and it won't be check immediately before your claim come into effect so please be responsible for what you have done!</span>
            </el-col>
          </el-row>
          <el-row class="margin-top">
            <el-col :span="6" :offset="6">
              <el-button type="danger" round class="claim-button" @click="claimStudent"><span class="big-words">I'm student!</span></el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" round class="claim-button" @click="claimTeacher"><span class="big-words">I'm instructor!</span></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    claimTeacher () {
      this.$confirm('此操作将声明一个助教身份, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'post',
          url: `${this.Api}/user/${this.getUid}/instructor`,
          data: {},
          headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}
        }).then((response) => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
    },
    claimStudent () {
      this.$confirm('此操作将声明一个学生身份, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'post',
          url: `${this.Api}/user/${this.getUid}/student`,
          data: {},
          headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}
        }).then((response) => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
    }
  },
  computed: mapState({
    getUid: state => state.baseInfo.uid
  })
}
</script>
<style>
  .index {
    padding: 5% 20% 5% 20%;
  }
  .card-index {
    padding: 50px;
  }
  .sub-text {
    font-size: 30px;
  }
  .big-words {
    font-size: 20px;
  }
  .margin-top {
    margin-top: 5%;
  }
  .claim-button {
    min-width: 100px;
  }
</style>
