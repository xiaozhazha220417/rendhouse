<template>
  <div class="HouseDetails">
    <van-nav-bar
      :title="houseDetailsList.community"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 轮播图 -->
    <div class="swiperphoto">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 房屋信息 -->
    <div class="houseInfo">
      <h3>{{ houseDetailsList.title }}</h3>
      <div class="tags">
        <span
          class="tag"
          v-for="(item, index) in houseDetailsList.tags"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="aboutHouse">
        <div class="zujin">
          <p>
            <span class="texttitle">{{ houseDetailsList.price }}</span
            >/月
          </p>
          <p class="text">租金</p>
        </div>
        <div class="fangxing">
          <p class="texttitle">{{ houseDetailsList.roomType }}</p>
          <p class="text">房型</p>
        </div>
        <div class="mianji">
          <p class="texttitle">
            <span>{{ houseDetailsList.size }}</span
            >平米
          </p>
          <p class="text">面积</p>
        </div>
      </div>
      <div class="detailhouse">
        <div>
          <p>
            <span class="texttitle">装修：</span><span class="text">精装</span>
          </p>
          <p>
            <span class="texttitle">楼层：</span
            ><span class="text">{{ houseDetailsList.floor }}</span>
          </p>
        </div>
        <div>
          <p>
            <span class="texttitle">朝向：</span
            ><span class="text" v-if="houseDetailsList.oriented">{{
              houseDetailsList.oriented[0]
            }}</span>
          </p>
          <p>
            <span class="texttitle">类型：</span
            ><span class="text">普通住宅</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 地图信息 -->
    <div class="map">
      <van-cell>
        <div slot="title">
          <span class="texttitle">小区：</span>
          <span class="text">天山星城</span>
        </div>
      </van-cell>
    </div>

    <!-- 房屋配套 -->
    <div class="houseSet">
      <van-cell title="房屋配套" />
    </div>

    <!-- 房源概况 -->
    <div class="houserSurvey">
      <van-cell title="房屋概况" />
      <div class="avatar">
        <div class="avatar-photo">
          <div><img src="@/assets/bg.png" alt="" /></div>
          <div>
            <p>王女士</p>
            <p class="text"><van-icon name="like-o" />已认证房主</p>
          </div>
        </div>
        <van-button plain type="primary">发消息</van-button>
      </div>
      <div class="textContent">
        {{ houseDetailsList.description }}
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="houseLike">
      <van-cell title="猜你喜欢" />
    </div>

    <!-- 底部 收藏 在线资讯 电话预约 -->
    <van-row class="footer" type="flex">
      <van-col span="8" @click="onClick">
        <van-icon :name="isFavorite ? 'star' : 'star-o'" />
        <span>收藏</span>
      </van-col>
      <van-col span="8">在线资讯</van-col>
      <van-col span="8">电话预约</van-col>
    </van-row>
  </div>
</template>

<script>
import { houseDetails } from '@/api/house'
import { delFavorites, addFavorites, isFavorites } from '@/api/user'
export default {
  name: 'HouseDetails',
  created () {
    this.isFavorites()
    this.houseDetails()
  },
  data () {
    return {
      isFavorite: false,
      houseCodeId: this.$route.params.id,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      baseUrl: 'http://liufusong.top:8080',
      houseDetailsList: {}
    }
  },
  methods: {
    async isFavorites () {
      try {
        const { data } = await isFavorites(this.houseCodeId)
        // console.log(data)
        if (data.status === 400) {
          this.$toast('token异常或者过期')
          this.$router.push({ name: 'login' })
          return
        }
        this.isFavorite = data.body.isFavorite
      } catch (err) {
        console.log(err)
      }
    },
    async houseDetails () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await houseDetails(this.houseCodeId)
        // console.log(data)
        this.houseDetailsList = data.body
        this.$toast.success('数据获取成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('数据获取失败，请刷新重试')
      }
    },
    async onClick () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      if (this.isFavorite) {
        this.isFavorite = !this.isFavorite
        // 删除收藏
        try {
          await delFavorites(this.houseCodeId)
          this.$toast.success('取消收藏成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('取消收藏失败')
        }
      } else {
        this.isFavorite = !this.isFavorite
        // 添加收藏
        try {
          await addFavorites(this.houseCodeId)
          this.$toast.success('添加收藏成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('添加收藏失败')
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.HouseDetails {
  background-color: #f6f5f6;
  padding-bottom: 50px;
  .swiperphoto {
    width: 375px;
    height: 252px;
    // background-color: pink;
    img {
      width: 375px;
      height: 252px;
    }
  }
  .map {
    width: 375px;
    height: 189px;
    margin-top: 10px;
    // background-color: lawngreen;
    .texttitle {
      color: #666;
    }
    .text {
      color: #333;
    }
  }
  .houseSet {
    box-sizing: border-box;
    width: 375px;
    height: 130px;
    margin-bottom: 10px;
    background-color: #fff;
    padding: 0 10px;
  }
  .van-cell {
    font-size: 15px;
    color: #333;
    font-weight: 700;
    border-bottom: 1px solid #cecece;
  }
  .houserSurvey {
    box-sizing: border-box;
    width: 375px;
    height: 266px;
    padding: 0 10px;
    margin-bottom: 10px;
    background-color: #fff;
    .avatar {
      margin: 20px 0;
      height: 52px;
      // background-color: pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar-photo {
        display: flex;
        align-items: center;
        img {
          border-radius: 50%;
          width: 52px;
          height: 52px;
          vertical-align: middle;
        }
        p {
          padding-left: 10px;
          font-size: 14px;
          margin: 0;
        }
        .text {
          margin-top: 5px;
          color: #fa5741;
          .van-icon {
            margin-right: 5px;
          }
        }
      }

      .van-button {
        width: 74px;
        height: 29px;
        border-radius: 3px;
        margin-right: 10px;
      }
    }
    .textContent {
      font-size: 14px;
      color: #333;
      overflow: hidden;
      display: -webkit-box;
      overflow: hidden;
      /*autoprefixer:off*/
      -webkit-box-orient: vertical;
      /*autoprefixer:on*/
      -webkit-line-clamp: 6;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
    }
  }
  .houseLike {
    box-sizing: border-box;
    width: 375px;
    margin-bottom: 10px;
  }

  .houseInfo {
    box-sizing: border-box;
    width: 375px;
    height: 267px;
    background-color: #fff;
    padding: 15px;
    h3 {
      font-size: 16px;
      margin: 16px 0 10px 0;
      color: #333;
    }
    .tags {
      height: 20px;
      line-height: 20px;
      padding: 0;
      margin: 0;
      .tag {
        font-size: 12px;
        color: #39becd;
        background-color: #e1f5f8;
        margin: 0 5px 0 0;
        padding: 4px 5px;
        border-radius: 4px;
      }
    }
    .aboutHouse {
      height: 84px;
      display: flex;
      align-items: center;
      text-align: center;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      margin: 15px 0;
      div {
        flex: 1;
      }
      .zujin {
        p:nth-child(1) {
          font-size: 12px;
          margin: 0;
          color: #fa5741;
        }
      }
      .text {
        font-size: 14px;
        color: #999;
        margin: 0;
      }
      .texttitle {
        margin: 0;
        font-size: 18px;
        color: #fa5741;
      }
    }
    .detailhouse {
      height: 52px;
      display: flex;
      align-items: center;
      p {
        margin: 0;
      }
      div {
        flex: 1;
      }
      .texttitle {
        font-size: 13px;
        color: #999;
        padding-right: 5px;
      }
      .text {
        font-size: 13px;
        color: #333;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 375px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-top: 1px solid #c8c8c8;
    font-size: 17px;
    background-color: #fff;
    .van-col:nth-child(1) {
      // background-color: pink;
      span {
        color: #999;
        padding-left: 4px;
      }
      .van-icon {
        font-size: 16px;
        color: #999;
      }
    }
    .van-col:nth-child(2) {
      border-left: 1px solid #e8e8e9;
      border-right: 1px solid #e8e8e9;
      color: #999;
    }
    .van-col:nth-child(3) {
      background-color: #21b97a;
      color: #fff;
    }
    /deep/ .van-icon-star {
      color: #ff4f00 !important;
    }
  }
}
</style>
