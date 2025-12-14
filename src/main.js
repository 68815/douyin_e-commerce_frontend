import './assets/main.css'
import './styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'

const app = createApp(App)

// 使用Pinia状态管理
const pinia = createPinia()
pinia.use(createPersistedState())
app.use(pinia)

// 使用Vue Router
app.use(router)

app.mount('#app')