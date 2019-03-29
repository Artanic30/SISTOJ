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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
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
    font-size: 30px
  }
</style>
