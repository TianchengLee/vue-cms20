import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from '../pages/home/'
import MemberComponent from '../pages/member/'
import ShopcarComponent from '../pages/shopcar/'
import SearchComponent from '../pages/search/'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeComponent },
    { path: '/member', component: MemberComponent },
    { path: '/shopcar', component: ShopcarComponent },
    { path: '/search', component: SearchComponent },
  ],
  linkActiveClass: 'mui-active'
})
