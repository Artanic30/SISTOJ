<template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in pictures" :key="item.id">
      <el-row>
          <el-col :span="24" type="flex" align="middle" justify="center"><img :src="item.img"></el-col>
        </el-row>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      pictures: [
        {
          id: 0,
          img: require('../assets/timg-1.jpg')
        },
        {
          id: 1,
          img: require('../assets/timg-2.jpg')
        },
        {
          id: 2,
          img: require('../assets/timg-3.jpg')
        },
        {
          id: 3,
          img: require('../assets/timg-4.jpg')
        },
        {
          id: 4,
          img: require('../assets/timg-5.jpg')
        },
        {
          id: 5,
          img: require('../assets/timg-6.jpg')
        }
      ]
    }
  }
}
</script>
<style>
</style>
