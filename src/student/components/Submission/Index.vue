<template>
    <div>
        <el-row :gutter="2">
            <el-col :span="4">
              <el-menu class="menu-only">
                <v-aside :deliverDetail="assignmentDetail"></v-aside>
              </el-menu>
            </el-col>
            <el-col :span="18" class="col-one">
              <v-main class="main" :deliverDetail="submission" :deliverInfo="assignmentDetail"></v-main>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import na from '../../../public/Navigation'
import main from './Main'
import aside from './Aside'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      submission: [
      ],
      assignmentDetail: {
        uid: '',
        course_uid: '',
        name: '',
        deadline: 0,
        release_date: 0,
        descr_link: '',
        score: 0,
        overall_score: 0
      }
    }
  },
  components: {
    'v-main': main,
    'v-na': na,
    'v-aside': aside
  },
  methods: {
    getSubmission (data) {
      let that = this
      if (!data) {
        return data
      }
      let result = []
      data.map(function (a) {
        if (a.submission_time) {
          a.submission_time = that.formatUTC(a.submission_time)
        } else {
          a.submission_time = 'no time!'
        }
        result.push(a)
      })
      return result
    },
    formatUTC (utcdatetime) {
      let Tpos = utcdatetime.indexOf('T')
      let Zpos = utcdatetime.indexOf('Z')
      let yearmonthday = utcdatetime.substr(0, Tpos)
      let hourminutesecond = utcdatetime.substr(Tpos + 1, Zpos - Tpos - 1)
      let newdatetime = yearmonthday + ' ' + hourminutesecond
      let timestamp = new Date(Date.parse(newdatetime))
      timestamp = timestamp.getTime()
      timestamp = timestamp / 1000
      timestamp = timestamp + 8 * 60 * 60
      return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
    },
    filterUid (code, cate) {
      let uid = this.codeToUid({
        code: code,
        cate: cate
      })
      if (uid === '') {
        this.$router.push({
          name: 'notFound'
        })
      } else {
        return uid
      }
    }
  },
  created () {
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `${this.Api}/student/${this.getID}/course/${this.filterUid(this.$route.params.course_code, 'course')}/assignment/${this.filterUid(this.$route.params.ass_name, 'assignment')}/history/`
      }).then((response) => {
        this.submission = this.getSubmission(response.data)
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
    }
    this.assignmentDetail = this.$store.state.assignments
  },
  computed: {
    ...mapGetters([
      'codeToUid'
    ]),
    ...mapState({
      getAuth: state => state.isAuthorized,
      getID: state => state.baseInfo.uid,
      getUID: state => state.coInfo.uid,
      getAssUID: state => state.assignments.uid,
      Api: state => state.api
    })
  }
}
</script>
<style scoped>
  .menu-only {
    float: left;
    margin-right: 5%;
    width: 220px;
    min-height: 1000px;
  }
  .col-one {
    float: right;
  }
  .main {
    margin: 5%;
  }
</style>
