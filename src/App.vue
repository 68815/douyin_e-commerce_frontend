<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import HomePage from './components/HomePage.vue'
import AuthModal from './components/AuthModal.vue'

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
const handleLoginSuccess = () => {
  hideModal()
  // 可以在这里添加登录成功后的逻辑
  console.log('用户登录成功')
}
</script>

<template>
  <div id="app">
    <!-- 头部导航 -->
    <Header @show-auth-modal="showModal" />
    
    <!-- 主页内容 -->
    <HomePage />
    
    <!-- 登录/注册模态框 -->
    <AuthModal 
      :is-visible="isModalVisible" 
      @close="hideModal"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<style scoped>
/* 在这里可以添加组件特定的样式 */
</style>