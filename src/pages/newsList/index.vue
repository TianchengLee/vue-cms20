<template>
  <div class="news-list-container">
    <ul class="mui-table-view">
      <li v-for="(item) in newsList" :key="item.id" class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h4 class="title mui-ellipsis">{{ item.title }}</h4>
            <p>
              <span class="ctime mui-pull-left">发表时间: {{ item.add_time | dateFormat('YYYY-MM-DD') }}</span>
              <span class="click mui-pull-right">点击: {{ item.click }}次</span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  created() {
    this.getNewsList();
  },
  data() {
    return {
      newsList: []
    };
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          // 获取到数据了
          this.newsList = result.body.message;
        } else {
          // 获取失败, 提醒用户数据获取失败
          Toast("新闻列表获取失败!请重试!");
        }
      });
    }
  }
};
</script>

<style lang="less">
.news-list-container {
  .mui-table-view {
    .mui-table-view-cell > a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .mui-media-body {
      width: 100%;
      .title {
        font-size: 13px;
        font-weight: bold;
      }
      > p {
        width: 100%;
      }
      .ctime,
      .click {
        font-size: 13px;
        color: #26a2ff;
      }
    }
  }
}
</style>
