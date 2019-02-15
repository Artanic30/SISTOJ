<template>
  <div class="index">
    <el-row class="row-height" :gutter="6">
      <el-col :span="4" class="col-one">
          <el-menu class="menu-only">
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
  }
}
</script>
<style scoped>
  .row-height {
    height: 100%;
  }
  .col-one {
    margin-right: 10%;
  }
  .menu-only {
    float: left;
    margin-right: 5%;
    width: 220px;
    min-height: 1000px;
  }
</style>
