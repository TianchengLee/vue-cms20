<template>
  <div class="news-info-container">
    <div class="title">{{ newsInfo.title }}</div>
    <div class="subtitle">
      <span class="ctime">发表时间: {{ newsInfo.add_time | dateFormat }}</span>
      <span class="click">点击: {{ newsInfo.click }}次</span>
    </div>
    <hr>
    <div class="content" v-html="newsInfo.content"></div>

    <comment :id="id"></comment>
  </div>

</template>

<script>
import { Toast } from "mint-ui";
import comment from "../../components/comment/";

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsInfo = result.body.message[0];
        } else {
          Toast("新闻详情获取失败!请重试!");
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>

<style lang="less">
.news-info-container {
  padding: 0 10px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #26a2ff;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 12px;
    color: #26a2ff;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
