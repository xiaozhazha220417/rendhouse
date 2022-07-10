<template>
  <div class="list">
    <van-nav-bar left-arrow>
      <template #title>
        <SearchBox></SearchBox>
      </template>
    </van-nav-bar>

    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="区域" ref="quyu">
          <van-picker
            toolbar-position="bottom"
            show-toolbar
            @cancel="onCancel"
            :columns="listQuYu"
            value-key="label"
            @confirm="onQuYu"
          />
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="fangshi">
          <van-picker
            toolbar-position="bottom"
            show-toolbar
            @cancel="onCancel"
            @confirm="onFangShi"
            :columns="listFangShi"
          >
            <template #option="item">
              <span>{{ item.label }}</span>
            </template>
          </van-picker>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="zujin">
          <van-picker
            toolbar-position="bottom"
            show-toolbar
            @cancel="onCancel"
            :columns="listPrice"
            @confirm="onPrice"
          >
            <template #option="item">
              <span>{{ item.label }}</span>
            </template>
          </van-picker>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" @click="show = true">
          <div class="pop">1</div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <Card
        :obj="item"
        v-for="(item, index) in housesInfoList"
        :key="index"
      ></Card>
    </van-list>
  </div>
</template>

<script>
import Card from '@/components/card'
import { condition, houses } from '@/api/house'
import SearchBox from '@/components/searchBox'
import { mapState } from 'vuex'
export default {
  name: 'List',
  created () {
    this.condition()
  },
  data () {
    return {
      housesInfoList: [], // 房屋信息
      loading: false,
      finished: false,
      error: false,
      start: 1,
      end: 10,
      listFangShi: [], // 方式
      listPrice: [], // 价格
      listQuYu: [] // 区域

    }
  },
  methods: {
    onQuYu (value) {
      console.log(value)
    },
    onFangShi (value) {
      console.log(value)
    },
    async onPrice (value) {
      console.log(value)
      const { data } = await houses({ cityId: this.currentCity.value, price: value.value })
      console.log(data)
      this.$refs.zujin.toggle(false)
      this.housesInfoList.unshift(...data.body.list)
    },
    onCancel () {
      this.$refs.fangshi.toggle(false)
      this.$refs.zujin.toggle(false)
      this.$refs.quyu.toggle(false)
    },
    async condition () {
      try {
        const { data } = await condition({ id: this.currentCity.value })
        // console.log(data)
        this.listFangShi = data.body.rentType
        this.listPrice = data.body.price
        this.listQuYu.push(data.body.area, data.body.subway)
        // console.log(this.listQuYu)
        this.updateListQuYu(this.listQuYu)
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await houses({ cityId: this.currentCity.value, start: this.start, end: this.end })
        // console.log(data)

        this.housesInfoList.push(...data.body.list)
        this.start += 10
        this.end += 10

        this.loading = false

        if (data.body.list.length === 0) {
          this.finished = true
        }
        this.$toast.success('请求成功')
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
        this.$toast.fail('请求失败')
      }
    },
    // 处理区域数据方法
    updateListQuYu (arrListQuYu) {
      arrListQuYu.filter(item => {
        // console.log(item.children[0])
        item.children[0].children = [{ label: '' }]
        // console.log(item)
        return item.children
      })
    }

  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {},
  components: { SearchBox, Card }
}
</script>

<style scoped lang='less'>
.list {
  padding-bottom: 50px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.van-search {
  padding-left: 20px;
}
/deep/ .van-picker__toolbar {
  border-top: 1px solid #e9e9e9;
  justify-content: unset;
  .van-picker__cancel {
    width: 125px;
    height: 50px;
    font-size: 18px;
    color: #21b97a;
  }
  .van-picker__confirm {
    flex: 1;
    color: #fff;
    font-size: 18px;
    background-color: #21b97a;
  }
}
/deep/ .van-dropdown-menu__bar--opened {
  z-index: 10;
}
.pop {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
  width: 295px;
  height: 100vh;
  background-color: #fff;
}
</style>
