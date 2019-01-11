<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="always">
          <el-row style="margin: 1% 0 1% 2%">
            <el-col>
               <span style="font-size: 25px">{{ assignmentDetail.name }} Submission </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-row>
        <el-col>
            <el-table
            :data="submission"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
              prop="submission_time"
              label="When"
              sortable>
            </el-table-column>
            <el-table-column
              prop="git_commit_id"
              label="ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="message"
              label="Status"
              >
            </el-table-column>
            <el-table-column
              prop="score"
              label="Score"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="overall_score"
              label="Full score"
              width="100">
            </el-table-column>
            <el-table-column
              prop="delta"
              label="Delta"
              width="100">
            </el-table-column>
          </el-table>
          </el-col>
        </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      submission: [
        {
          git_commit_id: '',
          course_uid: '',
          message: '',
          score: 0,
          overall_score: 0,
          submission_time: 0,
          delta: 0
        }
      ],
      assignmentDetail: {
        uid: 'b3b17c00f16511e8b3dfdca9047a0f14',
        course_uid: 'b3b17c00f16511e8b3dfdca9047a0f14',
        name: 'Homework1: Postfix Calculator',
        deadline: 157000100,
        release_date: 157000000,
        descr_link: 'https://shtech.org/course/si100c/17f/hw/1'
      }
    }
  },
  props: ['deliverDetail', 'deliverInfo'],
  created () {
    this.submission = this.deliverDetail
    this.assignmentDetail = this.deliverInfo
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  }
}
</script>

<style scoped>

</style>
