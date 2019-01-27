<template>
    <div>
      <el-row :gutter="16" style="margin-top: 5%">
        <el-col :span="4">
          <span style="font-size: 30px">Assignment</span>
        </el-col>
        <el-col :span="4" style="float: right">
          <el-tooltip class="item" effect="dark" content="Add New Assignment" placement="top">
              <el-button @click="addHomework()" style="background-color: #A40004"><i class="el-icon-plus" style="color: white"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%">
        <el-col>
          <el-table
          :data="coState"
          style="width: 100%"
          max-height="250">
          <el-table-column
            fixed
            prop="name"
            label="NAME"
            width="150">
          </el-table-column>
          <el-table-column
            prop="state"
            label="STATE"
            width="120">
          </el-table-column>
          <el-table-column
            prop="release"
            label="RELEASE"
            width="120">
          </el-table-column>
          <el-table-column
            prop="due"
            label="DUE"
            >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, coState)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      childChange: false,
      coState: [{
        name: '编程第一次作业',
        state: 'Failed',
        release: 'NOV 01',
        due: 'NOV 12 T 12:00AM'
      }, {
        name: '编程第一次作业',
        state: 'Ongoing',
        release: 'NOV 01',
        due: 'NOV 12 T 12:00AM'
      }, {
        name: '编程第一次作业',
        state: '59/100',
        release: 'NOV 01',
        due: 'NOV 12 T 12:00AM'}]
    }
  },
  methods: {
    addHomework () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.$emit('changeState', this.childChange)
      }, 500)
    },
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        rows.splice(index, 1)
        // todo: axios delete
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
