<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <mt-swipe class="binner-container" :auto="4000">
      <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
        <a :href="item.url">
          <img :src="item.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      bannerList: []
    }
  },
  created() {
    this.getBannerData()
  },
  methods: {
    getBannerData() {
      this.$http.get('http://www.lovegf.cn:8899/api/getlunbo').then(result => {
        if (result.body.status === 0) {
          this.bannerList = result.body.message
        } else {
          Toast('获取轮播图数据失败!请重试!')
        }
      })
    }
  }
}
</script>

<style lang="less">
.home-container {
  .binner-container {
    height: 200px;

    .mint-swipe-item {
      &:nth-child(1) {
        background-color: yellow;
      }
      &:nth-child(2) {
        background-color: blue;
      }
      &:nth-child(3) {
        background-color: skyblue;
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
      }
    }
  }
}
</style>