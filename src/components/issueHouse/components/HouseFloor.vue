<template>
  <van-picker
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close-picker')"
  />
</template>

<script>
export default {
  created () { },
  data () {
    return {
      columns: ['高楼层', '中楼层', '低楼层']
    }
  },
  methods: {
    onConfirm (value, index) {
      // console.log(value)
      this.$emit('update-houseFloor-value', value)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
