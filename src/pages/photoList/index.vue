<template>
  <div class="photo-list-container">
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a @click="getImages(item.id)" :class="{'mui-control-item': true, 'mui-active': item.id == 0}" v-for="(item) in categories" :key="item.id">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <img class="preview-img" :key="item.src" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">

    <ul>
      <li class="img-container" v-for="item in images" :key="item.id">
        <img v-lazy="item">
      </li>
    </ul>
  </div>
</template>

<script>
// arguments callee caller在严格模式下无法使用 而webpack默认是采用严格模式打包的
// 所以mui.js无法被打包编译
// 解决方案: 在 .babelrc 文件中配置忽略, 将mui的js文件全部忽略掉
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      categories: [],
      images: [
        "http://img0.imgtn.bdimg.com/it/u=1886777974,634529426&fm=200&gp=0.jpg",
        "http://g.hiphotos.baidu.com/image/pic/item/2e2eb9389b504fc27b7148cfefdde71191ef6dca.jpg",
        "http://a.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbba3e616666224f4a21a4ddf1.jpg"
      ],
      list: [{
          src: "http://img0.imgtn.bdimg.com/it/u=1886777974,634529426&fm=200&gp=0.jpg",
          w: 600,
          title: 'Image Caption 1',
          h: 400
        }, {
          src: "http://g.hiphotos.baidu.com/image/pic/item/2e2eb9389b504fc27b7148cfefdde71191ef6dca.jpg",
          w: 1200,
          title: 'Image Caption 1',
          h: 900
        }, {
          src: "http://a.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbba3e616666224f4a21a4ddf1.jpg",
          w: 1200,
          title: 'Image Caption 1',
          h: 900
        }]
    };
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          this.categories = result.body.message;
          this.categories.unshift({
            id: 0,
            title: "全部"
          });
        }
      });
    },
    getImages(id) {
      // console.log(id)
      // 点击条目时根据ID获取图片数据
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          this.images = result.body.message;
        }
      });
    }
  },
  created() {
    this.getCategory();
    // this.getImages(0);
  },
  mounted() {
    // 初始化区域滚动一定要放在mounted钩子函数中
    // 因为初始化操作必须要等DOM元素加载完成后才可以进行
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="less">
.img-container {
  width: 100%;
  min-height: 300px;
  margin: 10px 0;
  background-color: #ccc;
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
  background-color: pink;
}

img[lazy="error"] {
  width: 100%;
  // height: 300px;
  // background-color: red;
}
</style>
