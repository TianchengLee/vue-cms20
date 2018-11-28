Vue基础-day05
===

<!-- TOC -->

- [单文件组件](#单文件组件)
  - [结合webpack处理单文件组件](#结合webpack处理单文件组件)
    - [配置webpack相关loader](#配置webpack相关loader)
    - [使用vue文件创建vue组件](#使用vue文件创建vue组件)
    - [引入组件,并将组件渲染到页面](#引入组件并将组件渲染到页面)
    - [路由配置](#路由配置)
- [vue-cli 脚手架工具](#vue-cli-脚手架工具)
- [element-ui](#element-ui)
- [项目相关](#项目相关)
  - [团队角色](#团队角色)
  - [开发流程](#开发流程)
  - [技术选型](#技术选型)
    - [前端](#前端)
    - [后端](#后端)
  - [项目业务分析](#项目业务分析)
  - [项目初始化](#项目初始化)

<!-- /TOC -->

## 单文件组件

[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

### 结合webpack处理单文件组件

#### 配置webpack相关loader

1. `npm install vue --save`
2. `npm install vue-loader vue-template-compiler --save-dev`


```js
{
    test: /\.vue$/,
    loader: 'vue-loader'
}

// 如果使用的是webpack1.x，还需要安装 `babel-plugin-transform-runtime`,并添加一下配置；如果是webpack2.x以上请忽略一下配置
{
  test: /\.js$/,
  include: [path.resolve(__dirname, 'src')],
  use: {
    loader: 'babel-loader',
    // options里面的东西可以放到.babelrc文件中去
    options: {
      presets: ['env']
      // plugins: ['transform-runtime']
    }
  }
}

```

#### 使用vue文件创建vue组件

```html

<!-- App.vue -->
<template>
  <div>{{msg}}</div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'hello world'
    }
  }
}
</script>
<style>
  div {
    color: red;
  }
</style>
```

#### 引入组件,并将组件渲染到页面

```js
// app.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render: h=> h(App)
})
```

#### 路由配置

1. `npm install vue-router --save`

```js
// app.js
import Vue from 'vue'
import App from './App.vue'

import Login from './Login.vue'

// 1. 引入vue-router
import VueRouter from 'vue-router'

// 2. 表示使用路由插件
Vue.use(VueRouter)

//3. 配置路由规则
var router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login }
  ]
})

new Vue({
  el: '#app',
  // 挂载路由
  router,
  // 这是个渲染函数，指定渲染组件
  render: h => h(App)
})
```

## vue-cli 脚手架工具

vue-cli是官方的一个脚手架工具，所谓脚手架呢就是一个架子，什么架子呢？项目结构的架子，里面有一些最基本的结构配置。利用vue-cli呢，我们可以生成这样的一个脚手架，所以呢它就被称为vue脚手架工具。

`npm install vue-cli -g`

`vue init webpack admin`

## element-ui

安装：`npm i element-ui -S`

[element-ui使用](http://element-cn.eleme.io/2.0/#/zh-CN/component/quickstart)

## 项目相关

[电商后台管理系统](http://47.96.21.88/#/login) （不要随便删）

### 团队角色

- 产品经理
- 项目经理
- UI/UE
- 前端
- 后端（php/java/python/Node.js/.net）
- 测试（单元测试、黑盒测试、白盒测试、集成测试、压力测试）
- DBA 数据库管理员
- 实施/运维 负责程序的上线和运行监控
- 全栈工程师

### 开发流程

- 需求分析
- 概要设计
- 详细设计
- 编码
- 测试
- 上线
- 运维-迭代更新

### 技术选型

#### 前端

- vue
- vue-router
- axios
- Element-UI
- webpack

#### 后端

- node.js
- express
- mysql

### 项目业务分析

- 电商业务
  + 对外网站（用户购买）
  + 后台管理端（用于运营人员）
  + 移动Web
  + APP
  + 数据分析（用户行为分析）
  + 数据统计系统（财务）

### 项目初始化

- styles
  - element.scss 用于覆盖element中的样式
  - reset.scss 用于重置一些标签的默认样式
  - index.scss 引入其他scss文件，写一些通用样式
- 安装处理sass相关的loader
- views


[码云](https://gitee.com/login)
1. 码云上创建一个空的项目（不能选readme文件选项）
2. 创建本地的git仓库`git init`
3. 将本地仓库关联到远端
4. `git add .`
5. `git commit -m 'init project'`
6. `git push` (这里有可能报错，按提示 git push --set-upstream origin master)(会提示输入码云的账户密码  )
7. 创建并切换到新分支`git checkout -b xx分支`
8. `git add .`
9. `git commit -m "xxxx"`
10. `git push` （可能会报错，按照提示push）
11. `git checkout master`
12. `git merge xx分支`
13. `git branch -d xx分支`
14. `git add .`
15. `git commit -m "xxx"`
16. `git push`