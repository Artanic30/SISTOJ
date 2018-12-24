<template>
  <div>
    <el-row style="margin: 4% 0 10px 0">
      <div class="tle">
        <div style="margin-right: 5%;">
          <span style="font-size: 30px;" >{{ coInfo.name }}</span>
        </div>
        <div class="blackline" style="margin-right: 5%"></div>
        <div style="margin-top: 5px">
          <span style="font-size: 20px;font-style: normal;">{{ coInfo.semester }}</span>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-table
        :data="coState"
        style="width: 100%"
        stripe>
        <el-table-column label="NAME">
          <template slot-scope="scope" >
            <router-link :to="getpath(scope.row.name)" style="color: #606266;text-decoration:none">{{ scope.row.name }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="STATUS"
          width="180">
          <template slot-scope="scope">
            <el-button :style="colors(scope.row.state)">
              <router-link :to="getstate(scope.row.name)" style="text-decoration: none;color: white;">{{ scope.row.state }}</router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="release"
          label="RELEASE">
        </el-table-column>
        <el-table-column
          prop="due"
          label="DUE(CST"
          width="180"
          >
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coState: [{
        name: '',
        state: '',
        release: '',
        due: ''
      }],
      coInfo: {
        name: '',
        group: '',
        instructors: ['']
      },
      student_id: 0,
      instructor: true
    }
  },
  methods: {
    getpath (path) {
      if (this.instructor === false) {
        return this.$route.path + '/instructor/' + path
      } else {
        return this.$route.path + '/assignment/' + path
      }
    },
    getstate (path) {
      if (this.instructor === false) {
        return this.$route.path + '/instructor/' + path
      } else {
        return this.$route.path + '/submission/' + path
      }
    },
    colors (situation) { // don't use state as the variable name
      if (situation === 'Failed') {
        return 'background-color: #ed3f14;'
      } else if (situation === 'Ongoing') {
        return 'background-color: #19be6b;'
      } else {
        return 'background-color: #2d8cf0;'
      }
    }
  },
  props: ['courseInformation', 'courseState'],
  mounted () {
    this.coInfo = this.courseInformation
    this.coState = this.courseState
    this.student_id = this.$store.state.student_id
    this.instructor = this.$store.state.instructor
    console.log(this.$store.state.student_id)
    console.log(this.instructor)
  }
}

</script>
<style scoped>
  .blackline {
    height: 30px;
    background-color: black;
    width: 1px;
    margin-top: 5px;
  }
  .tle {
    display: flex;
    flex-direction: row;
  }
</style>
