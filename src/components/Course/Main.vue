<template>
  <div>
    <el-row style="margin: 4% 0 10px 0">
      <div class="tle">
        <div style="margin-right: 5%;">
          <span style="font-size: 30px;" >{{ coinfo.name }}</span>
        </div>
        <div class="blackline" style="margin-right: 5%"></div>
        <div style="margin-top: 5px">
          <span style="font-size: 20px;font-style: normal;">{{ coinfo.semester }}</span>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-table
        :data="costate"
        style="width: 100%"
        stripe>
        <el-table-column
          prop="name"
          label="NAME"
          >
        </el-table-column>
        <el-table-column
          v-bind:src="img"
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
      img: require('../../assets/logo.png'),
      costate: [{
        name: '',
        state: '',
        release: '',
        due: '',
        check: true
      }],
      coinfo: {
        name: '',
        group: '',
        instructors: ['']
      },
      tableData2: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
  },
  props: ['courseInformation', 'courseState'],
  created () {
    this.coinfo = this.courseInformation
    this.costate = this.courseState
    if (this.costate.state === 'Submitted') {
      this.costate.check = true
    }
    if (this.costate.state === 'Ongoing') {
      this.costate.check = false
    }
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
