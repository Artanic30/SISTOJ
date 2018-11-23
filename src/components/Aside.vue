<template>
  <div class="aside">
    <div class="title1">
      <span >Your Courses</span>
    </div>
    <div class="content1">
      <span>{{msg}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Shanghaitech online judge!Click on one of your courses to the right, or on the Account menu above.'
    }
  }
}
</script>
<style>
  .aside {
    display:flex;
    justify-content: left;
    flex-direction: column;
  }
  > title1 {
    font-size: 30px;
  }
  .aside content1 {
    font-size: 20px;
  }
</style>
