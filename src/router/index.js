import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Profile from '../views/Profile.vue'

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫示例
// router.beforeEach((to, from, next) => {
//   // 可以在这里添加身份验证逻辑
//   next()
// })

export default router