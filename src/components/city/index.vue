<template>
  <div class="city">
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.back()" />

    <van-index-bar :index-list="allIndex">
      <van-index-anchor index="#">
        <div>当前城市</div>
        <van-cell :title="currentCity.label" />
      </van-index-anchor>

      <van-index-anchor index="热">
        <div>热门城市</div>
        <van-cell
          v-for="(item, index) in cityHotList"
          :key="index"
          :title="item.label"
          @click="onClick(item)"
          to="/home"
        />
      </van-index-anchor>

      <van-index-anchor
        v-for="(value, key, index) in cityNameList"
        :key="index"
        :index="key"
      >
        <div>{{ key }}</div>
        <div>{{ value.length === 0 ? "暂无数据" : "" }}</div>
        <!-- <van-cell :title="value.length === 0 ? '暂无数据' : ''" /> -->
        <van-cell
          v-for="(item, index) in value"
          :key="index"
          :title="item.label"
          @click="$toast('该城市暂无房源')"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { differenceBy } from 'lodash'
import { city, hot } from '@/api/area'
export default {
  name: 'city',
  created () {
    this.city()
    this.hot()
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 1000
    })
  },
  data () {
    return {
      // 自定义索引数组1
      indexList1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      indexList2: ['#', '热'], // 自定义索引数组2
      cityList: [], // 存储所有城市数据
      cityNameList: {}, // 存放城市自定义索引和城市数据
      cityHotList: [] // 存放热门城市的数组
      // currentCityName: {}
    }
  },
  methods: {
    async city () {
      try {
        const { data } = await city({ level: 1 })
        this.cityList = data.body
        this.cityNameList = this.cityNameFn()
      } catch (err) {
        console.log(err)
        this.$toast('请求失败')
      }
    },
    async hot () {
      try {
        const { data } = await hot()
        // console.log(data)
        this.cityHotList = data.body
        // console.log(this.cityHotList[0])
        // this.currentCityName = this.cityHotList[0]
        // this.$store.commit('setCurrentCity', this.cityHotList[0])
      } catch (err) {
        console.log(err)
      }
    },
    // 处理城市数据函数
    cityNameFn () {
      // console.log(this.removeRepeat)
      const obj = {}
      this.indexList1.forEach(key => {
        // 将自定义索引变为对象的key
        obj[key] = []
        this.removeRepeat.forEach(item => {
          // console.log(item)
          const firstName = item.short.substring(0, 1)
          if (firstName.toUpperCase() === key) {
            obj[key].push(item)
          }
        })
      })
      // console.log(obj)
      return obj
    },
    // 修改当前城市
    onClick (item) {
      // console.log(item),
      // this.currentCityName = item
      this.$store.commit('setCurrentCity', item)
      // this.setCurrentCity(item)
    }
    // ...mapMutations(['setCurrentCity'])
  },
  computed: {
    ...mapState(['currentCity']),
    // 自定义城市列表索引
    allIndex () {
      return [...this.indexList2, ...this.indexList1]
    },
    // 城市重复去重
    removeRepeat () {
      // console.log(this.cityList)
      // console.log(this.cityHotList)
      return differenceBy(this.cityList, this.cityHotList, 'label')
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
