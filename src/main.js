import Vue from 'vue'
import App from './App'
import router from './router/'

Vue.config.productionTip = false

// 按需导入需要的mint-ui组件
import { Header } from 'mint-ui'
// 注册组件
Vue.component(Header.name, Header)

// 导入mui的样式
import './lib/mui/css/mui.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
