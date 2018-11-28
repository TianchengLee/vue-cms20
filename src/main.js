import Vue from 'vue' // /node_modules/vue/package.json : main => 
import App from './App'
import router from './router/'
import moment from 'moment'

// 导入vue-resource
import VueResource from 'vue-resource'
// 注册vue-resource
Vue.use(VueResource)
// 配置vue-resource的请求根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'
// 配置post请求以传统表单形式提交参数 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

// 按需导入需要的mint-ui组件
import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  // Lazyload
} from 'mint-ui'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)
// 全局注册 注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
// Vue.use(Lazyload);

// 导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// 引入自己的全局样式
import './css/common.less'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 定义全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // 直接调用表示获取当前时间
  return moment(dateStr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
