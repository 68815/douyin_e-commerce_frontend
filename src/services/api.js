const API_BASE_URL = 'http://192.168.43.69:8090'

const apiClient = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return { data, response }
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// 用户相关API
export const userApi = {
  // 登录
  login: (credentials) => {
    return apiClient('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },
  
  // 注册
  register: (userData) => {
    return apiClient('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },
  
  // 发送验证码
  sendVerificationCode: (phone) => {
    return apiClient('/user/send-code', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    })
  },
  
  // 登出
  logout: () => {
    return apiClient('/user/logout', {
      method: 'POST',
    })
  },
  
  // 获取当前用户信息
  getUserInfo: () => {
    return apiClient('/user/current', {
        method: 'GET',
    })
  },
  
  // 更新用户信息
  updateUserInfo: (userData) => {
    return apiClient('/user/update', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  // 注销账号
  writeOffAccount: () => {
    return apiClient('/user/write-off', {
      method: 'DELETE',
    })
  }
}

// 商品相关API
export const productApi = {
  // 获取商品列表
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const url = `/products${queryString ? `?${queryString}` : ''}`
    return apiClient(url)
  },
  
  // 获取商品详情
  getProductDetail: (id) => {
    return apiClient(`/products/${id}`)
  }
}

// 订单相关API
export const orderApi = {
  // 创建订单
  createOrder: (orderData) => {
    return apiClient('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  },
  
  // 获取订单列表
  getOrders: () => {
    return apiClient('/orders')
  }
}