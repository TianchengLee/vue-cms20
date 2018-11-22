<template>
  <div class="comment-container">
    <h2>发表评论</h2>
    <hr>
    <textarea v-model="commentContent" placeholder="请输入您要评论的内容!最多输入120字" maxlength="120"></textarea>
    <mt-button @click="postComment" type="primary" size="large">发表评论</mt-button>
    <div class="comment-list">
      <div class="comment-item" v-for="(item, index) in commentList" :key="index">
        <div class="comment-title">第{{index + 1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</div>
        <div class="comment-content">
          {{ item.content == 'undefined' ? '此人有点懒' : item.content || '此人有点懒' }}
        </div>
      </div>
    </div>
    <mt-button @click="loadMore" type="danger" size="large" plain>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: ["id"],
  data() {
    return {
      pageIndex: 1,
      commentList: [],
      commentContent: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          this.commentList = this.commentList.concat(result.body.message);
        });
    },
    loadMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.commentContent.trim() === "") {
        return Toast("评论内容不能为空!");
      }

      this.$http
        .post("api/postcomment/" + this.id, {
          content: this.commentContent
        })
        .then(result => {
          console.log(result);
          if (result.body.status === 0) {
            Toast(result.body.message);
            // 刷新评论内容, 注意: 如果当前评论页在第二页以上, 重新获取评论会导致数据错乱
            // 刷新评论时应当将pageIndex重置为1  并且将数组清空
            this.pageIndex = 1;
            this.commentList = [];
            this.commentContent = "";
            // 重新发送请求获取第一页的评论内容并渲染
            this.getComments();
          } else {
            Toast('发表评论失败!请重试!')
          }
        });
    }
  }
};
</script>

<style lang="less">
.comment-container {
  .comment-list {
    .comment-item {
      margin: 5px 0;
      .comment-title {
        font-size: 10px;
        background-color: #ccc;
        height: 24px;
      }
      .comment-content {
        font-size: 13px;
        text-indent: 2em;
      }
    }
  }
}
</style>
