<template>
  <div class="rent">
    <van-nav-bar
      fixed
      title="房屋管理"
      left-arrow
      @click-left="$router.push({ name: 'profile' })"
    />
    <Card
      v-for="(item, index) in rentList"
      :key="index"
      :obj="item"
      :titleShow="false"
    ></Card>
  </div>
</template>

<script>
import { getUserHouseRent } from '@/api/user'
import Card from '@/components/card'
export default {
  name: 'Rent',
  created () {
    this.getUserHouseRent()
  },
  data () {
    return {
      rentList: []
    }
  },
  methods: {
    async getUserHouseRent () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const { data } = await getUserHouseRent()
        // console.log(data)
        if (data.status === 400) {
          // console.log(1)
          this.$toast('请登录')
          this.$router.push({ name: 'login' })
          return
        }
        this.rentList = data.body
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
.rent {
  padding-top: 46px;
}
</style>
