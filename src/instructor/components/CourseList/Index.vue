<template>
  <div class="index">
    <el-row style="background-color: #A40006">
      <el-col :span="24">
        <v-na></v-na>
      </el-col>
    </el-row>
    <el-row style="height: 100%" :gutter="6">
      <el-col :span="4" style="margin-right: 10%">
          <el-menu style="float: left;margin-right: 5%;width: 220px;min-height: 1000px;">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="14">
         <v-main v-if="change" v-on:changeState="changeState"></v-main>
        <v-add v-else v-on:goBack="goBack"></v-add>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import na from '../../../public/Navigation'
import main from './Main'
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
    'v-main': main,
    'v-na': na,
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
</style>
