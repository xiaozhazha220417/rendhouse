<template>
  <div class="favorate">
    <van-nav-bar
      fixed
      title="收藏列表"
      left-arrow
      @click-left="$router.push({ name: 'profile' })"
    />

    <Card
      v-for="(item, index) in favoritesList"
      :key="index"
      :obj="item"
    ></Card>
  </div>
</template>

<script>
import { getFavorites } from '@/api/user'
import Card from '@/components/card'
export default {
  name: 'Favorate',
  created () {
    this.getFavorites()
  },
  data () {
    return {
      favoritesList: []
    }
  },
  methods: {
    async getFavorites () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const { data } = await getFavorites()
        // console.log(data)
        if (data.status === 400) {
          // console.log(1)
          this.$toast('请登录')
          this.$router.push({ name: 'login' })
          return
        }
        // console.log(2)
        // 把东西push进去
        this.favoritesList.push(...data.body)
      } catch (err) {
        console.log(err)
        this.$toast('请求失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Card }
}
</script>

<style scoped lang='less'>
.favorate {
  padding-top: 46px;
}
</style>
