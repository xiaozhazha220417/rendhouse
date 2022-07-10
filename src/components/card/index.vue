<template>
  <van-card
    @click="$router.push({ name: 'details', params: { id: obj.houseCode } })"
  >
    <template #thumb>
      <div class="image">
        <img :src="`${baseUrl}${obj.houseImg}`" alt="" />
      </div>
    </template>
    <template #title v-if="titleShow">
      <div class="title van-ellipsis">{{ obj.title }}</div>
    </template>
    <template #desc>
      <div class="desc">{{ obj.desc }}</div>
    </template>
    <template #tags>
      <div class="tags">
        <span class="tag" v-for="(item, index) in obj.tags" :key="index">{{
          item
        }}</span>
      </div>
    </template>
    <template #price>
      <div class="price">
        <span class="price-num">{{ obj.price }}</span> 元/月
      </div>
    </template>
  </van-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    obj: {
      type: Object,
      required: true
    },
    titleShow: {
      type: Boolean,
      default: true
    }
  },
  created () { },
  data () {
    return {
      baseUrl: 'http://liufusong.top:8080'
    }
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-card {
  width: 375px;
  height: 120px;
  margin: 0;
  padding: 18px 0 0 10px;
  border-bottom: 1px solid #ccc;
  .van-card__thumb {
    width: 106px;
    height: 80px;
    margin: 0;
    .image {
      width: 106px;
      height: 80px;
      margin: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .van-card__content {
    padding-left: 12px;
    justify-content: flex-start;
    .title,
    .desc,
    .tags {
      height: 22px;
    }
    .title {
      font-size: 15px;
      color: #394043;
      font-weight: 700;
    }
    .desc {
      font-size: 12px;
      color: #afb2b3;
    }
    .price {
      font-size: 12px;
      color: #fa5741;
      .price-num {
        font-weight: bolder;
        font-size: 16px;
      }
    }
    .tags {
      .tag {
        margin-right: 5px;
        padding: 4px 5px;
        color: #39becd;
        background: #e1f5f8;
        border-radius: 3px;
        font-size: 12px;
      }
    }
  }
}
</style>
