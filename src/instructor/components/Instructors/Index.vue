<template>
  <div class="index">
    <el-row class="row-main" :gutter="6">
      <el-col :span="4" class="col-one">
          <el-menu class="menu-only">
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
  .row-main{
    height: 100%;
  }
  .col-one{
    margin-right: 10%;
  }
  .menu-only {
    float: left;
    margin-right: 5%;
    width: 220px;
    min-height: 1000px;
  }
</style>
