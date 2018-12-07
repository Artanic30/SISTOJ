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
        :row-class-name="tableRowClassName">
        style="width: 100%"
        stripe>
        <el-table-column
          prop="name"
          label="NAME"
          >
        </el-table-column>
        <el-table-column
          prop="state"
          label="STATUS"
          width="180">
        </el-table-column>
        <el-table-column
          prop="release"
          label="RELEASE">
        </el-table-column>
        <el-table-column
          prop="due"
          label="DUE(CST"
          width="180"
          >       <!-- v-bind:style="classcolor(costate.state)" -->
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
      }
    }
  },
  methods: {
  },
  props: ['courseInformation', 'courseState'],
  created () {
    this.coInfo = this.courseInformation
    this.coState = this.courseState
  },
  computed: {
    // classcolor (a) {
    //   if (a === 'submitted') {
    //    return {'color': 'green'}            todo:changecolor
    //   } else if (a === 'Ongoing') {
    //     return {'color': 'red'}
    //   } else {
    //     return {'color': 'yellow'}
    //   }
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
