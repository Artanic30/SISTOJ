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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      submission: [
      ],
      assignmentDetail: {
        uid: 'b3b17c00f16511e8b3dfdca9047a0f14',
        course_uid: 'b3b17c00f16511e8b3dfdca9047a0f14',
        name: 'Homework1: Postfix Calculator',
        deadline: 157000100,
        release_date: 157000000,
        descr_link: 'https://shtech.org/course/si100c/17f/hw/1',
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
  },
  created () {
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `/student/${this.getID}/course/${this.getUID}/assignment/${this.getAssUID}/history/`
      }).then((response) => {
        if (response.status === 200) {
          this.submission = response.data
        } else {
          this.$router.push('403')
        }
      })
    }
    this.assignmentDetail = this.$store.state.assignments
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getUID: state => state.coInfo.uid,
    getAssUID: state => state.assignments.uid
  })
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
