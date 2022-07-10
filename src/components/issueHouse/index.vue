<template>
  <div class="issueHouse">
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.push({ name: 'home' })"
    />
    <!-- 房源信息 -->
    <div class="houseNews">房源信息</div>
    <!-- 房源详情 -->
    <div class="details">
      <!-- 小区名称 -->
      <van-cell
        class="areaName"
        title="小区名称"
        is-link
        to="/rent/search"
        :value="
          community.communityName ? community.communityName : '请输入小区名'
        "
      />
      <!-- 租金 -->
      <van-field
        v-model.number.trim="price"
        placeholder="请输入租金/月"
        type="number"
        label="租金"
      >
        <template #extra>
          <span class="color">￥/月</span>
        </template>
      </van-field>
      <!-- 建筑面积 -->
      <van-field
        v-model.number.trim="size"
        placeholder="请输入建筑面积"
        type="number"
        label="建筑面积"
      >
        <template #extra>
          <span class="color">㎡</span>
        </template></van-field
      >
      <!-- 户型 -->
      <!-- 户型弹出层 -->
      <van-popup
        v-model="isHouseTypeShow"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <HouseType
          @update-houseType-value="onUpdateHouseTypeValue"
          @close-picker="isHouseTypeShow = false"
        ></HouseType>
      </van-popup>
      <van-cell
        class="areaName"
        title="户型"
        is-link
        to=""
        @click="isHouseTypeShow = true"
        :value="isRoomType"
      />

      <!-- 所在楼层 -->
      <!-- 所在楼层弹出层 -->
      <van-popup
        v-model="isFloorShow"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <HouseFloor
          @update-houseFloor-value="onUpdateHouseFloorValue"
          @close-picker="isFloorShow = false"
        ></HouseFloor>
      </van-popup>
      <van-cell
        class="areaName"
        title="所在楼层"
        is-link
        to=""
        :value="isFloor"
        @click="isFloorShow = true"
      />
      <!-- 朝向 -->
      <!-- 朝向弹出层 -->
      <van-popup
        v-model="isDirectionShow"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <HouseDirection
          @update-houseDirection-value="onUpdateHouseDirectionValue"
          @close-picker="isDirectionShow = false"
        ></HouseDirection>
      </van-popup>
      <van-cell
        class="areaName"
        title="朝向"
        is-link
        to=""
        :value="isDirection"
        @click="isDirectionShow = true"
      />
    </div>
    <!-- 房屋标题 -->
    <div class="houseTitle">
      <p>房屋标题</p>
      <van-field
        v-model.trim="title"
        placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
      />
    </div>
    <!-- 房屋图像 -->
    <div class="houseImage">
      <p>房屋图像</p>
      <van-uploader
        :before-read="beforeRead"
        :after-read="afterRead"
        accept="image/*"
        v-model="fileList"
        multiple
      >
        <template #default>
          <div class="imageInput">
            <van-icon name="plus" />
          </div>
        </template>
      </van-uploader>
    </div>
    <!-- 房屋配置 -->
    <div class="houseConfig">
      <p>房屋配置</p>
      <van-checkbox-group class="AllIcon" v-model="result">
        <van-checkbox
          class="homeConfig"
          :name="item.label"
          v-for="item in supportingInfo"
          :key="item.value"
        >
          <template #icon="props">
            <div class="IconBox" :class="{ active: props.checked }">
              <van-icon name="medal-o" :class="{ active: props.checked }" />
              <span :class="{ active: props.checked }">{{ item.label }}</span>
            </div>
          </template>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <!-- 房屋描述 -->
    <div class="houseDescribe">
      <p>房屋描述</p>
      <van-field
        v-model.trim="description"
        rows="5"
        autosize
        type="textarea"
        placeholder="请描述房屋信息"
      />
    </div>
    <!-- 提交按钮 -->
    <div class="submit">
      <van-button type="default" style="color: #21b97a" @click="onCancel"
        >取消</van-button
      >
      <van-button type="primary" style="background: #21b97a" @click="onConfirm"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import { houses } from '@/api/user'
import { image } from '@/api/plugin'
import { mapState } from 'vuex'
import { params } from '@/api/house'
import HouseType from '@/components/issueHouse/components/HouseType.vue'
import HouseFloor from '@/components/issueHouse/components/HouseFloor.vue'
import HouseDirection from '@/components/issueHouse/components/HouseDirection.vue'
export default {
  name: 'IssueHouse',
  created () {
    this.params()
    this.isLogin()
  },
  data () {
    return {
      supportingInfo: [],
      supporting: [],
      result: [],
      resultList: [],

      // 弹出层控制
      isHouseTypeShow: false,
      isFloorShow: false,
      isDirectionShow: false,

      isRoomType: '请选择', // 房屋户型
      isFloor: '请选择',
      isDirection: '请选择',

      size: '', // 建筑面积
      title: '', // 房屋标题
      description: '', // 房屋描述
      price: '', // 租金
      roomType: '', // 类型（一室）
      floor: '', // 楼层
      oriented: '', // 朝向
      houseImg: [], // 处理好的图片路径

      fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://img01.yzcdn.cn/vant/leaf.jpg', isImage: true }
      ], // 上传文件图片

      roomTypeList: [], // 房屋类型数据
      floorList: [], // 房屋楼层数据
      orientedList: [] // 房屋朝向数据

    }
  },
  watch: {
    result (newVal) {
      this.resultList = newVal.join('|')
      // console.log(this.resultList, newVal)
    },
    deep: true
  },
  computed: {
    ...mapState(['community', 'user']),
    strData () {
      return {
        title: this.title,
        description: this.description,
        houseImg: this.houseImg,
        oriented: this.oriented,
        supporting: this.resultList,
        price: this.price,
        roomType: this.roomType,
        size: this.size,
        floor: this.floor,
        community: this.community.community
      }
    }
  },
  methods: {
    // 校验用户登录函数
    isLogin () {
      if (!(this.user && this.user.token)) {
        this.$toast('请登录')
        this.$router.push({ name: 'login' })
      }
    },
    // 图片函数 校验上传的文件
    beforeRead (file) {
      const reg = /^image\/(png|jpeg|gif)$/
      // console.log(file.type)
      if (!reg.test(file.type)) {
        this.$toast('请上传图片')
        return false
      }
      // console.log(file)
      return true
    },
    // 图片上传函数
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      const { data } = await image(formData)
      // console.log(data)
      this.houseImg.push(...data.body)
      // console.log(this.houseImg)
    },
    // 数据请求
    async params () {
      try {
        const { data } = await params()
        // console.log(data)
        // const item = this.setHouseConfig(data.body.supporting)
        // console.log(item)
        // this.houseConfigList = item
        this.roomTypeList = data.body.roomType
        this.floorList = data.body.floor
        this.orientedList = data.body.oriented

        this.supportingInfo = data.body.supporting
      } catch (err) {
        console.log(err)
        this.$toast('请求超时')
      }
    },
    // 处理房屋户型数据
    onUpdateHouseTypeValue (value) {
      this.isRoomType = value
      this.isHouseTypeShow = false
      // console.log(this.roomType)
      const roomTypeItem = this.roomTypeList.find(item => item.label === value)
      // console.log(roomTypeItem)
      this.roomType = roomTypeItem.value
      // console.log(this.roomType)
    },
    // 处理房屋楼层数据
    onUpdateHouseFloorValue (value) {
      // console.log(value)
      this.isFloor = value
      this.isFloorShow = false
      const floorItem = this.floorList.find(item => item.label === value)
      // console.log(floorItem)
      this.floor = floorItem.value
      // console.log(this.floor)
    },
    // 处理房屋朝向数据
    onUpdateHouseDirectionValue (value) {
      // console.log(value)
      this.isDirection = value
      this.isDirectionShow = false
      const directionItem = this.orientedList.find(item => item.label === value)
      // console.log(floorItem)
      this.oriented = directionItem.value
      // console.log(this.floor)
    },
    // 取消按钮事件
    async onCancel () {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '放弃发布房源？',
          confirmButtonText: '继续编辑',
          confirmButtonColor: '#108ee9'
        })
      } catch (err) {
        // console.log(err)
        this.$router.push({ name: 'home' })
      }
    },

    // 确认按钮事件
    async onConfirm () {
      try {
        if (this.fileList.length === 0) {
          return this.$toast('请上传房源图片')
        }
        if (this.size === '' || this.price === '' || this.title === '' || this.description === '' || this.roomType === '' || this.floor === '' || this.oriented === '') {
          return this.$toast('请填写房源信息')
        }
        // 发布房屋请求
        const res = await houses(this.strData)
        console.log(res)
        console.log(2)
        await this.$dialog.confirm({
          title: '提示',
          message: '房源发布成功！',
          confirmButtonText: '继续发布',
          confirmButtonColor: '#108ee9',
          cancelButtonText: '去查看'
        })
        this.fileList = []
        this.result = []
        this.size = ''
        this.price = ''
        this.title = ''
        this.description = ''
        this.isRoomType = '请选择'
        this.isFloor = '请选择'
        this.isDirection = '请选择'
        this.$store.commit('setCommunity', {})
        this.houseImg = []
      } catch (err) {
        console.log(err)
        this.$router.push({ name: 'home' })
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('setCommunity', {})
  },
  components: { HouseType, HouseFloor, HouseDirection }
}
</script>

<style scoped lang='less'>
.issueHouse {
  background-color: #f5f5f9;
  font-size: 14px;
  color: #666;
  padding-bottom: 70px;
  .houseNews {
    border-bottom: 1px solid #eee;
    font-size: 15px;
    padding: 15px 15px 9px;
    color: #21b97a;
    background-color: #fff;
  }
  .color,
  .van-cell {
    font-size: 14px;
    color: #666;
  }
  .houseTitle,
  .houseImage,
  .houseConfig,
  .houseDescribe {
    background-color: #fff;
    p {
      font-size: 14px;
      border-bottom: 1px solid #eee;
      margin: 0;
      color: #333;
      padding: 15px 15px 9px;
    }
  }
  .houseImage {
    .van-uploader {
      margin-bottom: 15px;
      padding: 9px 8px 0;
      .imageInput {
        box-sizing: border-box;
        width: 82px;
        height: 82px;
        border: 1px solid #ddd;
        border-radius: 5px;
        text-align: center;
        line-height: 83px;
        .van-icon {
          font-size: 25px;
          color: #ccc;
        }
      }
    }
  }
  .houseDescribe {
    margin-top: 20px;
  }
  .submit {
    position: fixed;
    bottom: 0;
    width: 375px;
    height: 50px;
    display: flex;
    .van-button {
      height: 50px;
      flex: 1;
      border-radius: 0;
    }
  }
  /deep/ .van-picker__confirm,
  /deep/ .van-picker__cancel {
    color: #108ee9;
    font-size: 17px;
  }
  .active {
    color: #21b97a;
  }
  .AllIcon {
    display: flex;
    height: 142px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .van-checkbox {
      align-items: unset;
    }
    /deep/.van-checkbox__icon {
      height: 50px;
      min-width: 57px;
      margin: 5px 5px 2px 5px;
    }
  }
  .homeConfig {
    .IconBox {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-flow: column;
    }
    /deep/ .active {
      color: pink;
      /deep/.van-icon-medal-o:before {
        color: pink !important;
      }
    }
    span {
      font-size: 14px;
    }
  }
}
</style>
