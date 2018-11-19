import Vue from 'vue'
import App from './App'
import router from './router/'

Vue.config.productionTip = false

// 按需导入需要的mint-ui组件
import { Header, Swipe, SwipeItem } from 'mint-ui'

// 注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
