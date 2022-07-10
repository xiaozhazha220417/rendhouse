<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe swipeitem"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="(item, index) in swiperImg" :key="index">
        <img v-lazy="`${baseUrl}${item.imgSrc}`" />
      </van-swipe-item>
    </van-swipe>

    <!-- nav 导航栏 -->
    <van-grid :column-num="4" class="navitem" clickable :border="false">
      <van-grid-item text="整租" to="/home/list">
        <template #icon>
          <div class="img">
            <img src="@/assets/home_zz.png" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="合租" to="/home/list">
        <template #icon>
          <div class="img">
            <img src="@/assets/home_hz.png" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="地图找房">
        <template #icon>
          <div class="img">
            <img src="@/assets/home_dtzf.png" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="去出租" to="/rent/add">
        <template #icon>
          <div class="img">
            <img src="@/assets/home_qcz.png" />
          </div>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 租房小组 -->
    <main class="content">
      <van-cell title="租房小组" value="更多" />
      <van-grid
        direction="horizontal"
        :column-num="2"
        :gutter="10"
        :border="false"
        clickable
      >
        <van-grid-item v-for="item in zuFangList" :key="item.id">
          <template #icon>
            <div class="img">
              <img :src="baseUrl + item.imgSrc" alt="" />
            </div>
          </template>
          <template #text>
            <div class="text">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </main>

    <!-- 搜索 -->
    <div class="search">
      <SearchBox></SearchBox>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { swiper, groups } from '@/api/home'
import SearchBox from '@/components/searchBox'
export default {
  name: 'Home',
  created () {
    this.swiper()
    this.groups()
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 1000
    })
  },
  data () {
    return {
      swiperImg: [],
      baseUrl: 'http://liufusong.top:8080',
      zuFangList: []
    }
  },
  methods: {
    async swiper () {
      try {
        const { data } = await swiper()
        // console.log(data)
        this.swiperImg = data.body
      } catch (err) {
        console.log(err)
      }
    },
    async groups () {
      try {
        const { data } = await groups({ area: this.currentCity.value })
        this.zuFangList = data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {},
  filters: {},
  components: { SearchBox }
}
</script>

<style scoped lang='less'>
.home {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .swipeitem {
    width: 375px;
    height: 212px;
    background-color: pink;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .navitem {
    width: 375px;
    height: 123px;
    background-color: gold;
    .img {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .van-grid-item__content {
      padding: 10px 0;
    }
    /deep/ .van-grid-item__text {
      font-size: 14px;
      color: #333;
      margin: 12px 0;
    }
  }
  .content {
    width: 375px;
    box-sizing: border-box;
    height: 188px;
    background-color: #f6f5f6;
    padding: 0 10px;
    .van-cell__title {
      font-size: 15px;
      font-weight: 700;
      color: #333;
    }
    /deep/ .van-grid-item__content {
      padding: 0;
      width: 160px;
      height: 60px;
      border-radius: 5px;
      .img {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        color: #333;
      }
    }
  }
  .search {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 25px;
    width: 375px;
    height: 34px;
    padding: 0 10px;
    background-color: transparent;
  }
  .van-cell {
    background-color: #f6f5f6;
  }
}
</style>
