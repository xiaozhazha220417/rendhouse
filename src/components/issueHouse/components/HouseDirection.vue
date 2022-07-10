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
      columns: ['东', '西', '南', '北', '东南', '东北', '西南', '西北']
    }
  },
  methods: {
    onConfirm (value) {
      // console.log(value)
      this.$emit('update-houseDirection-value', value)
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
