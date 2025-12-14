<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">欢迎来到抖音电商</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <!-- 登录/注册切换标签 -->
        <div class="tabs">
          <div 
            class="tab" 
            :class="{ active: activeForm === 'login' }"
            @click="showLoginForm"
          >
            登录
          </div>
          <div 
            class="tab" 
            :class="{ active: activeForm === 'register' }"
            @click="showRegisterForm"
          >
            注册
          </div>
        </div>

        <!-- 登录表单 -->
        <form v-if="activeForm === 'login'" id="loginForm" @submit.prevent="handleLoginSubmit">
          <div class="form-group">
            <label class="form-label">用户名/手机号/邮箱</label>
            <input 
              type="text" 
              class="form-input" 
              v-model="loginFormData.userName"
              placeholder="请输入用户名/手机号/邮箱"
            >
          </div>
          <div class="form-group">
            <label class="form-label">密码</label>
            <input 
              type="password" 
              class="form-input" 
              v-model="loginFormData.password"
              placeholder="请输入密码"
            >
          </div>
          <button type="submit" class="submit-button" id="loginSubmit">登录</button>
          <div class="switch-form">
            还没有账号？<a href="#" @click.prevent="showRegisterForm">立即注册</a>
          </div>
        </form>

        <!-- 注册表单 -->
        <div v-if="activeForm === 'register'">
          <!-- 注册方式切换标签 -->
          <div class="tabs">
            <div 
              class="tab" 
              :class="{ active: activeRegisterTab === 'phone' }"
              @click="showPhoneRegister"
            >
              手机号注册
            </div>
            <div 
              class="tab" 
              :class="{ active: activeRegisterTab === 'email' }"
              @click="showEmailRegister"
            >
              邮箱注册
            </div>
          </div>

          <!-- 手机号注册表单 -->
          <form v-if="activeRegisterTab === 'phone'" id="phoneRegisterForm" @submit.prevent="handlePhoneRegisterSubmit">
            <div class="form-group">
              <label class="form-label">手机号</label>
              <input 
                type="tel" 
                class="form-input" 
                v-model="phoneRegisterFormData.phone"
                placeholder="请输入手机号"
                id="phone"
              >
            </div>
            <div class="form-group">
              <label class="form-label">验证码</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="phoneRegisterFormData.code"
                placeholder="请输入验证码"
                id="phoneCode"
              >
              <button 
                type="button" 
                class="get-code-button" 
                id="sendPhoneCode"
                @click="handleSendPhoneCode"
              >
                获取验证码
              </button>
            </div>
            <div class="form-group">
              <label class="form-label">密码</label>
              <input 
                type="password" 
                class="form-input" 
                v-model="phoneRegisterFormData.password"
                placeholder="请输入密码"
                id="phonePassword"
              >
            </div>
            <button type="submit" class="submit-button" id="phoneRegisterSubmit">注册并登录</button>
          </form>

          <!-- 邮箱注册表单 -->
          <form v-if="activeRegisterTab === 'email'" id="emailRegisterForm" @submit.prevent="handleEmailRegisterSubmit">
            <div class="form-group">
              <label class="form-label">邮箱</label>
              <input 
                type="email" 
                class="form-input" 
                v-model="emailRegisterFormData.email"
                placeholder="请输入邮箱"
                id="email"
              >
            </div>
            <div class="form-group">
              <label class="form-label">验证码</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="emailRegisterFormData.code"
                placeholder="请输入验证码"
                id="emailCode"
              >
              <button 
                type="button" 
                class="get-code-button" 
                id="sendEmailCode"
                @click="handleSendEmailCode"
              >
                获取验证码
              </button>
            </div>
            <div class="form-group">
              <label class="form-label">密码</label>
              <input 
                type="password" 
                class="form-input" 
                v-model="emailRegisterFormData.password"
                placeholder="请输入密码"
                id="emailPassword"
              >
            </div>
            <button type="submit" class="submit-button" id="emailRegisterSubmit">注册并登录</button>
          </form>

          <div class="switch-form">
            已有账号？<a href="#" @click.prevent="showLoginForm">立即登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userApi } from '../services/api.js'
import { useUserStore } from '../stores/user.js'

// 获取用户状态存储实例
const userStore = useUserStore()

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'loginSuccess'])

const activeForm = ref('login') // 'login' or 'register'
const activeRegisterTab = ref('phone') // 'phone' or 'email'

// 登录表单数据
const loginFormData = ref({
  userName: '',
  password: ''
})

// 手机注册表单数据
const phoneRegisterFormData = ref({
  phone: '',
  code: '',
  password: ''
})

// 邮箱注册表单数据
const emailRegisterFormData = ref({
  email: '',
  code: '',
  password: ''
})

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 切换到登录表单
const showLoginForm = () => {
  activeForm.value = 'login'
}

// 切换到注册表单
const showRegisterForm = () => {
  activeForm.value = 'register'
}

// 切换到手机注册
const showPhoneRegister = () => {
  activeRegisterTab.value = 'phone'
}

// 切换到邮箱注册
const showEmailRegister = () => {
  activeRegisterTab.value = 'email'
}

// 发送验证码
const sendVerificationCode = async (contact, type) => {
  try {
    const { data } = await userApi.sendVerificationCode(contact)
    alert(`验证码已发送至${type === 'phone' ? '手机' : '邮箱'}: ${contact}`)
    return true
  } catch (error) {
    console.error('发送验证码错误:', error)
    alert('网络错误，请稍后再试')
    return false
  }
}

// 注册用户
const registerUser = async (data) => {
  try {
    const { data: responseData } = await userApi.register(data)
    alert('注册成功！')
    // 注册成功后自动登录
    await loginUser({userName: data.phone || data.email, password: data.password})
    return true
  } catch (error) {
    console.error('注册错误:', error)
    alert('网络错误，请稍后再试')
    return false
  }
}

// 用户登录
const loginUser = async (credentials) => {
  try {
    const { data: userData } = await userApi.login(credentials)
    alert(`登录成功！${userData.userName}`)
    emit('loginSuccess', userData)
    return true
  } catch (error) {
    console.error('登录错误:', error)
    alert('网络错误，请稍后再试')
    return false
  }
}

// 发送手机验证码
const handleSendPhoneCode = async (event) => {
  const phone = phoneRegisterFormData.value.phone
  if (!phone) {
    alert('请输入手机号')
    return
  }
  
  const button = event.target
  button.disabled = true
  button.textContent = '发送中...'
  
  const success = await sendVerificationCode(phone, 'phone')
  
  if (success) {
    // 倒计时60秒（模拟）
    let countdown = 60
    button.textContent = `${countdown}秒后重发`
    const timer = setInterval(() => {
      countdown--
      button.textContent = `${countdown}秒后重发`
      
      if (countdown <= 0) {
        clearInterval(timer)
        button.disabled = false
        button.textContent = '获取验证码'
      }
    }, 1000)
  } else {
    button.disabled = false
    button.textContent = '获取验证码'
  }
}

// 发送邮箱验证码
const handleSendEmailCode = async (event) => {
  const email = emailRegisterFormData.value.email
  if (!email) {
    alert('请输入邮箱地址')
    return
  }
  
  const button = event.target
  button.disabled = true
  button.textContent = '发送中...'
  
  const success = await sendVerificationCode(email, 'email')
  
  if (success) {
    // 倒计时60秒（模拟）
    let countdown = 60
    button.textContent = `${countdown}秒后重发`
    const timer = setInterval(() => {
      countdown--
      button.textContent = `${countdown}秒后重发`
      
      if (countdown <= 0) {
        clearInterval(timer)
        button.disabled = false
        button.textContent = '获取验证码'
      }
    }, 1000)
  } else {
    button.disabled = false
    button.textContent = '获取验证码'
  }
}

// 处理手机注册提交
const handlePhoneRegisterSubmit = async () => {
  const { phone, code, password } = phoneRegisterFormData.value
  
  if (!phone || !code || !password) {
    alert('请填写所有必填字段')
    return
  }
  
  const success = await registerUser({
    phone,
    code,
    password
  })
  
  if (success) {
    closeModal()
  }
}

// 处理邮箱注册提交
const handleEmailRegisterSubmit = async () => {
  const { email, code, password } = emailRegisterFormData.value
  
  if (!email || !code || !password) {
    alert('请填写所有必填字段')
    return
  }
  
  const success = await registerUser({
    email,
    code,
    password
  })
  
  if (success) {
    closeModal()
  }
}

// 处理登录提交
const handleLoginSubmit = async () => {
  const { userName, password } = loginFormData.value
  
  if (!userName || !password) {
    alert('请填写用户名和密码')
    return
  }
  
  if (await loginUser({
    userName: userName,
    password: password
  })) {
    closeModal();
  }
}
</script>

<style scoped>
</style>