<template>
  <van-grid-item :class="{ active: isHouseConfigColor }" @click="onClick">
    <template #icon>
      <i class="iconfont" :class="houseConfigList.icon"></i>
    </template>
    <template #text>
      <span class="text">{{ houseConfigList.label }}</span>
    </template>
  </van-grid-item>
</template>

<script>
export default {
  name: 'HouseConfig',
  created () { },
  props: {
    houseConfigList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isHouseConfigColor: false
    }
  },
  methods: {
    onClick () {
      // console.log(this.houseConfigList.isHouseConfigColor)
      this.isHouseConfigColor = !this.isHouseConfigColor
      this.$emit('updateHouseConfig', this.isHouseConfigColor, this.houseConfigList.label)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.houseConfig {
  .iconfont {
    font-size: 23px;
  }
  .text {
    font-size: 14px;
    padding-top: 10px;
  }
}
.active {
  color: #21b97a;
}
</style>
