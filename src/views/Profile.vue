<template>
  <div class="profile-container">
    <h1>个人资料</h1>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="userStore.userInfo" class="profile-content">
      <div class="avatar-section">
        <img :src="avatarUrl" alt="用户头像" class="user-avatar" />
        <button @click="changeAvatar" class="change-avatar-btn">更换头像</button>
      </div>
      
      <div class="info-section">
        <div class="info-item">
          <label>用户名:</label>
          <input 
            v-model="editableUserInfo.userName" 
            :disabled="!isEditing"
            class="editable-input"
          />
        </div>
        
        <div class="info-item">
          <label>邮箱:</label>
          <input 
            v-model="editableUserInfo.userEmail" 
            :disabled="!isEditing"
            class="editable-input"
          />
        </div>
        
        <div class="info-item">
          <label>手机号:</label>
          <input 
            v-model="editableUserInfo.userPhoneNumber" 
            :disabled="!isEditing"
            class="editable-input"
          />
        </div>
        
        <div class="info-item">
          <label>注册时间:</label>
          <span>{{ formatDate(userStore.userInfo.registerDateTime) }}</span>
        </div>
        
        <div class="info-item">
          <label>最后登录时间:</label>
          <span>{{ formatDate(userStore.userInfo.latestLoginDateTime) }}</span>
        </div>
        
        <div class="info-item">
          <label>总登录天数:</label>
          <span>{{ userStore.userInfo.totalLoginDays }}</span>
        </div>
        
        <div class="info-item">
          <label>连续登录天数:</label>
          <span>{{ userStore.userInfo.consecutiveLoginDays }}</span>
        </div>
        
        <div class="info-item">
          <label>信任分:</label>
          <span>{{ userStore.userInfo.trustScore }}</span>
        </div>
      </div>
      
      <div class="action-buttons">
        <button v-if="!isEditing" @click="startEdit" class="edit-btn">编辑资料</button>
        <button v-else @click="saveChanges" class="save-btn">保存更改</button>
        <button v-if="isEditing" @click="cancelEdit" class="cancel-btn">取消</button>
      </div>
      
      <!-- 注销账号选项 -->
      <div class="danger-zone">
        <h2>账号安全</h2>
        <div class="logout-section">
          <button @click="logout" class="logout-btn">注销账号</button>
        </div>
      </div>
    </div>
    <div v-else class="no-user-info">
      无法获取用户信息，请重新登录。
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { userApi } from '../services/api'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const loading = ref(true)
const isEditing = ref(false)
const avatarUrl = ref('#') // 这里应该是一个默认头像URL

// 创建可编辑的用户信息副本
const editableUserInfo = reactive({
  userName: '',
  userEmail: '',
  userPhoneNumber: ''
})

// 格式化日期显示
const formatDate = (dateString) => {
  if (!dateString) return '暂无'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

// 开始编辑
const startEdit = () => {
  isEditing.value = true
  // 复制当前用户信息到可编辑对象
  Object.assign(editableUserInfo, {
    userName: userStore.userInfo.userName || '',
    userEmail: userStore.userInfo.userEmail || '',
    userPhoneNumber: userStore.userInfo.userPhoneNumber || ''
  })
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
  // 重置为原始值
  Object.assign(editableUserInfo, {
    userName: userStore.userInfo.userName || '',
    userEmail: userStore.userInfo.userEmail || '',
    userPhoneNumber: userStore.userInfo.userPhoneNumber || ''
  })
}

// 保存更改
const saveChanges = async () => {
  try {
    // 调用更新用户信息的API
    const userData = {
      userName: editableUserInfo.userName,
      userEmail: editableUserInfo.userEmail,
      userPhoneNumber: editableUserInfo.userPhoneNumber
    }
    
    const { data } = await userApi.updateUserInfo(userData)
    
    // 更新本地状态
    userStore.updateUserInfo(data)
    
    isEditing.value = false
    alert('资料更新成功！')
  } catch (error) {
    console.error('更新失败:', error)
    alert('更新失败，请稍后重试')
  }
}

// 更换头像（模拟）
const changeAvatar = () => {
  alert('更换头像功能待实现')
}

// 注销账号
const logout = async () => {
  if (confirm('确定要注销账号吗？此操作不可撤销。')) {
    const { data } = await userApi.writeOffAccount()
    await router.push('/')
    alert('账号已注销')
  }
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    loading.value = true
    const { data } = await userApi.getUserInfo()
    userStore.setUser(data)
    
    // 初始化可编辑信息
    Object.assign(editableUserInfo, {
      userName: data.userName || '',
      userEmail: data.userEmail || '',
      userPhoneNumber: data.userPhoneNumber || ''
    })
  } catch (error) {
    console.error('获取用户信息失败:', error)
  } finally {
    loading.value = false
  }
}

// 组件挂载时获取用户信息
onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push('/') // 如果未登录，重定向到首页
  } else {
    fetchUserInfo()
  }
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.loading, .no-user-info {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
}

.change-avatar-btn {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.change-avatar-btn:hover {
  background-color: #337ecc;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.info-item label {
  width: 120px;
  font-weight: bold;
  color: #333;
}

.info-item span {
  flex: 1;
  color: #666;
}

.editable-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.editable-input:disabled {
  background-color: #f5f5f5;
  color: #999;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
}

.edit-btn, .save-btn, .cancel-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #409eff;
  color: white;
}

.edit-btn:hover {
  background-color: #337ecc;
}

.save-btn {
  background-color: #67c23a;
  color: white;
}

.save-btn:hover {
  background-color: #55a02d;
}

.cancel-btn {
  background-color: #909399;
  color: white;
}

.cancel-btn:hover {
  background-color: #73767a;
}

/* 注销账号样式 */
.danger-zone {
  border-top: 1px solid #eee;
  padding-top: 30px;
  margin-top: 20px;
}

.danger-zone h2 {
  color: #f56c6c;
  margin-bottom: 15px;
}

.logout-btn {
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #dd6161;
}
</style>