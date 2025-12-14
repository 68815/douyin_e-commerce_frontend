<template>
  <div class="settings-container">
    <h1>设置</h1>
    <div class="setting-group">
      <h2>网站主题颜色</h2>
      <select v-model="currentTheme" @change="changeTheme" class="theme-select">
        <option value="dark">深色</option>
        <option value="light-gray">淡灰色</option>
        <option value="white">白色</option>
        <option value="system">跟随系统</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 当前主题
const currentTheme = ref('system')

// 主题选项映射
const themeMap = {
  'dark': '深色',
  'light-gray': '淡灰色',
  'white': '白色',
  'system': '跟随系统'
}

// 更改主题
const changeTheme = () => {
  const theme = currentTheme.value
  console.log('主题已更改为:', themeMap[theme])
  
  // 移除所有可能的主题类
  document.body.classList.remove('dark-theme', 'light-gray-theme', 'white-theme')
  
  // 根据选择应用相应的主题
  switch (theme) {
    case 'dark':
      document.body.classList.add('dark-theme')
      break
    case 'light-gray':
      document.body.classList.add('light-gray-theme')
      break
    case 'white':
      document.body.classList.add('white-theme')
      break
    case 'system':
      // 跟随系统主题，检测系统偏好
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme')
      } else {
        document.body.classList.add('white-theme')
      }
      break
  }
}

// 组件挂载时初始化主题
onMounted(() => {
  changeTheme()
})
</script>

<style scoped>
.settings-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.setting-group {
  margin-bottom: 30px;
}

.setting-group h2 {
  margin-bottom: 15px;
  color: #333;
}

.theme-select {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  min-width: 200px;
}

.theme-select:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
</style>