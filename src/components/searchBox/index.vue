<template>
  <van-search show-action disabled placeholder="请输入小区获取地址">
    <template #label>
      <div class="option" @click="onSendCity">
        <span>{{ currentCity.label }}</span>
        <van-icon name="play" />
        <span class="sep">|</span>
      </div>
    </template>
    <template #action>
      <van-icon name="location-o" />
    </template>
  </van-search>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {

  },
  data () {
    return {
    }
  },
  methods: {
    onSendCity () {
      this.$router.push({ name: 'city' })
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-search {
  padding: 0;
  .van-search__content {
    margin-left: 10px;
  }
  .van-search__action {
    height: 34px;
    .van-icon {
      font-size: 25px;
      line-height: 34px;
      color: #fff;
    }
  }
  /deep/ .van-search__label {
    span {
      font-size: 14px;
      color: #333;
    }
    .van-icon {
      transform: rotate(90deg);
      color: #7f7f80;
    }
    .sep {
      padding: 0 5px;
      color: #e5e5e5;
    }
  }
}
</style>
