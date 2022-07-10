<template>
  <div class="login">
    <van-nav-bar
      title="账号登录"
      left-arrow
      @click-left="$router.push({ name: 'profile' })"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
    <router-link to="/registe" class="reg">还没有账号，去注册</router-link>
  </div>
</template>

<script>
import { Login } from '@/api/login'
export default {
  name: 'Login',
  created () { },
  data () {
    return { username: 'itheima', password: '123456' }
  },
  methods: {
    async onSubmit (values) {
      const usernameReg = /^[0-9a-zA-Z]{5,8}$/
      const passwordReg = /^[0-9a-zA-Z]{5,12}$/
      if (this.username.length === 0 || this.password.length === 0) { return this.$toast('用户名和密码不能为空') }

      if (!usernameReg.test(this.username)) {
        this.$toast('用户名格式5-8位的字母和数字')
      } else if (!passwordReg.test(this.password)) {
        this.$toast('密码格式5-12位的字母和数字')
      } else {
        // console.log('登录成功')
        // console.log('submit', values)
        this.$toast.loading({ message: '加载中', forbidClick: true })
        try {
          const { data } = await Login(values)
          // console.log(data)
          // 登录失败
          if (data.status !== 200) {
            return this.$toast(data.description)
          }
          // 登录成功
          this.$toast.success({ message: data.description, icon: 'passed' })
          // 保存token
          this.$store.commit('setUser', data.body)
          // 跳转页面
          this.$router.push({ name: 'profile' })
        } catch (err) {
          console.log(err)
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
.van-button {
  background-color: #1cb676;
  border: 0;
  font-size: 18px;
}
.reg {
  display: block;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
