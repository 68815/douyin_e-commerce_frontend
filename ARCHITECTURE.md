# 抖音电商前端项目架构说明

## 项目概述

这是一个基于Vue 3的电商网站前端项目，采用了现代化的前端技术栈和架构模式，旨在提供良好的用户体验和可维护的代码结构。

## 技术栈

- Vue 3 (Composition API)
- Pinia (状态管理)
- Vue Router (路由管理)
- Fetch API (HTTP客户端)

## 架构设计

### 1. 状态管理 (Pinia)

#### 实现说明
使用Pinia作为状态管理库，创建了一个user store来管理用户的登录状态和信息。

#### 目录结构
```
src/
└── stores/
    ├── user.js        # 用户状态管理
    └── plugins.js     # Pinia插件配置
```

#### 核心特性
- 使用`defineStore`定义store
- 包含用户登录状态(isLoggedIn)和用户信息(userInfo)
- 提供getters访问状态数据
- 提供actions修改状态
- 集成pinia-plugin-persistedstate实现状态持久化

### 2. 服务层 (Services)

#### 实现说明
采用服务层模式，将API调用封装在独立的服务模块中，提高代码复用性和可维护性。

#### 目录结构
```
src/
└── services/
    └── api.js        # API服务封装
```

#### 核心特性
- 封装通用的fetch客户端(apiClient)
- 按业务模块划分API(userApi, productApi, orderApi)
- 统一的错误处理机制
- 类型化的请求参数和响应数据

### 3. 路由管理 (Vue Router)

#### 实现说明
使用Vue Router实现SPA路由管理，支持页面间导航和路由守卫。

#### 目录结构
```
src/
└── router/
    └── index.js       # 路由配置
```

#### 核心特性
- 使用createWebHistory模式
- 配置基础路由(首页、登录页、注册页、个人主页)
- 支持动态路由导入
- 提供路由守卫示例

### 4. 组件结构

#### 目录结构
```
src/
├── components/        # 可复用组件
│   ├── Header.vue
│   ├── HomePage.vue
│   └── LoginRegisterAuthModal.vue
├── views/             # 页面级组件
│   └── Profile.vue
└── App.vue           # 根组件
```

#### 设计原则
- components目录存放可复用的UI组件
- views目录存放页面级组件，与路由一一对应
- 遵循单一职责原则，每个组件只负责特定功能

### 5. 个人主页功能

#### 实现说明
新增个人主页功能，用户可以查看和编辑自己的个人信息。

#### 核心特性
- 从/user/current接口获取用户详细信息
- 展示用户除ID和密码外的所有信息
- 支持编辑用户名、邮箱和手机号
- 通过/user/update接口保存更改
- 点击头像可快速跳转到个人主页

#### 相关文件
- `src/views/Profile.vue` - 个人主页组件
- `src/components/Header.vue` - 添加了头像点击跳转功能
- `src/router/index.js` - 添加了/profile路由
- `src/services/api.js` - 添加了updateUserInfo方法

## 集成与使用

### Pinia集成
1. 在main.js中创建并使用Pinia实例
2. 在组件中通过useUserStore()获取store实例
3. 通过store.state访问状态，store.actions修改状态

### Vue Router集成
1. 在main.js中使用router实例
2. 在组件中通过<router-view>渲染匹配的组件
3. 通过router.push()进行编程式导航

### 服务层使用
1. 在组件中导入相应的API模块
2. 调用API方法发起请求
3. 处理响应数据或错误

## 最佳实践

1. 状态管理: 使用Pinia进行全局状态管理，避免组件间直接传递复杂数据
2. 服务层: 将API调用封装在服务层，便于测试和维护
3. 路由管理: 合理规划路由结构，使用路由守卫控制访问权限
4. 组件设计: 遵循单一职责原则，保持组件小巧且专注
5. 数据持久化: 利用pinia-plugin-persistedstate自动保存重要状态