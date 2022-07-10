<template>
  <div class="layout">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/home/list" icon="search"
        >找房</van-tabbar-item
      >
      <van-tabbar-item replace to="/home/news" icon="newspaper-o"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/home/profile" icon="user-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
