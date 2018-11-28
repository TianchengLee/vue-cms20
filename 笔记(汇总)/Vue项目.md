Vue项目
===

<!-- TOC -->

- [登录](#登录)
  - [登录页面](#登录页面)
  - [表单校验](#表单校验)
  - [登录状态保存](#登录状态保存)
  - [axios拦截器](#axios拦截器)
  - [导航守卫](#导航守卫)
- [首页布局](#首页布局)
  - [侧边栏部分](#侧边栏部分)
  - [头部部分](#头部部分)
  - [中间内容部分](#中间内容部分)
- [Vuex](#vuex)
  - [Vuex是什么](#vuex是什么)
  - [Vuex使用场景](#vuex使用场景)
  - [Vuex 核心内容](#vuex-核心内容)
  - [使用vuex](#使用vuex)
- [用户管理](#用户管理)
  - [用户列表](#用户列表)
- [权限管理](#权限管理)
  - [权限列表](#权限列表)
  - [角色列表](#角色列表)
- [商品管理](#商品管理)
  - [商品分类](#商品分类)
  - [商品列表](#商品列表)

<!-- /TOC -->

********

[项目接口文档](http://47.96.21.88:8082/)

[项目地址](http://47.96.21.88/#/login)

## 登录

### 登录页面

```scss
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
```

### 表单校验

### 登录状态保存

HTTP请求是无状态的

- cookie
  - 保存在客户端
  - 数据量小(很多站点对cookie的大小和数量都进行了限制)
  - 不安全(别人可以分析存放在本地的COOKIE并进行COOKIE欺骗，也可能被拦截)
- session
  - 服务器端
  - 安全
  - session可以依赖cookie，也可以不依赖使用url
  - 访问量增多，占用服务器资源，如果服务器挂了，所有保存的信息都没了
- token
  - 服务器不存用户状态，定义通用算法
  - 客户端第一次登录之后，服务器会生成一个token，返回给客户端
  - 后续所有请求都会带着token
  - 服务器根据算法校验token的合法性

### axios拦截器

[axios](https://github.com/axios/axios)  --> Interceptors

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
```

### 导航守卫

[导航守卫](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

```js
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  // 如果已经登录，那我不干涉你，让你随便访问
  if (token) {
    next()
  } else {
    if (to.path !== '/login') {
      // 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
      next({path: '/login'})
    } else {
      // 如果没有登录，但你访问的login，那就不干涉你，让你访问
      next()
    }
  }
})
```

## 首页布局

### 侧边栏部分

### 头部部分

### 中间内容部分

```scss
.home {
  height: 100%;
  background-color: #E5E5E5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #009688;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
```

## Vuex

### Vuex是什么

Vuex是一个针对Vue.js开发的状态管理模式。说简单点儿就是一个工具，可以管理（修改或设置）所有组件用到的数据，而不需要借助之前的event bus或者props在组件间传值。

### Vuex使用场景

大型单页应用程序，存在多组件共享数据的时候，需要用到

### Vuex 核心内容

![vuex](./img/vuex.png)

store (一个容器对象，存储Vuex中的state,mutations,actions,getters等)
  - state (一个保存数据的对象，对象中的数据可以供所有组件使用)
```js
// 1. 定义
const state = {
  count: 0
}

// 2. 获取state中的值
this.$store.state.count

// mapState 辅助函数获取多个state的值
import { mapState } from 'vuex'
computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
})
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

// 3. 与组件的计算属性混合使用
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```
  - mutations(一个对象，保存的是更改state的函数，也只有它能更改state中的值，触发方式this.$store.commit('函数名',参数))
```js
// 1. 定义
const mutations = {
  increment (state) {
    state.count++
  }
}

// 2. 触发
this.$store.commit('increment')

// 3. 传递参数，通常参数应该是一个对象
mutations: {
  increment (state, n) {
    state.count += n
  }
}
this.$store.commit('increment', 10)

// 4. 在组件的方法中使用
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
```
  - actions(一个对象，保存的是触发mutations的函数，让mutations去修改state中的值)
```js
// 1. 定义
const actions = {
  increment: ({ commit }) => commit('increment')
}

// 2. 触发
this.$store.dispatch('increment')

// 3. 参数支持
this.$store.dispatch('incrementAsync', {
  amount: 10
})

// 4. 组件的方法中使用
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
```
  - getters(一个对象，保存的是一些类似与计算属性的函数，可以通过他们得到任何依赖于state的新的数据)
```js
// 1. 定义
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// 2. 使用
this.$store.getters.evenOrOdd

// 3. 使用其他getters作为参数
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

// 4. 组件内使用
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

### 使用vuex

`npm install vuex -S`

```js

// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {}
const mutations = {}
const actions = {}
const getters = {}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

// app.js
import store from './store'

new Vue({
  el: '#app',
  store,
  render: h => h(Counter)
})
```

## 用户管理

### 用户列表
```scss
/* 覆盖element导航菜单的样式 */
.el-breadcrumb {
  background-color: #D3DCE6;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
```

```scss
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
```

```js
// 添加用户的表单验证
rules: {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
  ],
  mobile: [
    { required: true, message: '电话不能为空' }
  ]
}
```

## 权限管理

### 权限列表

```js
    getSeletedRights (role) {
      let lastRole,
      if (role.children && role.children.length !== 0) {
        role.children.map(item => {
          this.getSeletedRights(item)
        })
      } else {
        lastRole = role
        this.seletedRights.push(lastRole.id)
      }
    }

    grantRightSubmit () {
      let treeData = this.$refs.tree.getCheckedNodes()
      treeData = treeData.map((item) => {
        return item.id + ',' + item.pid
      })
      treeData = treeData.join(',').split(',')
      let rightIds = [...new Set(treeData)]
      grantRight(this.currentRole.id, {rids: rightIds.join(',')}).then(res => {
        console.log(res)
      })
    }
```

### 角色列表

## 商品管理

### 商品分类

### 商品列表
