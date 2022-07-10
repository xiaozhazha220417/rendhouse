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
      // columns: [
      //   {
      //     label: '一室',
      //     value: 'ROOM|d4a692e4-a177-37fd'
      //   },
      //   {
      //     label: '二室',
      //     value: 'ROOM|d1a00384-5801-d5cd'
      //   },
      //   {
      //     label: '三室',
      //     value: 'ROOM|20903ae0-c7bc-f2e2'
      //   },
      //   {
      //     label: '四室',
      //     value: 'ROOM|ce2a5daa-811d-2f49'
      //   },
      //   {
      //     label: '四室+',
      //     value: 'ROOM|2731c38c-5b19-ff7f'
      //   }
      // ]
      columns: ['一室', '二室', '三室', '四室', '四室+']
    }
  },
  methods: {
    onConfirm (value, index) {
      // console.log(value)
      this.$emit('update-houseType-value', value)
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
