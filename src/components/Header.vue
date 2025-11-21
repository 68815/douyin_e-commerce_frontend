<template>
  <header class="header">
    <a href="#" class="logo">抖音电商</a>
    <nav class="nav-links">
      <a href="#" class="nav-link">首页</a>
      <a href="#" class="nav-link">商品分类</a>
      <a href="#" class="nav-link">购物车</a>
      <a href="#" class="nav-link">我的订单</a>
    </nav>
    <button class="auth-button" @click="showModal">注册/登录</button>
  </header>
</template>

<script setup>
// 定义组件的事件
const emit = defineEmits(['showAuthModal'])

// 显示模态框
const showModal = () => {
  emit('showAuthModal')
}
</script>

<style scoped>
/* 头部导航栏样式已移至styles.css，这里只需要引入即可 */
</style>