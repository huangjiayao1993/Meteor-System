<div align="center">


![logo](./public/favicon.ico)

<h1>Meteor System</h1>
<p align="center">
	<a href="https://v3.vuejs.org/" target="_blank">
		<img src="https://img.shields.io/badge/Vue.js-3.3.4-green" alt="Vue">
	</a>
	<a href="https://vitejs.cn/" target="_blank">
		<img src="https://img.shields.io/badge/Vite-4.4.4-yellow" alt="Vite">
	</a>
	<a href="https://pinia.web3doc.top/" target="_blank">
		<img src="https://img.shields.io/badge/Pinia-2.1.4-orange" alt="Pinia">
	</a>
	<a href="https://www.antdv.com/components/overview" target="_blank">
		<img src="https://img.shields.io/badge/Ant Design Vue-3.2.20-lightgrey" alt="Ant Design Vue">
	</a>
	<a href="https://www.tslang.cn/" target="_blank">
		<img src="https://img.shields.io/badge/TypeScript-latest-blue" alt="TypeScript">
	</a>
</p>
</div>

## 介绍📖

Meteor System 是一个极简的后台管理系统解决方案，基于 Vue3 和 Ant Design Vue 实现。使用了最新的前端技术栈 Vue3
Setup语法糖 & Vite3 & Vue-Router4 & Ant Design Vue & Pinia & TypeScript 。

目前正在持续更新中，对于项目有不完善的地方，希望大家能多提意见。（⭐🤣）

## 快速启动📖

以下为后台启动的过程：

1. `npm install`


2. `npm run dev`


3. http://localhost:5500


4. 初始化账号密码：admin/12345678

## 在线预览👀

待测试环境部署，或本地部署

## 仓库地址📚

| 类型            | 说明     | 链接（欢迎Star⭐）                                      |
|---------------|--------|--------------------------------------------------|
| Meteor        | Java后台 | https://github.com/huangjiayao1993/Meteor        |
| Meteor-System | Vue前端  | https://github.com/huangjiayao1993/Meteor-Meteor |

## 技术栈

| 依赖             | 说明              | 版本     |
|----------------|-----------------|--------|
| Vue            | Vue基础版本         | 3.3.4  |
| Vue Router     | Vue路由           | 4.2.4  |
| Pinia          | 跨组件/页面共享状态的储存库  | 2.1.4  |
| Ant Design Vue | 页面实现            | 3.2.20 |
| Vite           | 新型前端构建工具        | 4.4.4  |
| TypeScript     | JavaScript类型的超集 | latest |

## 模块说明

```
src
 ├── api -- 接口相关
 │     ├── auth -- 权限认证相关api
 │     ├── interface -- 接口模型
 │     │      ├── login -- 登录相关模型
 │     │      ├── system -- 系统相关模型
 │     │      └── base.ts -- 基类模型
 │     ├── system -- 系统接口相关api
 │     └── index.ts -- 请求配置
 ├── assets -- 资源文件
 ├── components -- 自定义通用组件
 ├── layout -- 布局组件
 ├── routers -- 路由组件
 ├── store -- 缓存管理
 ├── style -- 样式管理
 ├── utls -- 工具集
 └── views -- 页面管理
      ├── home -- 首页
      ├── login -- 登录页
      ├── system -- 系统页
      └── notfound.vue -- 404等
```

## 功能列表

#### 1. 组织管理

#### 2. 用户管理

#### 3. 角色管理

#### 4. 菜单管理

#### 5. 系统配置

#### 6. 字典管理

#### 7. 登录日志

#### 8. 操作日志

#### 9. 持续更新...

## 开源协议

<img src="https://img.shields.io/badge/License-MIT-green" alt="Vue">
