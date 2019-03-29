<template>
  <div>
    <el-row :gutter="1">
      <el-col :span="5">
          <el-menu class="el-menu-vertical-demo">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="18" class="col-one">
         <v-main v-if="change" v-on:changeState="changeState" class="add"></v-main>
        <v-add v-else v-on:goBack="goBack" class="add"></v-add>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import na from '../../../public/Navigation'
import main from './Main'
import aside from '../../../public/InstrAside'
import add from './Add'

export default {
  data () {
    return {
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
  }
}
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 90%;
    min-height: 1000px;
    max-width: 180px;
    float: left!important;
    margin: 0 5% 0 0!important;
  }
  .col-one {
    float: right;
  }
  .add {
    margin-right: 15%;
  }
</style>
