<template>
    <div>
      <el-row style="background-color: #A40006">
        <el-col :span="24">
          <v-na></v-na>
        </el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :span="4">
          <el-menu class="el-menu-vertical-demo" style="float: left;margin: 0 5% 0 0">
            <v-aside></v-aside>
        </el-menu>
        </el-col>
        <el-col :span="18" style="float: right;">
            <v-state v-if="change" v-on:changeState="changeState"></v-state>
            <v-add v-else v-on:goBack="goBack" style="margin-right: 15%"></v-add>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import na from '../../../public/Navigation'
import state from './State'
import aside from './Aside'
import add from './Add'

export default {
  data () {
    return {
      img: require('../../../assets/logo.png'),
      change: true
    }
  },
  components: {
    'v-na': na,
    'v-state': state,
    'v-aside': aside,
    'v-add': add
  },
  methods: {
    changeState: function (value) {
      this.change = value
    },
    goBack: function () {
      this.change = true
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 100px;
    min-height: 1000px;
    max-width: 180px;
  }
</style>
