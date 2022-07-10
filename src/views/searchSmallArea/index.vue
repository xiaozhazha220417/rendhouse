<template>
  <div class="searchSmallArea">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model.trim="value"
        show-action
        placeholder="请输入小区或地址"
        @cancel="$router.push({ name: 'issuehouse' })"
      />
      <van-cell
        v-for="(item, index) in searchResult"
        :key="index"
        :title="item.communityName"
        @click="onClick(item)"
      />
    </form>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapState } from 'vuex'
import { community } from '@/api/area'
export default {
  name: 'SearchSmallArea',
  created () {
  },
  data () {
    return {
      value: '',
      timer: null,
      searchResult: []
    }
  },
  methods: {
    async community (val) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.value === '') return
        const { data } = await community({ name: val, id: this.currentCity.value })
        // console.log(data)
        this.searchResult = data.body
        if (this.searchResult.length === 0) {
          this.$toast('当前地址没有房源')
        }
      } catch (err) {
        console.log(err)
      }
    },
    onClick (item) {
      // console.log(item)
      this.$store.commit('setCommunity', item)
      this.$router.push({ name: 'issuehouse' })
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {
    value: {
      handler: debounce(function (value) {
        // console.log(1)
        this.community(value)
      }, 200)
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang='less'>
</style>
