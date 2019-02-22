<template>
  <div>
    <el-row style="text-align: left">
      <el-col>
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          :titles="['Source', 'Target']"
          @change="handleChange"
          :data="transData">
        </el-transfer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transData: [{
        key: 1,
        label: '233',
        disabled: true
      },
      {
        key: 3,
        label: '123123',
        disabled: false
      },
      {
        key: 7,
        label: '123123',
        disabled: true
      }],
      value: [2, 3]
    }
  },
  methods: {
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  },
  props: ['passPersonal', 'passDefault'],
  watch: {
    passPersonal: function name (newValue) {
      this.passPersonal = newValue
    },
    passDefault: function name (newValue) {
      this.passDefault = newValue
    }
  },
  updated () {
    console.log(this.passDefault)
  }
}
</script>
<style>
</style>
