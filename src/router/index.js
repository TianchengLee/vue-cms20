import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import shopcarComponent from '../pages/shopcar/'
import searchComponent from '../pages/search/'
import newsListComponent from '../pages/newsList/'
import newsInfoComponent from '../pages/newsInfo/'
import photoListComponent from '../pages/photoList/'
import goodsListComponent from '../pages/goodsList/'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/shopcar', component: shopcarComponent },
    { path: '/search', component: searchComponent },
    { path: '/home/newsList', component: newsListComponent },
    { path: '/home/newsInfo/:id', component: newsInfoComponent },
    { path: '/home/photoList', component: photoListComponent },
    { path: '/home/goodsList', component: goodsListComponent },
  ],
  linkActiveClass: 'mui-active'
})

// router.beforeEach((to, from, next) => {
//   // 在路由进入之前做的事情, 如果不调用next()方法就可以阻止路由的跳转
//   console.log(to)
//   console.log(from)
//   // 阻止路由跳转到newsList页面
//   if (to.path === '/home/newsList') {
//     return;
//   }

//   next();
// })

// router.afterEach((to, from) => {

// })

export default router