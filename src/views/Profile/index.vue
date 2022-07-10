<template>
  <div class="profile">
    <header class="header login" v-if="user && user.token">
      <div class="img">
        <img :src="`http://liufusong.top:8080${userInfo.avatar}`" />
      </div>
      <div class="user userlogin">
        <div class="avater">
          <img :src="`http://liufusong.top:8080${userInfo.avatar}`" />
        </div>
        <p class="logintop">{{ userInfo.nickname }}</p>
        <van-button type="primary" size="small" @click="logout"
          >退出</van-button
        >
        <p>编辑个人资料<van-icon name="play" /></p>
      </div>
    </header>
    <header class="header notlogin" v-else>
      <div class="img">
        <img src="@/assets/bg.png" />
      </div>
      <div class="user usernotlogin">
        <div class="avater">
          <img src="@/assets/avatar.png" />
        </div>
        <p class="logintop">游客</p>
        <van-button
          type="primary"
          size="small"
          @click="$router.push({ name: 'login' })"
          >去登陆</van-button
        >
      </div>
    </header>

    <nav class="mainlist">
      <van-grid :border="false" :column-num="3" clickable>
        <van-grid-item
          icon="star-o"
          @click="$router.push({ name: 'favorate' })"
          text="我的收藏"
        />
        <van-grid-item
          icon="wap-home-o"
          @click="$router.push({ name: 'rent' })"
          text="我的出租"
        />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="credit-pay" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </nav>
    <div class="avater">
      <img src="@/assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfo, logout } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  created () {
    this.getUserInfo()
  },
  data () {
    return { userInfo: {} }
  },
  methods: {
    async getUserInfo () {
      // console.log(this.user)
      this.$toast.loading({ message: '加载中', forbidClick: true })
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.body
      } catch (err) {
        console.log(err)
      }
    },
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认退出吗' })
        const { data } = await logout()
        // console.log(data)
        this.$toast(data.description)
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.profile {
  margin-bottom: 50px;
  .header {
    position: relative;
    width: 375px;
    z-index: 2;
    .img {
      width: 375px;
      img {
        width: 100%;
      }
    }
    .user {
      position: absolute;
      bottom: 0;
      left: 30px;
      width: 315px;
      background-color: #fff;
      box-shadow: 0 0 10px 3px #ddd;
      text-align: center;
      .avater {
        position: absolute;
        left: 50%;
        width: 60px;
        height: 60px;
        border: 5px solid #f5f5f5;
        box-shadow: 0 2px 2px #bdbdbd;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      p {
        font-size: 13px;
      }
      .logintop {
        margin-top: 50px;
      }
      .van-button {
        width: 69px;
        height: 30px;
        border-radius: 5px;
        font-size: 13px;
        background-color: #5fbe7b;
        border: 0;
      }
    }
  }
  .login {
    height: 375px;
  }
  .notlogin {
    height: 300px;
  }
  .userlogin {
    height: 208px;
  }
  .usernotlogin {
    height: 170px;
  }
  .mainlist {
    margin: 10px 0;
    /deep/ .van-icon {
      font-size: 20px;
      color: #666;
    }
  }
  .avater {
    width: 345px;
    height: 85px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
</style>
