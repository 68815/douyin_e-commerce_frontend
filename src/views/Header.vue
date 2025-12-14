<template>
  <header class="header" is-logged-in>
    <router-link to="/" class="logo">抖音电商</router-link>
    <nav class="nav-links">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/products" class="nav-link">商品分类</router-link>
      <router-link to="/cart" class="nav-link">购物车</router-link>
      <router-link to="/orders" class="nav-link">我的订单</router-link>
    </nav>
    <div v-if="userStore.isLoggedIn" class="user-info">
      <span class="userName">{{ userStore.getUserName }}</span>
      <div class="avatar-dropdown" 
           @mouseenter="showDropdown" 
           @mouseleave="scheduleHideDropdown">
        <img 
          :src="userAvatar" 
          class="user-avatar" 
          alt=""
          title="用户头像">
        <div v-show="isDropdownVisible" 
             class="dropdown-menu"
             @mouseenter="cancelHideDropdown"
             @mouseleave="scheduleHideDropdown">
          <router-link to="/profile" class="dropdown-item">
            <i class="icon-profile"></i>
            个人主页
          </router-link>
          <router-link to="/settings" class="dropdown-item">
            <i class="icon-settings"></i>
            设置
          </router-link>
        </div>
      </div>
      <button class="logout-button" @click="logout">退出登录</button>
    </div>
    <button v-else class="auth-button" @click="showModal">注册/登录</button>
  </header>
</template>

<script setup>
import { useUserStore } from '../stores/user.js'
import { userApi } from '../services/api.js'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

// 使用用户状态存储
const userStore = useUserStore()
const router = useRouter()

// 定义组件的事件
const emit = defineEmits(['showAuthModal'])

// 下拉菜单可见性状态
const isDropdownVisible = ref(false)

// 延迟隐藏的定时器
const hideTimer = ref(null)

// 计算属性：用户头像URL
const userAvatar = computed(() => {
  // 如果用户有头像则使用用户头像，否则使用默认头像
  if (userStore.userInfo && userStore.userInfo.avatar) {
    return userStore.userInfo.avatar
  }
  // 返回默认头像URL
  return 'https://via.placeholder.com/40x40/409EFF/FFFFFF?text=头像'
})

// 显示下拉菜单
const showDropdown = () => {
  // 清除之前的定时器
  if (hideTimer.value) {
    clearTimeout(hideTimer.value)
    hideTimer.value = null
  }
  isDropdownVisible.value = true
}

// 延迟隐藏下拉菜单
const scheduleHideDropdown = () => {
  // 清除之前的定时器
  if (hideTimer.value) {
    clearTimeout(hideTimer.value)
  }
  
  // 设置新的定时器，在300ms后隐藏下拉菜单
  hideTimer.value = setTimeout(() => {
    isDropdownVisible.value = false
    hideTimer.value = null
  }, 300)
}

// 取消隐藏下拉菜单的计划
const cancelHideDropdown = () => {
  // 清除定时器
  if (hideTimer.value) {
    clearTimeout(hideTimer.value)
    hideTimer.value = null
  }
}

// 显示模态框
const showModal = () => {
  emit('showAuthModal')
}

const logout = async () => {
  try {
    const { data } = await userApi.logout()
    console.log('用户退出登录成功', data)
    userStore.logout()
  } catch (error) {
    console.error('用户退出登录失败', error)
  }
}
</script>

<style scoped>

.user-info {
  display: flex;
  align-items: center;
  color: #333333;
}

.userName {
  margin-right: 10px;
}

.avatar-dropdown {
  position: relative;
  display: inline-block;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin-right: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  min-width: 120px;
  padding: 5px 0;
  margin-top: 5px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item i {
  margin-right: 8px;
  width: 16px;
  text-align: center;
}

</style>