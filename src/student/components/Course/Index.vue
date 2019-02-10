<template>
  <div class="index">
    <el-row style="height: 100%" :gutter="6">
      <el-col :span="4" style="margin-right: 10%">
          <el-menu style="float: left;margin-right: 5%;width: 220px;min-height: 1000px;">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="14">
         <v-main></v-main>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import na from '../../../public/Navigation'
import main from './Main'
import aside from './Aside'

export default {
  data () {
    return {
      img: require('../../../assets/logo.png')
    }
  },
  components: {
    'v-main': main,
    'v-na': na,
    'v-aside': aside
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>
</style>
