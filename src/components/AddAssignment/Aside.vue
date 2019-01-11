<template>
    <div>
      <el-row style="margin-top: 20%">
        <el-col>
          <span style="margin-top: 20px;font-size: 200%;">Welcome</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%">
        <el-col>
          <span style="font-size: 150%;margin-top: 5%">instructor<br>{{ name }}</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%">
        <el-col>
          <span style="margin-top: 5%">You can check students' assignments state and add new assignment here</span>
        </el-col>
      </el-row>
       <el-row style="margin-top: 10%">
      <el-col :span="5">
        <i class="el-icon-star-on" style="margin-left: 10px"></i>
      </el-col>
      <el-col :span="15">
        <span @click="back" style="font-size: 20px">Course list</span>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Mianheng jiang'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
