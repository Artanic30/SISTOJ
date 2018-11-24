<template>
 <div class="line">
       <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#A40006"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            >           <!--  todo:箭头与文字重合及箭头颜色   -->
            <el-submenu index="2" style="float: right">
              <template slot="title">Account</template>
              <el-menu-item index="/email">change email</el-menu-item>
              <el-menu-item index="/password">change password</el-menu-item>
              <el-menu-item index="/key">change key</el-menu-item>
            </el-submenu>
       </el-menu>
 </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .line {
    display:flex;
    height: 5%;
    width:10%!important;
  }
</style>
