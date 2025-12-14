<script setup>
import { ref } from 'vue'
import Header from './views/Header.vue'
import LoginRegisterAuthModal from './views/LoginRegisterAuthModal.vue'
import { useUserStore } from './stores/user'

// 使用用户状态存储
const userStore = useUserStore()

// 响应式数据
const isModalVisible = ref(false)

// 显示模态框
const showModal = () => {
  isModalVisible.value = true
}

// 隐藏模态框
const hideModal = () => {
  isModalVisible.value = false
}

// 处理登录成功事件
const handleLoginSuccess = (userData) => {
  hideModal()
  userStore.setUser(userData)
  console.log('用户登录成功')
}
</script>

<template>
  <div id="app">
    <!-- 头部导航 -->
    <Header
      v-on:show-auth-modal="showModal"
      v-model:is-logged-in="userStore.isLoggedIn"
      v-model:user-name="userStore.getUserName"
    />

    <!-- 路由视图 -->
    <router-view />

    <!-- 登录/注册模态框 -->
    <LoginRegisterAuthModal
      v-bind:is-visible="isModalVisible"
      v-on:close="hideModal"
      v-on:login-success="handleLoginSuccess"
    />
  </div>
</template>

<style scoped>
/* 在这里可以添加组件特定的样式 */
</style>